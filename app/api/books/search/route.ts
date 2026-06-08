import type { NextRequest } from 'next/server';

const TAG = 'bookwriggle71-21';
const MARKETPLACE = 'www.amazon.co.uk';
const AMAZON_CLIENT_ID = process.env.AMAZON_ACCESS_KEY_ID ?? '';
const AMAZON_CLIENT_SECRET = process.env.AMAZON_SECRET_KEY ?? '';
const GOOGLE_API_KEY = process.env.GOOGLE_BOOKS_API_KEY ?? '';

// In-process token cache — survives warm Vercel function re-invocations
let tokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 60_000) return tokenCache.token;

  const res = await fetch('https://api.amazon.com/auth/o2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: AMAZON_CLIENT_ID,
      client_secret: AMAZON_CLIENT_SECRET,
      scope: 'creatorsapi::default',
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Amazon token ${res.status}: ${body}`);
  }

  const data = await res.json();
  tokenCache = {
    token: data.access_token,
    expiresAt: now + (data.expires_in ?? 3600) * 1000,
  };
  return tokenCache.token;
}

// ---- Shared Book type (mirrors mobile types/index.ts) ----

type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  coverFallbackUrl?: string;
  coverThumbUrl?: string;
  blurb: string;
  googleRating: number;
  googleReviewCount: number;
  inAppRating: number;
  inAppReviewCount: number;
  affiliateUrl: string;
  genres: string[];
  cachedAt: number;
};

// ---- Amazon Creators API ----

function parseAmazonItem(item: any): Book | null {
  const asin: string | undefined = item?.asin;
  if (!asin) return null;

  const title: string | undefined = item?.itemInfo?.title?.displayValue;
  if (!title) return null;

  const imageUrl: string | undefined = item?.images?.primary?.large?.url;
  if (!imageUrl) return null;

  // Skip non-English books
  const langs: any[] = item?.itemInfo?.contentInfo?.languages?.displayValues ?? [];
  if (langs.length > 0) {
    const hasEnglish = langs.some((l: any) =>
      typeof l.displayValue === 'string' && l.displayValue.toLowerCase().includes('english')
    );
    if (!hasEnglish) return null;
  }

  const contributors: any[] = item?.itemInfo?.byLineInfo?.contributors ?? [];
  const author =
    contributors.find((c: any) => c.roleType === 'author')?.name ??
    contributors[0]?.name ??
    'Unknown Author';

  // Try multiple field paths — Creators API casing for ExternalIds is uncertain
  const isbn10: string | undefined =
    item?.itemInfo?.externalIds?.iSBNs?.displayValues?.[0] ??
    item?.itemInfo?.externalIds?.isbns?.displayValues?.[0] ??
    item?.itemInfo?.externalIds?.ISBNs?.displayValues?.[0];

  const isbn13: string | undefined =
    item?.itemInfo?.externalIds?.eANs?.displayValues?.[0] ??
    item?.itemInfo?.externalIds?.eaNs?.displayValues?.[0] ??
    item?.itemInfo?.externalIds?.EANs?.displayValues?.[0];

  const id = isbn10 ?? isbn13 ?? asin;

  // Open Library cover (best quality) → Amazon image URL as fallback
  const coverUrl = isbn10 || isbn13
    ? `https://covers.openlibrary.org/b/isbn/${isbn10 ?? isbn13}-L.jpg?default=false`
    : imageUrl;
  const coverFallbackUrl = imageUrl;
  const coverThumbUrl = imageUrl;

  const affiliateUrl = `https://www.amazon.co.uk/dp/${asin}?tag=${TAG}`;

  const productGroup: string | undefined =
    item?.itemInfo?.classifications?.productGroup?.displayValue;
  const genres = productGroup ? [productGroup] : [];

  return {
    id,
    title,
    author,
    coverUrl,
    coverFallbackUrl,
    coverThumbUrl,
    blurb: '',
    googleRating: 0,
    googleReviewCount: 0,
    inAppRating: 0,
    inAppReviewCount: 0,
    affiliateUrl,
    genres,
    cachedAt: Date.now(),
  };
}

async function searchAmazon(keywords: string, itemPage: number): Promise<Book[]> {
  const token = await getAccessToken();

  const res = await fetch('https://creatorsapi.amazon/catalog/v1/searchItems', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-marketplace': MARKETPLACE,
    },
    body: JSON.stringify({
      keywords,
      searchIndex: 'Books',
      itemCount: 10,
      itemPage,
      partnerTag: TAG,
      partnerType: 'Associates',
      marketplace: MARKETPLACE,
      resources: [
        'images.primary.large',
        'itemInfo.title',
        'itemInfo.byLineInfo',
        'itemInfo.contentInfo',
        'itemInfo.classifications',
        'itemInfo.externalIds',
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Amazon search ${res.status}: ${body}`);
  }

  const data = await res.json();
  const items: any[] = data?.searchResult?.items ?? [];
  return items.map(parseAmazonItem).filter(Boolean) as Book[];
}

// ---- Google Books (fallback + blurb enrichment) ----

function isbn13ToIsbn10(isbn13: string): string | null {
  if (!isbn13.startsWith('978')) return null;
  const digits = isbn13.slice(3, 12);
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  const check = (11 - (sum % 11)) % 11;
  return digits + (check === 10 ? 'X' : String(check));
}

function parseGoogleVolume(item: any): Book | null {
  const info = item?.volumeInfo;
  if (!info?.title) return null;
  if (!info.imageLinks?.thumbnail) return null;
  if (info.language && !info.language.startsWith('en')) return null;

  const isbn13 = info.industryIdentifiers?.find((x: any) => x.type === 'ISBN_13')?.identifier;
  const isbn10 =
    info.industryIdentifiers?.find((x: any) => x.type === 'ISBN_10')?.identifier ??
    (isbn13 ? isbn13ToIsbn10(isbn13) : null);

  const id = isbn10 ?? isbn13 ?? item.id;

  const googleThumb = info.imageLinks.thumbnail
    .replace('http:', 'https:')
    .replace('&edge=curl', '');

  const amazonCoverUrl = isbn10
    ? `https://images-na.ssl-images-amazon.com/images/P/${isbn10}.01.LZZZZZZZ.jpg`
    : null;

  const coverUrl = isbn10 || isbn13
    ? `https://covers.openlibrary.org/b/isbn/${isbn10 ?? isbn13}-L.jpg?default=false`
    : googleThumb;

  return {
    id,
    title: info.title,
    author: info.authors?.[0] ?? 'Unknown Author',
    coverUrl,
    coverFallbackUrl: amazonCoverUrl ?? googleThumb,
    coverThumbUrl: googleThumb,
    blurb: info.description ?? '',
    googleRating: info.averageRating ?? 0,
    googleReviewCount: info.ratingsCount ?? 0,
    inAppRating: 0,
    inAppReviewCount: 0,
    affiliateUrl: isbn10
      ? `https://www.amazon.co.uk/dp/${isbn10}?tag=${TAG}`
      : `https://www.amazon.co.uk/s?k=${encodeURIComponent(info.title)}&i=stripbooks&tag=${TAG}`,
    genres: info.categories ?? [],
    cachedAt: Date.now(),
  };
}

async function searchGoogleBooks(query: string, startIndex: number): Promise<Book[]> {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10&startIndex=${startIndex}&printType=books&orderBy=relevance&langRestrict=en&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.items ?? []).map(parseGoogleVolume).filter(Boolean) as Book[];
}

function dedup(books: Book[]): Book[] {
  const seen = new Set<string>();
  return books.filter((b) => {
    if (seen.has(b.id)) return false;
    seen.add(b.id);
    return true;
  });
}

const normalize = (s: string) => s.toLowerCase().replace(/[^\w\s]/g, '').trim();

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const q = params.get('q')?.trim();
  const page = Math.max(1, parseInt(params.get('page') ?? '1'));
  const pages = Math.min(5, Math.max(1, parseInt(params.get('pages') ?? '1')));

  if (!q) {
    return Response.json({ error: 'Missing q' }, { status: 400, headers: CORS });
  }

  const pageNums = Array.from({ length: pages }, (_, i) => page + i);

  // Run Amazon (primary) and Google Books (blurb source) in parallel
  let amazonBooks: Book[] = [];
  let googleBooks: Book[] = [];

  const [amazonResult, googleResult] = await Promise.allSettled([
    Promise.all(pageNums.map((p) => searchAmazon(q, p))),
    Promise.all(pageNums.map((_, i) => searchGoogleBooks(q, i * 10))),
  ]);

  if (googleResult.status === 'fulfilled') {
    googleBooks = dedup(googleResult.value.flat());
  }

  if (amazonResult.status === 'fulfilled') {
    amazonBooks = dedup(amazonResult.value.flat());
  }

  if (amazonBooks.length > 0) {
    // Enrich Amazon results with descriptions from Google Books (matched by title)
    const descMap = new Map(
      googleBooks.filter((b) => b.blurb).map((b) => [normalize(b.title), b.blurb])
    );
    const enriched = amazonBooks.map((b) => ({
      ...b,
      blurb: descMap.get(normalize(b.title)) ?? '',
    }));
    return Response.json(enriched, { headers: CORS });
  }

  // Amazon failed or returned nothing — use Google Books directly
  if (googleBooks.length > 0) {
    return Response.json(googleBooks, { headers: CORS });
  }

  // Both failed — last-ditch Google Books fetch without Amazon running in parallel
  if (amazonResult.status === 'rejected') {
    console.error('[books/search] Amazon error:', amazonResult.reason);
    try {
      const fallback = await Promise.all(
        pageNums.map((_, i) => searchGoogleBooks(q, page * 10 + i * 10))
      );
      return Response.json(dedup(fallback.flat()), { headers: CORS });
    } catch {
      // ignore
    }
  }

  return Response.json([], { headers: CORS });
}

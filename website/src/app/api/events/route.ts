import clientPromise from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const query: any = {};
  if (searchParams.has('maps')) {
    const isMapQuery = searchParams.get('maps') === 'true';
    if (isMapQuery) {
      query.latitude = { $exists: true };
      query.longitude = { $exists: true };
    }
  }

  const client = await clientPromise;
  const events = await client
    .db('db')
    .collection('events')
    .find(query)
    .toArray();

  return Response.json(events);
}

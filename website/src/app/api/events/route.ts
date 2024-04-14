import { auth } from '@/lib/auth';
import clientPromise from '@/lib/db';

export const GET = auth(async (request) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const query: any = {};
  if (searchParams.has('maps')) {
    if (searchParams.get('maps') === 'true') {
      query.latitude = { $exists: true };
      query.longitude = { $exists: true };
    }
  }

  if (searchParams.has('categories')) {
    let categories: any = searchParams.get('categories');
    if (!Array.isArray(categories)) {
      categories = [categories];
    }
    // LOL! we stored string numbers
    categories = categories.map((cat: any) => `${Number(cat)}`);
    if (categories) {
      query.categories = {
        $elemMatch: {
          catId: {
            $in: categories,
          },
        },
      };
    }
  }

  if (searchParams.has('search')) {
    const search = searchParams.get('search');
    if (search) {
      const $regex = `^${search}`;
      query.$or = [
        { title: { $regex, $options: 'i' } },
        { 'listing.title': { $regex, $options: 'i' } },
        { location: { $regex, $options: 'i' } },
      ];
    }
  }

  // hide manual from the world
  query.$or = query.$or ?? [];
  query.$or.push({ source: { $ne: 'manual' } });
  const email = request.auth?.user?.email;
  if (email) {
    query.$or.push({ source: 'manual', owner: email });
  }

  console.log(query);

  const client = await clientPromise;
  const events = await client
    .db('db')
    .collection('events')
    .find(query)
    .toArray();

  return Response.json(events);
});

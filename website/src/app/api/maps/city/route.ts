import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request!.url);
    const searchParams = new URLSearchParams(url.search);

    if (!searchParams.has('lat') || !searchParams.has('lng')) {
      return NextResponse.json(
        { error: 'Expected lat and lng parameters' },
        { status: 400 },
      );
    }
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    // this breaks??? @codyduong
    // if (lat == 0 || lng == 0) {
    //   return NextResponse.json(
    //     { error: 'Expected lat and lng parameters to be nonzero' },
    //     { status: 400 },
    //   );
    // }

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`,
    );
    const data = await res.json();
    if (data.status === 'OK' && data.results.length > 0) {
      const localityInfo = data.results[0].address_components.find(
        (component: { types: string | string[] }) =>
          component.types.includes('locality'),
      );
      return NextResponse.json(
        {
          city: localityInfo ? localityInfo.long_name : 'City not found',
        },
        { status: 200 },
      );
    }
    throw new Error(data.status);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

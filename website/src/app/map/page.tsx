'use client';

import PageWrapper from '@/components/PageWrapper';
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
  useMap,
} from '@vis.gl/react-google-maps';
import styled from 'styled-components';
import dark from './dark';
import { useState, useRef, useEffect, useMemo } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type {
  Cluster,
  ClusterStats,
  Marker,
} from '@googlemaps/markerclusterer';
import useSWR from 'swr';
import { Events } from '@/types/events';
import Sidebar from '@/components/Sidebar';
import SearchInput from '@/components/SearchInput';
import CategoryFilters from './CategoryFilters';
import chroma from 'chroma-js';

// just a component to mount styling
const SetMapStyle = (): null => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const styledMapType = new google.maps.StyledMapType(dark);
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
  }, [map]);

  return null;
};

const MarkerClusteredRenderer = {
  render: (cluster: Cluster, stats: ClusterStats, map: google.maps.Map) => {
    const count = cluster.count;

    const c = chroma.scale(['#2aa230', '#4eacc1']);

    const minValue = stats.clusters.markers.min;
    const maxValue = stats.clusters.markers.max;
    const logMin = Math.log(minValue);
    const logMax = Math.log(maxValue);

    const normalizedValue = (Math.log(count) - logMin) / (logMax - logMin);

    const color = c(normalizedValue).hex();

    // const color =
    //   count > Math.max(10, stats.clusters.markers.mean) ? '#a22a2a' : ;

    // create svg url with fill color
    const svg = window.btoa(`
        <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
          <circle cx="120" cy="120" opacity=".8" r="70" />
          <circle cx="120" cy="120" opacity=".5" r="90" />
          <circle cx="120" cy="120" opacity=".3" r="110" />
          <circle cx="120" cy="120" opacity=".1" r="130" />
        </svg>`);

    const position = cluster.position;

    // create marker using svg icon
    return new google.maps.Marker({
      position,
      icon: {
        url: `data:image/svg+xml;base64,${svg}`,
        scaledSize: new google.maps.Size(45, 45),
      },
      label: {
        text: String(count),
        color: 'rgba(255,255,255,0.9)',
        fontSize: '12px',
      },
      // adjust zIndex to be above other markers
      zIndex: 1000 + count,
    });
  },
} as const;

interface MarkersProps {
  events: Events;
  setSelectedEvents: React.Dispatch<React.SetStateAction<Events>>;
}

const Markers = (props: MarkersProps): JSX.Element => {
  const { events, setSelectedEvents } = props;

  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({
        map,
        // never decluster super close points, if users want to see seperate events
        // they'll have to click on it
        algorithmOptions: { maxZoom: 19 },
        onClusterClick: (_event, cluster) => {
          // console.log(cluster);
          setSelectedEvents(
            (cluster.markers as (Marker & { key: string })[] | undefined)
              ?.map((marker) => events.find((event) => event._id == marker.key))
              .filter((n): n is NonNullable<typeof n> => !!n) ?? [],
          );
        },
        renderer: MarkerClusteredRenderer,
      });
    }
  }, [map]);

  // Update markers
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string): void => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev): Record<string, Marker> => {
      if (marker) {
        return { ...prev, [key]: Object.assign(marker, { key }) };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const result = useMemo(
    () =>
      events.map((event) => {
        // console.log(event._id, event.latitude, event.longitude);
        return (
          <AdvancedMarker
            position={{ lat: event.latitude, lng: event.longitude }}
            key={event._id}
            ref={(marker) => setMarkerRef(marker, event._id)}
            onClick={() => {
              setSelectedEvents([event]);
            }}
          >
            <Pin
              background={'#39b356'}
              borderColor={'#12651f'}
              glyphColor={'#0c6854'}
            ></Pin>
          </AdvancedMarker>
        );
      }),
    [events],
  );

  return <>{result}</>;
};

const EventsColumnBase = styled.div`
  position: absolute;
  width: 400px;
  height: 100vh;
  left: 64px;
  display: flex;
  flex-flow: column nowrap;
  z-index: 5000;

  transition: background-color 0.225s ease-in-out;
  &.events {
    background-color: #505050;
  }
`;

const EventsColumn = styled.ol`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const EventItem = styled.ul`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-flow: column nowrap;
`;

const EventDescription = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const EventImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  .img {
    max-width: 300px;
  }
`;

// @ts-expect-error: blah
const fetcher = (...args): any => fetch(...args).then((res) => res.json());

const cityFetcher = async (url: any): Promise<string> => {
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) {
    return data.city;
  } else {
    throw new Error(data.error || 'Failed to fetch');
  }
};

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;

  div {
    border: none !important;
  }
`;

const MapPage = (): JSX.Element => {
  const [selectedEvents, setSelectedEvents] = useState<Events>([]);
  const [search, setSearch] = useState('');
  const [timeout, setTimeout] = useState<NodeJS.Timeout>();
  const [searchDeduped, setSearchDeduped] = useState('');

  const { data, error, isLoading } = useSWR('/api/events?maps=true', fetcher, {
    keepPreviousData: true,
    dedupingInterval: 1000,
    revalidateOnMount: false,
  });

  const [lat, setLat] = useState(38.95778830084053);
  const [lng, setLng] = useState(-95.25382396593233);

  useEffect(() => {
    setTimeout((prev) => {
      if (prev) {
        clearTimeout(prev);
      }
      return setInterval(() => {
        setSearchDeduped(search);
      }, 250);
    });
    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  // useEffect(() => {
  //   console.log(selectedEvents);
  // }, [selectedEvents]);

  const reverseGeocode = `/api/maps/city?lat=${lat}&lng=${lng}`;
  const { data: location, error: locationError } = useSWR(
    reverseGeocode,
    cityFetcher,
    { keepPreviousData: true, dedupingInterval: 1000 },
  );

  // console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  return (
    <PageWrapper padContent={false} map>
      <Sidebar />

      {error && <>Failed to load</>}
      {(isLoading || !data) && <>Loading...</>}
      {!error && !isLoading && data && (
        <MapWrapper>
          <Map
            mapId={'f4bfb03ea9696921'}
            style={{ width: '100%', height: '100%', position: 'unset' }}
            defaultCenter={{ lat, lng }}
            defaultZoom={16}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            maxZoom={18}
            onDragend={(event) => {
              setLat(event.map.getCenter()?.lat ?? 0);
              setLng(event.map.getCenter()?.lng ?? 0);
            }}
            onClick={() => {
              setSelectedEvents([]);
            }}
            // styles={dark}
          >
            <EventsColumnBase
              className={selectedEvents.length > 0 ? 'events' : ''}
            >
              <SearchInput
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder={
                  location
                    ? `Search for events in ${location}`
                    : 'Search events'
                }
              />
              {selectedEvents.length > 0 && (
                <EventsColumn>
                  {selectedEvents.map((event) => (
                    <EventItem key={event._id}>
                      <EventImageWrapper>
                        <img src={event.media_raw[0].mediaurl} width={288} />
                      </EventImageWrapper>

                      <EventDescription>
                        {/* <span>{event._id}</span> */}

                        <span>{event.title}</span>
                        <span>{event.location}</span>
                      </EventDescription>
                    </EventItem>
                  ))}
                </EventsColumn>
              )}
            </EventsColumnBase>
            <CategoryFilters search={search} setSearch={setSearch} />
            <SetMapStyle />
            <Markers
              events={data as Events}
              setSelectedEvents={setSelectedEvents}
            />
          </Map>
        </MapWrapper>
      )}
    </PageWrapper>
  );
};

export default MapPage;

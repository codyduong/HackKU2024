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
import { useState, useRef, useEffect } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';
import useSWR from 'swr';
import { Events } from '@/types/events';
import Sidebar from '@/components/Sidebar';
import SearchInput from '@/components/SearchInput';

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

  return (
    <>
      {events.map((event) => {
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
              background={'#22ccff'}
              borderColor={'#1e89a1'}
              glyphColor={'#0f677a'}
            ></Pin>
          </AdvancedMarker>
        );
      })}
    </>
  );
};

const EventsColumnBase = styled.div`
  position: absolute;
  width: 320px;
  height: 100vh;
  left: 64px;
  display: flex;
  flex-flow: column nowrap;
  z-index: 5000;
`;

const EventsColumn = styled.ol`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
`;

const EventItem = styled.ul`
  width: 100%;
`;

// @ts-expect-error: blah
const fetcher = (...args): any => fetch(...args).then((res) => res.json());

const cityFetcher = async (url) => {
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
  const { data, error, isLoading } = useSWR('/api/events?maps=true', fetcher);
  const [selectedEvents, setSelectedEvents] = useState<Events>([]);

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    console.log(selectedEvents);
  }, [selectedEvents]);

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
      {isLoading && <>Loading...</>}
      {!error && !isLoading && (
        <MapWrapper>
          <Map
            mapId={'f4bfb03ea9696921'}
            style={{ width: '100%', height: '100%', position: 'unset' }}
            defaultCenter={{ lat: 38.95778830084053, lng: -95.25382396593233 }}
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
            <EventsColumnBase>
              <SearchInput
                placeholder={
                  location
                    ? `Search for events in ${location}`
                    : 'Search events'
                }
              />
              {selectedEvents.length > 0 && (
                <EventsColumn>
                  {selectedEvents.map((event) => (
                    <EventItem key={event._id}>{event._id}</EventItem>
                  ))}
                </EventsColumn>
              )}
            </EventsColumnBase>
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

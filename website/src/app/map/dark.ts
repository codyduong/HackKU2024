export default [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#004358' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#232323' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#232323' }, { lightness: 6 }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#324440' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#324440' }, { lightness: -20 }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{ color: '#324440' }, { lightness: -17 }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#fcffe2' }, { visibility: 'on' }, { weight: 0.3 }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ visibility: 'on' }, { color: '#fcffe2' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'simplified' }],
  },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#232323' }, { lightness: 6 }],
  },
  {},
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#1f8a70' }, { weight: 0.5 }],
  },
] as google.maps.MapTypeStyle[];

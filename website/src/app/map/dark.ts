export default [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#C7E7E8' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#9cc599' }, { lightness: 6 }, { saturation: -20 }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#9cc599' }, { lightness: 6 }, { saturation: -20 }],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { color: '#D6D6D6' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'on' }, { color: '#000000' }, { weight: 2 }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { color: '#D6D6D6' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { color: '#D6D6D6' }, { lightness: -20 }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { color: '#D6D6D6' }, { lightness: -17 }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#FFFFFF' }, { visibility: 'on' }, { weight: 1 }, { opacity: 0.6 }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ visibility: 'on' }, { color: '#404040' }],
  },
  {
    elementType: 'labels.text.fill',
    featureType: 'administrative',
    stylers: [{ color: '#808080' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#D6D6D6' }, { lightness: 6 }],
  },
  {},
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#D6D6D6' }, { weight: 0.5 }],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#919191' }, { weight: .5 }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#919191' }, { weight: .5 }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#919191' }, { weight: .5 }],
  },
] as google.maps.MapTypeStyle[];

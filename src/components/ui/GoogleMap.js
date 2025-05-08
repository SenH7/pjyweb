// src/components/ui/GoogleMap.js
import { useEffect, useRef } from 'react';

const GoogleMap = ({ address, zoom = 15 }) => {
  const mapRef = useRef(null);
  const defaultAddress = '7th Industrial area, Tianliao community, Yutang Street, Guangming District, Shenzhen';
  
  useEffect(() => {
    // Initialize the map once the Google Maps script has loaded
    const initMap = () => {
      // Default coordinates for Guangming District, Shenzhen (approximate)
      const defaultLocation = { lat: 22.7742, lng: 113.9175 };
      
      const mapOptions = {
        center: defaultLocation,
        zoom: zoom,
        mapTypeControl: true,
        scrollwheel: false,
        streetViewControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      };
      
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      
      // Try to geocode the address to get accurate coordinates
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ 'address': address || defaultAddress }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const position = results[0].geometry.location;
          map.setCenter(position);
          
          // Add a marker at the location
          new window.google.maps.Marker({
            map: map,
            position: position,
            animation: window.google.maps.Animation.DROP,
            title: 'Peng Jinyuan Technology Co., LTD'
          });
        }
      });
    };
    
    // Check if Google Maps script is already loaded
    if (window.google && window.google.maps) {
      initMap();
    } else {
      // Load Google Maps script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
      
      return () => {
        window.initMap = null;
        document.head.removeChild(script);
      };
    }
  }, [address, zoom]);
  
  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px' }}
    ></div>
  );
};

export default GoogleMap;
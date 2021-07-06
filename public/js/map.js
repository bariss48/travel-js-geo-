mapboxgl.accessToken = 'pk.eyJ1IjoiYmFyaXM0OCIsImEiOiJja3FvMWphYmwwaTVvMzJtaGtxajBnNHd2In0.g58OJ3PgENrunG5tazReqA';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom: 5,
center: [35.2433,38.9637]
});

// Fetch stores from API
async function getStores() {
    const res = await fetch('/api/v1/stores');
    const data = await res.json();

    const stores = data.data.map(store => {
      var marker1 = new mapboxgl.Marker()
      .setLngLat([store.location.coordinates[0], store.location.coordinates[1]])
      .addTo(map);
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            store.location.coordinates[0],
            store.location.coordinates[1]
          ]
        },
        properties: {
          storeId: store.storeId,
          icon: ''
        }
        
      };
    });
    loadMap(stores);
  }
// Load map with stores
function loadMap(stores) {
    map.on('load', function() {
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: stores
          }
        },
        layout: {
          'icon-image': '{icon}-15',
          'icon-size': 1.0,
          'text-field': '{storeId}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.9],
          'text-anchor': 'top'
        }
      });
    });
  }

getStores();
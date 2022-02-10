const CACHE_NAME = 'v1_simple_app',
  urlsToCache = [
    './',
    './assets/simple-compras.png',
    './assets/simple-compras-02.png',
    './assets/simple-viajes.png',
    './assets/simple-delivery.png',
    './assets/simple-pago.png',
    './assets/simple-wallet.png',
    './assets/auto.png',
    './assets/carrito.png',
    './assets/cripto.jpg',
    './assets/delivery.jpg',
    './assets/producto.png',
    './assets/promocion.png',
    './assets/profile.png',
    './assets/wallet.png',
    './assets/viajes.jpg',
    './assets/pagos.png',
    './assets/productos y servicios.jpg',
    './assets/banners/simple-compras.png',
    './assets/banners/simple-viajes.png',
    './assets/banners/simple-delivery.png',
    './assets/banners/simple-pago.png',
    './assets/slider/compras-01.png',
    './assets/slider/compras-02.png',
    './assets/slider/delivery-01.png',
    './assets/slider/delivery-02.png',
    './assets/slider/pagos-01.png',
    './assets/slider/pagos-02.png',
    './assets/slider/viajes-01.png',
    './assets/slider/viajes-02.png',
    './assets/slider/viajes-03.png',
    './assets/slider/viajes-04.png',
    './assets/slider/wallet.png',
    './css/bootstrap.css',
    './css/font-awesome/all.css',
    '.js/app.js',
    './js/bootstrap.js',
    './js/font-awesome/all.js',
    './index.html',
    './login.html',
    './servicios.html',
    './simple-compras.html',
    './simple-cuenta.html',
    './simple-delivery.html',
    './simple-pagos.html',
    './simple-viajes-conductor.html',
    './simple-viajes-usuario.html',
    './simple-viajes.html',
    './simple-wallet.html',
    './sobre-nosotros.html',
  ]

//Fase de instalación
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//Busca los recursos para funcionar sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]
  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})

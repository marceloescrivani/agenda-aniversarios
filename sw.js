const CACHE_NAME = 'aniversarios-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalação do Service Worker e Cache dos arquivos estáticos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercepta as requisições para carregar rápido mesmo com conexão instável
self.addEventListener('fetch', (e) => {
  // Se for chamada para a API do Google Apps Script, não busca no cache
  if (e.request.url.includes('script.google.com')) {
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
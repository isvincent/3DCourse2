const PREFIX='aigc-original-enhanced:'+self.registration.scope;
const CACHE=PREFIX+'v1.0.0';
const BASE=new URL('./',self.location.href).href;
const FILES=['./','./index.html','./assets/enhance.css','./assets/enhance.js','./assets/supplement.js','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./assets/icon-maskable-512.png','./vendor/three.min.js','./vendor/tailwind.js','./vendor/all.min.css','./vendor/webfonts/fa-solid-900.woff2','./vendor/webfonts/fa-regular-400.woff2','./vendor/webfonts/fa-brands-400.woff2','./vendor/webfonts/fa-v4compatibility.woff2'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!e.request.url.startsWith(BASE))return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).catch(err=>{if(e.request.mode==='navigate')return caches.match(new URL('./index.html',BASE).href);throw err;})));});

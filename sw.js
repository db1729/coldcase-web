/* coldcase-web service worker — build 20260917044252 */
const CACHE = "coldcase-20260917044252";
const BASE = "/coldcase-web";
const PRECACHE = ["/coldcase-web/404.html","/coldcase-web/_next/static/5w3uEJZMS2-62AIY9eaCO/_buildManifest.js","/coldcase-web/_next/static/5w3uEJZMS2-62AIY9eaCO/_clientMiddlewareManifest.js","/coldcase-web/_next/static/5w3uEJZMS2-62AIY9eaCO/_ssgManifest.js","/coldcase-web/_next/static/chunks/03x25wf96tfv9.js","/coldcase-web/_next/static/chunks/05qfw986pzonj.js","/coldcase-web/_next/static/chunks/0cz1d0mv5g_q7.js","/coldcase-web/_next/static/chunks/0kmr1ofzguxb3.js","/coldcase-web/_next/static/chunks/11m63jz24yo9y.css","/coldcase-web/_next/static/chunks/18i5e2zukby2c.js","/coldcase-web/_next/static/chunks/19mx3mg6lkumu.js","/coldcase-web/_next/static/chunks/23mm7ohzs3q66.js","/coldcase-web/_next/static/chunks/27t_qfc-3_lzs.js","/coldcase-web/_next/static/chunks/2zfok4ingqhzm.js","/coldcase-web/_next/static/chunks/310vm2bl3xxpt.js","/coldcase-web/_next/static/chunks/37tnrla8i-kqj.js","/coldcase-web/_next/static/chunks/3fntmmi971322.js","/coldcase-web/_next/static/chunks/3gcrgfefxpt3g.js","/coldcase-web/_next/static/chunks/turbopack-2tqybmjfpixp3.js","/coldcase-web/_not-found/","/coldcase-web/about/","/coldcase-web/account/","/coldcase-web/episodes/border-road-red-suv/","/coldcase-web/episodes/border-road-red-suv/quiz/","/coldcase-web/episodes/cheongrim-thirty-hours/","/coldcase-web/episodes/cheongrim-thirty-hours/quiz/","/coldcase-web/episodes/cheongsan-last-week/","/coldcase-web/episodes/cheongsan-last-week/quiz/","/coldcase-web/episodes/gaon-terminal-key/","/coldcase-web/episodes/gaon-terminal-key/quiz/","/coldcase-web/episodes/hajin-river-unknown/","/coldcase-web/episodes/hajin-river-unknown/quiz/","/coldcase-web/icons/apple-touch-icon.png","/coldcase-web/icons/favicon-64.png","/coldcase-web/icons/icon-192.png","/coldcase-web/icons/icon-512-maskable.png","/coldcase-web/icons/icon-512.png","/coldcase-web/","/coldcase-web/manifest.webmanifest","/coldcase-web/privacy/","/coldcase-web/stats/","/coldcase-web/support/","/coldcase-web/terms/"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Supabase 등 외부는 건드리지 않는다
  if (!url.pathname.startsWith(BASE + "/")) return;
  if (req.mode === "navigate") {
    // 페이지: 네트워크 우선, 실패 시 캐시(오프라인)
    e.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match(BASE + "/", { ignoreSearch: true }))));
    return;
  }
  // 정적 자원: 캐시 우선, 없으면 네트워크 후 저장
  e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })));
});

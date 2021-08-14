export type {};
declare const self: ServiceWorkerGlobalScope

const staticCacheName = 's-cache-v1'


self.addEventListener('activate', async event => {
  const cacheNames =  await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', (evt) => {
  evt.respondWith(cacheFirst(evt.request))
})

const cacheFirst = async (req: Request) => {
  const cached = await caches.match(req)
  return cached ?? await fetch(req).then(res => {
    console.log(res.body.getReader())
    const copy = res.clone()
    caches.open(staticCacheName).then(cache => cache.put(req, copy))
    return res
  })
}



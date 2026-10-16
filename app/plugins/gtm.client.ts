export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const id = config.public.gtmId;
  if (!id) return;

  // Insert GTM script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(script);

  // Insert dataLayer and noscript fallback
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });

  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
     height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.appendChild(noscript);

  // Optionally track route changes for page-views:
  const router = useRouter();
  router.afterEach((to) => {
    (window as any).dataLayer.push({
      event: 'pageview',
      page_path: to.fullPath,
      page_title: document.title
    });
  });
});

import InfiniteLoading from "v3-infinite-loading/lib/v3-infinite-loading.es.js";
import "v3-infinite-loading/lib/style.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("infinite-loading", InfiniteLoading);
  nuxtApp.vueApp.component("InfiniteLoading", InfiniteLoading);
});
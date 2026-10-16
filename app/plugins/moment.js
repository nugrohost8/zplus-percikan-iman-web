import moment from 'moment';
import 'moment/dist/locale/id';
moment.locale('id');
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('moment', moment);
});
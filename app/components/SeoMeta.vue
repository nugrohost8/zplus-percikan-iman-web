<!-- components/SeoMeta.vue -->
 <template>
  <div></div>
 </template>
 
 <script>
 export default {
 
 }
 </script>
 
 <style>
 
 </style>
<script setup>
const props = defineProps({
  title: String,
  description: String,
  image: String,
  url: String,
  sitename: {
    type: String,
    default: 'Zplus'
  },
  type: {
    type: String,
    default: 'website' // or 'article'
  }
})
const pageTitle = computed(() => props.title ? `${props.title} | ${props.sitename}` : props.sitename)

useHead(() => ({
  title: pageTitle.value,
  meta: [
    // Basic Meta
    { hid: 'description', name: 'description', content: props.description,tagPriority:'high' },
    
    // Open Graph
    { hid: 'og:title', property: 'og:title', content: props.title,tagPriority:'critical' },
    { hid: 'og:description', property: 'og:description', content: props.description,tagPriority:'high' },
    { hid: 'og:type', property: 'og:type', content: props.type,tagPriority:'high' },
    { hid: 'og:site_name', property: 'og:site_name', content: props.sitename,tagPriority:'high' },
    props.url ? { hid: 'og:url', property: 'og:url', content: props.url,tagPriority:'high' } : null,
    props.image ? { hid: 'og:image', property: 'og:image', content: props.image,tagPriority:'high' } : null,

    // Twitter
    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
    { hid: 'twitter:title', name: 'twitter:title', content: props.title },
    { hid: 'twitter:description', name: 'twitter:description', content: props.description },
    props.image ? { hid: 'twitter:image', name: 'twitter:image', content: props.image } : null
  ].filter(Boolean) // remove nulls
}))
</script>

export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter();
    router.beforeEach((to, from, next) => {
        const ref =from.query.referral;
        if(ref !== undefined){
            to.query.referral = ref;
        }
        next();
    })
   
  });

<template>
  <div class="bottom-bar d-flex justify-content-center">
    <div class="page border-top-grey-1">
    <nav class="navbar navbar-dark bg-white navbar-expand p-1 border-top-1" id="bottom-bar">
      <ul class="navbar-nav nav-justified w-100">
        <li class="nav-item bottom-nav-item bottom-nav-title flex-grow-1" :class="{ navActive : currentPage == 'home'}" >
          <button :to="'/'" class="nav-link px-0 text-center nav-bottom" :class="page == 'home' ? 'active' : 'text-color-black'" @click="navigateTo('home')">
            <div class="text-center">
                <i class='bx bx-home-circle text-32' :class="{'text-main':currentPage == 'home'}" ></i>
              <div class="text-xs nav-title text-half-bl">Home</div>
            </div>
          </button>
        </li>
        <li class="nav-item bottom-nav-item bottom-nav-title flex-grow-1-5" :class="{navActive : currentPage == 'kalkulator'}">
          <button :to="'/kalkulator-zakat'" class="nav-link px-0 text-center nav-bottom" :class="page == 'kalkulator' ? 'active' : 'text-color-black'" @click="navigateTo('kalkulator')">
            <div class="text-center">
              <i class='bx bx-calculator text-32' :class="{'text-main':currentPage == 'kalkulator'}"></i>
              <div class="text-xs nav-title text-half-bl">Kalkulator Zakat</div>
            </div>
          </button>
        </li>
        <li class="nav-item bottom-nav-item bottom-nav-title flex-grow-1-5" :class="{navActive : currentPage == 'zakat'}">
          <button :to="'/zakat'" class="nav-link px-0 text-center nav-bottom position-relative" :class="page == 'zakat' ? 'active' : 'text-color-black'" @click="navigateTo('zakat')">
            <div class="home-icon d-flex justify-content-center">
              <div class="arc">
                <nuxt-img src="/favicon.png" preload loading="lazy" />
                <!-- <SvgHeart class="heart bottom-icon-center"/> -->
              </div>
            </div>
            <div class="text-center text-xs nav-title text-half-bl">Zakat</div>
        </button>
        </li>
        <li class="nav-item bottom-nav-item bottom-nav-title flex-grow-1-5" :class="{navActive : currentPage == 'program'}">
          <button :to="'/program'" class="nav-link px-0 text-center nav-bottom" :class="page == 'program' ? 'active' : 'text-color-black'" @click="navigateTo('program')">
            <div class="text-center">
              <i class='bx bx-list-check text-32' :class="{'text-main':currentPage == 'program'}"></i>
              <div class="text-xs nav-title text-half-bl">Program</div>
            </div>
          </button>
        </li>
        <li class="nav-item bottom-nav-item bottom-nav-title flex-grow-1" :class="{navActive : currentPage == 'profile'}">
          <button :to="'/profile'" class="nav-link px-0 text-center nav-bottom" :class="page == 'profile' ? 'active' : 'text-color-black'"  @click="navigateTo('profile')">
            <div class="text-center">
              <i class='bx bx-user text-32' :class="{'text-main':currentPage == 'profile'}"></i>
              <div class="text-xs nav-title text-half-bl">Profile</div>
            </div>
          </button>
        </li>
      
      </ul>
    </nav>
  </div>
</div>
</template>
 
<script setup>
 
  const props = defineProps({
    page: {
      type: String,
      required: true,
    },
  });
  const router = useRouter();
  const { page } = props;
  const currentPage = ref('');
  const navigateTo = (visited)=>{
    currentPage.value = visited;
    if(visited == 'home'){
      router.push({
        path:'/'
      })
    }else if(visited == 'kalkulator'){
      router.push({
        path:'/kalkulator-zakat'
      })
    }else{
      router.push({
      path:'/'+visited
    })
    }
  }
  onMounted(()=>{
    currentPage.value = page;
  })
</script>

<style>

</style>
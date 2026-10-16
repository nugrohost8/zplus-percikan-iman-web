import { defineStore } from "pinia";

export const useZakatStore = defineStore('zakat', {
  state: () => {
    return {
      hargaEmas: 0,
      zakat:null,
      currentZakat:0
    };
  },
  getters: {
    getHargaEmas: (state) => {
      return state.hargaEmas
    },
    getZakat :(state)=>{
      return state.zakat
    }
  },
  actions: {
    setHargaEmas(value) {
      this.hargaEmas = value;
    },
    setZakat(value){
      this.zakat = value
    },
    setCurrentZakat(val){
      this.currentZakat = val;
    },
    clearZakat(){
      this.zakat = null
    }
    
  },
  persist:true

})
import { defineStore } from "pinia";

export const useArtikelStore = defineStore('artikel', {
  state: () => {
    return {
        previousState:null,
        artikels:[],
        hasNextPage:false,
        currentPage:1
    };
  },
  getters: {
    getPrevState: (state) => {
      return state.previousState
    },
    listArtikel:(state)=>{
        return state.artikels;
    },
    getCurrentPage:(state)=>{
      return state.currentPage;
    },
    getHasNextPage:(state)=>{
      return state.hasNextPage;
    }
  },
  actions: {
    setPrevState(value) {
      this.previousState = value;
    },
    setArtikels(value){
        this.artikels = value;
    },
    setHasNextPage(hasPage){
        this.hasNextPage = hasPage;
    },
    setCurrentPage(page){
        this.currentPage = page;
    }
  },

})
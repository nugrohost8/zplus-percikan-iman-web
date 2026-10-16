import { defineStore } from "pinia";

export const usePrevStateStore = defineStore('prevstate', {
  state: () => {
    return {
      previousState:null,
      data:[],
      curentPage:1,
      hasNextPage:true
    };
  },
  getters: {
    getPrevState: (state) => {
      return state.previousState
    },
    getData:(state)=>{
      return state.data;
    },
    getCurrentPage:(state)=>{
      return state.curentPage;
    },
    getHasNextPage:(state)=>{
      return state.hasNextPage;
    }
  },
  actions: {
    setPrevState(value) {
      this.previousState = value;
    },
    setData(value){
      this.data = value;
    },
    setCurrentPage(page){
      this.curentPage = page;
    },
    setHasNextPage(hasPage){
      this.hasNextPage = hasPage;
    }
  },

})
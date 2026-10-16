import { defineStore } from "pinia";

export const useCampaignStore = defineStore('campaign', {
  state: () => {
    return {
        pi_primary_campaign: null,
        pi_pembaharuans:[]
    };
  },
  getters: {
    primaryCampaign: (state) => {
      return state.pi_primary_campaign
    },
    listPembaharuans:(state)=>{
        return state.pi_pembaharuans;
    }
  },
  actions: {
    setPrimaryCampaign(campaign) {
      this.pi_primary_campaign = campaign;
    },
    removePrimaryCampaign(){
        this.pi_primary_campaign = null;
    },
    setPembaharuans(pembaharuans){
        this.pi_pembaharuans = pembaharuans;
    }
  },
  persist: true,
})
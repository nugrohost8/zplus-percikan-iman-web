import { defineStore } from "pinia";

export const useDonaturStore = defineStore('donatur', {
  state: () => {
    return {
      donatur: {},
    };
  },
  getters: {
    donaturObj: (state) => {
      return state.donatur
  },
  },
  actions: {
    setId(item) {
      this.donatur.id = item;
    },
    setName(item) {
      this.donatur.name = item;
    },
    setTelp(item) {
        this.donatur.telp = item;
      },
    setEmail(item) {
      this.donatur.email = item;
    },
    setAlamat(item) {
      this.donatur.alamat = item;
    },
    setNpwp(item) {
      this.donatur.npwp = item;
    },
    setJenisKelamin(item) {
      this.donatur.jenis_kelamin = item;
    },
  },
  persist: true,
})
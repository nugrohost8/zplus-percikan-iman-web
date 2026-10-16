import { defineStore } from "pinia";
//import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cart: [],
      payment:null,
      currentCart:null,
    };
  },
  getters: {
    listOfCart: (state) => {
        return state.cart
    },
    totalDonasi:(state)=>{
        let total = 0;
        state.cart.forEach(cart=>{
          if('total_nominal' in cart){
            total += parseInt(cart.total_nominal);
          }
        })
        return total;
    },
    getCurrentCart:(state)=>{
      return state.currentCart
    },
    getPayment:(state)=>{
      return state.payment;
    }
  },
  actions: {
    addToCart(item) {
      
      this.cart.push({ ...item })
    },
    updateCart(item){
      this.cart.forEach(itm=>{
        if(itm.id == item.id){
          itm = item;
          //itm.nominal = item.nominal;
          //itm.quantity= item.quantity;
        }
      })
    },
    addQuantity(item){
      this.cart.forEach(itm=>{
        if(itm.campaign_id == item.campaign_id && itm.nominal == item.nominal){
          itm.quantity += 1;
          itm.jumlah_paket += 1;
          itm.total_nominal = parseInt(itm.nominal) * itm.jumlah_paket;
        }
      })
    },
    removeItem(id){
      this.cart = this.cart.filter(itm=>{
        return itm.id !== id;
      });
    },
    setPayment(item){
      this.payment = item;
    },
    emptyCart(){
      this.cart = [];
    },
    containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
          if (list[i].id === obj.id) {
              return true;
          }
        }
        return false;
    },
    isSameCart(item){
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].campaign_id === item.campaign_id && this.cart[i].nominal === item.nominal) {
            return true;
        }
      }
      return false;
    },
    setCurrentCart(item){
      this.currentCart = item;
    },
    setNamaPequrban(name){
      this.getCurrentCart.nama_pequrban = name;
    },
    getCartById(id){
      return this.listOfCart.find(itm=>itm.id == id);
    }


  },
  
  persist: true,
})
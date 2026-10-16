<template>
  <div>
    <input type="text" class="text-right" style="z-index:-99999;height:0px;border:none;color:transparent;position:relative;" :value="transaction.va_number" ref="copyVA">
    <div class="card-modal">
        <div class="card-body w-100">
            <div class="d-flex justify-content-between">
              <span><strong>{{ $t('pembayaran.nomor_va')}}</strong></span>
              <div>
                <span><strong>{{transaction.va_number}}</strong></span>
                <button class="btn px-0" @click="vaToCopy"><i class="far fa-copy fs-4"></i></button>
                <div v-if="successCopyVA" class="small text-muted text-right">{{ $t('pembayaran.va_berhasil_disalin') }}</div>
              </div>
            </div>
        </div>
    </div>
    <div class="card-modal my-3" scrollable>
      <b-tabs
        content-class="decoration-none d-flex justify-content-around"
        active-nav-item-class="font-weight-bold text-primary"
      >

    <!-- VA BANK DKI -->
        <b-tab title="BANK DKI">
          <div class="content-table scroll">
            <table class="table">
              <tbody>
                <tr>
                  <td class="table-row table-numeric text-body">
                    1
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-02"></i>
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_atm_dki1') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    2
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-02"></i>
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_atm_dki2') }}</span>
                </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    3
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-05"></i>
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_atm_dki3') }} (<strong>{{transaction.va_number}}</strong>)</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    4
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-05"></i>
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_atm_dki4') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    5
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-07"></i>
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_atm_dki5') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    6
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-07"></i>
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_atm_dki6') }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-tab>

        <!-- Bank Lain -->
        <b-tab title="Bank Lain">
          <div class="content-table scroll">
            <table class="table">
              <tbody>
                <tr>
                  <td class="table-row table-numeric text-body">
                    1
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_atm_dki_lain1') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    2
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_atm_dki_lain2') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    3
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_atm_dki_lain3') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    4
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_atm_dki_lain41') }} <strong>{{ $helper.formatRp(transaction.gross_amount)}}</strong>, 
                      {{ $t('pembayaran.langkah_atm_dki_lain42') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    5
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_atm_dki_lain5') }} ( <strong>{{transaction.va_number}}</strong> )</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    6
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_atm_dki_lain6') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    7
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_atm_dki_lain7') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    8
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_atm_dki_lain8') }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-tab>

        <!-- JAKONE Mobile -->
        <b-tab title="JAKONE Mobile">
          <div class="content-table scroll">
            <table class="table">
              <tbody>
                <tr>
                  <td class="table-row table-numeric text-body">
                      1
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_jakone1') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                      2
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_jakone2') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                      3
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_jakone3') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                      4
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_jakone4') }} (<strong>{{transaction.va_number}}</strong>)</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                      5
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_jakone5') }} <strong>{{ $helper.formatRp(transaction.gross_amount)}}</strong></span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                      6
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_jakone6') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                      7
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_jakone7') }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    transaction:Object
  },
  data(){
    return {
      successCopyVA:false,
    }
  },
  methods : {
    vaToCopy() {
      let copy = this.$refs.copyVA
      copy.select()
      document.execCommand("copy");
      this.successCopyVA = true
    }
  }
}
</script>

<style>

</style>
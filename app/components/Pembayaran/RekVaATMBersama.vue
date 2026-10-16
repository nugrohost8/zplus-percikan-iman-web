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
    <div class="card-modal my-3">
      <b-tabs
        content-class="decoration-none d-flex justify-content-around"
        active-nav-item-class="font-weight-bold text-primary"
      >

        <!-- ATM BCA -->
        <b-tab title="ATM Bersama">
          <div class="content-table scroll">
            <table class="table">
              <tbody>
                <tr>
                  <td class="table-row table-numeric text-body">
                    1
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-01"></i>
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_atm_bersama1') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    2
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-01"></i>
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_atm_bersama2') }}</span>
                </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    3
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-02"></i>
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_atm_bersama3') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    4
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-02"></i>
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_atm_bersama4') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    5
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-04"></i>
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_atm_bersama5') }} <strong>{{transaction.va_number}}</strong></span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    6
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-06"></i>
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_atm_bersama6') }} <strong>{{ $helper.formatRp(transaction.gross_amount)}}</strong></span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    7
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-07"></i>
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_atm_bersama7') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    8
                  </td>
                  <td class="table-row table-img">
                    <i class="va-sprite va-en bni-08"></i>
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_atm_bersama8') }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-tab>

        <!-- BCA Mobile -->
        <b-tab title="Mobile BCA">
          <div class="content-table scroll">
            <table class="table">
              <tbody>
                <tr>
                  <td class="table-row table-numeric text-body">
                    1
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mbca_bersama1') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    2
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mbca_bersama2') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    3
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mbca_bersama3') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    4
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mbca_bersama41') }} <strong>{{transaction.va_number}}</strong> 
                      {{ $t('pembayaran.langkah_mbca_bersama42') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    5
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mbca_bersama5') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    6
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mbca_bersama6') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    7
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mbca_bersama7') }} <strong>{{ $helper.formatRp(transaction.gross_amount)}}</strong></span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    8
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mbca_bersama8') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    9
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mbca_bersama9') }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-tab>

        <!-- Permata Mobile -->
        <b-tab title="Mobile Permata">
          <div class="content-table scroll">
            <table class="table">
              <tbody>
                <tr>
                  <td class="table-row table-numeric text-body">
                    1
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mpermata_bersama1') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    2
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mpermata_bersama2') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    3
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mpermata_bersama3') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    4
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mpermata_bersama41') }} <strong>{{transaction.va_number}}</strong> 
                        {{ $t('pembayaran.langkah_mpermata_bersama42') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    5
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mpermata_bersama5') }} <strong>{{ $helper.formatRp(transaction.gross_amount)}}</strong></span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    6
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mpermata_bersama6') }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-tab>

        <!-- BRI Mobile -->
        <b-tab title="Mobile BRI">
          <div class="content-table scroll">
            <table class="table">
              <tbody>
                <tr>
                  <td class="table-row table-numeric text-body">
                    1
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mbri_bersama1') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    2
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mbri_bersama2') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    3
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mbri_bersama3') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    4
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mbri_bersama4') }} <strong>{{transaction.va_number}}</strong></span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    5
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mbri_bersama5') }} <strong>{{ $helper.formatRp(transaction.gross_amount)}}</strong></span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    6
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mbri_bersama6') }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-tab>

        <!-- Mandiri Mobile -->
        <b-tab title="Mobile Mandiri">
          <div class="content-table scroll">
            <table class="table">
              <tbody>
                <tr>
                  <td class="table-row table-numeric text-body">
                    1
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mandiri_bersama1') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    2
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mandiri_bersama2') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    3
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mandiri_bersama3') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    4
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mandiri_bersama4') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    5
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mandiri_bersama51') }} <strong>{{transaction.va_number}}</strong>
                    {{ $t('pembayaran.langkah_mandiri_bersama52') }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    6
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mandiri_bersama6') }} <strong>{{ $helper.formatRp(transaction.gross_amount)}}</strong></span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    7
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mandiri_bersama7') }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-tab>

        <!-- BNI Mobile -->
        <b-tab title="Mobile BNI">
          <div class="content-table scroll">
            <table class="table">
              <tbody>
                <tr>
                  <td class="table-row table-numeric text-body">
                    1
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mbni_bersama1') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    2
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mbni_bersama2') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    3
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mbni_bersama3') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    4
                  </td>
                  <td class="table-row text-body">
                      <span>{{ $t('pembayaran.langkah_mbni_bersama4') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    5
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mbni_bersama5') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    6
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mbni_bersama61') }} <strong>{{transaction.va_number}}</strong> 
                    {{ $t('pembayaran.langkah_mbni_bersama62') }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    7
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mbni_bersama7') }} <strong>{{ $helper.formatRp(transaction.gross_amount)}}</strong></span>
                  </td>
                </tr>
                <tr>
                  <td class="table-row table-numeric text-body">
                    8
                  </td>
                  <td class="table-row text-body">
                    <span>{{ $t('pembayaran.langkah_mbni_bersama8') }}</span>
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
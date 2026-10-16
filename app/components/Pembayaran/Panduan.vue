<template>
    <div class="p-3">
        <PembayaranRekVaBCA :t="textPanduan" :transaction="transaction" v-if="paymentCode == 'VIRTUAL_ACCOUNT_BCA'" />
        <PembayaranRekVaBNI :t="textPanduan" :transaction="transaction" v-if="paymentCode == 'VIRTUAL_ACCOUNT_BNI'" />
        <PembayaranRekVaBSI :t="textPanduan" :transaction="transaction" v-if="paymentCode == 'VIRTUAL_ACCOUNT_BSI'" />
        <PembayaranRekVaBri :t="textPanduan" :transaction="transaction" v-if="paymentCode == 'VIRTUAL_ACCOUNT_BRI'" />
        <PembayaranRekVaMandiri :t="textPanduan" :transaction="transaction" v-if="paymentCode == 'VIRTUAL_ACCOUNT_BANK_MANDIRI'" />
        <PembayaranRekVaPermata :t="textPanduan" :transaction="transaction" v-if="paymentCode == 'VIRTUAL_ACCOUNT_BANK_PERMATA'" />
        <PembayaranRekBnc :t="textPanduan" :transaction="transaction" v-if="paymentCode == 'VIRTUAL_ACCOUNT_BNC'" />
        <PembayaranRekVaDanamon :t="textPanduan" :transaction="transaction" v-if="paymentCode == 'VIRTUAL_ACCOUNT_BANK_DANAMON'" />
        <PembayaranRekVaSinarmas :t="textPanduan" :transaction="transaction" v-if="paymentCode == 'VIRTUAL_ACCOUNT_SINARMAS'" />
        <PembayaranRekVaCimb :t="textPanduan" :transaction="transaction" v-if="paymentCode == 'VIRTUAL_ACCOUNT_BANK_CIMB'" />
        <PembayaranRekVaMaybank :t="textPanduan" :transaction="transaction" v-if="paymentCode == 'VIRTUAL_ACCOUNT_MAYBANK'" />
        <PembayaranRekVaBjb :t="textPanduan" :transaction="transaction" v-if="paymentCode == 'VIRTUAL_ACCOUNT_BJB'" />
        <PembayaranRekGopay :t="textPanduan" :transaction="transaction" v-if="paymentCode == 'ID_GOPAY'" />
    </div>
</template>

<script setup>
    const props = defineProps({
        paymentCode:String,
        transaction:Object
    })

    const textPanduan = {
        cara_bayar:'Cara Pembayaran',
        langkah_gopay11:'Buka aplikasi',
        langkah_gopay12:'atau',
        langkah_gopay13:'lain Anda.',
        langkah_gopay21:'Pindai',
        langkah_gopay22:'kode QR yang ada pada monitor Anda.',
        langkah_gopay31:'Periksa detail transaksi Anda pada aplikasi, lalu tap tombol',
        langkah_gopay32:'Bayar.',
        langkah_gopay41:'Masukkan',
        langkah_gopay42:'PIN Anda.',
        langkah_gopay5:'Transaksi Anda telah selesai.',

        langkah_atm_bni11:'Pada menu utama, pilih',
        langkah_atm_bni12:'Menu lainnya.',
        langkah_atm_bni21:'Pilih',
        langkah_atm_bni22:'Transfer.',
        langkah_atm_bni31:'Pilih',
        langkah_atm_bni32:'Rekening Tabungan.',
        langkah_atm_bni41:'Pilih',
        langkah_atm_bni42:'Ke Rekening BNI.',
        langkah_atm_bni51:'Masukkan nomor virtual account',
        langkah_atm_bni52:'kemudian tekan jika benar.',
        langkah_atm_bni61:'Masukkan jumlah tagihan yang akan anda bayar secara lengkap',
        langkah_atm_bni62:'Pembayaran dengan jumlah tidak sesuai akan otomatis ditolak.',
        langkah_atm_bni7:'Jumlah yang dibayarkan, nomor rekening dan nama Merchant akan ditampilkan. Jika informasi telah sesuai, tekan Ya.',
        langkah_atm_bni8:'Transaksi Anda sudah selesai.',

        langkah_ib_bni11:'Ketik alamat https://ibank.bni.co.id',
        langkah_ib_bni12:'kemudian klik Masuk.',
        langkah_ib_bni21:'Silakan masukkan',
        langkah_ib_bni22:'User ID dan Password.',
        langkah_ib_bni31:'Klik menu',
        langkah_ib_bni32:'Transfer',
        langkah_ib_bni33:'kemudian pilih Tambah Rekening Favorit.',
        langkah_ib_bni41:'Masukkan nama, nomor rekening, dan email, lalu klik Lanjut.',
        langkah_ib_bni51:'Masukkan Kode Otentikasi',
        langkah_ib_bni52:'dari token Anda dan klik Lanjut.',
        langkah_ib_bni61:'Kembali ke menu utama dan pilih Transfer lalu',
        langkah_ib_bni62:'Transfer Antar Rekening BNI.',
        langkah_ib_bni71:'Pilih rekening yang telah Anda favoritkan sebelumnya di',
        langkah_ib_bni72:'Rekening Tujuan',
        langkah_ib_bni73:'lalu lanjutkan pengisian, dan tekan Lanjut.',
        langkah_ib_bni81:'Pastikan detail transaksi Anda benar, lalu masukkan',
        langkah_ib_bni82:'Kode Otentikasi dan tekan Lanjut.',

        langkah_mb_bni1:'Buka aplikasi BNI Mobile Banking dan login',
        langkah_mb_bni2:'Pilih menu Transfer',
        langkah_mb_bni3:'Pilih menu Virtual Account Billing',
        langkah_mb_bni4:'Pilih rekening debit yang akan digunakan',
        langkah_mb_bni5:'Pilih menu Input Baru dan masukkan 16 digit nomor Virtual Account,',
        langkah_mb_bni6:'Informasi tagihan akan muncul pada halaman validasi',
        langkah_mb_bni7:'Jika informasi telah sesuai, masukkan Password Transaksi dan klik Lanjut',
        langkah_mb_bni8:'Transaksi Anda akan diproses',

        langkah_permata11:'Pada menu utama, pilih',
        langkah_permata12:'Transaksi Lainnya.',
        langkah_permata2:'Pilih Pembayaran.',
        langkah_permata3:'Pilih Pembayaran Lainnya.',
        langkah_permata4:'Pilih Virtual Account.',
        langkah_permata5:'Masukkan 16 digit No. Virtual Account yang dituju,',
        langkah_permata6:'Pada halaman konfirmasi transfer akan muncul jumlah yang dibayarkan, nomor rekening, & nama Merchant. Jika informasi telah sesuai tekan Benar.',
        langkah_permata7:'Pilih rekening pembayaran Anda dan tekan Benar.',

        langkah_atm_mandiri1:'Masukkan Kartu ATM Mandiri, lalu pilih Bahasa',
        langkah_atm_mandiri2:'Masukkan PIN ATM',
        langkah_atm_mandiri3:'Pilih menu "Bayar/Beli"',
        langkah_atm_mandiri4:'Pilih menu "Lainnya"',
        langkah_atm_mandiri5:'Kemudian tekan kembali "Lainnya"',
        langkah_atm_mandiri6:'Pilih menu "Multipayment"',
        langkah_atm_mandiri7:'Masukkan Kode Perusahaan / Institusi "88899", kemudian tekan BENAR',
        langkah_atm_mandiri81:'Masukkan No VA',
        langkah_atm_mandiri82:'secara keseluruhan, lalu masukan nominal',
        langkah_atm_mandiri83:'kemudian tekan Lanjutkan',
        langkah_atm_mandiri9:'Pastikan detail pembayaran sudah sesuai seperti no VA, Jumlah Pembayaran dan detail lainnya',
        langkah_atm_mandiri10:'Konfirmasi pembayaran dan pilih "YA"',
        langkah_atm_mandiri11:'Transaksi selesai. Mohon simpan bukti transaksi',

        langkah_mandiri_livin1:'Login ke Livin',
        langkah_mandiri_livin2:'Pilih menu "Bayar"',
        langkah_mandiri_livin3:'Ketik "DOKU VA Aggregator" atau "88899" pada bagian search',
        langkah_mandiri_livin41:'Masukkan No VA',
        langkah_mandiri_livin42:'secara keseluruhan, lalu masukan nominal',
        langkah_mandiri_livin43:'kemudian tekan Lanjutkan',
        langkah_mandiri_livin5:'Pastikan detail pembayaran sudah sesuai seperti no VA, Jumlah Pembayaran dan detail lainnya',
        langkah_mandiri_livin6:'Pilih Rekening Sumber',
        langkah_mandiri_livin7:'Pilih Lanjut Bayar kemudian masukkan PIN dan konfirmasi',
        langkah_mandiri_livin8:'Transaksi selesai dan simpan resi sebagai bukti transaksi',

        langkah_mandiri_lain1:'Masukkan PIN',
        langkah_mandiri_lain2:'Pilih menu "Transfer"',
        langkah_mandiri_lain3:'Pilih "Ke Rek Bank Lain"',
        langkah_mandiri_lain41:'Masukkan Kode Bank Mandiri 008 dan kode bayar',
        langkah_mandiri_lain42:'sebagai rekening tujuan, kemudian tekan "Benar"',
        langkah_mandiri_lain51:'Masukkan Jumlah pembayaran',
        langkah_mandiri_lain52:'dan pilih "Benar"',
        langkah_mandiri_lain6:'Muncul Layar Konfirmasi Transfer yang berisi Nomor rekening tujuan dan Nama beserta jumlah yang dibayar, jika sudah benar, Tekan "Benar"',
        langkah_mandiri_lain7:'Selesai',

        langkah_atm_bca1:'Masukkan Kartu ATM BCA & PIN',
        langkah_atm_bca2:'Pilih menu Transaksi Lainnya > Transfer > ke Rekening BCA Virtual Account',
        langkah_atm_bca3:'Masukkan kode pembayaran virtual account',
        langkah_atm_bca4:'Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai seperti No VA, Nama, Program dan Total Tagihan',
        langkah_atm_bca5:'Masukkan Jumlah Transfer sesuai dengan Total Tagihan',
        langkah_atm_bca6:'Ikuti instruksi untuk menyelesaikan transaksi',
        langkah_atm_bca7:'Simpan struk transaksi sebagai bukti pembayaran',

        langkah_mobile_bca1:'Lakukan log in pada aplikasi BCA Mobile',
        langkah_mobile_bca2:'Pilih menu m-BCA, kemudian masukkan kode akses m-BCA',
        langkah_mobile_bca3:'Pilih m-Transfer > BCA Virtual Account',
        langkah_mobile_bca4:'Pilih dari Daftar Transfer, atau masukkan kode pembayaran virtual account',
        langkah_mobile_bca5:'Masukkan pin m-BCA',
        langkah_mobile_bca6:'Pembayaran selesai. Simpan notifikasi yang muncul sebagai bukti pembayaran',

        langkah_internet_bca1:'Login pada alamat Internet Banking BCA (https://klikbca.com)',
        langkah_internet_bca2:'Pilih menu Pembayaran Tagihan > Pembayaran > BCA Virtual Account',
        langkah_internet_bca3:'Pada kolom kode bayar, masukkan kode pembayaran virtual account',
        langkah_internet_bca4:'Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai seperti Nomor BCA Virtual Account, Nama Pelanggan dan Jumlah Pembayaran',
        langkah_internet_bca5:'Masukkan password dan mToken',
        langkah_internet_bca6:'Cetak/simpan struk pembayaran BCA Virtual Account sebagai bukti pembayaran',

        langkah_atm_bsi1:'Pilih Menu Payment/ Pembayaran / Pembelian',
        langkah_atm_bsi2:'Pilih Institusi',
        langkah_atm_bsi3:'Masukkan kode institusi 2501 + nomor Virtual Account',
        langkah_atm_bsi4:'Jika sudah benar tekan "Ya"',
        langkah_atm_bsi5:'Konfirmasi kembali semua data, seperti nama dan nominal',
        langkah_atm_bsi6:'Transaksi anda berhasil',

        langkah_mb_bsi1:'Pilih Bayar & Beli',
        langkah_mb_bsi2:'Klik Show More',
        langkah_mb_bsi3:'Pilih Lembaga (pada menu Tagihan & Pembayaran)',
        langkah_mb_bsi41:'Ketik di pencarian',
        langkah_mb_bsi42:'atau',
        langkah_mb_bsi5:'Masukan Customer ID / Payment Code (tanpa disertai angka depan 2501) yang didapat dari web',
        langkah_mb_bsi6:'Bayar',
        langkah_mb_bsi7:'Selesai',

        langkah_atm_bersama1:'Masukan kartu pada mesin ATM',
        langkah_atm_bersama2:'Masukan PIN sebagai kode keamanan',
        langkah_atm_bersama3:'Setelah itu, pilih menu transfer',
        langkah_atm_bersama4:'Jika ada pilih menu “Transfer antar bank”',
        langkah_atm_bersama5:'Pada menu “Masukan Nomor Rekening Tujuan” masukan kode bayar yang telah diinformasikan namun ditambahkan dengan kode Bank “987”, lalu masukkan nomor VA',
        langkah_atm_bersama6:'Masukan jumlah amount pembayaran pada menu “masukan jumlah nominal transfer”',
        langkah_atm_bersama7:'Setelah itu maka akan muncul menu verifikasi, jika sesuai silahkan menekan pilihan “Lanjutkan”',
        langkah_atm_bersama8:'Resi transfer akan keluar, Resi tersebut sebagai pengganti bukti pembayaran yang sah.',

        langkah_mbca_bersama1:'Buka aplikasi Mobile Banking BCA',
        langkah_mbca_bersama2:'Pilih menu m-Transfer',
        langkah_mbca_bersama3:'Pilih daftarkan rekening',
        langkah_mbca_bersama41:'Masukan kode bayar pada kolom nomor rekening',
        langkah_mbca_bersama42:'dan pilih “ATMB Plus” sebagai Bank Tujuan',
        langkah_mbca_bersama5:'Setelah melakukan daftarkan rekening, lalu pilih menu transfer dan pilih menu “Antar Bank”',
        langkah_mbca_bersama6:'Pilih daftar rekening yang telah didaftarkan sebelumnya',
        langkah_mbca_bersama7:'Masukan jumlah tagihan',
        langkah_mbca_bersama8:'Pilih transfer',
        langkah_mbca_bersama9:'Maka Resi Transfer akan muncul dan simpan sebagai pengganti bukti transaksi pembayaran',

        langkah_mpermata_bersama1:'Pilih Menu “Transfer”',
        langkah_mpermata_bersama2:'Pilih menu “Nomor Rekening”',
        langkah_mpermata_bersama3:'Masukan “ATMB Plus” pada Bank Tujuan',
        langkah_mpermata_bersama41:'Masukan Kode Pembayaran',
        langkah_mpermata_bersama42:'pada menu “Nomor Rekening Penerima”',
        langkah_mpermata_bersama5:'Masukan amount nominal pembayaran',
        langkah_mpermata_bersama6:'Maka Resi Transfer akan muncul dan simpan sebagai pengganti bukti transaksi pembayaran',

        langkah_mbri_bersama1:'Masuk ke aplikasi Brimo',
        langkah_mbri_bersama2:'Pilih menu “Transfer”',
        langkah_mbri_bersama3:'Pilih menu “Daftar Baru”',
        langkah_mbri_bersama4:'Masukan kode bayar pada kolom nomor rekening dan masukan “987” atau pilih “ATMB Plus” pada kolom Bank Tujuan, kemudian masukkan nomor Virtual Account',
        langkah_mbri_bersama5:'Masukan nominal pembayaran',
        langkah_mbri_bersama6:'Maka Resi Transfer akan muncul dan simpan sebagai pengganti bukti transaksi pembayaran',

        langkah_mbri1:'BRImo di ponsel Anda dan lakukan login menggunakan username dan password atau sidik jari.',
        langkah_mbri2:'Pilih menu BRIVA pada halaman utama aplikasi.',
        langkah_mbri3:'Klik opsi Tambah Transaksi Baru atau Pembayaran Baru.',
        langkah_mbri4:'Masukkan nomor Virtual Account (BRIVA) tujuan Anda.',
        langkah_mbri5:'Periksa kembali informasi tagihan yang muncul di layar, seperti nama merchant dan jumlah nominal pembayaran.',
        langkah_mbri6:'Pilih sumber dana, lalu klik Bayar atau Lanjutkan.',
        langkah_mbri7:'Masukkan PIN BRImo Anda untuk menyelesaikan transaksi.',

        langkah_atmbri1:'Masukkan kartu debit ATM BRI ke mesin ATM.',
        langkah_atmbri2:'Masukkan PIN ATM Anda.',
        langkah_atmbri3:'Pilih menu Transaksi Lain pada layar.',
        langkah_atmbri4:'Pilih menu Pembayaran, lalu pilih Lainnya.',
        langkah_atmbri5:'Pilih menu BRIVA.Masukkan nomor Virtual Account (BRIVA) Anda.',
        langkah_atmbri6:'Periksa kembali detail pembayaran yang muncul di layar konfirmasi (pastikan nama dan jumlah tagihan sudah sesuai), lalu pilih Ya.',
        langkah_atmbri7:'Selesaikan transaksi dan simpan struk sebagai bukti pembayaran yang',

        langkah_mandiri_bersama1:'Masuk ke aplikasi Livin Mandiri',
        langkah_mandiri_bersama2:'Pilih menu “Transfer”',
        langkah_mandiri_bersama3:'Pilih menu “Transfer ke Penerima Baru”',
        langkah_mandiri_bersama4:'Pilih “ATMB Plus” pada kolom “Nama Bank”',
        langkah_mandiri_bersama51:'Masukan kode bayar',
        langkah_mandiri_bersama52:'sebagai Nomor Rekening',
        langkah_mandiri_bersama6:'Masukan nominal pemabayaran',
        langkah_mandiri_bersama7:'Maka Resi Transfer akan muncul dan simpan sebagai pengganti bukti transaksi pembayaran',

        langkah_mbni_bersama1:'Masuk ke Aplikasi BNI mobile',
        langkah_mbni_bersama2:'Pilih menu “Transfer”',
        langkah_mbni_bersama3:'Pilih menu “Transfer antar Bank”',
        langkah_mbni_bersama4:'Switch pilihan “Input Baru”',
        langkah_mbni_bersama5:'Lalu masukan informasi terkait Pembayaran',
        langkah_mbni_bersama61:'Untuk nomor rekening bisa diisi dengan kode bayar',
        langkah_mbni_bersama62:'dan Bank Tujuan bisa dipilih untuk “ATMB Plus”',
        langkah_mbni_bersama7:'Masukan nominal pembayaran',
        langkah_mbni_bersama8:'Maka Resi Transfer akan muncul dan simpan sebagai pengganti bukti transaksi pembayaran',

        langkah_atm_dki1:'Pilih Menu Payment/ Pembayaran / Pembelian',
        langkah_atm_dki2:'Pilih Menu Virtual Account',
        langkah_atm_dki3:'Masukkan kode institusi 995020 + nomor Virtual Account',
        langkah_atm_dki4:'Masukkan kode pembayaran (boleh dikosongkan)',
        langkah_atm_dki5:'Konfirmasi kembali semua data, seperti nama dan nominal, Jika sudah benar tekan "Ya"',
        langkah_atm_dki6:'Transaksi anda berhasil',

        langkah_atm_dki_lain1:'Pilih Menu Transaksi Lainnya',
        langkah_atm_dki_lain2:'Pilih Menu Transfer ke bank lain',
        langkah_atm_dki_lain3:'Masukkan kode tujuan Bank DKI yaitu 111',
        langkah_atm_dki_lain41:'Input nominal tagihan pokok',
        langkah_atm_dki_lain42:'sudah termasuk biaya admin tambahan Rp. 1.500',
        langkah_atm_dki_lain5:'Masukkan kode institusi 995020 + nomor Virtual Account',
        langkah_atm_dki_lain6:'Pilih jenis rekening yang digunakan',
        langkah_atm_dki_lain7:'Konfirmasi kembali semua data, seperti nama dan nominal, Jika sudah benar tekan "Ya"',
        langkah_atm_dki_lain8:'Transaksi anda berhasil',

        langkah_jakone1:'Buka Aplikasi JAKONE Mobile',
        langkah_jakone2:'Pilih Menu pembayaran',
        langkah_jakone3:'Pilih Virtual Account',
        langkah_jakone4:'Input nomor pelanggan atau kode bayar',
        langkah_jakone5:'Masukkan nominal pembayaran',
        langkah_jakone6:'Masukkan PIN JAKONE dan tekan "Ya"',
        langkah_jakone7:'Transaksi anda berhasil',

        scan_qr:'Scan Kode QR berikut dengan aplikasi Gojek',
        qr_notice:'Harap segera menyelesaikan pembayaran sebelum :',
        bayar_sekarang:'Tunaikan Sekarang',
        lihat_bayar:'Langkah Pembayaran',
        lihat_panduan:'Belum paham cara melakukan pembayaran? tekan tombol dibawah ini',
        sudah_donasi:'Saya Sudah Donasi',
        selanjutnya:'Selanjutnya',
        sudah_bayar:'Saya Sudah Donasi',

        langkah_neo_app1:'Buka dan login ke aplikasi Neobank.',
        langkah_neo_app2:'Pilih menu Transfer → Pembayaran VA (atau Transfer Antar Bank).',
        langkah_neo_app3:'Masukkan Nomor Virtual Account.',
        langkah_neo_app4:'Masukkan nominal tagihan (jika belum terisi otomatis).',
        langkah_neo_app5:'Periksa detail transaksi (Nama Penerima & Nominal).',
        langkah_neo_app6:'Masukkan PIN Neobank Anda untuk menyelesaikan transaksi.',

        langkah_dbank1:'Login ke aplikasi D-Bank PRO.',
        langkah_dbank2:'Pilih menu Pembayaran → Virtual Account.',
        langkah_dbank3:'Pilih rekening sumber, lalu masukkan Nomor Virtual Account.',
        langkah_dbank4:'Detail transaksi akan muncul di layar, pastikan data sesuai.',
        langkah_dbank5:'Konfirmasi pembayaran dan masukkan mPIN D-Bank PRO.',

        langkah_danamon1:'Masukkan kartu ATM dan PIN Danamon Anda.',
        langkah_danamon2:'Pilih Menu Lainnya → Pembayaran → Lainnya → Virtual Account.',
        langkah_danamon3:'Masukkan Nomor Virtual Account, lalu tekan Benar.',
        langkah_danamon4:'Periksa detail konfirmasi pembayaran di layar.',
        langkah_danamon5:'Tekan Ya untuk memproses transaksi.',

        langkah_simobi1:'Buka dan login ke aplikasi SimobiPlus.',
        langkah_simobi2:'Pilih menu Bayar / Beli → Virtual Account.',
        langkah_simobi3:'Masukkan Nomor Virtual Account.',
        langkah_simobi4:'Periksa detail tagihan yang muncul.',
        langkah_simobi5:'Masukkan EasyPIN SimobiPlus Anda untuk konfirmasi.',

        langkah_sinarmas1:'Masukkan kartu ATM dan PIN Sinarmas.',
        langkah_sinarmas2:'Pilih Transaksi Lainnya → Pembayaran → Virtual Account.',
        langkah_sinarmas3:'Masukkan Nomor Virtual Account dan tekan Benar.',
        langkah_sinarmas4:'Periksa layar konfirmasi dan pilih Ya untuk membayar.',

        langkah_octo_mobile1:'Login ke aplikasi OCTO Mobile.',
        langkah_octo_mobile2:'Pilih menu Bayar Tagihan (Bill Payment) → Virtual Account.',
        langkah_octo_mobile3:'Masukkan Nomor Virtual Account.',
        langkah_octo_mobile4:'Nominal dan detail transaksi akan muncul otomatis.',
        langkah_octo_mobile5:'Masukkan PIN OCTO Mobile untuk memproses pembayaran.',

        langkah_cimb1:'Masukkan kartu ATM dan PIN CIMB Niaga.',
        langkah_cimb2:'Pilih Pembayaran → Lanjut → Virtual Account.',
        langkah_cimb3:'Masukkan Nomor Virtual Account.',
        langkah_cimb4:'Periksa detail data transaksi, lalu pilih Proses/OK.',

        langkah_m2u_id1:'Buka aplikasi M2U ID dan login.',
        langkah_m2u_id2:'Pilih menu Transfer → Virtual Account.',
        langkah_m2u_id3:'Masukkan Nomor Virtual Account Maybank.',
        langkah_m2u_id4:'Pastikan nominal dan nama penerima telah sesuai.',
        langkah_m2u_id5:'Konfirmasi pembayaran menggunakan Secure2u / SMS Token.',

        langkah_maybank1:'Masukkan kartu ATM dan PIN Maybank.',
        langkah_maybank2:'Pilih Pembayaran / Pembelian → Virtual Account.',
        langkah_maybank3:'Masukkan Nomor Virtual Account lalu tekan Benar.',
        langkah_maybank4:'Konfirmasi transaksi dengan menekan tombol Ya.',

        langkah_bri1:'Login ke aplikasi BRImo.',
        langkah_bri2:'Pilih menu Tagihan → BRIVA (BRI Virtual Account).',
        langkah_bri3:'Klik Tambah Transaksi Baru, lalu masukkan Nomor BRIVA (Virtual Account).',
        langkah_bri4:'Periksa detail nama dan jumlah tagihan.',
        langkah_bri5:'Klik Bayar dan masukkan PIN BRImo Anda.',

        langkah_atm_bri1:'Masukkan kartu ATM dan PIN BRI.',
        langkah_atm_bri2:'Pilih Transaksi Lain → Pembayaran → Lainnya → BRIVA.',
        langkah_atm_bri3:'Masukkan Nomor BRIVA (Virtual Account) dan tekan Benar.',
        langkah_atm_bri4:'Periksa detail tagihan, lalu tekan Ya untuk membayar.',

        langkah_btn1:'Login ke aplikasi BTN Mobile.',
        langkah_btn2:'Pilih menu Pembayaran → Virtual Account.',
        langkah_btn3:'Masukkan Nomor Virtual Account BTN.',
        langkah_btn4:'Detail transaksi akan muncul pada layar konfirmasi.',
        langkah_btn5:'Masukkan PIN Transaksi BTN Mobile Anda.',

        langkah_bjb1:'Login ke aplikasi DIGI by bank bjb.',
        langkah_bjb2:'Pilih menu Bayar → Virtual Account / BJB VA.',
        langkah_bjb3:'Masukkan Nomor Virtual Account BJB.',
        langkah_bjb4:'Periksa rincian data tagihan yang ditampilkan.',
        langkah_bjb5:'Masukkan PIN Transaksi DIGI Anda.',

        langkah_atm_bjb1:'Masukkan kartu ATM dan PIN BJB.',
        langkah_atm_bjb2:'Pilih Transaksi Lainnya → Pembayaran → Lainnya → Virtual Account.',
        langkah_atm_bjb3:'Masukkan Nomor Virtual Account, lalu tekan Benar.',
        langkah_atm_bjb4:'Periksa detail pembayaran pada layar konfirmasi dan tekan Lanjutkan / Ya.',

        
    }
</script>

<style>
    .tab-panduan-active{
        background-color:var(--green-color);
        color:#fff;
    }
    .tab-panduan-active:hover{
        color:#f8f8f8;
    }
</style>
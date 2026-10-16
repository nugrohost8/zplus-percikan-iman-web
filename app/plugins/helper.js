import 'moment/locale/id';
import {
  useDonaturStore
} from "@/stores/donatur";
export default defineNuxtPlugin((nuxtApp) => {
    return {
      provide: {
        getMeta:(data)=> {
            return [
              { charset: "utf-8" },
              { hid: "viewport",name: "viewport",property: "viewport",content: "width=device-width, initial-scale=1",tagPriority:'high'},
              { hid: "og:type",property: "og:type",content: data.og_type,tagPriority:'high'},
              { hid: "og:url", property: "og:url", content: data.og_url },
              { hid: "og:site_name",property: "og:site_name",content: data.og_site_name,tagPriority:'high'},
              //{ hid: "theme-color", name: "theme-color", content: "#0D9000" },
              { hid: "theme-color", name: "theme-color", property: "theme-color", content: data.theme_color,tagPriority:'high' },
              { hid: "color-scheme", name: "color-scheme", property: "color-scheme",content: "dark light",tagPriority:'high' },
              { hid: "msapplication-TileColor", name: "msapplication-TileColor", property: "msapplication-TileColor", content:data.theme_color, tagPriority:'high'},
              { hid: "msapplication-navbutton-color",name: "msapplication-navbutton-color",property: "msapplication-navbutton-color",content: data.theme_color,tagPriority:'high'},
              { hid: "apple-mobile-web-app-status-bar-style",name: "apple-mobile-web-app-status-bar-style",property: "apple-mobile-web-app-status-bar-style",content: data.theme_color,tagPriority:'high'},
              {
                hid: "keywords",
                name: "keywords",
                property: "keywords",
                content: data.og_keywords,
                tagPriority:'high'
              },
              {
                hid: "description",
                name: "description",
                property: "description",
                content: data.og_description,
                tagPriority:'high'
              },
              {
                hid: "og:description",
                // name: "og:description",
                property: "og:description",
                content: data.og_description,
                tagPriority:'high'
              },
              
              {
                hid: "title",
                name: "title",
                property: "title",
                content: data.og_title,
                tagPriority:'high'
              },
             
              
              
              
              {
                hid: "og:title",
                // name: "og:title",
                property: "og:title",
                content: data.og_title,
                tagPriority:'high'
              },
              {
                hid: "og:locale",
                //name: "og:locale",
                property: "og:locale",
                content: data.og_locale,
                tagPriority:'high'
              },
              {
                hid: "og:image",
                // name: "og:image",
                property: "og:image",
                content: data.og_image
              },
              
             
              { property: "og:image:width", content: "600",tagPriority:'high' },
              { property: "og:image:height", content: "360",tagPriority:'high' },
              {
                hid: "twitter:card",
                name: "twitter:card",
                property: "twitter:card",
                content: "summary_large_image",
                tagPriority:'high'
              },
              {
                hid: "twitter:site",
                name: "twitter:site",
                property: "twitter:site",
                content: data.og_site_name,
                tagPriority:'high'
              },
              {
                hid: "twitter:title",
                name: "twitter:title",
                property: "twitter:title",
                content: data.og_title,
                tagPriority:'high'
              },
              {
                hid: "twitter:description",
                name: "twitter:description",
                property: "twitter:description",
                content: data.og_description,
                tagPriority:'high'
              },
              {
                hid: "twitter:image",
                name: "twitter:image",
                property: "twitter:image",
                content: data.og_image,
                tagPriority:'high'
              },
              {
                hid: "theme-color",
                name: "theme-color",
                property: "theme-color",
                content: data.theme_color,
                tagPriority:'high'
              },
            ];
          },
        getMetaScript:(data)=> {
          return [
            {
              type: 'application/ld+json',
              children: JSON.stringify({
                  '@context': 'http://schema.org',
                  '@type': 'website',
                  'url': data.url,
                  'title': data.title,
                  'description': data.description,
                })
              
            }
          ]
        },
        defaultPaketDonasi:()=>{
          return [
            {
              id:1001,
              nama:'',
              nominal:25000
            },{
              id:1002,
              nama:'',
              nominal:50000
            },{
              id:1003,
              nama:'',
              nominal:75000
            },{
              id:1004,
              nama:'',
              nominal:100000
            }
          ]
        },
        formatRupiah:(value)=>{
          if (value === undefined) {
            return "0"
          }
          return new Intl.NumberFormat("ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
          }).format(value);
        },
        formatNumber:(value)=>{
          if (value === undefined) {
            return "0"
          }
          return new Intl.NumberFormat("ID", {
          }).format(value);
        },
        formatDate(dateStr) {
         
          return new Intl.DateTimeFormat('id', {
           //weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(dateStr));
          
          
        },
        formatDatePicker(date){
            return nuxtApp.$moment(date).format('DD-MM-YYYY');
          },
        formatDateTime(dateStr){
            if(dateStr == ''){
              return '';
            }
            nuxtApp.$moment().local('ID');
            return nuxtApp.$moment(dateStr).format('DD MMMM YYYY HH:mm:ss [WIB]');
        },
        sisaWaktu(campaign) {
          const {$moment} = useNuxtApp();
          if (campaign.end_date == null) {
            return "Tanpa Batas";
          }
          $moment.locale('ID')
          let sisa = $moment(campaign.end_date).diff($moment(), "days");
          
            if (sisa <= 0) {
              return 'Berakhir';
            } else if (sisa > 0 && sisa < 30) {
              return sisa + " hari";
            } else if (sisa >= 30 && sisa < 365) {
              return Math.ceil(sisa / 30) + " bulan";
            } else if (sisa >= 365) {
              return Math.ceil(sisa / 365) + " tahun";
            }
          return "~";
        },
        share(media, urlPath,text=null) {
          let url = process.env.baseAppUrl + urlPath;
          if(text){
            url = text.replaceAll(' ' ,'+') + '&url='+url;
          }
          $shareIt(media, url);
        },
        shareIt(media, url) {
          if (media == "whatsapp") {
            window.open('https://api.whatsapp.com/send?text=' +  encodeURIComponent(url), '_blank');
            //window.open("whatsapp://send?text=" + url, "_blank");
          } else if (media == "facebook") {
            let shareUrl =
              "https://www.facebook.com/sharer/sharer.php?u=" +
              encodeURIComponent(url);
            window.open(shareUrl, "_blank");
          }else if(media == 'twitter'){
              let shareUrl = "https://x.com/intent/post?text=" +encodeURIComponent(url);
              window.open(shareUrl, "_blank");
          }
        },
        getCountries:()=>{
          return [
            [
              'Afghanistan (‫افغانستان‬‎)',
              'af',
              '93',
            ],
            [
              'Albania (Shqipëri)',
              'al',
              '355',
            ],
            [
              'Algeria (‫الجزائر‬‎)',
              'dz',
              '213',
            ],
            
            [
              'Australia',
              'au',
              '61',
            ],
            
            [
              'Azerbaijan (Azərbaycan)',
              'az',
              '994',
            ],
            [
              'Bahrain (‫البحرين‬‎)',
              'bh',
              '973',
            ],
            [
              'Bangladesh (বাংলাদেশ)',
              'bd',
              '880',
            ],
            
            [
              'Bosnia and Herzegovina (Босна и Херцеговина)',
              'ba',
              '387',
            ],
            [
              'Botswana',
              'bw',
              '267',
            ],
            [
              'Brazil (Brasil)',
              'br',
              '55',
            ],
            [
              'Brunei',
              'bn',
              '673',
            ],
            
            [
              'Cambodia (កម្ពុជា)',
              'kh',
              '855',
            ],
            [
              'Cameroon (Cameroun)',
              'cm',
              '237',
            ],
            [
              'Canada',
              'ca',
              '1',
            ],
            
            [
              'Chad (Tchad)',
              'td',
              '235',
            ],
            
            [
              'China (中国)',
              'cn',
              '86',
            ],
            
            [
              'Cuba',
              'cu',
              '53',
            ],
            
            [
              'Denmark (Danmark)',
              'dk',
              '45',
            ],
            
            [
              'Egypt (‫مصر‬‎)',
              'eg',
              '20',
            ],
            
            [
              'Ethiopia',
              'et',
              '251',
            ],
            
            [
              'France',
              'fr',
              '33',
            ],
            
            [
              'Germany (Deutschland)',
              'de',
              '49',
            ],
            
            [
              'Hong Kong (香港)',
              'hk',
              '852',
            ],
            
            [
              'India (भारत)',
              'in',
              '91',
            ],
            [
              'Indonesia',
              'id',
              '62',
            ],
            [
              'Iran (‫ایران‬‎)',
              'ir',
              '98',
            ],
            [
              'Iraq (‫العراق‬‎)',
              'iq',
              '964',
            ],
            
            [
              'Italy (Italia)',
              'it',
              '39',
            ],
            
            [
              'Japan (日本)',
              'jp',
              '81',
            ],
            
            [
              'Jordan (‫الأردن‬‎)',
              'jo',
              '962',
            ],
            [
              'Kazakhstan (Казахстан)',
              'kz',
              '7',
            ],
            [
              'Kenya',
              'ke',
              '254',
            ],
            
            [
              'Kuwait (‫الكويت‬‎)',
              'kw',
              '965',
            ],
            
            [
              'Laos (ລາວ)',
              'la',
              '856',
            ],
            
            [
              'Lebanon (‫لبنان‬‎)',
              'lb',
              '961',
            ],
           
            [
              'Libya (‫ليبيا‬‎)',
              'ly',
              '218',
            ],
            
            [
              'Macau (澳門)',
              'mo',
              '853',
            ],
            
            [
              'Malaysia',
              'my',
              '60',
            ],
            [
              'Maldives',
              'mv',
              '960',
            ],
            [
              'Mali',
              'ml',
              '223',
            ],
            [
              'Malta',
              'mt',
              '356',
            ],
            [
              'Morocco (‫المغرب‬‎)',
              'ma',
              '212',
            ],
            [
              'Myanmar (Burma) (မြန်မာ)',
              'mm',
              '95',
            ],
            [
              'Netherlands (Nederland)',
              'nl',
              '31',
            ],
            [
              'New Zealand',
              'nz',
              '64',
            ],
            [
              'Oman (‫عُمان‬‎)',
              'om',
              '968',
            ],
            [
              'Pakistan (‫پاکستان‬‎)',
              'pk',
              '92',
            ],
            [
              'Palau',
              'pw',
              '680',
            ],
            [
              'Palestine (‫فلسطين‬‎)',
              'ps',
              '970',
            ],
            [
              'Philippines',
              'ph',
              '63',
            ],
            [
              'Qatar (‫قطر‬‎)',
              'qa',
              '974',
            ],
            [
              'Saudi Arabia (‫المملكة العربية السعودية‬‎)',
              'sa',
              '966',
            ],
            [
              'Singapore',
              'sg',
              '65',
            ],
            [
              'South Korea (대한민국)',
              'kr',
              '82',
            ],
            [
              'Switzerland (Schweiz)',
              'ch',
              '41',
            ],
            [
              'Syria (‫سوريا‬‎)',
              'sy',
              '963',
            ],
            [
              'Taiwan (台灣)',
              'tw',
              '886',
            ],
            [
              'Tajikistan',
              'tj',
              '992',
            ],
            [
              'Thailand (ไทย)',
              'th',
              '66',
            ],
            [
              'Timor-Leste',
              'tl',
              '670',
            ],
            [
              'Tunisia (‫تونس‬‎)',
              'tn',
              '216',
            ],
            [
              'Turkey (Türkiye)',
              'tr',
              '90',
            ],
            
            [
              'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
              'ae',
              '971',
            ],
            [
              'United Kingdom',
              'gb',
              '44',
            ],
            [
              'United States',
              'us',
              '1',
            ],
            [
              'Uzbekistan (Oʻzbekiston)',
              'uz',
              '998',
            ],
            [
              'Vietnam (Việt Nam)',
              'vn',
              '84',
            ],
            [
              'Yemen (‫اليمن‬‎)',
              'ye',
              '967',
            ]
          ];
        },
        getShareKonten(title,description,link){
          return `*Kini berbuat baik jauh lebih mudah*

Assalamu'alaikum Warohmatullahi Wabarokatuh

*${nuxtApp.$config.public.appName}* mengajak Anda untuk melakukan amal kebaikan, dengan ikut ambil bagian pada program berikut :

*${title}*
_${description}_

Klik link ini untuk penjelasan detail dan langsung berbagi :
${link}

Semoga Allah swt membalas kebaikan Anda dengan balasan yang berlipat-lipat.

Wassalam,
*${nuxtApp.$config.public.appName}*`;
        },
        sendFbEvents:(eventName,url)=>{
          const config = useRuntimeConfig();
          const donaturStore = useDonaturStore();
          const donatur = donaturStore.donaturObj;
          fetch(`${config.public.baseUrl}fb-send-events`,{
            method:'POST',
            body:{
              event_name:eventName,
              email:donatur?donatur.email :'',
              phone:donatur?donatur.phone :'',
              url:url
            }
          })
        }

      }
    }
  })
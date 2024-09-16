
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  /**
   * @name getAPI
   * @description Returns API link from local storage. API can point to different datacenters.
   * @param {string} api
   */
  const getAPI = () => {

      return localStorage.getItem("API") ? localStorage.getItem("API") : "https://api-eu.kenzap.cloud";
  };

  /**
   * @name initHeader
   * @description Initiates Kenzap Cloud extension header and related scripts. Verifies user sessions, handles SSO, does cloud space navigation, initializes i18n localization. 
   * @param {object} response
   */
  const initHeader = (response) => {

      // cache header from backend
      if(response.header) localStorage.setItem('header', response.header);

      // cache CDN link
      if(response.cdn) localStorage.setItem('cdn', response.cdn);
    
      // load header to html if not present
      if(!document.querySelector("#k-script")){
    
          let child = document.createElement('div');
          child.innerHTML = localStorage.getItem('header');
          child = child.firstChild;
          document.body.prepend(child);
    
          // run header scripts
          Function(document.querySelector("#k-script").innerHTML).call('test');
      }
    
      // load locales if present
      if(response.locale) window.i18n.init(response.locale); 
  };

  /*
   * Translates string based on preloaded i18n locale values.
   * 
   * @param text {String} text to translate
   * @param cb {Function} callback function to escape text variable
   * @param p {String} list of parameters, to be replaced with %1$, %2$..
   * @returns {String} - text
   */
  const __esc = (text, cb, ...p) => {

      let match = (input, pa) => {

          pa.forEach((p, i) => { input = input.replace('%'+(i+1)+'$', p); }); 
          
          return input;
      };

      if(typeof window.i18n === 'undefined') return match(text, p);
      if(window.i18n.state.locale.values[text] === undefined) return match(text, p);

      return match(cb(window.i18n.state.locale.values[text]), p);
  };

  /*
   * Converts special characters `&`, `<`, `>`, `"`, `'` to HTML entities and does translations
   * 
   * @param text {String}  text
   * @returns {String} - text
   */
  const __html = (text, ...p) => {

      text = String(text);

      if(text.length === 0){
  		return '';
  	}

      let cb = (text) => {

          return text.replace(/[&<>'"]/g, tag => (
              {
                  '&': '&amp;',
                  '<': '&lt;',
                  '>': '&gt;',
                  "'": '&apos;',
                  '"': '&quot;'
              } [tag]));
      };

      return __esc(text, cb, ...p);
  };

  /**
   * @name showLoader
   * @description Initiates full screen three dots loader.
   */
  const showLoader = () => {

      let el = document.querySelector(".loader");
      if (el) el.style.display = 'block';
  };

  /**
   * @name hideLoader
   * @description Removes full screen three dots loader.
   */
  const hideLoader = () => {

      let el = document.querySelector(".loader");
      if (el) el.style.display = 'none';
  };

  /**
   * @name link
   * @description Handles Cloud navigation links between extensions and its pages. Takes care of custom url parameters.
   * @param {string} slug - Any inbound link
   * 
   * @returns {string} link - Returns original link with kenzp cloud space ID identifier.
   */
  const link = (slug) => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let sid = urlParams.get('sid') ? urlParams.get('sid') : "";

      let postfix = slug.indexOf('?') == -1 ? '?sid='+sid : '&sid='+sid;

      return slug + postfix;
  };

  /**
   * @name spaceID
   * @description Gets current Kenzap Cloud space ID identifier from the URL.
   * 
   * @returns {string} id - Kenzap Cloud space ID.
   */
   const spaceID = () => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let id = urlParams.get('sid') ? urlParams.get('sid') : "";

      return id;
  };

  /**
   * @name setCookie
   * @description Set cookie by its name to all .kenzap.cloud subdomains
   * @param {string} name - Cookie name.
   * @param {string} value - Cookie value.
   * @param {string} days - Number of days when cookie expires.
   */
   const setCookie = (name, value, days) => {

      let expires = "";
      if (days) {
          let date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = ";expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (escape(value) || "") + expires + ";path=/;domain=.kenzap.cloud"; 
  };

  /**
   * @name getCookie
   * @description Read cookie by its name.
   * @param {string} cname - Cookie name.
   * 
   * @returns {string} value - Cookie value.
   */
  const getCookie = (cname) => {

      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  };

  /**
   * @name checkHeader
   * @description This function tracks UI updates, creates header version checksum and compares it after every page reload
   * @param {object} object - API response.
   */
   const checkHeader = () => {

      let version = (localStorage.hasOwnProperty('header') && localStorage.hasOwnProperty('header-version')) ? localStorage.getItem('header-version') : 0;
      let check = window.location.hostname + '/' + spaceID() + '/' + getCookie('locale');
      if(check != getCookie('check')){ version = 0; console.log('refresh'); }
      
      setCookie('check', check, 5);

      return version
  };

  /**
   * @name headers
   * @description Default headers object for all Kenzap Cloud fetch queries.
   * @param {object} headers
   */
   const H = () => {

      return {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
          'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
          'Kenzap-Header': checkHeader(),
          'Kenzap-Token': getCookie('kenzap_token'),
          'Kenzap-Sid': spaceID()
      }
  };

  /**
   * @name headers
   * @description Default headers object for all Kenzap Cloud fetch queries. 
   * @param {object} headers
   * @deprecated
   */
   ({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
      'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
      'Kenzap-Header': checkHeader(),
      'Kenzap-Token': getCookie('kenzap_token'),
      'Kenzap-Sid': spaceID(),
  });

  /**
   * @name parseApiError
   * @description Set default logics for different API Error responses.
   * @param {object} object - API response.
   */
   const parseApiError = (data) => {

      // outout to frontend console
      console.log(data);

      // unstructured failure
      if(isNaN(data.code)){
      
          // structure failure data
          let log = data;
          try{ log = JSON.stringify(log); }catch(e){ }

          let params = new URLSearchParams();
          params.append("cmd", "report");
          params.append("sid", spaceID());
          params.append("token", getCookie('kenzap_token'));
          params.append("data", log);
          
          // report error
          fetch('https://api-v1.kenzap.cloud/error/', { method: 'post', headers: { 'Accept': 'application/json', 'Content-type': 'application/x-www-form-urlencoded', }, body: params });

          alert('Can not connect to Kenzap Cloud');  
          return;
      }
      
      // handle cloud error codes
      switch(data.code){

          // unauthorized
          case 401:

              // dev mode
              if(window.location.href.indexOf('localhost')!=-1){ 

                  alert(data.reason); 
                  return; 
              }

              // production mode
              location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+encodeURIComponent(window.location.href); break;
          
          // something else
          default:

              alert(data.reason); 
              break;
      }
  };

  /**
   * @name initBreadcrumbs
   * @description Render ui breadcrumbs.
   * @param {array} data - List of link objects containing link text and url. If url is missing then renders breadcrumb as static text. Requires html holder with .bc class.
   */
  const initBreadcrumbs = (data) => {

      let html = '<ol class="breadcrumb mt-2 mb-0">';
      for(let bc of data){
          
          if(typeof(bc.link) === 'undefined'){

              html += `<li class="breadcrumb-item">${ bc.text }</li>`;
          }else {

              html += `<li class="breadcrumb-item"><a href="${ bc.link }">${ bc.text }</a></li>`;
          }
      }
      html += '</ol>';
      
      document.querySelector(".bc").innerHTML = html;
  };

  /**
   * @name onClick
   * @description One row click event listener declaration. Works with one or many HTML selectors.
   * @param {string} sel - HTML selector, id, class, etc.
   * @param {string} fn - callback function fired on click event.
   */
  const onClick = (sel, fn) => {

      if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

          e.removeEventListener('click', fn, true);
          e.addEventListener('click', fn, true);
      }
  };

  /**
   * @name onChange
   * @description One row change event listener declaration. Works with one or many HTML selectors.
   * @param {string} sel - HTML selector, id, class, etc.
   * @param {string} fn - callback function fired on click event.
   */
  const onChange = (sel, fn) => {

      if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

          e.removeEventListener('change', fn, true);
          e.addEventListener('change', fn, true);
      }
  };

  /**
   * @name toast
   * @description Triggers toast notification. Adds toast html to the page if missing.
   * @param {string} text - Toast notification.
   */
   const toast = (text) => {

      // only add once
      if(!document.querySelector(".toast")){

          let html = `
        <div class="toast-cont position-fixed bottom-0 p-2 m-4 end-0 align-items-center" style="z-index:10000;">
            <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
                <div class="d-flex">
                    <div class="toast-body"></div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>`;
          if(document.querySelector('body > div')) document.querySelector('body > div').insertAdjacentHTML('afterend', html);
      }

      let toast = new bootstrap.Toast(document.querySelector('.toast'));
      document.querySelector('.toast .toast-body').innerHTML = text;  
      toast.show();
  };

  var getParam = function getParam(p) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(p) ? urlParams.get(p) : "";
  };
  var formatTime = function formatTime(timestamp) {
    var a = new Date(timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    a.getHours();
    a.getMinutes();
    a.getSeconds();
    var time = date + ' ' + month + ' ' + year;
    return time;
  };
  var languages = [{
    code: 'ab',
    name: 'Abkhazian'
  }, {
    code: 'aa',
    name: 'Afar'
  }, {
    code: 'af',
    name: 'Afrikaans'
  }, {
    code: 'ak',
    name: 'Akan'
  }, {
    code: 'sq',
    name: 'Albanian'
  }, {
    code: 'am',
    name: 'Amharic'
  }, {
    code: 'ar',
    name: 'Arabic'
  }, {
    code: 'an',
    name: 'Aragonese'
  }, {
    code: 'hy',
    name: 'Armenian'
  }, {
    code: 'as',
    name: 'Assamese'
  }, {
    code: 'av',
    name: 'Avaric'
  }, {
    code: 'ae',
    name: 'Avestan'
  }, {
    code: 'ay',
    name: 'Aymara'
  }, {
    code: 'az',
    name: 'Azerbaijani'
  }, {
    code: 'bm',
    name: 'Bambara'
  }, {
    code: 'ba',
    name: 'Bashkir'
  }, {
    code: 'eu',
    name: 'Basque'
  }, {
    code: 'be',
    name: 'Belarusian'
  }, {
    code: 'bn',
    name: 'Bengali'
  }, {
    code: 'bh',
    name: 'Bihari languages'
  }, {
    code: 'bi',
    name: 'Bislama'
  }, {
    code: 'bs',
    name: 'Bosnian'
  }, {
    code: 'br',
    name: 'Breton'
  }, {
    code: 'bg',
    name: 'Bulgarian'
  }, {
    code: 'my',
    name: 'Burmese'
  }, {
    code: 'ca',
    name: 'Catalan, Valencian'
  }, {
    code: 'km',
    name: 'Central Khmer'
  }, {
    code: 'ch',
    name: 'Chamorro'
  }, {
    code: 'ce',
    name: 'Chechen'
  }, {
    code: 'ny',
    name: 'Chichewa, Chewa, Nyanja'
  }, {
    code: 'zh',
    name: 'Chinese'
  }, {
    code: 'cu',
    name: 'Church Slavonic, Old Bulgarian, Old Church Slavonic'
  }, {
    code: 'cv',
    name: 'Chuvash'
  }, {
    code: 'kw',
    name: 'Cornish'
  }, {
    code: 'co',
    name: 'Corsican'
  }, {
    code: 'cr',
    name: 'Cree'
  }, {
    code: 'hr',
    name: 'Croatian'
  }, {
    code: 'cs',
    name: 'Czech'
  }, {
    code: 'da',
    name: 'Danish'
  }, {
    code: 'dv',
    name: 'Divehi, Dhivehi, Maldivian'
  }, {
    code: 'nl',
    name: 'Dutch, Flemish'
  }, {
    code: 'dz',
    name: 'Dzongkha'
  }, {
    code: 'en',
    name: 'English'
  }, {
    code: 'eo',
    name: 'Esperanto'
  }, {
    code: 'et',
    name: 'Estonian'
  }, {
    code: 'ee',
    name: 'Ewe'
  }, {
    code: 'fo',
    name: 'Faroese'
  }, {
    code: 'fj',
    name: 'Fijian'
  }, {
    code: 'fi',
    name: 'Finnish'
  }, {
    code: 'fr',
    name: 'French'
  }, {
    code: 'ff',
    name: 'Fulah'
  }, {
    code: 'gd',
    name: 'Gaelic, Scottish Gaelic'
  }, {
    code: 'gl',
    name: 'Galician'
  }, {
    code: 'lg',
    name: 'Ganda'
  }, {
    code: 'ka',
    name: 'Georgian'
  }, {
    code: 'de',
    name: 'German'
  }, {
    code: 'ki',
    name: 'Gikuyu, Kikuyu'
  }, {
    code: 'el',
    name: 'Greek (Modern)'
  }, {
    code: 'kl',
    name: 'Greenlandic, Kalaallisut'
  }, {
    code: 'gn',
    name: 'Guarani'
  }, {
    code: 'gu',
    name: 'Gujarati'
  }, {
    code: 'ht',
    name: 'Haitian, Haitian Creole'
  }, {
    code: 'ha',
    name: 'Hausa'
  }, {
    code: 'he',
    name: 'Hebrew'
  }, {
    code: 'hz',
    name: 'Herero'
  }, {
    code: 'hi',
    name: 'Hindi'
  }, {
    code: 'ho',
    name: 'Hiri Motu'
  }, {
    code: 'hu',
    name: 'Hungarian'
  }, {
    code: 'is',
    name: 'Icelandic'
  }, {
    code: 'io',
    name: 'Ido'
  }, {
    code: 'ig',
    name: 'Igbo'
  }, {
    code: 'id',
    name: 'Indonesian'
  }, {
    code: 'ia',
    name: 'Interlingua (International Auxiliary Language Association)'
  }, {
    code: 'ie',
    name: 'Interlingue'
  }, {
    code: 'iu',
    name: 'Inuktitut'
  }, {
    code: 'ik',
    name: 'Inupiaq'
  }, {
    code: 'ga',
    name: 'Irish'
  }, {
    code: 'it',
    name: 'Italian'
  }, {
    code: 'ja',
    name: 'Japanese'
  }, {
    code: 'jv',
    name: 'Javanese'
  }, {
    code: 'kn',
    name: 'Kannada'
  }, {
    code: 'kr',
    name: 'Kanuri'
  }, {
    code: 'ks',
    name: 'Kashmiri'
  }, {
    code: 'kk',
    name: 'Kazakh'
  }, {
    code: 'rw',
    name: 'Kinyarwanda'
  }, {
    code: 'kv',
    name: 'Komi'
  }, {
    code: 'kg',
    name: 'Kongo'
  }, {
    code: 'ko',
    name: 'Korean'
  }, {
    code: 'kj',
    name: 'Kwanyama, Kuanyama'
  }, {
    code: 'ku',
    name: 'Kurdish'
  }, {
    code: 'ky',
    name: 'Kyrgyz'
  }, {
    code: 'lo',
    name: 'Lao'
  }, {
    code: 'la',
    name: 'Latin'
  }, {
    code: 'lv',
    name: 'Latvian'
  }, {
    code: 'lb',
    name: 'Letzeburgesch, Luxembourgish'
  }, {
    code: 'li',
    name: 'Limburgish, Limburgan, Limburger'
  }, {
    code: 'ln',
    name: 'Lingala'
  }, {
    code: 'lt',
    name: 'Lithuanian'
  }, {
    code: 'lu',
    name: 'Luba-Katanga'
  }, {
    code: 'mk',
    name: 'Macedonian'
  }, {
    code: 'mg',
    name: 'Malagasy'
  }, {
    code: 'ms',
    name: 'Malay'
  }, {
    code: 'ml',
    name: 'Malayalam'
  }, {
    code: 'mt',
    name: 'Maltese'
  }, {
    code: 'gv',
    name: 'Manx'
  }, {
    code: 'mi',
    name: 'Maori'
  }, {
    code: 'mr',
    name: 'Marathi'
  }, {
    code: 'mh',
    name: 'Marshallese'
  }, {
    code: 'ro',
    name: 'Moldovan, Moldavian, Romanian'
  }, {
    code: 'mn',
    name: 'Mongolian'
  }, {
    code: 'na',
    name: 'Nauru'
  }, {
    code: 'nv',
    name: 'Navajo, Navaho'
  }, {
    code: 'nd',
    name: 'Northern Ndebele'
  }, {
    code: 'ng',
    name: 'Ndonga'
  }, {
    code: 'ne',
    name: 'Nepali'
  }, {
    code: 'se',
    name: 'Northern Sami'
  }, {
    code: 'no',
    name: 'Norwegian'
  }, {
    code: 'nb',
    name: 'Norwegian Bokmål'
  }, {
    code: 'nn',
    name: 'Norwegian Nynorsk'
  }, {
    code: 'ii',
    name: 'Nuosu, Sichuan Yi'
  }, {
    code: 'oc',
    name: 'Occitan (post 1500)'
  }, {
    code: 'oj',
    name: 'Ojibwa'
  }, {
    code: 'or',
    name: 'Oriya'
  }, {
    code: 'om',
    name: 'Oromo'
  }, {
    code: 'os',
    name: 'Ossetian, Ossetic'
  }, {
    code: 'pi',
    name: 'Pali'
  }, {
    code: 'pa',
    name: 'Panjabi, Punjabi'
  }, {
    code: 'ps',
    name: 'Pashto, Pushto'
  }, {
    code: 'fa',
    name: 'Persian'
  }, {
    code: 'pl',
    name: 'Polish'
  }, {
    code: 'pt',
    name: 'Portuguese'
  }, {
    code: 'qu',
    name: 'Quechua'
  }, {
    code: 'rm',
    name: 'Romansh'
  }, {
    code: 'rn',
    name: 'Rundi'
  }, {
    code: 'ru',
    name: 'Russian'
  }, {
    code: 'sm',
    name: 'Samoan'
  }, {
    code: 'sg',
    name: 'Sango'
  }, {
    code: 'sa',
    name: 'Sanskrit'
  }, {
    code: 'sc',
    name: 'Sardinian'
  }, {
    code: 'sr',
    name: 'Serbian'
  }, {
    code: 'sn',
    name: 'Shona'
  }, {
    code: 'sd',
    name: 'Sindhi'
  }, {
    code: 'si',
    name: 'Sinhala, Sinhalese'
  }, {
    code: 'sk',
    name: 'Slovak'
  }, {
    code: 'sl',
    name: 'Slovenian'
  }, {
    code: 'so',
    name: 'Somali'
  }, {
    code: 'st',
    name: 'Sotho, Southern'
  }, {
    code: 'nr',
    name: 'South Ndebele'
  }, {
    code: 'es',
    name: 'Spanish, Castilian'
  }, {
    code: 'su',
    name: 'Sundanese'
  }, {
    code: 'sw',
    name: 'Swahili'
  }, {
    code: 'ss',
    name: 'Swati'
  }, {
    code: 'sv',
    name: 'Swedish'
  }, {
    code: 'tl',
    name: 'Tagalog'
  }, {
    code: 'ty',
    name: 'Tahitian'
  }, {
    code: 'tg',
    name: 'Tajik'
  }, {
    code: 'ta',
    name: 'Tamil'
  }, {
    code: 'tt',
    name: 'Tatar'
  }, {
    code: 'te',
    name: 'Telugu'
  }, {
    code: 'th',
    name: 'Thai'
  }, {
    code: 'bo',
    name: 'Tibetan'
  }, {
    code: 'ti',
    name: 'Tigrinya'
  }, {
    code: 'to',
    name: 'Tonga (Tonga Islands)'
  }, {
    code: 'ts',
    name: 'Tsonga'
  }, {
    code: 'tn',
    name: 'Tswana'
  }, {
    code: 'tr',
    name: 'Turkish'
  }, {
    code: 'tk',
    name: 'Turkmen'
  }, {
    code: 'tw',
    name: 'Twi'
  }, {
    code: 'ug',
    name: 'Uighur, Uyghur'
  }, {
    code: 'uk',
    name: 'Ukrainian'
  }, {
    code: 'ur',
    name: 'Urdu'
  }, {
    code: 'uz',
    name: 'Uzbek'
  }, {
    code: 've',
    name: 'Venda'
  }, {
    code: 'vi',
    name: 'Vietnamese'
  }, {
    code: 'vo',
    name: 'Volap_k'
  }, {
    code: 'wa',
    name: 'Walloon'
  }, {
    code: 'cy',
    name: 'Welsh'
  }, {
    code: 'fy',
    name: 'Western Frisian'
  }, {
    code: 'wo',
    name: 'Wolof'
  }, {
    code: 'xh',
    name: 'Xhosa'
  }, {
    code: 'yi',
    name: 'Yiddish'
  }, {
    code: 'yo',
    name: 'Yoruba'
  }, {
    code: 'za',
    name: 'Zhuang, Chuang'
  }, {
    code: 'zu',
    name: 'Zulu'
  }];
  var initFooter = function initFooter(_this) {
    var left = __html('Translate 1.2.0 by %1$Kenzap%2$. ❤️ Licensed %3$GPLv3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/translate" target="_blank">', '</a>');
    var right = "";
    document.querySelector("footer .row").innerHTML = "\n    <div class=\"d-sm-flex justify-content-center justify-content-sm-between\">\n        <span class=\"text-muted text-center text-sm-left d-block d-sm-inline-block\">".concat(left, "</span>\n        <span class=\"float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted\">").concat(right, "</span>\n    </div>");
  };
  var countries = [{
    "code": "AF",
    "code3": "AFG",
    "name": "Afghanistan",
    "number": "004"
  }, {
    "code": "AL",
    "code3": "ALB",
    "name": "Albania",
    "number": "008"
  }, {
    "code": "DZ",
    "code3": "DZA",
    "name": "Algeria",
    "number": "012"
  }, {
    "code": "AS",
    "code3": "ASM",
    "name": "American Samoa",
    "number": "016"
  }, {
    "code": "AD",
    "code3": "AND",
    "name": "Andorra",
    "number": "020"
  }, {
    "code": "AO",
    "code3": "AGO",
    "name": "Angola",
    "number": "024"
  }, {
    "code": "AI",
    "code3": "AIA",
    "name": "Anguilla",
    "number": "660"
  }, {
    "code": "AQ",
    "code3": "ATA",
    "name": "Antarctica",
    "number": "010"
  }, {
    "code": "AG",
    "code3": "ATG",
    "name": "Antigua and Barbuda",
    "number": "028"
  }, {
    "code": "AR",
    "code3": "ARG",
    "name": "Argentina",
    "number": "032"
  }, {
    "code": "AM",
    "code3": "ARM",
    "name": "Armenia",
    "number": "051"
  }, {
    "code": "AW",
    "code3": "ABW",
    "name": "Aruba",
    "number": "533"
  }, {
    "code": "AU",
    "code3": "AUS",
    "name": "Australia",
    "number": "036"
  }, {
    "code": "AT",
    "code3": "AUT",
    "name": "Austria",
    "number": "040"
  }, {
    "code": "AZ",
    "code3": "AZE",
    "name": "Azerbaijan",
    "number": "031"
  }, {
    "code": "BS",
    "code3": "BHS",
    "name": "Bahamas (the)",
    "number": "044"
  }, {
    "code": "BH",
    "code3": "BHR",
    "name": "Bahrain",
    "number": "048"
  }, {
    "code": "BD",
    "code3": "BGD",
    "name": "Bangladesh",
    "number": "050"
  }, {
    "code": "BB",
    "code3": "BRB",
    "name": "Barbados",
    "number": "052"
  }, {
    "code": "BY",
    "code3": "BLR",
    "name": "Belarus",
    "number": "112"
  }, {
    "code": "BE",
    "code3": "BEL",
    "name": "Belgium",
    "number": "056"
  }, {
    "code": "BZ",
    "code3": "BLZ",
    "name": "Belize",
    "number": "084"
  }, {
    "code": "BJ",
    "code3": "BEN",
    "name": "Benin",
    "number": "204"
  }, {
    "code": "BM",
    "code3": "BMU",
    "name": "Bermuda",
    "number": "060"
  }, {
    "code": "BT",
    "code3": "BTN",
    "name": "Bhutan",
    "number": "064"
  }, {
    "code": "BO",
    "code3": "BOL",
    "name": "Bolivia (Plurinational State of)",
    "number": "068"
  }, {
    "code": "BQ",
    "code3": "BES",
    "name": "Bonaire, Sint Eustatius and Saba",
    "number": "535"
  }, {
    "code": "BA",
    "code3": "BIH",
    "name": "Bosnia and Herzegovina",
    "number": "070"
  }, {
    "code": "BW",
    "code3": "BWA",
    "name": "Botswana",
    "number": "072"
  }, {
    "code": "BV",
    "code3": "BVT",
    "name": "Bouvet Island",
    "number": "074"
  }, {
    "code": "BR",
    "code3": "BRA",
    "name": "Brazil",
    "number": "076"
  }, {
    "code": "IO",
    "code3": "IOT",
    "name": "British Indian Ocean Territory (the)",
    "number": "086"
  }, {
    "code": "BN",
    "code3": "BRN",
    "name": "Brunei Darussalam",
    "number": "096"
  }, {
    "code": "BG",
    "code3": "BGR",
    "name": "Bulgaria",
    "number": "100"
  }, {
    "code": "BF",
    "code3": "BFA",
    "name": "Burkina Faso",
    "number": "854"
  }, {
    "code": "BI",
    "code3": "BDI",
    "name": "Burundi",
    "number": "108"
  }, {
    "code": "CV",
    "code3": "CPV",
    "name": "Cabo Verde",
    "number": "132"
  }, {
    "code": "KH",
    "code3": "KHM",
    "name": "Cambodia",
    "number": "116"
  }, {
    "code": "CM",
    "code3": "CMR",
    "name": "Cameroon",
    "number": "120"
  }, {
    "code": "CA",
    "code3": "CAN",
    "name": "Canada",
    "number": "124"
  }, {
    "code": "KY",
    "code3": "CYM",
    "name": "Cayman Islands (the)",
    "number": "136"
  }, {
    "code": "CF",
    "code3": "CAF",
    "name": "Central African Republic (the)",
    "number": "140"
  }, {
    "code": "TD",
    "code3": "TCD",
    "name": "Chad",
    "number": "148"
  }, {
    "code": "CL",
    "code3": "CHL",
    "name": "Chile",
    "number": "152"
  }, {
    "code": "CN",
    "code3": "CHN",
    "name": "China",
    "number": "156"
  }, {
    "code": "CX",
    "code3": "CXR",
    "name": "Christmas Island",
    "number": "162"
  }, {
    "code": "CC",
    "code3": "CCK",
    "name": "Cocos (Keeling) Islands (the)",
    "number": "166"
  }, {
    "code": "CO",
    "code3": "COL",
    "name": "Colombia",
    "number": "170"
  }, {
    "code": "KM",
    "code3": "COM",
    "name": "Comoros (the)",
    "number": "174"
  }, {
    "code": "CD",
    "code3": "COD",
    "name": "Congo (the Democratic Republic of the)",
    "number": "180"
  }, {
    "code": "CG",
    "code3": "COG",
    "name": "Congo (the)",
    "number": "178"
  }, {
    "code": "CK",
    "code3": "COK",
    "name": "Cook Islands (the)",
    "number": "184"
  }, {
    "code": "CR",
    "code3": "CRI",
    "name": "Costa Rica",
    "number": "188"
  }, {
    "code": "HR",
    "code3": "HRV",
    "name": "Croatia",
    "number": "191"
  }, {
    "code": "CU",
    "code3": "CUB",
    "name": "Cuba",
    "number": "192"
  }, {
    "code": "CW",
    "code3": "CUW",
    "name": "Curaçao",
    "number": "531"
  }, {
    "code": "CY",
    "code3": "CYP",
    "name": "Cyprus",
    "number": "196"
  }, {
    "code": "CZ",
    "code3": "CZE",
    "name": "Czechia",
    "number": "203"
  }, {
    "code": "CI",
    "code3": "CIV",
    "name": "Côte d'Ivoire",
    "number": "384"
  }, {
    "code": "DK",
    "code3": "DNK",
    "name": "Denmark",
    "number": "208"
  }, {
    "code": "DJ",
    "code3": "DJI",
    "name": "Djibouti",
    "number": "262"
  }, {
    "code": "DM",
    "code3": "DMA",
    "name": "Dominica",
    "number": "212"
  }, {
    "code": "DO",
    "code3": "DOM",
    "name": "Dominican Republic (the)",
    "number": "214"
  }, {
    "code": "EC",
    "code3": "ECU",
    "name": "Ecuador",
    "number": "218"
  }, {
    "code": "EG",
    "code3": "EGY",
    "name": "Egypt",
    "number": "818"
  }, {
    "code": "SV",
    "code3": "SLV",
    "name": "El Salvador",
    "number": "222"
  }, {
    "code": "GQ",
    "code3": "GNQ",
    "name": "Equatorial Guinea",
    "number": "226"
  }, {
    "code": "ER",
    "code3": "ERI",
    "name": "Eritrea",
    "number": "232"
  }, {
    "code": "EE",
    "code3": "EST",
    "name": "Estonia",
    "number": "233"
  }, {
    "code": "SZ",
    "code3": "SWZ",
    "name": "Eswatini",
    "number": "748"
  }, {
    "code": "ET",
    "code3": "ETH",
    "name": "Ethiopia",
    "number": "231"
  }, {
    "code": "FK",
    "code3": "FLK",
    "name": "Falkland Islands (the) [Malvinas]",
    "number": "238"
  }, {
    "code": "FO",
    "code3": "FRO",
    "name": "Faroe Islands (the)",
    "number": "234"
  }, {
    "code": "FJ",
    "code3": "FJI",
    "name": "Fiji",
    "number": "242"
  }, {
    "code": "FI",
    "code3": "FIN",
    "name": "Finland",
    "number": "246"
  }, {
    "code": "FR",
    "code3": "FRA",
    "name": "France",
    "number": "250"
  }, {
    "code": "GF",
    "code3": "GUF",
    "name": "French Guiana",
    "number": "254"
  }, {
    "code": "PF",
    "code3": "PYF",
    "name": "French Polynesia",
    "number": "258"
  }, {
    "code": "TF",
    "code3": "ATF",
    "name": "French Southern Territories (the)",
    "number": "260"
  }, {
    "code": "GA",
    "code3": "GAB",
    "name": "Gabon",
    "number": "266"
  }, {
    "code": "GM",
    "code3": "GMB",
    "name": "Gambia (the)",
    "number": "270"
  }, {
    "code": "GE",
    "code3": "GEO",
    "name": "Georgia",
    "number": "268"
  }, {
    "code": "DE",
    "code3": "DEU",
    "name": "Germany",
    "number": "276"
  }, {
    "code": "GH",
    "code3": "GHA",
    "name": "Ghana",
    "number": "288"
  }, {
    "code": "GI",
    "code3": "GIB",
    "name": "Gibraltar",
    "number": "292"
  }, {
    "code": "GR",
    "code3": "GRC",
    "name": "Greece",
    "number": "300"
  }, {
    "code": "GL",
    "code3": "GRL",
    "name": "Greenland",
    "number": "304"
  }, {
    "code": "GD",
    "code3": "GRD",
    "name": "Grenada",
    "number": "308"
  }, {
    "code": "GP",
    "code3": "GLP",
    "name": "Guadeloupe",
    "number": "312"
  }, {
    "code": "GU",
    "code3": "GUM",
    "name": "Guam",
    "number": "316"
  }, {
    "code": "GT",
    "code3": "GTM",
    "name": "Guatemala",
    "number": "320"
  }, {
    "code": "GG",
    "code3": "GGY",
    "name": "Guernsey",
    "number": "831"
  }, {
    "code": "GN",
    "code3": "GIN",
    "name": "Guinea",
    "number": "324"
  }, {
    "code": "GW",
    "code3": "GNB",
    "name": "Guinea-Bissau",
    "number": "624"
  }, {
    "code": "GY",
    "code3": "GUY",
    "name": "Guyana",
    "number": "328"
  }, {
    "code": "HT",
    "code3": "HTI",
    "name": "Haiti",
    "number": "332"
  }, {
    "code": "HM",
    "code3": "HMD",
    "name": "Heard Island and McDonald Islands",
    "number": "334"
  }, {
    "code": "VA",
    "code3": "VAT",
    "name": "Holy See (the)",
    "number": "336"
  }, {
    "code": "HN",
    "code3": "HND",
    "name": "Honduras",
    "number": "340"
  }, {
    "code": "HK",
    "code3": "HKG",
    "name": "Hong Kong",
    "number": "344"
  }, {
    "code": "HU",
    "code3": "HUN",
    "name": "Hungary",
    "number": "348"
  }, {
    "code": "IS",
    "code3": "ISL",
    "name": "Iceland",
    "number": "352"
  }, {
    "code": "IN",
    "code3": "IND",
    "name": "India",
    "number": "356"
  }, {
    "code": "ID",
    "code3": "IDN",
    "name": "Indonesia",
    "number": "360"
  }, {
    "code": "IR",
    "code3": "IRN",
    "name": "Iran (Islamic Republic of)",
    "number": "364"
  }, {
    "code": "IQ",
    "code3": "IRQ",
    "name": "Iraq",
    "number": "368"
  }, {
    "code": "IE",
    "code3": "IRL",
    "name": "Ireland",
    "number": "372"
  }, {
    "code": "IM",
    "code3": "IMN",
    "name": "Isle of Man",
    "number": "833"
  }, {
    "code": "IL",
    "code3": "ISR",
    "name": "Israel",
    "number": "376"
  }, {
    "code": "IT",
    "code3": "ITA",
    "name": "Italy",
    "number": "380"
  }, {
    "code": "JM",
    "code3": "JAM",
    "name": "Jamaica",
    "number": "388"
  }, {
    "code": "JP",
    "code3": "JPN",
    "name": "Japan",
    "number": "392"
  }, {
    "code": "JE",
    "code3": "JEY",
    "name": "Jersey",
    "number": "832"
  }, {
    "code": "JO",
    "code3": "JOR",
    "name": "Jordan",
    "number": "400"
  }, {
    "code": "KZ",
    "code3": "KAZ",
    "name": "Kazakhstan",
    "number": "398"
  }, {
    "code": "KE",
    "code3": "KEN",
    "name": "Kenya",
    "number": "404"
  }, {
    "code": "KI",
    "code3": "KIR",
    "name": "Kiribati",
    "number": "296"
  }, {
    "code": "KP",
    "code3": "PRK",
    "name": "Korea (the Democratic People's Republic of)",
    "number": "408"
  }, {
    "code": "KR",
    "code3": "KOR",
    "name": "Korea (the Republic of)",
    "number": "410"
  }, {
    "code": "KW",
    "code3": "KWT",
    "name": "Kuwait",
    "number": "414"
  }, {
    "code": "KG",
    "code3": "KGZ",
    "name": "Kyrgyzstan",
    "number": "417"
  }, {
    "code": "LA",
    "code3": "LAO",
    "name": "Lao People's Democratic Republic (the)",
    "number": "418"
  }, {
    "code": "LV",
    "code3": "LVA",
    "name": "Latvia",
    "number": "428"
  }, {
    "code": "LB",
    "code3": "LBN",
    "name": "Lebanon",
    "number": "422"
  }, {
    "code": "LS",
    "code3": "LSO",
    "name": "Lesotho",
    "number": "426"
  }, {
    "code": "LR",
    "code3": "LBR",
    "name": "Liberia",
    "number": "430"
  }, {
    "code": "LY",
    "code3": "LBY",
    "name": "Libya",
    "number": "434"
  }, {
    "code": "LI",
    "code3": "LIE",
    "name": "Liechtenstein",
    "number": "438"
  }, {
    "code": "LT",
    "code3": "LTU",
    "name": "Lithuania",
    "number": "440"
  }, {
    "code": "LU",
    "code3": "LUX",
    "name": "Luxembourg",
    "number": "442"
  }, {
    "code": "MO",
    "code3": "MAC",
    "name": "Macao",
    "number": "446"
  }, {
    "code": "MG",
    "code3": "MDG",
    "name": "Madagascar",
    "number": "450"
  }, {
    "code": "MW",
    "code3": "MWI",
    "name": "Malawi",
    "number": "454"
  }, {
    "code": "MY",
    "code3": "MYS",
    "name": "Malaysia",
    "number": "458"
  }, {
    "code": "MV",
    "code3": "MDV",
    "name": "Maldives",
    "number": "462"
  }, {
    "code": "ML",
    "code3": "MLI",
    "name": "Mali",
    "number": "466"
  }, {
    "code": "MT",
    "code3": "MLT",
    "name": "Malta",
    "number": "470"
  }, {
    "code": "MH",
    "code3": "MHL",
    "name": "Marshall Islands (the)",
    "number": "584"
  }, {
    "code": "MQ",
    "code3": "MTQ",
    "name": "Martinique",
    "number": "474"
  }, {
    "code": "MR",
    "code3": "MRT",
    "name": "Mauritania",
    "number": "478"
  }, {
    "code": "MU",
    "code3": "MUS",
    "name": "Mauritius",
    "number": "480"
  }, {
    "code": "YT",
    "code3": "MYT",
    "name": "Mayotte",
    "number": "175"
  }, {
    "code": "MX",
    "code3": "MEX",
    "name": "Mexico",
    "number": "484"
  }, {
    "code": "FM",
    "code3": "FSM",
    "name": "Micronesia (Federated States of)",
    "number": "583"
  }, {
    "code": "MD",
    "code3": "MDA",
    "name": "Moldova (the Republic of)",
    "number": "498"
  }, {
    "code": "MC",
    "code3": "MCO",
    "name": "Monaco",
    "number": "492"
  }, {
    "code": "MN",
    "code3": "MNG",
    "name": "Mongolia",
    "number": "496"
  }, {
    "code": "ME",
    "code3": "MNE",
    "name": "Montenegro",
    "number": "499"
  }, {
    "code": "MS",
    "code3": "MSR",
    "name": "Montserrat",
    "number": "500"
  }, {
    "code": "MA",
    "code3": "MAR",
    "name": "Morocco",
    "number": "504"
  }, {
    "code": "MZ",
    "code3": "MOZ",
    "name": "Mozambique",
    "number": "508"
  }, {
    "code": "MM",
    "code3": "MMR",
    "name": "Myanmar",
    "number": "104"
  }, {
    "code": "NA",
    "code3": "NAM",
    "name": "Namibia",
    "number": "516"
  }, {
    "code": "NR",
    "code3": "NRU",
    "name": "Nauru",
    "number": "520"
  }, {
    "code": "NP",
    "code3": "NPL",
    "name": "Nepal",
    "number": "524"
  }, {
    "code": "NL",
    "code3": "NLD",
    "name": "Netherlands (the)",
    "number": "528"
  }, {
    "code": "NC",
    "code3": "NCL",
    "name": "New Caledonia",
    "number": "540"
  }, {
    "code": "NZ",
    "code3": "NZL",
    "name": "New Zealand",
    "number": "554"
  }, {
    "code": "NI",
    "code3": "NIC",
    "name": "Nicaragua",
    "number": "558"
  }, {
    "code": "NE",
    "code3": "NER",
    "name": "Niger (the)",
    "number": "562"
  }, {
    "code": "NG",
    "code3": "NGA",
    "name": "Nigeria",
    "number": "566"
  }, {
    "code": "NU",
    "code3": "NIU",
    "name": "Niue",
    "number": "570"
  }, {
    "code": "NF",
    "code3": "NFK",
    "name": "Norfolk Island",
    "number": "574"
  }, {
    "code": "MP",
    "code3": "MNP",
    "name": "Northern Mariana Islands (the)",
    "number": "580"
  }, {
    "code": "NO",
    "code3": "NOR",
    "name": "Norway",
    "number": "578"
  }, {
    "code": "OM",
    "code3": "OMN",
    "name": "Oman",
    "number": "512"
  }, {
    "code": "PK",
    "code3": "PAK",
    "name": "Pakistan",
    "number": "586"
  }, {
    "code": "PW",
    "code3": "PLW",
    "name": "Palau",
    "number": "585"
  }, {
    "code": "PS",
    "code3": "PSE",
    "name": "Palestine, State of",
    "number": "275"
  }, {
    "code": "PA",
    "code3": "PAN",
    "name": "Panama",
    "number": "591"
  }, {
    "code": "PG",
    "code3": "PNG",
    "name": "Papua New Guinea",
    "number": "598"
  }, {
    "code": "PY",
    "code3": "PRY",
    "name": "Paraguay",
    "number": "600"
  }, {
    "code": "PE",
    "code3": "PER",
    "name": "Peru",
    "number": "604"
  }, {
    "code": "PH",
    "code3": "PHL",
    "name": "Philippines (the)",
    "number": "608"
  }, {
    "code": "PN",
    "code3": "PCN",
    "name": "Pitcairn",
    "number": "612"
  }, {
    "code": "PL",
    "code3": "POL",
    "name": "Poland",
    "number": "616"
  }, {
    "code": "PT",
    "code3": "PRT",
    "name": "Portugal",
    "number": "620"
  }, {
    "code": "PR",
    "code3": "PRI",
    "name": "Puerto Rico",
    "number": "630"
  }, {
    "code": "QA",
    "code3": "QAT",
    "name": "Qatar",
    "number": "634"
  }, {
    "code": "MK",
    "code3": "MKD",
    "name": "Republic of North Macedonia",
    "number": "807"
  }, {
    "code": "RO",
    "code3": "ROU",
    "name": "Romania",
    "number": "642"
  }, {
    "code": "RU",
    "code3": "RUS",
    "name": "Russian Federation (the)",
    "number": "643"
  }, {
    "code": "RW",
    "code3": "RWA",
    "name": "Rwanda",
    "number": "646"
  }, {
    "code": "RE",
    "code3": "REU",
    "name": "Réunion",
    "number": "638"
  }, {
    "code": "BL",
    "code3": "BLM",
    "name": "Saint Barthélemy",
    "number": "652"
  }, {
    "code": "SH",
    "code3": "SHN",
    "name": "Saint Helena, Ascension and Tristan da Cunha",
    "number": "654"
  }, {
    "code": "KN",
    "code3": "KNA",
    "name": "Saint Kitts and Nevis",
    "number": "659"
  }, {
    "code": "LC",
    "code3": "LCA",
    "name": "Saint Lucia",
    "number": "662"
  }, {
    "code": "MF",
    "code3": "MAF",
    "name": "Saint Martin (French part)",
    "number": "663"
  }, {
    "code": "PM",
    "code3": "SPM",
    "name": "Saint Pierre and Miquelon",
    "number": "666"
  }, {
    "code": "VC",
    "code3": "VCT",
    "name": "Saint Vincent and the Grenadines",
    "number": "670"
  }, {
    "code": "WS",
    "code3": "WSM",
    "name": "Samoa",
    "number": "882"
  }, {
    "code": "SM",
    "code3": "SMR",
    "name": "San Marino",
    "number": "674"
  }, {
    "code": "ST",
    "code3": "STP",
    "name": "Sao Tome and Principe",
    "number": "678"
  }, {
    "code": "SA",
    "code3": "SAU",
    "name": "Saudi Arabia",
    "number": "682"
  }, {
    "code": "SN",
    "code3": "SEN",
    "name": "Senegal",
    "number": "686"
  }, {
    "code": "RS",
    "code3": "SRB",
    "name": "Serbia",
    "number": "688"
  }, {
    "code": "SC",
    "code3": "SYC",
    "name": "Seychelles",
    "number": "690"
  }, {
    "code": "SL",
    "code3": "SLE",
    "name": "Sierra Leone",
    "number": "694"
  }, {
    "code": "SG",
    "code3": "SGP",
    "name": "Singapore",
    "number": "702"
  }, {
    "code": "SX",
    "code3": "SXM",
    "name": "Sint Maarten (Dutch part)",
    "number": "534"
  }, {
    "code": "SK",
    "code3": "SVK",
    "name": "Slovakia",
    "number": "703"
  }, {
    "code": "SI",
    "code3": "SVN",
    "name": "Slovenia",
    "number": "705"
  }, {
    "code": "SB",
    "code3": "SLB",
    "name": "Solomon Islands",
    "number": "090"
  }, {
    "code": "SO",
    "code3": "SOM",
    "name": "Somalia",
    "number": "706"
  }, {
    "code": "ZA",
    "code3": "ZAF",
    "name": "South Africa",
    "number": "710"
  }, {
    "code": "GS",
    "code3": "SGS",
    "name": "South Georgia and the South Sandwich Islands",
    "number": "239"
  }, {
    "code": "SS",
    "code3": "SSD",
    "name": "South Sudan",
    "number": "728"
  }, {
    "code": "ES",
    "code3": "ESP",
    "name": "Spain",
    "number": "724"
  }, {
    "code": "LK",
    "code3": "LKA",
    "name": "Sri Lanka",
    "number": "144"
  }, {
    "code": "SD",
    "code3": "SDN",
    "name": "Sudan (the)",
    "number": "729"
  }, {
    "code": "SR",
    "code3": "SUR",
    "name": "Suriname",
    "number": "740"
  }, {
    "code": "SJ",
    "code3": "SJM",
    "name": "Svalbard and Jan Mayen",
    "number": "744"
  }, {
    "code": "SE",
    "code3": "SWE",
    "name": "Sweden",
    "number": "752"
  }, {
    "code": "CH",
    "code3": "CHE",
    "name": "Switzerland",
    "number": "756"
  }, {
    "code": "SY",
    "code3": "SYR",
    "name": "Syrian Arab Republic",
    "number": "760"
  }, {
    "code": "TW",
    "code3": "TWN",
    "name": "Taiwan",
    "number": "158"
  }, {
    "code": "TJ",
    "code3": "TJK",
    "name": "Tajikistan",
    "number": "762"
  }, {
    "code": "TZ",
    "code3": "TZA",
    "name": "Tanzania, United Republic of",
    "number": "834"
  }, {
    "code": "TH",
    "code3": "THA",
    "name": "Thailand",
    "number": "764"
  }, {
    "code": "TL",
    "code3": "TLS",
    "name": "Timor-Leste",
    "number": "626"
  }, {
    "code": "TG",
    "code3": "TGO",
    "name": "Togo",
    "number": "768"
  }, {
    "code": "TK",
    "code3": "TKL",
    "name": "Tokelau",
    "number": "772"
  }, {
    "code": "TO",
    "code3": "TON",
    "name": "Tonga",
    "number": "776"
  }, {
    "code": "TT",
    "code3": "TTO",
    "name": "Trinidad and Tobago",
    "number": "780"
  }, {
    "code": "TN",
    "code3": "TUN",
    "name": "Tunisia",
    "number": "788"
  }, {
    "code": "TR",
    "code3": "TUR",
    "name": "Turkey",
    "number": "792"
  }, {
    "code": "TM",
    "code3": "TKM",
    "name": "Turkmenistan",
    "number": "795"
  }, {
    "code": "TC",
    "code3": "TCA",
    "name": "Turks and Caicos Islands (the)",
    "number": "796"
  }, {
    "code": "TV",
    "code3": "TUV",
    "name": "Tuvalu",
    "number": "798"
  }, {
    "code": "UG",
    "code3": "UGA",
    "name": "Uganda",
    "number": "800"
  }, {
    "code": "UA",
    "code3": "UKR",
    "name": "Ukraine",
    "number": "804"
  }, {
    "code": "AE",
    "code3": "ARE",
    "name": "United Arab Emirates (the)",
    "number": "784"
  }, {
    "code": "GB",
    "code3": "GBR",
    "name": "United Kingdom of Great Britain and Northern Ireland (the)",
    "number": "826"
  }, {
    "code": "UM",
    "code3": "UMI",
    "name": "United States Minor Outlying Islands (the)",
    "number": "581"
  }, {
    "code": "US",
    "code3": "USA",
    "name": "United States of America (the)",
    "number": "840"
  }, {
    "code": "UY",
    "code3": "URY",
    "name": "Uruguay",
    "number": "858"
  }, {
    "code": "UZ",
    "code3": "UZB",
    "name": "Uzbekistan",
    "number": "860"
  }, {
    "code": "VU",
    "code3": "VUT",
    "name": "Vanuatu",
    "number": "548"
  }, {
    "code": "VE",
    "code3": "VEN",
    "name": "Venezuela (Bolivarian Republic of)",
    "number": "862"
  }, {
    "code": "VN",
    "code3": "VNM",
    "name": "Viet Nam",
    "number": "704"
  }, {
    "code": "VG",
    "code3": "VGB",
    "name": "Virgin Islands (British)",
    "number": "092"
  }, {
    "code": "VI",
    "code3": "VIR",
    "name": "Virgin Islands (U.S.)",
    "number": "850"
  }, {
    "code": "WF",
    "code3": "WLF",
    "name": "Wallis and Futuna",
    "number": "876"
  }, {
    "code": "EH",
    "code3": "ESH",
    "name": "Western Sahara",
    "number": "732"
  }, {
    "code": "YE",
    "code3": "YEM",
    "name": "Yemen",
    "number": "887"
  }, {
    "code": "ZM",
    "code3": "ZMB",
    "name": "Zambia",
    "number": "894"
  }, {
    "code": "ZW",
    "code3": "ZWE",
    "name": "Zimbabwe",
    "number": "716"
  }, {
    "code": "AX",
    "code3": "ALA",
    "name": "Åland Islands",
    "number": "248"
  }];

  var addLocaleModal = function addLocaleModal(_this) {
    var modal = document.querySelector(".modal");
    var modalCont = new bootstrap.Modal(modal);
    modal.querySelector(".modal-dialog").classList.remove('modal-fullscreen');
    modal.querySelector(".modal-title").innerHTML = __html('Add Locale');
    var languagesList = '',
      locationList;
    languages.forEach(function (lang) {
      languagesList += "<option value=\"".concat(lang.code, "\" >").concat(lang.name, "</option>");
    });
    countries.forEach(function (lang) {
      locationList += "<option value=\"".concat(lang.code, "\" >").concat(lang.name, "</option>");
    });
    var modalHTml = "\n    <div class=\"form-cont\">\n        <div class=\"form-group mb-3\">\n            <label for=\"p-title\" class=\"form-label\">".concat(__html('Language'), "</label>\n            <select id=\"s-language\" class=\"form-control\" name=\"select-language\">\n                <option value=\"\">").concat(__html('No language selected'), "</option>\n                <optgroup label=\"").concat(__html('Available languages'), "\"> \n                    ").concat(languagesList, "\n                </optgroup>\n            </select>\n        </div>\n        <div class=\"form-group mb-3\">\n            <label for=\"p-sdesc\" class=\"form-label\">").concat(__html('Location'), "</label>\n            <select id=\"s-location\" class=\"form-control\" name=\"select-location\">\n                <option value=\"\">").concat(__html('Universal'), "</option>\n                <optgroup label=\"").concat(__html('Available countries'), "\"> \n                    ").concat(locationList, "\n                </optgroup>\n            </select>\n        </div>\n    </div>");
    modal.querySelector(".modal-body").innerHTML = modalHTml;
    modal.querySelector(".modal-footer").innerHTML = "\n        <button type=\"button\" class=\"btn btn-primary btn-locale-add btn-modal\">".concat(__html('Add'), "</button>\n        <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">").concat(__html('Cancel'), "</button>\n    ");
    onClick('.btn-locale-add', function (e) {
      e.preventDefault();
      var data = {};
      data.language = modal.querySelector("#s-language").value;
      data.location = modal.querySelector("#s-location").value;
      data.locale = data.language + (data.location.length ? "_" + data.location : '');
      data.ext = _this.state.ext;
      data.extension = {};
      data.content = {};
      if (data.language.length < 2) {
        alert(__html('Please choose language first'));
        return;
      }
      fetch(getAPI(), {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: {
            product: {
              type: 'create',
              key: 'locale-' + _this.state.ext,
              data: data
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          modalCont.hide();
          toast(__html('Locale added'));
          _this.data();
        } else {
          parseApiError(response);
        }
        console.log('Success:', response);
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    });
    modalCont.show();
  };

  var editLocaleModal = function editLocaleModal(_this) {
    var modal = document.querySelector(".modal");
    var modalCont = new bootstrap.Modal(modal);
    modal.querySelector(".modal-dialog").classList.add('modal-fullscreen');
    modal.querySelector(".modal-title").innerHTML = _this.state.ext + ' / ' + _this.state.currentRow.dataset.title;
    var sourceLocaleList = "",
      languagesList = '';
    languages.forEach(function (lang) {
      languagesList += "<option value=\"".concat(lang.code, "\" >").concat(lang.name, "</option>");
    });
    _this.state.locales.forEach(function (el, i) {
      var l = languages.filter(function (obj) {
        return obj.code === el.language;
      });
      var c = countries.filter(function (obj) {
        return obj.code === el.location;
      });
      var localeTitle = __html(l[0].name) + (c[0] ? ' (' + __html(c[0].name) + ')' : '');
      if (localeTitle == _this.state.currentRow.dataset.title) return;
      sourceLocaleList += "<option value=\"".concat(el._id, "\" data-title=\"").concat(localeTitle, "\" data-language=\"").concat(el.language, "\" data-id=\"").concat(el._id, "\" >").concat(localeTitle).concat(el.location ? '<img class="ms-2 cc-flag" src="https://cdn.kenzap.com/flag/' + el.location.toLowerCase() + '.svg" alt="location footer flag">' : '', "</option>");
    });
    var cached = '';
    var modalHTml = "\n\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <div class=\"search-db border-start border-primary border-3 ps-3 my-2 d-none\">\n                    <div class=\"form-cont\">\n                        <div class=\"d-flex\">\n                            <div class=\"form-group mb-2 mt-1 me-3\">\n                                <label for=\"db-path\" class=\"form-label\">".concat(__html('Cloud storage key'), "</label>\n                                <input id=\"db-path\" type=\"text\" placeholder=\"").concat(__html('ecommerce-product/title'), "\" class=\"form-control \" aria-label=\"").concat(__html('Search products'), "\" aria-describedby=\"inputGroup-sizing-sm\" style=\"max-width: 400px;\">\n                                <p class=\"form-text\">").concat(__html("Search cloud stored texts and add to translation list below."), "</p>\n                            </div>\n                            <div class=\"form-group mb-2 mt-1 me-3\">\n                                <label for=\"source-language\" class=\"form-label\">").concat(__html('Source language'), "</label>\n                                <select id=\"source-language\" class=\"form-control\" name=\"select-language\">\n                                    <option value=\"\">").concat(__html('No language selected'), "</option>\n                                    <optgroup label=\"").concat(__html('Source language'), "\"> \n                                        ").concat(languagesList, "\n                                    </optgroup>\n                                </select>\n                                <p class=\"form-text\">").concat(__html("Default language of original texts."), "</p>\n                            </div>\n                            <div class=\"form-group align-self-center mb-3 mt-0\">\n                                <button type=\"button\" class=\"btn btn-primary btn-search-db btn-modal\">").concat(__html("Search"), "</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"table-responsive\">\n                    <table class=\"table table-hover table-borderless align-middle table-striped table-t-list\" style=\"min-width: 800px;\">\n                        <thead>\n                            <tr>\n                                <th>\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"#212529\" class=\"bi justify-content-end bi-search search-icon po mb-1 me-3\" viewBox=\"0 0 16 16\" >\n                                        <path d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z\"></path>\n                                    </svg>\n                                    <div class=\"search-cont input-group input-group-sm mb-0 justify-content-start d-none\">     \n                                        <input type=\"text\" placeholder=\"").concat(__html('Search products'), "\" class=\"form-control border-top-0 border-start-0 border-end-0 rounded-0\" aria-label=\"").concat(__html('Search products'), "\" aria-describedby=\"inputGroup-sizing-sm\" style=\"max-width: 200px;\">\n                                    </div>\n                                    <span>").concat(__html("Original"), "</span>\n                                </th>\n                                <th class=\"d-flex justify-content-between align-items-center\">\n                                    <div>").concat(__html("Translated"), "</div>\n                                    <div class=\"d-flex align-items-center\">\n                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"bi bi-translate copy-locale-tray text-primary po me-2 \" viewBox=\"0 0 16 16\">\n                                            <path d=\"M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z\"/>\n                                            <path d=\"M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31\"/>\n                                        </svg>\n                                        <select id=\"copy-locale\" class=\"form-select form-select-sm copy-locale d-none\" name=\"select-copy-locale\">\n                                            <option value=\"\">").concat(__html('No locales selected'), "</option>\n                                            <optgroup label=\"").concat(__html('Available locales:'), "\">\n                                                ").concat(sourceLocaleList, "\n                                            </optgroup>\n                                        </select>\n                                    </div>\n                                </th>\n                                <th></th>\n                            </tr>\n                        </thead>\n                        <tbody>");
    var rows = "\n                        <tr class=\"add-row\">\n                            <td class=\"py-1\">\n                                <textarea class=\"form-control add-original\" data-original=\"".concat(cached, "\" rows=\"1\"></textarea>\n                            </td>\n                            <td class=\"py-1\">\n                                <textarea class=\"form-control add-translated\" data-translated=\"").concat(cached, "\" rows=\"1\"></textarea>\n                            </td>\n                            <td class=\"text-end\"> \n                                <a href=\"#\" data-id=\"").concat(_this.state.currentRow.dataset.id, "\" title=\"").concat(__html('add translation to the table'), "\" class=\"add-trans-row text-success me-2\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-plus-square\" viewBox=\"0 0 16 16\">\n                                <path d=\"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z\"/>\n                                <path d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"/>\n                            </svg></a>\n                            </td>\n                        </tr>\n                        ");
    var texts = _this.state.localesDB.data.content;
    if (_this.state.localesDB.data.content) Object.keys(texts).forEach(function (text) {
      rows += _this.getLocalModalRow({
        id: _this.state.currentRow.dataset.id,
        original: text,
        translated: texts[text],
        type: 'content'
      });
    });
    var def = _this.state.locales[_this.state.currentRow.dataset.language] ? _this.state.locales[_this.state.currentRow.dataset.language] : _this.state.locales["default"];
    if (def == '404: Not Found') def = _this.state.locales["default"];
    texts = _objectSpread2(_objectSpread2({}, JSON.parse(def).texts), _this.state.localesDB.data.extension);
    Object.keys(texts).forEach(function (text) {
      rows += _this.getLocalModalRow({
        id: _this.state.currentRow.dataset.id,
        original: text,
        translated: texts[text],
        type: 'extension'
      });
    });
    modalHTml += rows;
    modalHTml += "</tbody>\n                    </table>\n                </div>\n            </div>\n        </div>";
    modal.querySelector(".modal-body").innerHTML = modalHTml;
    modal.querySelector(".modal-footer").innerHTML = "\n        <button type=\"button\" class=\"btn btn-primary btn-locale-save btn-modal\">".concat(__html('Save'), "</button>\n        <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">").concat(__html('Cancel'), "</button>\n    ");
    onClick('.copy-locale-tray', function (e) {
      document.querySelector('.copy-locale').classList.toggle('d-none');
    });
    onChange('.copy-locale', function (e) {
      if (!e.target.selectedIndex) return;
      var locale = {
        id: e.target.value,
        from: {
          name: e.target.options[e.target.selectedIndex].innerHTML
        },
        to: {
          name: _this.state.currentRow.dataset.title
        }
      };
      if (!confirm(__("Copy locale texts from %1$ and translate to %2$?", e.target.options[e.target.selectedIndex].innerHTML, _this.state.currentRow.dataset.title))) {
        e.preventDefault();
        return false;
      }
      showLoader();
      var override = confirm(__("Override existing translations?"));
      _this.state.ajaxCount = 0;
      fetch(getAPI(), {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: {
            data: {
              type: 'find',
              key: 'locale-' + _this.state.ext,
              id: e.target.value,
              fields: ['extension', 'content']
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          response.data.content = response.data.content ? response.data.content : {};
          var chunk_size = 50;
          var content = {};
          if (override) {
            content = _objectSpread2(_objectSpread2({}, response.data.content), response.data.extension);
          } else {
            Object.keys(response.data.content).forEach(function (key, i) {
              if (!document.querySelector('.edit-original[data-title="' + key + '"]')) content[key] = response.data.content[key];
            });
          }
          var chunks = [];
          for (var i = 0; i < Object.keys(content).length; i += chunk_size) {
            var chunk = Object.keys(content).slice(i, i + chunk_size).reduce(function (obj, key) {
              obj[key] = content[key];
              return obj;
            }, {});
            chunks.push(chunk);
          }
          console.log(chunks);
          if (chunks.length) {
            showLoader();
          } else {
            hideLoader();
          }
          chunks.forEach(function (chunk, index) {
            _this.state.ajaxCount += 1;
            setTimeout(function () {
              fetch(getAPI() + '/translate/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                  query: {
                    localize: {
                      type: 'localize',
                      locale: locale,
                      texts: chunk
                    }
                  }
                })
              }).then(function (response) {
                return response.json();
              }).then(function (response) {
                _this.state.ajaxCount -= 1;
                if (response.success) {
                  if (response.localize.texts.length == 0) {
                    hideLoader();
                    alert(__html("Can not find available translation texts in the Cloud"));
                    return;
                  }
                  var ti = 0;
                  response.localize.texts.forEach(function (text, i) {
                    if (override) {
                      if (document.querySelector('.edit-translated[data-original="' + text.original + '"]')) {
                        document.querySelector('.edit-translated[data-original="' + text.original + '"]').value = text.translated;
                        ti += 1;
                      }
                    }
                    if (!document.querySelector('.edit-original[data-title="' + text.original + '"]')) {
                      var row = _this.getLocalModalRow({
                        id: _this.state.currentRow.dataset.id,
                        original: text.original,
                        translated: text.translated,
                        type: 'content',
                        bg: '#fff3cd'
                      });
                      document.querySelector('.add-row').insertAdjacentHTML('afterend', row);
                      ti++;
                    } else {
                      console.log("Skipping row entry");
                    }
                  });
                  toast(__html('Adding %1$ translated texts', ti));
                  if (_this.state.ajaxCount <= 0) hideLoader();
                  onClick('.remove-locale-text', _this.removeTransRow);
                } else {
                  parseApiError(response);
                }
              })["catch"](function (error) {
                console.error('Error:', error);
              });
            }, index * 7000);
          });
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    });
    onClick('.add-trans-row', _this.addTransRow);
    onClick('.remove-locale-text', _this.removeTransRow);
    onClick('.btn-search-db', _this.searchTexts);
    onClick('.search-icon', _this.searchTextsCont);
    onClick('.btn-locale-save', function (e) {
      e.preventDefault();
      var data = {};
      data['extension'] = {};
      data['content'] = {};
      var _iterator = _createForOfIteratorHelper(modal.querySelectorAll(".edit-translated")),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var trans = _step.value;
          data[trans.dataset.type][trans.dataset.original] = trans.value;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      fetch(getAPI(), {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: {
            locale: {
              type: 'update',
              key: 'locale-' + _this.state.ext,
              id: _this.state.currentRow.dataset.id,
              data: data
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          modalCont.hide();
          _this.data();
        } else {
          parseApiError(response);
        }
        console.log('Success:', response);
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    });
    modalCont.show();
  };

  var HTMLContent = function HTMLContent(_this, __) {
    return "\n        <div class=\"container p-edit\">\n            <div class=\"d-flex justify-content-between bd-highlight mb-3\">\n                <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n                <div class=\"\">\n                    <a style=\"margin-right:16px;\" class=\"preview-link nounderline d-none\" target=\"_blank\" href=\"#\">".concat(__('template'), "<i class=\"mdi mdi-monitor\"></i></a>\n                    <button class=\"btn btn-primary btn-add\" type=\"button\">").concat(__('Add locale'), "</button>\n                </div>\n            </div>\n            <div class=\"row\">\n\n                <div class=\"col-lg-12 grid-margin stretch-card\">\n                    <div class=\"card border-white shadow-sm\">\n                        <div class=\"card-body\">\n                        <h4 class=\"card-title\">").concat(__('Translating'), " ").concat(_this.state.slug, "</h4>\n                        <p class=\"form-text\">\n                            ").concat(__('Choose <a href="#">locale</a></code> from the list to start translation or hit add locale button.'), "\n                        </p>\n\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <div class=\"table-responsive\">\n                                    <table\n                                        class=\"table table-hover table-borderless align-middle table-striped table-p-list\" style=\"min-width: 800px;\">\n                                        <thead>\n\n                                        </thead>\n                                        <tbody>\n\n                                        </tbody>\n                                    </table>\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n\n            </div>\n        </div>\n\n        <div class=\"modal\" tabindex=\"-1\">\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\"></h5>\n                        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                    </div>\n                    <div class=\"modal-body\">\n\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-primary btn-modal\"></button>\n                        <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"position-fixed bottom-0 p-2 m-4 end-0 align-items-center\">\n            <div class=\"toast hide align-items-center text-white bg-dark border-0\" role=\"alert\" aria-live=\"assertive\"\n                aria-atomic=\"true\" data-bs-delay=\"3000\">\n                <div class=\"d-flex\">\n                    <div class=\"toast-body\"></div>\n                    <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n                </div>\n            </div>\n        </div>\n        \n    ");
  };

  var EditLocale = _createClass(function EditLocale() {
    var _this = this;
    _classCallCheck(this, EditLocale);
    _defineProperty(this, "init", function () {
      _this.data();
    });
    _defineProperty(this, "data", function () {
      if (_this.state.firstLoad) showLoader();
      fetch(getAPI(), {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: {
            locale: {
              type: 'locale',
              id: getCookie('lang')
            },
            locales: {
              type: 'find',
              key: 'locale-' + _this.state.ext,
              fields: ['_id', 'language', 'location', 'locale', 'ext', 'updated']
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          initHeader(response);
          _this.home();
          _this.render(response);
          _this.listeners();
          initFooter();
          _this.state.firstLoad = false;
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    });
    _defineProperty(this, "getDefaultLocale", function (locale) {
      fetch('https://raw.githubusercontent.com/kenzap/' + _this.state.ext + '/main/public/locales/' + locale + '.json', {
        method: 'get',
        headers: {}
      }).then(function (response) {
        return response.text();
      }).then(function (response) {
        _this.state.locales[locale] = response;
        _this.shouldLocaleModal();
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    });
    _defineProperty(this, "render", function (response) {
      initBreadcrumbs([{
        link: link('https://dashboard.kenzap.cloud?launcher=translate'),
        text: __html('Dashboard')
      }, {
        link: link('/'),
        text: __html('Translate')
      }, {
        text: __html('Extension')
      }]);
      _this.state.locales = response.locales;
      document.querySelector(".table thead").innerHTML = "\n        <tr>\n            <th>".concat(__html("Locale"), "</th>\n            <th>").concat(__html("Code"), "</th>\n            <th>").concat(__html("Updated"), "</th>\n            <th>").concat(__html(""), "</th>\n        </tr>");
      var rows = "";
      response.locales.forEach(function (el, i) {
        var l = languages.filter(function (obj) {
          return obj.code === el.language;
        });
        var c = countries.filter(function (obj) {
          return obj.code === el.location;
        });
        var localeTitle = __html(l[0].name) + (c[0] ? ' (' + __html(c[0].name) + ')' : '');
        rows += "\n            <tr>\n                <td class=\"py-3\">\n                    <a href=\"#\" class=\"edit-locale\" data-title=\"".concat(localeTitle, "\" data-language=\"").concat(el.language, "\" data-id=\"").concat(el._id, "\">").concat(localeTitle, "</a> ").concat(el.location ? '<img class="ms-2 cc-flag" src="https://cdn.kenzap.com/flag/' + el.location.toLowerCase() + '.svg" alt="location footer flag">' : '', "\n                </td>\n                <td class=\"py-3\">\n                    ").concat(el.locale, "\n                </td>\n                <td class=\"py-3\">\n                    ").concat(formatTime(el.updated), "\n                </td>\n                <td class=\"text-end\">\n                    <div class=\"dropdown applicationsActionsCont\" data-boundary=\"viewport\" data-bs-boundary=\"viewport\">\n                        <svg id=\"applicationsActions").concat(i, "\" data-bs-toggle=\"dropdown\" data-boundary=\"viewport\" data-bs-boundary=\"viewport\" aria-expanded=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"bi bi-three-dots-vertical dropdown-toggle po\" viewBox=\"0 0 16 16\">\n                            <path d=\"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z\"/>\n                        </svg>\n                        <ul class=\"dropdown-menu\" aria-labelledby=\"applicationsActions").concat(i, "\">\n                            <li><a href=\"#\" data-title=\"").concat(localeTitle, "\" data-language=\"").concat(el.language, "\" data-id=\"").concat(el._id, "\" data-index=\"").concat(i, "\" class=\"dropdown-item po edit-locale text-dark d-flex justify-content-between align-items-center\">").concat(__html('Edit'), "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pencil-square\" viewBox=\"0 0 16 16\"><path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z\"/><path fill-rule=\"evenodd\" d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z\"/></svg></a></li>\n                            <li><a href=\"#\" data-title=\"").concat(localeTitle, "\" data-language=\"").concat(el.language, "\" data-id=\"").concat(el._id, "\" data-index=\"").concat(i, "\" class=\"dropdown-item d-none po sync-locale d-flex justify-content-between align-items-center\" >").concat(__html('Sync'), "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-translate\" viewBox=\"0 0 16 16\"><path d=\"M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z\"/><path d=\"M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31\"/></svg></a></li>\n                            <li><hr class=\"dropdown-divider d-none-\"></li>\n                            <li><a href=\"#\" data-id=\"").concat(el._id, "\" data-index=\"").concat(i, "\" class=\"dropdown-item po remove-locale text-danger d-flex justify-content-between align-items-center\">").concat(__html('Remove'), "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"><path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/><path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/></svg></a></li>\n                        </ul>\n                    </div>\n                </td>\n            </tr>");
      });
      if (response.locales.length) {
        document.querySelector(".table tbody").innerHTML = rows;
      } else {
        document.querySelector(".table tbody").innerHTML = "<tr><td colspan=\"6\">".concat(__html("Please add your first locale."), "</td></tr>");
      }
      hideLoader();
    });
    _defineProperty(this, "listeners", function () {
      onClick('.edit-locale', _this.editLocale);
      onClick('.sync-locale', function (e) {
        e.preventDefault();
        _this.state.currentRow = e.currentTarget;
      });
      onClick('.remove-locale', _this.removeLocale);
      if (!_this.state.firstLoad) return;
      onClick('.btn-add', function (e) {
        e.preventDefault();
        addLocaleModal(_this);
      });
    });
    _defineProperty(this, "editLocale", function (e) {
      _this.state.currentRow = e.currentTarget;
      showLoader();
      _this.state.ajaxCount = 0;
      fetch(getAPI(), {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: {
            data: {
              type: 'find',
              key: 'locale-' + _this.state.ext,
              id: _this.state.currentRow.dataset.id,
              fields: ['extension', 'content']
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        hideLoader();
        if (response.success) {
          _this.state.localesDB = response;
          _this.shouldLocaleModal();
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
      _this.getDefaultLocale('default');
      _this.getDefaultLocale(_this.state.currentRow.dataset.language);
    });
    _defineProperty(this, "removeLocale", function (e) {
      e.preventDefault();
      var c = confirm(__html('Completely remove this locale and translations?'));
      if (!c) return;
      fetch(getAPI(), {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: {
            locale: {
              type: 'delete',
              key: 'locale-' + _this.state.ext,
              id: e.currentTarget.dataset.id
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          toast(__html('Locale removed'));
          _this.data();
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    });
    _defineProperty(this, "addTransRow", function (e) {
      var o = document.querySelector('.add-original').value,
        t = document.querySelector('.add-translated').value;
      if (o.length == 0) {
        alert(__html('Original text can not be empty'));
        return;
      }
      if (t.length == 0) {
        alert(__html('Translated text can not be empty'));
        return;
      }
      if (!document.querySelector('.edit-original[data-title="' + o + '"]')) {
        var row = _this.getLocalModalRow({
          id: e.currentTarget.id,
          original: o,
          translated: t,
          type: 'content'
        });
        document.querySelector('.add-row').insertAdjacentHTML('afterend', row);
        onClick('.remove-locale-text', _this.removeTransRow);
        document.querySelector('.add-original').value = "";
        document.querySelector('.add-translated').value = "";
      } else {
        alert(__html("Text is already in the list"));
      }
      setTimeout(function () {
        return document.querySelector(".add-original").focus();
      }, 100);
    });
    _defineProperty(this, "removeTransRow", function (e) {
      e.preventDefault();
      var c = confirm(__html('Remove this translation raw?'));
      if (!c) return;
      e.currentTarget.parentElement.parentElement.remove();
    });
    _defineProperty(this, "searchTextsCont", function (e) {
      document.querySelector(".search-db").classList.remove("d-none");
    });
    _defineProperty(this, "searchTexts", function (e) {
      var path = document.querySelector("#db-path").value;
      var from = document.querySelector("#source-language").value;
      var pa = path.split("/");
      if (path.length < 5) {
        alert(__html("Please specify valid path"));
        return;
      }
      if (from.length < 1) {
        alert(__html("Please select language"));
        return;
      }
      if (pa.length < 1) {
        alert(__html("Please specify valid path"));
        return;
      }
      showLoader();
      fetch(getAPI() + '/translate/', {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: {
            texts: {
              type: 'find',
              key: pa[0],
              fields: [pa[1]],
              from: from,
              to: _this.state.currentRow.dataset.language,
              limit: 1000
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          console.log(response);
          hideLoader();
          if (response.texts.length == 0) {
            alert(__html("Can not find available translation texts in the Cloud"));
            return;
          }
          var ti = 0;
          response.texts.forEach(function (text, i) {
            if (!document.querySelector('.edit-original[data-title="' + text.original + '"]')) {
              var row = _this.getLocalModalRow({
                id: _this.state.currentRow.dataset.id,
                original: text.original,
                translated: text.translated,
                type: 'content',
                bg: '#fff3cd'
              });
              document.querySelector('.add-row').insertAdjacentHTML('afterend', row);
              ti++;
            } else {
              console.log("Skiping row entry");
            }
          });
          toast(__html('Adding %1$ translated texts', ti));
          onClick('.remove-locale-text', _this.removeTransRow);
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    });
    _defineProperty(this, "getLocalModalRow", function (obj) {
      return "<tr ".concat(obj.bg ? 'style="background-color:' + obj.bg + '"' : "", ">\n                    <td class=\"py-1\">\n                        <span class=\"edit-original\" data-title=\"").concat(obj.original, "\" data-id=\"").concat(obj.id, "\">").concat(obj.original, "</span>\n                    </td>\n                    <td class=\"py-1\">\n                        <textarea class=\"form-control edit-translated\" data-original=\"").concat(obj.original, "\" data-type=\"").concat(obj.type, "\" rows=\"1\">").concat(obj.translated, "</textarea>\n                    </td>\n                    <td class=\"text-end\">\n                        <a href=\"#\" data-id=\"").concat(obj.id, "\" title=\"").concat(__html('remove translation from the table'), "\" class=\"remove-locale-text text-danger me-2 ").concat(obj.type == 'extension' ? 'd-none' : '', "\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\">\n                                <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/>\n                                <path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/>\n                            </svg></a>\n                    </td>\n                </tr>");
    });
    _defineProperty(this, "shouldLocaleModal", function () {
      _this.state.ajaxCount += 1;
      if (_this.state.ajaxCount == 3) editLocaleModal(_this);
    });
    _defineProperty(this, "home", function () {
      if (!_this.state.firstLoad) return;
      document.querySelector('#contents').innerHTML = HTMLContent(_this, __);
    });
    this.state = {
      firstLoad: true,
      locales: {},
      ext: getParam('ext'),
      slug: getParam('slug'),
      ajaxCount: 0,
      data: {}
    };
    this.init();
  });
  new EditLocale();

})();
//# sourceMappingURL=index.js.map

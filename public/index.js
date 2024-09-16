
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

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
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
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

  var initFooter = function initFooter(_this) {
    var left = __html('Translate 1.2.0 by %1$Kenzap%2$. ❤️ Licensed %3$GPLv3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/translate" target="_blank">', '</a>');
    var right = "";
    document.querySelector("footer .row").innerHTML = "\n    <div class=\"d-sm-flex justify-content-center justify-content-sm-between\">\n        <span class=\"text-muted text-center text-sm-left d-block d-sm-inline-block\">".concat(left, "</span>\n        <span class=\"float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted\">").concat(right, "</span>\n    </div>");
  };

  var HTMLContent = function HTMLContent(__) {
    return "\n        <div class=\"container p-edit\">\n            <div class=\"d-flex justify-content-between bd-highlight mb-3\">\n                <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n                <div class=\"d-none\">\n                    <a style=\"margin-right:16px;\" class=\"preview-link nounderline\" target=\"_blank\" href=\"#\">".concat(__('preview'), "<i class=\"mdi mdi-monitor\"></i></a>\n                    <button class=\"btn btn-primary btn-publish\" type=\"button\">").concat(__('Publish menu'), "</button>\n                </div>\n            </div>\n            <div class=\"row\">\n\n                <div class=\"col-lg-12 grid-margin stretch-card\">\n                    <div class=\"card border-white shadow-sm\">\n                        <div class=\"card-body\">\n                        <h4 class=\"card-title\">").concat(__('Active extensions'), "</h4>\n                        <p class=\"form-text\">\n                            ").concat(__('Choose <a href="#">extension</a></code> from the list to set translations.'), "\n                        </p>\n\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <div class=\"table-responsive\">\n                                    <table\n                                        class=\"table table-hover table-borderless align-middle table-striped table-p-list\" style=\"min-width: 800px;\">\n                                        <thead>\n\n                                        </thead>\n                                        <tbody>\n\n                                        </tbody>\n                                    </table>\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n\n            </div>\n        </div>\n\n        <div class=\"modal\" tabindex=\"-1\">\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\"></h5>\n                        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                    </div>\n                    <div class=\"modal-body\">\n\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-primary btn-modal\"></button>\n                        <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"position-fixed bottom-0 p-2 m-4 end-0 align-items-center\">\n            <div class=\"toast hide align-items-center text-white bg-dark border-0\" role=\"alert\" aria-live=\"assertive\"\n                aria-atomic=\"true\" data-bs-delay=\"3000\">\n                <div class=\"d-flex\">\n                    <div class=\"toast-body\"></div>\n                    <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\"\n                        aria-label=\"Close\"></button>\n                </div>\n            </div>\n        </div>\n        \n    ");
  };

  var Home = _createClass(function Home() {
    var _this = this;
    _classCallCheck(this, Home);
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
            dashboard: {
              type: 'dashboard'
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          initHeader(response);
          _this.page();
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
    _defineProperty(this, "getExtensions", function () {
      var params = new URLSearchParams();
      params.append("cmd", "preview_extensions");
      params.append("s", '');
      params.append("token", getCookie('kenzap_token'));
      fetch('https://siteapi.kenzap.cloud/v1/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/x-www-form-urlencoded'
        },
        body: params
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          console.log(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    });
    _defineProperty(this, "render", function (response) {
      initBreadcrumbs([{
        link: link('https://dashboard.kenzap.cloud?launcher=translate'),
        text: __('Dashboard')
      }, {
        text: __('Translate')
      }]);
      _this.state.dashboard = response.dashboard;
      document.querySelector(".table thead").innerHTML = "\n        <tr>\n            <th>".concat(__("Extension"), "</th>\n            <th>").concat(__(""), "</th>\n        </tr>");
      var rows = "";
      Object.keys(response.dashboard.extensions).forEach(function (el) {
        if (!response.dashboard.extensions[el].links) return;
        rows += "\n            <tr\">\n                <td class=\"py-3\">\n                    ".concat(response.dashboard.extensions[el].links[0].icon, " <a href=\"").concat(link('/edit/?ext=' + el + '&slug=' + response.dashboard.extensions[el].slug), "\">").concat(response.dashboard.extensions[el].slug, "</a>\n                </td>\n                <td class=\"text-end\"> \n                    <a href=\"").concat(link('/edit/?ext=' + el + '&slug=' + response.dashboard.extensions[el].slug), "\" data-id=\"").concat(link('/edit/?ext=' + el), "\" class=\"edit-ext text-dark \">\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pencil-square me-2\" viewBox=\"0 0 16 16\">\n                            <path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z\"/>\n                            <path fill-rule=\"evenodd\" d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z\"/>\n                        </svg>\n                    </a>\n                </td>\n            </tr>");
      });
      document.querySelector(".table tbody").innerHTML = rows;
      hideLoader();
    });
    _defineProperty(this, "listeners", function () {
      if (!_this.state.firstLoad) return;
    });
    _defineProperty(this, "page", function () {
      if (!_this.state.firstLoad) return;
      document.querySelector('#contents').innerHTML = HTMLContent(__);
    });
    this.state = {
      firstLoad: true,
      html: '',
      data: {},
      ajaxQueue: 0
    };
    this.init();
  });
  new Home();

})();
//# sourceMappingURL=index.js.map

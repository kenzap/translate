!function(){"use strict";const e=e=>{let t=new URLSearchParams(window.location.search),n=t.get("sid")?t.get("sid"):"",a=-1==e.indexOf("?")?"?sid="+n:"&sid="+n;return e+a},t=()=>{let e=new URLSearchParams(window.location.search);return e.get("sid")?e.get("sid"):""},n=e=>{let t=e+"=",n=decodeURIComponent(document.cookie).split(";");for(let e=0;e<n.length;e++){let a=n[e];for(;" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(t))return a.substring(t.length,a.length)}return""},a=()=>{let e=localStorage.hasOwnProperty("header")&&localStorage.hasOwnProperty("header-version")?localStorage.getItem("header-version"):0,a=window.location.hostname+"/"+t()+"/"+n("locale");return a!=n("check")&&(e=0,console.log("refresh")),((e,t,n)=>{let a="";if(n){let e=new Date;e.setTime(e.getTime()+24*n*60*60*1e3),a=";expires="+e.toUTCString()}document.cookie=e+"="+(escape(t)||"")+a+";path=/;domain=.kenzap.cloud"})("check",a,5),e};n("kenzap_api_key"),n("locale")&&n("locale"),a(),n("kenzap_token"),t();const o=(e,t)=>{if(document.querySelector(e))for(let n of document.querySelectorAll(e))n.removeEventListener("click",t,!0),n.addEventListener("click",t,!0)};var s=function(e){for(var t=e+"=",n=decodeURIComponent(document.cookie).split(";"),a=0;a<n.length;a++){for(var o=n[a];" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return""},i={state:{firstLoad:!0,html:"",data:{},ajaxQueue:0},init:function(){i.getData()},getData:function(){i.state.firstLoad&&(()=>{let e=document.querySelector(".loader");e&&(e.style.display="block")})(),fetch(localStorage.getItem("API")?localStorage.getItem("API"):"https://api-eu.kenzap.cloud",{method:"post",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+n("kenzap_api_key"),"Kenzap-Locale":n("locale")?n("locale"):"en","Kenzap-Header":a(),"Kenzap-Token":n("kenzap_token"),"Kenzap-Sid":t()},body:JSON.stringify({query:{locale:{type:"locale",id:s("lang")},dashboard:{type:"dashboard"}}})}).then((function(e){return e.json()})).then((function(e){e.success?((e=>{if(e.header&&localStorage.setItem("header",e.header),e.cdn&&localStorage.setItem("cdn",e.cdn),!document.querySelector("#k-script")){let e=document.createElement("div");e.innerHTML=localStorage.getItem("header"),e=e.firstChild,document.body.prepend(e),Function(document.querySelector("#k-script").innerHTML).call("test")}e.locale&&window.i18n.init(e.locale)})(e),i.loadHomeStructure(),i.renderPage(e),i.initListeners(),i.initFooter(),i.state.firstLoad=!1,console.log(e)):(e=>{if(console.log(e),isNaN(e.code)){let a=e;try{a=JSON.stringify(a)}catch(e){}let o=new URLSearchParams;return o.append("cmd","report"),o.append("sid",t()),o.append("token",n("kenzap_token")),o.append("data",a),fetch("https://api-v1.kenzap.cloud/error/",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded"},body:o}),void alert("Can not connect to Kenzap Cloud")}if(401===e.code){if(-1!=window.location.href.indexOf("localhost"))return void alert(e.reason);location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+encodeURIComponent(window.location.href)}else alert(e.reason)})(e)})).catch((function(e){console.error("Error:",e)}))},getExtensions:function(){var e=new URLSearchParams;e.append("cmd","preview_extensions"),e.append("s",""),e.append("token",s("kenzap_token")),fetch("https://siteapi.kenzap.cloud/v1/",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded"},body:e}).then((function(e){return e.json()})).then((function(e){e.success&&console.log(e)})).catch((function(e){console.error("Error:",e)}))},renderPage:function(t){(e=>{let t='<ol class="breadcrumb mt-2 mb-0">';for(let n of e)void 0===n.link?t+=`<li class="breadcrumb-item">${n.text}</li>`:t+=`<li class="breadcrumb-item"><a href="${n.link}">${n.text}</a></li>`;t+="</ol>",document.querySelector(".bc").innerHTML=t})([{link:e("https://dashboard.kenzap.cloud?launcher=translate"),text:__("Dashboard")},{text:__("Translate")}]),i.state.dashboard=t.dashboard,document.querySelector(".table thead").innerHTML="\n        <tr>\n            <th>".concat(__("Extension"),"</th>\n            <th>").concat(__(""),"</th>\n        </tr>");var n="";for(var a in t.dashboard.extensions)t.dashboard.extensions[a].links&&(n+='\n            <tr">\n                <td class="py-3">\n                    '.concat(t.dashboard.extensions[a].links[0].icon,' <a href="').concat(e("/edit/?ext="+a+"&slug="+t.dashboard.extensions[a].slug),'">').concat(t.dashboard.extensions[a].slug,'</a>\n                </td>\n                <td class="text-end"> \n                    <a href="').concat(e("/edit/?ext="+a+"&slug="+t.dashboard.extensions[a].slug),'" data-id="').concat(e("/edit/?ext="+a),'" class="edit-ext text-dark ">\n                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square me-2" viewBox="0 0 16 16">\n                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>\n                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>\n                        </svg>\n                    </a>\n                </td>\n            </tr>'));document.querySelector(".table tbody").innerHTML=n,(()=>{let e=document.querySelector(".loader");e&&(e.style.display="none")})()},initListeners:function(){i.state.firstLoad&&(o(".btn-publish",i.listeners.publish),o(".domain-list li a",i.listeners.domainChange),o(".btn-modal",i.listeners.modalSuccessBtn))},listeners:{modalSuccessBtn:function(e){i.listeners.modalSuccessBtnFunc(e)},modalSuccessBtnFunc:null},loadHomeStructure:function(){i.state.firstLoad&&(document.querySelector("#contents").innerHTML=function(e){return'\n        <div class="container p-edit">\n            <div class="d-flex justify-content-between bd-highlight mb-3">\n                <nav class="bc" aria-label="breadcrumb"></nav>\n                <div class="d-none">\n                    <a style="margin-right:16px;" class="preview-link nounderline" target="_blank" href="#">'.concat(e("preview"),'<i class="mdi mdi-monitor"></i></a>\n                    <button class="btn btn-primary btn-publish" type="button">').concat(e("Publish menu"),'</button>\n                </div>\n            </div>\n            <div class="row">\n\n                <div class="col-lg-12 grid-margin stretch-card">\n                    <div class="card border-white shadow-sm">\n                        <div class="card-body">\n                        <h4 class="card-title">').concat(e("Active extensions"),'</h4>\n                        <p class="form-text">\n                            ').concat(e('Choose <a href="#">extension</a></code> from the list to set translations.'),'\n                        </p>\n\n                        <div class="row">\n                            <div class="col-sm-12">\n                                <div class="table-responsive">\n                                    <table\n                                        class="table table-hover table-borderless align-middle table-striped table-p-list" style="min-width: 800px;">\n                                        <thead>\n\n                                        </thead>\n                                        <tbody>\n\n                                        </tbody>\n                                    </table>\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n\n            </div>\n        </div>\n\n        <div class="modal" tabindex="-1">\n            <div class="modal-dialog">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <h5 class="modal-title"></h5>\n                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n                    </div>\n                    <div class="modal-body">\n\n                    </div>\n                    <div class="modal-footer">\n                        <button type="button" class="btn btn-primary btn-modal"></button>\n                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center">\n            <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive"\n                aria-atomic="true" data-bs-delay="3000">\n                <div class="d-flex">\n                    <div class="toast-body"></div>\n                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"\n                        aria-label="Close"></button>\n                </div>\n            </div>\n        </div>\n        \n    ')}(__))},initFooter:function(){var e,t;e=__("Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.",'<a class="text-muted" href="https://kenzap.com/" target="_blank">',"</a>",'<a class="text-muted" href="https://github.com/kenzap/translate" target="_blank">',"</a>"),t="",document.querySelector("footer .row").innerHTML=`\n    <div class="d-sm-flex justify-content-center justify-content-sm-between">\n        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">${e}</span>\n        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">${t}</span>\n    </div>`}};i.init()}();

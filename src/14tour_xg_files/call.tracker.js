;(function () {
var webPacker = {"address":"https:\/\/crm.gameleonteam.ru"};

;(function () {
(function(){"use strict";if(typeof webPacker==="undefined"){return}var e=[];function t(t){this.name=t;e.push(this)}t.prototype={language:null,languages:[],messages:{},properties:{},setProperties:function(e){this.properties=e||{}},loadResources:function(e){return(e||[]).forEach(function(e){webPacker.resource.load(e,this)},this)},message:function(e){var t=this.messages;if(e in t){return t[e]}var n=this.language||"en";if(t[n]&&t[n][e]){return t[n][e]}n="en";if(t[n]&&t[n][e]){return t[n][e]}return""},getMessages:function(e){var t=e||this.language||"en";var n=this.messages;if(n[t]){return n[t]}t=this.language||"en";if(n[t]){return n[t]}if(n.en){return n.en}return n}};webPacker.getModule=function(e){return this.getModules().filter(function(t){return t.name===e})[0]};webPacker.getModules=function(){return e};webPacker.module=t;webPacker.getAddress=function(){return this.address};webPacker.resource={load:function(e,t){switch(e.type){case"css":this.loadCss(e.content);break;case"js":this.loadJs(e.content||e.src,!e.content);break;case"html":case"layout":if(t){var n=t.messages[t.language]?t.messages[t.language]:t.messages;for(var r in n){if(!n.hasOwnProperty(r)){continue}e.content=e.content.replace(new RegExp("%"+r+"%","g"),n[r])}}this.loadLayout(e.content);break}},loadLayout:function(e){if(!e){return}var t=document.createElement("DIV");t.innerHTML=e;document.body.insertBefore(t,document.body.firstChild)},loadJs:function(e,t,n){if(!e){return}var r=document.createElement("SCRIPT");r.setAttribute("type","text/javascript");r.setAttribute("async","");if(t){r.setAttribute("src",src)}else{if(webPacker.browser.isIE()){r.text=text}else{r.appendChild(document.createTextNode(e))}}this.appendToHead(r,!t&&n)},appendToHead:function(e,t){(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(e);if(t){document.head.removeChild(e)}},loadCss:function(e){if(!e){return}var t=document.createElement("STYLE");t.setAttribute("type","text/css");if(t.styleSheet){t.styleSheet.cssText=e}else{t.appendChild(document.createTextNode(e))}this.appendToHead(t)}};webPacker.type={isArray:function(e){return e&&Object.prototype.toString.call(e)==="[object Array]"},isString:function(e){return e===""?true:e?typeof e==="string"||e instanceof String:false},toArray:function(e){return Array.prototype.slice.call(e)}};webPacker.classes={change:function(e,t,n){e?n?this.add(e,t):this.remove(e,t):null},remove:function(e,t){e?e.classList.remove(t):null},add:function(e,t){e?e.classList.add(t):null},has:function(e,t){return e&&e.classList.contains(t)}};webPacker.url={};webPacker.url.parameter={list:null,get:function(e){var t=this.getObject();return t.hasOwnProperty(e)?decodeURIComponent(t[e]):null},has:function(e){var t=this.getObject();return t.hasOwnProperty(e)},getList:function(){if(this.list){return this.list}var e=window.location.search.substr(1);if(e.length<=1){return[]}this.list=e.split("&").map(function(e){var t=e.split("=");return{name:t[0],value:t[1]||""}},this);return this.list},getObject:function(){return this.getList().reduce(function(e,t){e[t.name]=t.value;return e},{})}};webPacker.ready=function(e){document.readyState==="complete"||document.readyState==="loaded"?e():this.addEventListener(window,"DOMContentLoaded",e)};webPacker.addEventListener=function(e,t,n){e=e||window;if(window.addEventListener){e.addEventListener(t,n,false)}else{e.attachEvent("on"+t,n)}};webPacker.event={listeners:[],on:function(e,t,n){this.listeners.filter(function(n){return n[0]===e&&n[1]===t}).forEach(function(e){e[2].apply(this,n)})},listen:function(e,t,n){this.listeners.push([e,t,n])}};webPacker.cookie={setItem:function(e,t,n){try{this.set(e,JSON.stringify(t),n)}catch(e){}},getItem:function(e){try{return JSON.parse(this.get(e))||null}catch(e){return null}},set:function(e,t,n){n=n||3600*24*365*10;var r=new Date((new Date).getTime()+1e3*n);document.cookie=e+"="+t+"; path=/; expires="+r.toUTCString()},get:function(e){var t=document.cookie.match(new RegExp("(?:^|; )"+e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return t?decodeURIComponent(t[1]):null}};webPacker.ls={supported:null,removeItem:function(e){if(!this.isSupported())return;window.localStorage.removeItem(e)},setItem:function(e,t,n){if(!this.isSupported())return;try{if(n&&t&&typeof t==="object"){n=parseInt(n);t.cacheData={time:parseInt(Date.now()/1e3),ttl:isNaN(n)?3600:n}}window.localStorage.setItem(e,JSON.stringify(t))}catch(e){}},getItem:function(e,t){if(!this.isSupported())return null;try{var n=JSON.parse(window.localStorage.getItem(e))||null;if(t&&n&&typeof n==="object"&&n.cacheData){t=parseInt(t);t=t&&!isNaN(t)?t:n.cacheData.ttl;if(parseInt(Date.now()/1e3)>n.cacheData.time+t){n=null;this.removeItem(e)}}if(n&&typeof n==="object"){delete n.cacheData}return n}catch(e){return null}},isSupported:function(){if(this.supported===null){this.supported=false;try{var e="b24crm-x-test";window.localStorage.setItem(e,"x");window.localStorage.removeItem(e);this.supported=true}catch(e){}}return this.supported}};webPacker.browser={isIOS:function(){return/(iPad;)|(iPhone;)/i.test(navigator.userAgent)},isOpera:function(){return navigator.userAgent.toLowerCase().indexOf("opera")!==-1},isIE:function(){return document.attachEvent&&!this.isOpera()},isMobile:function(){return/(ipad|iphone|android|mobile|touch)/i.test(navigator.userAgent)}};webPacker.analytics={trackGa:function(e,t,n){if(window.gtag){if(e==="pageview"){if(window.dataLayer){var r=window.dataLayer.filter(function(e){return e[0]==="config"}).map(function(e){return e[1]});if(r.length>0){window.gtag("config",r[0],{page_path:t})}}}else if(e==="event"){window.gtag("event",n,{event_category:t})}}else if(window.dataLayer){if(e==="pageview"){window.dataLayer.push({event:"VirtualPageview",virtualPageURL:t})}else if(e==="event"){window.dataLayer.push({event:"crm-form",eventCategory:t,eventAction:n})}}else if(window.ga){var a=window.ga.getAll().filter(function(e){return e.get("trackingId")==item.gaId}).length>0;if(!item.gaId||!a){if(item.params[2])window.ga("send",e,t,n);else window.ga("send",e,t)}}},trackYa:function(e){if(!window["Ya"]){return}var t;if(Ya.Metrika&&Ya.Metrika.counters()[0]){t=Ya.Metrika.counters()[0].id}else if(Ya.Metrika2&&Ya.Metrika2.counters()[0]){t=Ya.Metrika2.counters()[0].id}if(t&&window["yaCounter"+t]){window["yaCounter"+t].reachGoal(e)}}}})();
//# sourceMappingURL=https://crm.gameleonteam.ru/bitrix/js/ui/webpacker/ui.webpacker.map.js


})();

;(function () {
var module = new webPacker.module('crm.tracking.guest');
module.setProperties({"lifespan":28});
(function(){"use strict";if(typeof webPacker==="undefined"){return}window.b24Tracker=window.b24Tracker||{};if(window.b24Tracker.guest){return}window.b24Tracker.guest={cookieName:"b24_crm_guest_id",returnCookieName:"b24_crm_guest_id_returned",requestUrl:"",isInit:false,init:function(){if(this.isInit){return}this.isInit=true;this.requestUrl=(webPacker.getAddress()+"/").match(/((http|https):\/\/[^\/]+?)\//)[1]+"/pub/guest.php";if(module.properties["lifespan"]){var t=parseInt(module.properties["lifespan"]);if(!isNaN(t)&&t){r.lifespan=t}}e.collect();r.collect();i.collect();this.checkReturn();window.b24order=window.b24order||[];window.b24order.forEach(function(e){this.registerOrder(e)},this);window.b24order.push=function(e){this.registerOrder(e)}.bind(this)},checkReturn:function(){if(!this.getGidCookie()||webPacker.cookie.get(this.returnCookieName)){return}n.query(this.requestUrl,{a:"event",e:"Return"},this.onAjaxResponse.bind(this));webPacker.cookie.set(this.returnCookieName,"y",3600*6)},storeTrace:function(e,t){t=t||"storeTrace";n.query(this.requestUrl,{a:t,d:{trace:e}})},link:function(e){if(!e||this.getGidCookie()){return}n.query(this.requestUrl,{a:"link",gid:e},this.onAjaxResponse.bind(this))},register:function(){if(this.getGidCookie()){return}n.query(this.requestUrl,{a:"register"},this.onAjaxResponse.bind(this))},onAjaxResponse:function(e){e=e||{};e.data=e.data||{};if(this.getGidCookie()==null&&!!e.data.gid){webPacker.cookie.set(this.cookieName,e.data.gid);webPacker.cookie.set(this.returnCookieName,"y",3600*6)}},getPages:function(){return i.list()},getTags:function(){return r.list()},registerOrder:function(e){if(!module.properties["canRegisterOrder"]){return}this.storeTrace(this.getTraceOrder(e),"registerOrder")},getTraceOrder:function(e){e=e||{};var t=e.id||"";if(!Number.isNaN(t)&&typeof t==="number"){t=t.toString()}if(!t||!webPacker.type.isString(t)||!t.match(/^[\d\w.\-\/\\_#]{1,30}$/i)){if(window.console&&window.console.error){window.console.error("Wrong order id: "+e.id)}}var r=parseFloat(e.sum);if(isNaN(r)||r<0){if(window.console&&window.console.error){window.console.error("Wrong order sum: "+e.sum)}}this.sentOrders=this.sentOrders||[];if(this.sentOrders.indexOf(t)>=0){return}this.sentOrders.push(t);return this.getTrace({channels:[{code:"order",value:t}],order:{id:t,sum:r}})},getTrace:function(t){var r=this.remindTrace(t);e.clear();return r},remindTrace:function(t){return JSON.stringify(e.current(t))},getUtmSource:function(){return this.getTags().utm_source||""},getGidCookie:function(){return webPacker.cookie.get(this.cookieName)}};var e={maxCount:5,lsKey:"b24_crm_guest_traces",previous:function(){return webPacker.ls.getItem(this.lsKey)||{list:[]}},current:function(e){e=e||{};var n={url:window.location.href,ref:document.referrer,device:{isMobile:webPacker.browser.isMobile()},tags:r.getData(),client:t.getData(),pages:{list:i.list()},gid:b24Tracker.guest.getGidCookie()};if(e.previous!==false){n.previous=this.previous()}if(e.channels){n.channels=e.channels}if(e.order){n.order=e.order}return n},clear:function(){webPacker.ls.removeItem(this.lsKey)},collect:function(){if(!r.isSourceDetected()){return}var e=this.previous();e=e||{};e.list=e.list||[];e.list.push(this.current({previous:false}));if(e.list.length>this.maxCount){e.list.shift()}r.clear();i.clear();webPacker.ls.setItem(this.lsKey,e)}};var t={getData:function(){var e={gaId:this.getGaId(),yaId:this.getYaId()};if(!e.gaId)delete e["gaId"];if(!e.yaId)delete e["yaId"];return e},getGaId:function(){var e;if(window.ga){ga(function(t){e=t.get("clientId")});if(e){return e}e=ga.getAll()[0].get("clientId")}if(e){return e}e=(document.cookie||"").match(/_ga=(.+?);/);if(e){e=(e[1]||"").split(".").slice(-2).join(".")}return e?e:null},getYaId:function(){var e;if(window.Ya){var t;if(Ya.Metrika&&Ya.Metrika.counters()[0]){t=Ya.Metrika.counters()[0].id}else if(Ya.Metrika2&&Ya.Metrika2.counters()[0]){t=Ya.Metrika2.counters()[0].id}if(!t){return null}if(window.ym&&typeof window.ym==="object"){ym(t,"getClientID",function(t){e=t})}if(!e&&window["yaCounter"+t]){e=window["yaCounter"+t].getClientID()}}if(!e){e=webPacker.cookie.get("_ym_uid")}return e?e:null}};var r={lifespan:28,lsPageKey:"b24_crm_guest_utm",tags:["utm_source","utm_medium","utm_campaign","utm_content","utm_term"],list:function(){return this.getData().list||{}},isSourceDetected:function(){var e=webPacker.url.parameter.get(this.tags[0]);return e!==null&&e},getGCLid:function(){return this.getData().gclid||null},getTimestamp:function(e){return(e?null:parseInt(this.getData().ts))||parseInt(Date.now()/1e3)},getData:function(){return(webPacker.ls.isSupported()?webPacker.ls.getItem(this.lsPageKey):webPacker.cookie.getItem(this.lsPageKey))||{}},clear:function(){webPacker.ls.removeItem(this.lsPageKey)},collect:function(){var e=this.getTimestamp();var t=webPacker.url.parameter.getList().filter(function(e){return this.tags.indexOf(e.name)>-1},this);if(t.length>0){t=t.filter(function(e){return e.value.trim().length>0}).reduce(function(e,t){e[t.name]=decodeURIComponent(t.value);return e},{});e=this.getTimestamp(true)}else{t=this.list()}var r=webPacker.url.parameter.getList().filter(function(e){return e.name==="gclid"},this).map(function(e){return e.value});r=r[0]||this.getGCLid();if(this.getTimestamp(true)-e>this.lifespan*3600*24){this.clear();return}var i={ts:e,list:t,gclid:r};webPacker.ls.isSupported()?webPacker.ls.setItem(this.lsPageKey,i):webPacker.cookie.setItem(this.lsPageKey,i)}};var i={maxCount:5,lsPageKey:"b24_crm_guest_pages",list:function(){return webPacker.ls.getItem(this.lsPageKey)},clear:function(){webPacker.ls.removeItem(this.lsPageKey)},collect:function(){if(!document.body){return}var e=document.body.querySelector("h1");e=e?e.textContent.trim():"";if(e.length===0){e=document.head.querySelector("title");e=e?e.textContent.trim():""}e=e.substring(0,40);var t=window.location.href;var r=webPacker.ls.getItem(this.lsPageKey);r=r instanceof Array?r:[];var i=-1;r.forEach(function(e,r){if(e[0]===t)i=r});if(i>-1){r=r.slice(0,i).concat(r.slice(i+1))}while(r.length>=this.maxCount){r.shift()}var n=new Date;r.push([t,Math.round(n.getTime()/1e3),e]);webPacker.ls.setItem(this.lsPageKey,r)}};var n={query:function(e,t,r){this.ajax=null;if(window.XMLHttpRequest){this.ajax=new XMLHttpRequest}else if(window.ActiveXObject){this.ajax=new window.ActiveXObject("Microsoft.XMLHTTP")}"withCredentials"in this.ajax?this.post(e,t,r):this.get(e,t)},get:function(e,t){var r=document.createElement("script");r.type="text/javascript";r.src=e+"?"+this.stringify(t);r.async=true;var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)},post:function(e,t,r){var i=this.ajax;i.open("POST",e,true);i.setRequestHeader("Content-Type","application/x-www-form-urlencoded");i.withCredentials=true;i.onreadystatechange=function(){if(r&&i.readyState===4&&i.status===200){r.apply(this,[JSON.parse(this.responseText)])}};i.send(this.stringify(t))},stringify:function(e){var t=[];if(Object.prototype.toString.call(e)==="[object Array]"){}else if(typeof e==="object"){for(var r in e){if(!e.hasOwnProperty(r)){continue}var i=e[r];if(typeof i==="object"){i=JSON.stringify(i)}t.push(r+"="+encodeURIComponent(i))}}return t.join("&")},getAjax:function(){if(this.ajax){return this.ajax}if(window.XMLHttpRequest){this.ajax=new XMLHttpRequest}else if(window.ActiveXObject){this.ajax=new window.ActiveXObject("Microsoft.XMLHTTP")}return this.ajax}};window.b24Tracker.guest.init()})();
//# sourceMappingURL=https://crm.gameleonteam.ru/bitrix/js/crm/tracking/guest/script.map.js


})();

;(function () {
var module = new webPacker.module('crm.tracking.tracker');
(function(){"use strict";if(typeof webPacker==="undefined"){return}function e(e){this.setTypes(e.types);this.setMap(e.map)}e.prototype={searched:null,setTypes:function(e){this.types=e||[];return this},setMap:function(e){this.map=e||[];return this},getFromHref:function(e,t){var r=e.href||"";if(!r){return null}r=r.substr(e.protocol.length||0).trim();return{node:e,values:[{type:t,value:r,cleaned:n.clean(t,r)}]}},isItemValid:function(e){if(!e){return false}if(!e.values){return false}if(e.values.length===0){return false}return!!e.node},getElementsBySelector:function(e,t){return webPacker.type.toArray(e.querySelectorAll(t))},replaceItem:function(e){if(this.map.length===0){return}var t=e.node.href;e.values.forEach(function(r){var i=n.replaceByMap(this.map,t,r.type,r.value,true);t=i.text;e.replaced={from:i.from,to:i.to}},this);if(t){e.node.href=t}this.textEngine.replace(e.node)},replace:function(e){e=e||document.body;this.textEngine=new t({types:this.types,map:this.map});this.search(e).forEach(this.replaceItem,this)},getSearched:function(e){return this.searched||this.search(e)},search:function(e){e=e||document.body;var t=[];this.types.forEach(function(r){var n=this.getElementsBySelector(e,r.selector);t=t.concat(n.map(function(e){return this.getFromHref(e,r.code)},this))},this);var r=t.filter(this.isItemValid,this);if(!this.searched){this.searched=r}return r}};function t(e){this.setTypes(e.types);this.setMap(e.map);this.setEnrich(e.isEnrichTextual)}t.prototype={searched:null,minTextLength:6,setTypes:function(e){this.types=e||[];return this},setMap:function(e){this.map=e||[];return this},setEnrich:function(e){this.isEnrichTextual=e||false;return this},getNodesByChildNodes:function(e){var t=[];if(!e.hasChildNodes()){return t}for(var r=0;r<e.childNodes.length;r++){var n=e.childNodes.item(r);if(n.nodeType===3){if(this.checkTextNode(n)){t.push(n)}}else{var i=this.getNodesByChildNodes(n,this.minTextLength);if(i.length>0){t=t.concat(i)}}}return t},getNodesByXPath:function(e){var t=[],r;var n="descendant-or-self::*[not(self::script|style|noscript)]/text()[string-length(normalize-space()) >= "+this.minTextLength+"]";var i=e.ownerDocument.evaluate(n,e,null,XPathResult.ANY_TYPE,null);while(r=i.iterateNext()){t.push(r)}return t},getNodesByTreeWalker:function(e){var t,r=[];var n=e.ownerDocument.createTreeWalker(e,NodeFilter.SHOW_TEXT,null,false);while(t=n.nextNode()){if(this.checkTextNode(t)){r.push(t)}}return r},getNodesByNodeIterator:function(e){var t,r=[];var n=e.ownerDocument.createNodeIterator(e,NodeFilter.SHOW_TEXT,null);while(t=n.nextNode()){if(this.checkTextNode(t)){r.push(t)}}return r},checkTextNode:function(e){switch(e.parentNode.nodeName){case"NOSCRIPT":case"SCRIPT":case"STYLE":return false}var t=(e.textContent||"").trim();return t.length>=this.minTextLength},prepareTextItem:function(e){var t={node:e,values:[]};var r=(e.nodeValue||"").trim();if(!r){return t}this.types.forEach(function(e){t.values=this.parseValues(r,e.regexp).map(function(t){return{type:e.code,value:t,cleaned:n.clean(e.code,t)}}).concat(t.values)},this);return t},parseValues:function(e,t){var r=e.match(t);if(!r||r.length===0){return[]}return r.map(n.trim).filter(n.hasLength)},replaceItem:function(e){var t=e.node.nodeValue;var i=t;e.values.forEach(function(t){var r=n.replaceByMap(this.map,i,t.type,t.value);if(r.text){i=r.text}if(!e.replaced){e.replaced={from:r.from,to:r.to}}},this);if(this.isEnrichTextual){r.enrich(this.map,e,i)}else if(i!==t){e.node.nodeValue=i}},uniqueItemValues:function(e){return n.uniqueArray(e,function(e,t){return e.value===t.value&&e.type===t.type})},replace:function(e){e=e||document.body;if(!e){return}this.search(e).forEach(this.replaceItem,this)},getSearched:function(e,t){return this.searched||this.search(e,t)},search:function(e,t){e=e||document.body;t=t||null;var r=e.ownerDocument.evaluate?this.getNodesByXPath:null;var n=e.ownerDocument.createTreeWalker?this.getNodesByTreeWalker:null;var i=e.ownerDocument.createNodeIterator?this.getNodesByNodeIterator:null;var a=this.getNodesByChildNodes;if(!t){var s=1;switch(s){case 1:t=r||n||i||a;break;case 2:t=n||i||r||a;break;case 0:default:t=n||a;break}}var o=t.apply(this,[e]).map(this.prepareTextItem,this).filter(function(e){var t=e.values.length>0;if(t){e.values=this.uniqueItemValues(e.values)}return t},this);if(!this.searched){this.searched=o}return o}};var r={getMappedValues:function(e,t){var r=[];t.forEach(function(t){r=n.filterMap(e,t.type,t.value).map(function(e){return{type:t.type,cleaned:e.final.cleaned,formatted:e.final.formatted}}).concat(r)},this);return r},getHtmlByType:function(e,t,r){var n=document.createElement("a");n.textContent=t;switch(e){case"phone":n.href="tel:"+r;break;case"email":n.href="mailto:"+r;break}return n.outerHTML},split:function(e,t,r,n){var i=e.split(r).map(function(e){return{text:e,isHtml:false}});var a=this.getHtmlByType(t,r,n);var s=[];for(var o=0;o<i.length;o++){s.push(i[o]);if(o!==i.length-1){s.push({text:a,isHtml:true})}}return s},enrichValue:function(e,t,r,n){var i=[];e.forEach(function(e){if(e.isHtml){i.push(e);return}i=i.concat(this.split(e.text,t,r,n))},this);return i},enrich:function(e,t,r){var n=this.getMappedValues(e,t.values);var i=[{text:r,isHtml:false}];n.forEach(function(e){i=this.enrichValue(i,e.type,e.formatted,e.cleaned)},this);if(i.length<=1){t.node.nodeValue=r}else{var a=document.createElement("DIV");var s=t.node.parentNode;i.forEach(function(e){var r=[];if(e.isHtml){a.innerHTML=e.text;r=r.concat(webPacker.type.toArray(a.childNodes))}else{r.push(document.createTextNode(e.text))}r.forEach(function(e){s.insertBefore(e,t.node)})});s.removeChild(t.node)}}};var n={trim:function(e){return(e||"").trim()},hasLength:function(e){return(e||"").length>0},clean:function(e,t){return e==="phone"?n.cleanPhone(t):n.trim(t)},cleanPhone:function(e){return e.trim().replace(/[^\d+]/gim,"")},filterMap:function(e,t,r){var i=n.clean(t,r);if(!i){return[]}return e.filter(function(e){return e.origin.cleaned===i})},replaceByMap:function(e,t,r,i,a){var s={text:"",from:null,to:null};a=a||false;if(!t){return s}var o=i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");var c=t;n.filterMap(e,r,i).forEach(function(e){var t=a?e.final.cleaned:e.final.formatted;s.from=i;s.to=t;c=c.replace(new RegExp(o,"g"),t)});s.text=c===t?"":c;return s},uniqueArray:function(e,t){t=t||function(e,t){return e===t};var r=[];e.forEach(function(e){var n=r.some(function(r){return t.apply(this,[e,r])});if(!n){r.push(e)}});return r}};var i={context:null,urlParameters:null,getUtmArray:function(){var e=webPacker.url.parameter.getList().filter(function(e){return e.name==="utm_source"});var t="b24-tracker-utm";if(e.length>0){webPacker.ls.setItem(t,e)}return webPacker.ls.getItem(t)||[]},ready:function(e){/compl|loaded|intera/.test(document.readyState)?e():this.addEventListener(document,"DOMContentLoaded",e)}};var a=new function(){this.items={};this.now=function(){if(window.performance&&window.performance.now){return window.performance.now()}return null};this.start=function(e){if(!this.items[e]){this.items[e]={start:null,end:null,time:null}}this.items[e].start=this.now()};this.end=function(e){if(!this.items[e]){return}var t=this.items[e];t.end=this.now();if(!t.start){return}if(!t.time){t.time=0}t.time+=t.end-t.start};this.dump=function(){for(var e in this.items){if(!this.items.hasOwnProperty(e)){continue}if(!this.items[e]){return}var t=Math.round(this.items[e].time);(console||{}).log("Perf,",e+": ",t,"ms")}}};var s={log:[],resolve:function(e){this.log=[];this.makeGroups(e).forEach(this.hideGroup,this)},makeGroups:function(e){var t=e.map(function(e){return e.parentNode});t=n.uniqueArray(t);return t.map(function(t){return e.filter(function(e){return t!==e&&t===e.parentNode})}).filter(function(e){return e.length>1})},hideGroup:function(e){e.forEach(function(e,t){if(t===0){return}e.style.display="none";this.log.push(e)},this)},dump:function(){(console||{}).log("hidden nodes: ",this.log)}};var o={tracked:[],init:function(){if(!window.b24Tracker||!window.b24Tracker.guest){return}if(!webPacker.browser.isMobile()){return}var e=c.Instance.getElementEngine().search();e.filter(function(e){return e.values[0].type==="phone"}).forEach(function(e){if(!e.node||e.node.isTrackingHandled){return}webPacker.addEventListener(e.node,"click",this.onClick.bind(this,e.values[0].value));e.node.isTrackingHandled=true},this)},onClick:function(e){if(this.tracked.indexOf(e)>=0){return}var t=window.b24Tracker.guest.getTrace({channels:[{code:"call",value:e}]});window.b24Tracker.guest.storeTrace(t);this.tracked.push(e)}};function c(){this.types=[{code:"phone",selector:'a[href^="tel:"], a[href^="callto:"]',regexp:/([+]?([\d][- ()\u00A0]{0,2}){5,15}[\d])/gi,cleaner:n.cleanPhone},{code:"email",selector:'a[href^="mailto:"]',regexp:/([-_.\w\d]+@[-_.\w\d]+\.\w{2,15})/gi,cleaner:n.trim}];this.map=[];this.perf=a;this.duplicates=s;this.enrichText=false;this.replaceText=false;this.resolveDup=false;this.source=null;this.site=null;this.loaded=false}c.Instance=null;c.prototype={load:function(e){if(webPacker.url.parameter.get("b24_tracker_debug_enabled")==="y"){debugger}if(this.loaded){return}this.loaded=true;e=e||{};e.editor=e.editor||{resources:[]};e.b24SiteOnly=u.init(e);if(["complete","loaded","interactive"].indexOf(document.readyState)>-1){this.run(e)}else{webPacker.addEventListener(window,"DOMContentLoaded",this.run.bind(this,e))}},run:function(e){if(!e.enabled){return}a.start("Load");this.configure(e);a.end("Load");this.replace();if(this.map.length>0&&this.source){this.resolveDuplicates()}this.trackClicks()},configure:function(e){this.map=[];var t=e.sites.filter(function(t){if(t.host==="all"){return true}if(e.b24SiteOnly&&!t.b24){return false}var r=document.createElement("a");var n=webPacker.type.isArray(t.host)?t.host:[t.host];n=n.map(function(e){r.href="http://"+e;return r.hostname});return n.indexOf(window.location.hostname)>-1})[0];if(!t){return}this.enrichText=t.enrichText||false;this.replaceText=t.replaceText||false;this.resolveDup=t.resolveDup||false;var r;if(window.b24Tracker&&window.b24Tracker.guest){r=window.b24Tracker.guest.getUtmSource()}else{r=i.getUtmArray().filter(function(e){return e.name==="utm_source"});r=r[0]?r[0].value:""}var n=e.sources.filter(function(e){return e.utm.filter(function(e){return e===r}).length>0})[0];if(t.replacement==="all"){t.replacement=this.search()}var a=this.types;a=a.reduce(function(e,t){e[t.code]=t;return e},{});this.map=t.replacement.filter(function(e){return!!a[e.type]}).map(function(e){var r=a[e.type];var i=e.value;if(n&&n.replacement[e.type]){var s=n.replacement[e.type];var o=[];o=o.length>0?o:s.filter(function(e){return typeof e==="string"||e.host===t.host});o=o.length>0?o:s.filter(function(e){return!e.host});o=o.length>0?o:s;i=o.length>0?typeof o[0]==="string"?o[0]:o[0].value:i}return{origin:{cleaned:r.cleaner(e.value),formatted:[e.value]},final:{cleaned:r.cleaner(i),formatted:i}}},this);this.site=t;this.source=n},getElementEngine:function(){if(!this.elementEngine){this.elementEngine=new e({})}return this.elementEngine.setTypes(this.types).setMap(this.map)},getTextEngine:function(){if(!this.textEngine){this.textEngine=new t({})}return this.textEngine.setTypes(this.types).setMap(this.map).setEnrich(this.enrichText)},replace:function(e){e=e||document.body;var t="Element replace";a.start(t);this.getElementEngine().replace(e);a.end(t);if(this.replaceText){var r="Global text replace";a.start(r);this.getTextEngine().replace(e);a.end(r)}},resolveDuplicates:function(){if(!this.resolveDup){return}this.types.forEach(function(e){var t=document.body.querySelectorAll(e.selector);t=webPacker.type.toArray(t);if(t.length===0){return}this.duplicates.resolve(t)},this)},trackClicks:function(){o.init()},searchNodes:function(e){e=e||document.body;var t=this.getElementEngine().search(e);return this.getTextEngine().search(e).concat(t)},getSearchedNodes:function(e){e=e||document.body;var t=this.getElementEngine().getSearched(e);var r=this.getTextEngine().getSearched(e);r=r.filter(function(e){var r=t.some(function(t){return t.node.contains(e.node)});if(r||!e.node.parentNode){return false}e.node=e.node.parentNode;return true});return t.concat(r)},search:function(e){e=e||document.body;var t=[];this.searchNodes(e).forEach(function(e){e.values.forEach(function(e){var r=t.some(function(t){return t.value===e.value&&t.type===e.type});if(!r){t.push(e)}})});return t}};var u={checkingName:"b24_tracker_checking_origin",debugName:"bx_debug",debug:false,timeout:600,options:{},fields:{list:null,name:"b24_tracker_edit_enabled",get:function(e){this.restore();return this.list[e]?this.list[e]:null},set:function(e,t){this.restore();this.list[e]=t;webPacker.ls.setItem(this.name,this.list);return this},clear:function(){webPacker.ls.removeItem(this.name)},restore:function(){if(this.list!==null){return}this.list=webPacker.ls.getItem(this.name)||{};var e=webPacker.url.parameter.get("utm_source");if(e!==null){this.set("source",e)}this.set("timestamp",this.get("timestamp")||0)}},prolong:function(){this.fields.set("timestamp",Date.now())},stop:function(){this.fields.clear()},isActivated:function(){if(!window.opener){return false}if(webPacker.url.parameter.get(this.fields.name)==="y"){return true}return Date.now()-this.fields.get("timestamp")<this.timeout*1e3},log:function(e){if(this.debug&&window.console&&"log"in console){console.log("b24Tracker[EditorStatus]:",e)}},check:function(){this.debug=webPacker.url.parameter.get(this.debugName)==="y";if(!window.opener){this.log("window.opener is empty");return}var e=webPacker.url.parameter.get(this.checkingName);if(!e){this.log("Origin parameter is empty");return}if(e!==webPacker.getAddress()&&!this.debug){this.log("Origin parameter not equal `"+webPacker.getAddress()+"`");return}var t=JSON.stringify({source:"b24Tracker",action:"init",items:c.Instance.search()});window.opener.postMessage(t,e);this.log("Send to `"+e+"` data "+t)},init:function(e){this.check();if(!e.editor.force&&!this.isActivated()){this.stop();return false}e.editor.resources.forEach(function(e){webPacker.resource.load(e)});this.prolong();return true},onEditorInit:function(){b24Tracker.Editor.Manager.init({status:this,items:c.Instance.getSearchedNodes()})}};if(!window.b24Tracker)window.b24Tracker={};if(window.b24Tracker.Manager)return;b24Tracker.Manager=c;c.Instance=new c;if(!b24Tracker.Editor)b24Tracker.Editor={};b24Tracker.Editor.Status=u})();
//# sourceMappingURL=https://crm.gameleonteam.ru/bitrix/js/crm/tracking/tracker/script.map.js

window.b24Tracker.Manager.Instance.load({"enabled":false,"sources":[],"sites":[],"editor":{"resources":[{"type":"js","path":null,"content":"\t(function(w,d,u){\n\t\tvar s=d.createElement(\u0027script\u0027);s.async=true;s.src=u+\u0027?\u0027+(Date.now()\/60000|0);\n\t\tvar h=d.getElementsByTagName(\u0027script\u0027)[0];h.parentNode.insertBefore(s,h);\n\t})(window,document,\u0027https:\/\/crm.gameleonteam.ru\/upload\/crm\/tag\/call.tracker.ed.js\u0027);","cache":true}]}});
})();


})();
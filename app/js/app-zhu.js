
// # Interface actions

$(function(){




    /* ## aside menu */
    $('.jsMenuTrigger').on('click', jsMenuTrigger);
    function jsMenuTrigger(e) {
        $('.elBody').toggleClass('elBody--asideIsOpen');
    }
    $('.jsMenuClose').on('click', jsMenuClose);
    function jsMenuClose(e) {
        $('.elBody').removeClass('elBody--asideIsOpen');
    }





    /* ## zoom images on white background */
    zzz.init("#ffffff");




});

$(function(){
    /* ## scroll reaction */
    var jsMagicHeader = $('.elMagicHeader');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 136) {
            jsMagicHeader.addClass("inPageMiddle");
        } else {
            jsMagicHeader.removeClass("inPageMiddle");
        }
    });
});









// # Libs






// ## image zoom - zoomzoomzang

var zzz = zzz || {};

(function ( o ) {

  var zzzF = this;
  var overlayColor;

  o.init = function (overlayColor) {
    // Check wether or not the document is ready until it is ready
    var readyStateCheckInterval = setInterval(function() {
      if (document.readyState === "complete") {
        addEvent(window, 'unload', EventCache.flush);
        addEvent(window, 'resize', checkImages);
        zzzF.overlayColor = overlayColor || "#ffffff";
        checkImages();
        clearInterval(readyStateCheckInterval);
      }
    }, 10);
  };

  function checkImages () {
    var i;
    var images = document.getElementsByClassName("zzz");

    for (i = 0; i < images.length; ++i) {
      makeZoomable(images[i]);
    }
  }

  function makeZoomable (i) {
    i.className = i.className + " zzzZoomable";
    i.style.transition = "transform 200ms ease-out";
    i.style.cursor = "zoom-in";
    i.zzz = {};
    i.zzz.style = {};
    i.zzz.parentNode = {};
    i.zzz.parentNode.style = {};
    i.zzz.style.position = getComputedStyle(i).getPropertyValue("position");
    i.zzz.style.zIndex = getComputedStyle(i).getPropertyValue("z-index");
    i.zzz.parentNode.style.zIndex = getComputedStyle(i.parentNode).getPropertyValue("z-index");
    addEvent(i, 'click', zoomableHandler);
  }

  function isZoomable (imgToCheck) {
    var imgNatWidth = imgToCheck.naturalWidth;
    var imgNatHeight = imgToCheck.naturalHeight;
    var imgDisWidth = imgToCheck.clientWidth;
    var imgDisHeight = imgToCheck.clientHeight;
    var result = null;
    if (imgNatWidth > imgDisWidth || imgNatHeight > imgDisHeight) {
      if (imgDisWidth < (window.innerWidth - 20) && imgDisHeight < (window.innerHeight - 20)) {
        result = true;
      } else {
        result = false;
      }
    } else {
      result = false;
    }
    return result;
  }

  function zoomableHandler (e) {
    this.removeEventListener('click', zoomableHandler);
    scaleImageUp(this);
    addEvent(this, 'click', zoomedHandler);
    addEvent(window, 'scroll', zoomedHandler);
  }

  function zoomedHandler () {
    var o = document.getElementsByClassName("zzzZoomableOverlay")[0];
    var i = document.getElementsByClassName("zzzZoomed")[0];

    window.removeEventListener('scroll', zoomedHandler);
    i.removeEventListener('click', zoomedHandler);
    addEvent(i, 'click', zoomableHandler);

    scaleImageDown(i);
  }

  function scaleImageUp (i) {
    var iDisplayWidth = i.clientWidth;
    var iDisplayHeight = i.clientHeight;
    var iNewWidth = null;
    var iNewHeight = null;
    var iRatio = iDisplayWidth / iDisplayHeight;
    var wWidth = window.innerWidth - 20;
    var wHeight = window.innerHeight - 20;
    var wRatio = wWidth / wHeight;
    var xTranslate = null;
    var yTranslate = null;
    var scaleRatio = null;
    var iCenterY = Math.floor(i.getBoundingClientRect().top + (iDisplayHeight / 2));
    var iCenterX = Math.floor(i.getBoundingClientRect().left + (iDisplayWidth / 2));
    var wCenterY = window.innerHeight / 2;
    var wCenterX = window.innerWidth / 2;

    if (wRatio > iRatio) {
      iNewWidth = Math.min(iDisplayWidth * wHeight / iDisplayHeight, i.naturalWidth);
      iNewHeight = iNewWidth / iRatio;
      scaleRatio = +(iNewWidth / iDisplayWidth).toFixed(1);
    } else {
      iNewHeight = Math.min(iDisplayHeight * wWidth / iDisplayWidth, i.naturalHeight);
      iNewWidth = iNewHeight * iRatio;
      scaleRatio = +(iNewHeight / iDisplayHeight).toFixed(1);
    }

    yTranslate = (wCenterY - iCenterY) / scaleRatio;
    xTranslate = (wCenterX - iCenterX) / scaleRatio;

    i.style.transform = "scale(" + scaleRatio + ") translateX(" + xTranslate + "px) translateY(" + yTranslate + "px)";
    i.style.cursor = "zoom-out";
    i.style.zIndex = 2;
    i.parentNode.style.zIndex = 999; // Stacking context
    i.style.position = "relative";
    i.className = i.className.replace(" zzzZoomable", " zzzZoomed");
    showOverlay();
  }

  function scaleImageDown (i) {
    hideOverlay();
    i.style.transform = "scale(1)";
    i.style.cursor = "zoom-in";
    i.className = i.className.replace(" zzzZoomed", " zzzZoomable");
  }

  function showOverlay () {
    var i = document.getElementsByClassName("zzzZoomed")[0];
    var o = document.createElement("DIV");

    addEvent(o, 'click', zoomedHandler);

    o.className = "zzzZoomableOverlay";
    o.style.backgroundColor = zzzF.overlayColor;
    o.style.height = window.innerHeight + "px";
    o.style.width = window.innerWidth + "px";
    o.style.position = "fixed";
    o.style.top = 0;
    o.style.left = 0;
    o.style.cursor = "zoom-out";
    o.style.zIndex = 1;
    o.style.opacity = 0;
    o.style.transition = "opacity 100ms linear";

    i.parentNode.insertBefore(o, i);

    var t = setTimeout(function() {
      o.style.opacity = 1;
      clearTimeout(t);
    }, 1);
  }

  function hideOverlay () {
    var o = document.getElementsByClassName("zzzZoomableOverlay")[0];
    var i = document.getElementsByClassName("zzzZoomed")[0];

    o.style.opacity = 0;

    var t = setTimeout(function () {
      o.remove();
      i.style.zIndex = i.zzz.style.zIndex;
      i.style.position = i.zzz.style.position;
      i.parentNode.style.zIndex = i.zzz.parentNode.style.zIndex;
      clearTimeout(t);
    }, 200);
  }

  // Cross browser get document size from http://james.padolsey.com/snippets/get-document-height-cross-browser/
  function getDocSize() {
      var d = document;
      var h = Math.max(d.body.scrollHeight, d.documentElement.scrollHeight, d.body.offsetHeight, d.documentElement.offsetHeight, d.body.clientHeight, d.documentElement.clientHeight);
      var w = Math.max(d.body.scrollWidth, d.documentElement.scrollWidth, d.body.offsetWidth, d.documentElement.offsetWidth, d.body.clientWidth, d.documentElement.clientWidth);
      return {
        height: h,
        width: w
      };
  }

  // Rock solid add event method by Dustin Diaz (http://dustindiaz.com/rock-solid-addevent)
  function addEvent (obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener( type, fn, false );
      EventCache.add(obj, type, fn);
    }
    else if (obj.attachEvent) {
      obj["e"+type+fn] = fn;
      obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
      obj.attachEvent( "on"+type, obj[type+fn] );
      EventCache.add(obj, type, fn);
    }
    else {
      obj["on"+type] = obj["e"+type+fn];
    }
  }

  // Store the event cache
  var EventCache = function () {
    var listEvents = [];
    return {
      listEvents : listEvents,
      add : function(node, sEventName, fHandler){
        listEvents.push(arguments);
      },
      flush : function(){
        var i, item;
        for(i = listEvents.length - 1; i >= 0; i = i - 1){
          item = listEvents[i];
          if(item[0].removeEventListener){
            item[0].removeEventListener(item[1], item[2], item[3]);
          };
          if(item[1].substring(0, 2) != "on"){
            item[1] = "on" + item[1];
          };
          if(item[0].detachEvent){
            item[0].detachEvent(item[1], item[2]);
          };
          item[0][item[1]] = null;
        };
      }
    };
  }();

})(zzz);
















// ## social likes

$(function(){
/*! Social Likes Next v1.1.0 by Artem Sapegin - https://github.com/sapegin/social-likes-next - MIT License */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SocialLikesNext=t():e.SocialLikesNext=t()}(this,function(){return function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(5)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.prefix="social-likes",t.elemDelimiter="__",t.modDelimiter="_"},function(e,t,n){"use strict";function i(e){var t={};for(var n in e.dataset)t[n]=e.dataset[n];return t}function r(e,t){var n=arguments.length<=2||void 0===arguments[2]?[]:arguments[2];if(t=o(t,n),!t)return e;var i=-1===e.indexOf("?")?"?":"&";return e+i+t}function o(e){var t=arguments.length<=1||void 0===arguments[1]?[]:arguments[1];return Object.keys(e).reduce(function(n,i){var r=e[i];return null!==r&&""!==r&&-1===t.indexOf(i)&&n.push(i+"="+encodeURIComponent(r)),n},[]).join("&")}function u(e,t){var n=t.width,i=t.height,r=t.name,o=Math.round(screen.width/2-n/2),u=0;screen.height>i&&(u=Math.round(screen.height/3-i/2));var c=window.open(e,r,"\n		left="+o+",\n		top="+u+",\n		width="+n+",\n		height="+i+",\n		personalbar=0,\n		toolbar=0,\n		scrollbars=1,\n		resizable=1\n	");return c?(c.focus(),c):(location.href=e,null)}function c(e,t){return l(e,t,encodeURIComponent)}function l(e,t,n){return e.replace(/\{([^}]+)}/g,function(e,i){var r=n?n(t[i]):t[i];return r||""})}function s(e,t){var n=v.prefix+(e?""+v.elemDelimiter+e:"");return n+(t?" "+n+v.modDelimiter+t:"")}function a(e){return Array.prototype.slice.call(e)}function h(e,t){return Array.isArray(e)||(e=[e]),e=e.map(function(e){return'<path d="'+e+'"/>'}),'\n		<svg class="'+t+'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">\n			'+e.join("\n")+"\n		</svg>\n	"}Object.defineProperty(t,"__esModule",{value:!0}),t.dataset=i,t.addParamsToUrl=r,t.objectToQueryString=o,t.openPopup=u,t.makeUrl=c,t.template=l,t.className=s,t.toArray=a,t.svg=h;var v=n(1)},function(e,t,n){var i,r;!function(o,u){i=u,r="function"==typeof i?i.call(t,n,t,e):i,!(void 0!==r&&(e.exports=r))}(this,function(){return function e(t,n){var i=Array.isArray(n),r=i&&[]||{};return i?(t=t||[],r=r.concat(t),n.forEach(function(n,i){"undefined"==typeof r[i]?r[i]=n:"object"==typeof n?r[i]=e(t[i],n):-1===t.indexOf(n)&&r.push(n)})):(t&&"object"==typeof t&&Object.keys(t).forEach(function(e){r[e]=t[e]}),Object.keys(n).forEach(function(i){"object"==typeof n[i]&&n[i]&&t[i]?r[i]=e(t[i],n[i]):r[i]=n[i]})),r}})},function(e,t,n){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),c=n(3),l=r(c),s=n(1),a=n(2),h=n(7),v=i(h),p=window.socialLikesButtons?(0,l.default)(v,window.socialLikesButtons):v,f=function(){function e(t,n){o(this,e),this.widget=t,this.data=(0,a.dataset)(t),this.options=(0,l.default)(n,this.data),this.initService(),this.service&&(this.initHtml(),this.initEvents()),!this.service,1}return u(e,[{key:"update",value:function(e){this.options=(0,l.default)(this.options,e)}},{key:"initService",value:function(){var e=this.options.service;(e||(e=(0,a.toArray)(this.widget.classList).reduce(function(e,t){return p[t]?t:void 0},null)))&&(this.service=e,p[e]?this.options=(0,l.default)(this.options,p[e]):this.service=null)}},{key:"initHtml",value:function(){var e=this,t=function(t){return(0,a.className)(t,e.service)},n=this.widget,i=this.options;n.classList.remove(this.service),t("widget").split(" ").forEach(function(e){return n.classList.add(e)});var r="",o=n.innerHTML.trim();if(i.clickUrl||o){var u="div",c="",l=t("button");if(i.clickUrl){var s=this.makeUrl(i.clickUrl);u="a",c='href="'+s+'"',o||(l=t("invisible-button"))}r="\n				<"+u+" "+c+' class="'+l+'">\n					'+o+"\n				</"+u+">\n			"}else n.classList.add((0,a.className)("widget_notext"));var h=(0,a.svg)(this.options.icon,t("icon"));n.innerHTML=h+r}},{key:"initEvents",value:function(){this.options.clickUrl||(this.widget.addEventListener("click",this.onClick.bind(this)),this.widget.addEventListener("keydown",this.onKeyDown.bind(this)),this.widget.setAttribute("tabindex","0"),this.widget.setAttribute("role","button"))}},{key:"makeUrl",value:function(e){return(0,a.makeUrl)(e,{url:this.options.url,title:this.options.title})}},{key:"makeUrlWithParams",value:function(e){var t=this.makeUrl(e),n=(0,l.default)(this.data,this.options.data||{});return(0,a.addParamsToUrl)(t,n,["service","title","url"])}},{key:"onClick",value:function(e){var t=this.options,n=!0;if("function"==typeof t.click&&(n=t.click.call(this,e)),n){var i=this.makeUrlWithParams(t.popupUrl);(0,a.openPopup)(i,{width:t.popupWidth,height:t.popupHeight,name:s.prefix+"_"+this.service})}}},{key:"onKeyDown",value:function(e){13!==e.which&&32!==e.which||(e.preventDefault(),this.onClick(e))}}]),e}();t.default=f},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=e[a];return n?n.update(t):n=e[a]=new s.default(e,t),n}function o(){var e=arguments.length<=0||void 0===arguments[0]?!1:arguments[0],t=document.querySelectorAll("."+u.prefix);t?(0,c.toArray)(t).forEach(function(e){return r(e)}):e&&document.addEventListener("DOMContentLoaded",o)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r,t.autoInit=o;var u=n(1),c=n(2),l=n(15),s=i(l),a="socialLikes";o(!0)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={icon:"M13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h5V9H6V7h2V5c0-2 2-2 2-2h3v2h-3v2h3l-.5 2H10v7h3c2 0 3-1 3-3V3c0-2-1-3-3-3z",popupUrl:"https://www.facebook.com/sharer/sharer.php?u={url}",popupWidth:600,popupHeight:500}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(6);Object.defineProperty(t,"facebook",{enumerable:!0,get:function(){return i(r).default}});var o=n(9);Object.defineProperty(t,"odnoklassniki",{enumerable:!0,get:function(){return i(o).default}});var u=n(10);Object.defineProperty(t,"pinterest",{enumerable:!0,get:function(){return i(u).default}});var c=n(11);Object.defineProperty(t,"plusone",{enumerable:!0,get:function(){return i(c).default}});var l=n(13);Object.defineProperty(t,"twitter",{enumerable:!0,get:function(){return i(l).default}});var s=n(14);Object.defineProperty(t,"vkontakte",{enumerable:!0,get:function(){return i(s).default}});var a=n(12);Object.defineProperty(t,"telegram",{enumerable:!0,get:function(){return i(a).default}});var h=n(8);Object.defineProperty(t,"linkedin",{enumerable:!0,get:function(){return i(h).default}})},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={icon:"M14.4,0H1.6C0.7,0,0,0.7,0,1.6v12.7C0,15.3,0.7,16,1.6,16h12.7c0.9,0,1.6-0.7,1.6-1.6V1.6C16,0.7,15.3,0,14.4,0zM3.4,1.9C4.3,1.9,5,2.5,5,3.3c0,0.8-0.7,1.5-1.6,1.5S1.8,4.1,1.8,3.3C1.8,2.5,2.6,1.9,3.4,1.9z M5.2,14.1H1.7V5.9h3.5V14.1z M14.1,14.1h-2.7V9.7c0-0.9-0.6-1.6-1.5-1.6C9,8.1,8.7,8.8,8.7,9.5c0,0.9,0,4.7,0,4.7H6V5.9h2.7v1.2c0.4-0.5,1.4-1.2,2.4-1.2c1.3,0,1.6,0.3,2.1,0.8c1,1,0.9,2.4,0.9,2.9h0L14.1,14.1z",popupUrl:"https://www.linkedin.com/shareArticle?url={url}",popupWidth:600,popupHeight:500}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={icon:"M8 6.107c.888 0 1.607-.72 1.607-1.607 0-.888-.72-1.607-1.607-1.607s-1.607.72-1.607 1.607c0 .888.72 1.607 1.607 1.607zM13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h10c2 0 3-1 3-3V3c0-2-1-3-3-3zM8 .75c2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75S4.25 6.57 4.25 4.5C4.25 2.43 5.93.75 8 .75zm3.826 12.634c.42.42.42 1.097 0 1.515-.21.208-.483.313-.758.313-.274 0-.548-.105-.758-.314L8 12.59 5.69 14.9c-.42.418-1.098.418-1.516 0s-.42-1.098 0-1.516L6.357 11.2c-1.303-.386-2.288-1.073-2.337-1.11-.473-.354-.57-1.025-.214-1.5.354-.47 1.022-.567 1.496-.216.03.022 1.4.946 2.698.946 1.31 0 2.682-.934 2.693-.943.474-.355 1.146-.258 1.5.213.355.474.26 1.146-.214 1.5-.05.036-1.035.723-2.338 1.11l2.184 2.184z",popupUrl:"https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",popupWidth:550,popupHeight:360}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={icon:"M7.99 0c-4.417 0-8 3.582-8 8 0 3.39 2.11 6.284 5.086 7.45-.07-.633-.133-1.604.028-2.295.145-.624.938-3.977.938-3.977s-.24-.48-.24-1.188c0-1.112.645-1.943 1.448-1.943.683 0 1.012.512 1.012 1.127 0 .686-.437 1.713-.663 2.664-.19.796.398 1.446 1.184 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.255-3.343-3.255-2.276 0-3.612 1.707-3.612 3.472 0 .688.265 1.425.595 1.826.065.08.075.15.055.23-.06.252-.195.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.835-4.84 5.287-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.74 4.976-4.152 4.976-.81 0-1.573-.42-1.834-.92l-.498 1.903c-.18.695-.668 1.566-.994 2.097.75.232 1.544.357 2.37.357 4.417 0 8-3.582 8-8s-3.583-8-8-8z",popupUrl:"https://www.pinterest.com/pin/create/button/?url={url}&description={title}",popupWidth:750,popupHeight:550}},function(e,t){"use strict";
Object.defineProperty(t,"__esModule",{value:!0}),t.default={icon:"M8,6.5v3h4.291c-0.526,2.01-2.093,3.476-4.315,3.476C5.228,12.976,3,10.748,3,8c0-2.748,2.228-4.976,4.976-4.976c1.442,0,2.606,0.623,3.397,1.603L13.52,2.48C12.192,0.955,10.276,0,8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s7.5-3.582,7.5-8V6.5H8z",popupUrl:"https://plus.google.com/share?url={url}",popupWidth:500,popupHeight:500}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={icon:"M6,11L5,8l11-8L0.622,5.914c0,0-0.672,0.23-0.619,0.655c0.053,0.425,0.602,0.619,0.602,0.619l3.575,1.203L5.8,13.545l2.742-2.411l-0.007-0.005l3.607,2.766c0.973,0.425,1.327-0.46,1.327-0.46L16,0L6,11z",popupUrl:"https://telegram.me/share/url?url={url}&title={title}",popupWidth:600,popupHeight:500}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={icon:"M15.96 3.42c-.04.153-.144.31-.237.414l-.118.058v.118l-.59.532-.237.295c-.05.036-.398.21-.413.237V6.49h-.06v.473h-.058v.294h-.058v.296h-.06v.235h-.06v.237h-.058c-.1.355-.197.71-.295 1.064h-.06v.116h-.06c-.02.1-.04.197-.058.296h-.06c-.04.118-.08.237-.118.355h-.06c-.038.118-.078.236-.117.353l-.118.06-.06.235-.117.06v.116l-.118.06v.12h-.06c-.02.057-.038.117-.058.175l-.118.06v.117c-.06.04-.118.08-.177.118v.118l-.237.177v.118l-.59.53-.532.592h-.117c-.06.078-.118.156-.177.236l-.177.06-.06.117h-.118l-.06.118-.176.06v.058h-.118l-.06.118-.353.12-.06.117c-.078.02-.156.04-.235.058v.06c-.118.038-.236.078-.354.118v.058H8.76v.06h-.12v.06h-.176v.058h-.118v.06H8.17v.058H7.99v.06l-.413.058v.06h-.237c-.667.22-1.455.293-2.36.293h-.886v-.058h-.53v-.06H3.27v-.06h-.295v-.06H2.68v-.057h-.177v-.06h-.236v-.058H2.09v-.06h-.177v-.058h-.177v-.06H1.56v-.058h-.12v-.06l-.294-.06v-.057c-.118-.04-.236-.08-.355-.118v-.06H.674v-.058H.555v-.06H.437v-.058H.32l-.06-.12H.142v-.058c-.13-.08-.083.026-.177-.118H1.56v-.06c.294-.04.59-.077.884-.117v-.06h.177v-.058h.237v-.06h.118v-.06h.177v-.057h.118v-.06h.177v-.058l.236-.06v-.058l.236-.06c.02-.038.04-.078.058-.117l.237-.06c.02-.04.04-.077.058-.117h.118l.06-.118h.118c.036-.025.047-.078.118-.118V12.1c-1.02-.08-1.84-.54-2.303-1.183-.08-.058-.157-.118-.236-.176v-.117l-.118-.06v-.117c-.115-.202-.268-.355-.296-.65.453.004.987.008 1.354-.06v-.06c-.254-.008-.47-.08-.65-.175v-.058H2.32v-.06c-.08-.02-.157-.04-.236-.058l-.06-.118h-.117l-.118-.178h-.12c-.077-.098-.156-.196-.235-.294l-.118-.06v-.117l-.177-.12c-.35-.502-.6-1.15-.59-2.006h.06c.204.234.948.377 1.357.415v-.06c-.257-.118-.676-.54-.827-.768V5.9l-.118-.06c-.04-.117-.08-.236-.118-.354h-.06v-.118H.787c-.04-.196-.08-.394-.118-.59-.06-.19-.206-.697-.118-1.005h.06V3.36h.058v-.177h.06v-.177h.057V2.83h.06c.04-.118.078-.236.117-.355h.118v.06c.12.097.237.196.355.295v.118l.118.058c.08.098.157.197.236.295l.176.06.354.413h.118l.177.236h.118l.06.117h.117c.04.06.08.118.118.177h.118l.06.118.235.06.06.117.356.12.06.117.53.176v.06h.118v.058l.236.06v.06c.118.02.236.04.355.058v.06h.177v.058h.177v.06h.176v.058h.236v.06l.472.057v.06l1.417.18v-.237c-.1-.112-.058-.442-.057-.65 0-.573.15-.99.354-1.358v-.117l.118-.06.06-.235.176-.118v-.118c.14-.118.276-.236.414-.355l.06-.117h.117l.12-.177.235-.06.06-.117h.117v-.058H9.7v-.058h.177v-.06h.177v-.058h.177v-.06h.296v-.058h1.063v.058h.294v.06h.177v.058h.178v.06h.177v.058h.118v.06h.118l.06.117c.08.018.158.038.236.058.04.06.08.118.118.177h.118l.06.117c.142.133.193.163.472.178.136-.12.283-.05.472-.118v-.06h.177v-.058h.177v-.06l.236-.058v-.06h.177l.59-.352v.176h-.058l-.06.295h-.058v.117h-.06v.118l-.117.06v.118l-.177.118v.117l-.118.06-.354.412h-.117l-.177.236h.06c.13-.112.402-.053.59-.117l1.063-.353z",popupUrl:"https://twitter.com/intent/tweet?url={url}&text={title}",popupWidth:600,popupHeight:450,click:function(){return/[.?!:\-–—]\s*$/.test(this.options.title)||(this.options.title+=":"),!0}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={icon:"M13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h10c2 0 3-1 3-3V3c0-2-1-3-3-3zm.452 11.394l-1.603.022s-.345.068-.8-.243c-.598-.41-1.164-1.48-1.604-1.342-.446.144-.432 1.106-.432 1.106s.003.206-.1.315c-.11.12-.326.144-.326.144H7.87s-1.582.095-2.975-1.356c-1.52-1.583-2.862-4.723-2.862-4.723s-.078-.206.006-.305c.094-.112.35-.12.35-.12l1.716-.01s.162.026.277.11c.095.07.15.202.15.202s.276.7.643 1.335c.716 1.238 1.05 1.508 1.293 1.376.353-.193.247-1.75.247-1.75s.006-.565-.178-.817c-.145-.194-.415-.25-.534-.267-.096-.014.062-.238.267-.338.31-.15.853-.16 1.497-.153.502.004.646.035.842.083.59.143.39.694.39 2.016 0 .422-.075 1.018.23 1.215.13.085.453.013 1.256-1.352.38-.647.666-1.407.666-1.407s.062-.136.16-.194c.098-.06.232-.04.232-.04l1.804-.012s.542-.065.63.18c.092.257-.203.857-.94 1.84-1.21 1.612-1.345 1.46-.34 2.394.96.89 1.16 1.325 1.192 1.38.4.66-.44.71-.44.71z",popupUrl:"https://vk.com/share.php?url={url}",popupWidth:550,popupHeight:330}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(3),c=i(u),l=n(4),s=i(l),a=n(2),h=n(1),v={url:window.location.href.replace(window.location.hash,""),title:document.title},p=function(){function e(t){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];r(this,e),t.classList.add(h.prefix),n=(0,c.default)((0,c.default)(v,n),(0,a.dataset)(t)),this.url=n.url,this.buttons=(0,a.toArray)(t.children).map(function(e){return new s.default(e,n)}),t.classList.add(h.prefix+"_visible")}return o(e,[{key:"update",value:function(e){e.url!==this.url&&this.buttons.forEach(function(t){return t.update(e)})}}]),e}();t.default=p}])});
});
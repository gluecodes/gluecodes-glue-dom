!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t=n();for(var r in t)("object"==typeof exports?exports:e)[r]=t[r]}}(window,function(){return function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="dist",t(t.s=40)}([function(e,n){e.exports=function(e){return e&&"Widget"===e.type}},function(e,n,t){var r=t(2);e.exports=function(e){return e&&"VirtualNode"===e.type&&e.version===r}},function(e,n){e.exports="2"},function(e,n,t){var r=t(2);e.exports=function(e){return e&&"VirtualText"===e.type&&e.version===r}},function(e,n){e.exports=function(e){return e&&("function"==typeof e.hook&&!e.hasOwnProperty("hook")||"function"==typeof e.unhook&&!e.hasOwnProperty("unhook"))}},function(e,n){e.exports=function(e){return e&&"Thunk"===e.type}},function(e,n){var t=Array.isArray,r=Object.prototype.toString;e.exports=t||function(e){return"[object Array]"===r.call(e)}},function(e,n,t){var r=t(2);function o(e,n,t){this.type=Number(e),this.vNode=n,this.patch=t}o.NONE=0,o.VTEXT=1,o.VNODE=2,o.WIDGET=3,o.PROPS=4,o.ORDER=5,o.INSERT=6,o.REMOVE=7,o.THUNK=8,e.exports=o,o.prototype.version=r,o.prototype.type="VirtualPatch"},function(e,n,t){var r=t(1),o=t(3),i=t(0),u=t(5);function s(e,n){var t=e.vnode;if(t||(t=e.vnode=e.render(n)),!(r(t)||o(t)||i(t)))throw new Error("thunk did not return a valid node");return t}e.exports=function(e,n){var t=e,r=n;u(n)&&(r=s(n,e));u(e)&&(t=s(e,null));return{a:t,b:r}}},function(e,n,t){"use strict";e.exports=function(e){return"object"==typeof e&&null!==e}},function(e,n,t){var r=t(9),o=t(4);function i(e,n,t,r){if(r){var i=r[n];if(o(i))i.unhook&&i.unhook(e,n,t);else if("attributes"===n)for(var u in i)e.removeAttribute(u);else if("style"===n)for(var s in i)e.style[s]="";else e[n]="string"==typeof i?"":null}}function u(e,n,t,o,i){var u=t?t[o]:void 0;if("attributes"!==o)if(u&&r(u)&&s(u)!==s(i))e[o]=i;else{r(e[o])||(e[o]={});var a="style"===o?"":void 0;for(var c in i){var f=i[c];e[o][c]=void 0===f?a:f}}else for(var l in i){var p=i[l];void 0===p?e.removeAttribute(l):e.setAttribute(l,p)}}function s(e){return Object.getPrototypeOf?Object.getPrototypeOf(e):e.__proto__?e.__proto__:e.constructor?e.constructor.prototype:void 0}e.exports=function(e,n,t){for(var s in n){var a=n[s];void 0===a?i(e,s,a,t):o(a)?(i(e,s,a,t),a.hook&&a.hook(e,s,t?t[s]:void 0)):r(a)?u(e,n,t,s,a):e[s]=a}}},function(e,n,t){(function(n){var r,o=void 0!==n?n:"undefined"!=typeof window?window:{},i=t(27);"undefined"!=typeof document?r=document:(r=o["__GLOBAL_DOCUMENT_CACHE@4"])||(r=o["__GLOBAL_DOCUMENT_CACHE@4"]=i),e.exports=r}).call(this,t(13))},function(e,n,t){var r=t(11),o=t(10),i=t(1),u=t(3),s=t(0),a=t(8);e.exports=function e(n,t){var c=t&&t.document||r;var f=t?t.warn:null;n=a(n).a;if(s(n))return n.init();if(u(n))return c.createTextNode(n.text);if(!i(n))return f&&f("Item is not a valid virtual dom node",n),null;var l=null===n.namespace?c.createElement(n.tagName):c.createElementNS(n.namespace,n.tagName);var p=n.properties;o(l,p);var v=n.children;for(var h=0;h<v.length;h++){var d=e(v[h],t);d&&l.appendChild(d)}return l}},function(e,n){var t;t=function(){return this}();try{t=t||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(t=window)}e.exports=t},function(e,n,t){var r=t(38);e.exports=r},function(e,n,t){var r=t(0);e.exports=function(e,n){if(r(e)&&r(n))return"name"in e&&"name"in n?e.id===n.id:e.init===n.init;return!1}},function(e,n,t){var r=t(10),o=t(0),i=t(7),u=t(15);function s(e,n){"function"==typeof n.destroy&&o(n)&&n.destroy(e)}e.exports=function(e,n,t){var o=e.type,a=e.vNode,c=e.patch;switch(o){case i.REMOVE:return function(e,n){var t=e.parentNode;t&&t.removeChild(e);return s(e,n),null}(n,a);case i.INSERT:return function(e,n,t){var r=t.render(n,t);e&&e.appendChild(r);return e}(n,c,t);case i.VTEXT:return function(e,n,t,r){var o;if(3===e.nodeType)e.replaceData(0,e.length,t.text),o=e;else{var i=e.parentNode;o=r.render(t,r),i&&o!==e&&i.replaceChild(o,e)}return o}(n,0,c,t);case i.WIDGET:return function(e,n,t,r){var o,i=u(n,t);o=i?t.update(n,e)||e:r.render(t,r);var a=e.parentNode;a&&o!==e&&a.replaceChild(o,e);i||s(e,n);return o}(n,a,c,t);case i.VNODE:return function(e,n,t,r){var o=e.parentNode,i=r.render(t,r);o&&i!==e&&o.replaceChild(i,e);return i}(n,0,c,t);case i.ORDER:return function(e,n){for(var t,r,o,i=e.childNodes,u={},s=0;s<n.removes.length;s++)r=n.removes[s],t=i[r.from],r.key&&(u[r.key]=t),e.removeChild(t);for(var a=i.length,c=0;c<n.inserts.length;c++)o=n.inserts[c],t=u[o.key],e.insertBefore(t,o.to>=a++?null:i[o.to])}(n,c),n;case i.PROPS:return r(n,c,a.properties),n;case i.THUNK:return function(e,n){e&&n&&e!==n&&e.parentNode&&e.parentNode.replaceChild(n,e);return n}(n,t.patch(n,c,t));default:return n}}},function(e,n){var t={};function r(e,n,t){if(0===e.length)return!1;for(var r,o,i=0,u=e.length-1;i<=u;){if(o=e[r=(u+i)/2>>0],i===u)return o>=n&&o<=t;if(o<n)i=r+1;else{if(!(o>t))return!0;u=r-1}}return!1}function o(e,n){return e>n?1:-1}e.exports=function(e,n,i,u){return i&&0!==i.length?(i.sort(o),function e(n,o,i,u,s){u=u||{};if(n){r(i,s,s)&&(u[s]=n);var a=o.children;if(a)for(var c=n.childNodes,f=0;f<o.children.length;f++){s+=1;var l=a[f]||t,p=s+(l.count||0);r(i,s,p)&&e(c[f],l,i,u,s),s=p}}return u}(e,n,i,u,0)):{}}},function(e,n,t){var r=t(11),o=t(6),i=t(12),u=t(17),s=t(16);function a(e,n,t){var o=function(e){var n=[];for(var t in e)"a"!==t&&n.push(Number(t));return n}(n);if(0===o.length)return e;var i=u(e,n.a,o),s=e.ownerDocument;t.document||s===r||(t.document=s);for(var a=0;a<o.length;a++){var f=o[a];e=c(e,i[f],n[f],t)}return e}function c(e,n,t,r){if(!n)return e;var i;if(o(t))for(var u=0;u<t.length;u++)i=s(t[u],n,r),n===e&&(e=i);else i=s(t,n,r),n===e&&(e=i);return e}e.exports=function e(n,t,r){r=r||{};r.patch=r.patch&&r.patch!==e?r.patch:a;r.render=r.render||i;return r.patch(n,t,r)}},function(e,n,t){var r=t(18);e.exports=r},function(e,n,t){var r=t(9),o=t(4);function i(e){return Object.getPrototypeOf?Object.getPrototypeOf(e):e.__proto__?e.__proto__:e.constructor?e.constructor.prototype:void 0}e.exports=function e(n,t){var u;for(var s in n){s in t||((u=u||{})[s]=void 0);var a=n[s],c=t[s];if(a!==c)if(r(a)&&r(c))if(i(c)!==i(a))(u=u||{})[s]=c;else if(o(c))(u=u||{})[s]=c;else{var f=e(a,c);f&&((u=u||{})[s]=f)}else(u=u||{})[s]=c}for(var l in t)l in n||((u=u||{})[l]=t[l]);return u}},function(e,n,t){var r=t(6),o=t(7),i=t(1),u=t(3),s=t(0),a=t(5),c=t(8),f=t(20);function l(e,n){var t={a:e};return p(e,n,t,0),t}function p(e,n,t,r){if(e!==n){var c=t[r],l=!1;if(a(e)||a(n))h(e,n,t,r);else if(null==n)s(e)||(v(e,t,r),c=t[r]),c=g(c,new o(o.REMOVE,e,n));else if(i(n))if(i(e))if(e.tagName===n.tagName&&e.namespace===n.namespace&&e.key===n.key){var x=f(e.properties,n.properties);x&&(c=g(c,new o(o.PROPS,e,x))),c=function(e,n,t,r,u){for(var s=e.children,a=function(e,n){var t=y(n),r=t.keys,o=t.free;if(o.length===n.length)return{children:n,moves:null};var i=y(e),u=i.keys;if(i.free.length===e.length)return{children:n,moves:null};for(var s=[],a=0,c=o.length,f=0,l=0;l<e.length;l++){var p,v=e[l];v.key?r.hasOwnProperty(v.key)?(p=r[v.key],s.push(n[p])):(p=l-f++,s.push(null)):a<c?(p=o[a++],s.push(n[p])):(p=l-f++,s.push(null))}for(var h=a>=o.length?n.length:o[a],g=0;g<n.length;g++){var x=n[g];x.key?u.hasOwnProperty(x.key)||s.push(x):g>=h&&s.push(x)}for(var m,k=s.slice(),w=0,O=[],N=[],E=0;E<n.length;){var _=n[E];for(m=k[w];null===m&&k.length;)O.push(d(k,w,null)),m=k[w];m&&m.key===_.key?(w++,E++):_.key?(m&&m.key&&r[m.key]!==E+1?(O.push(d(k,w,m.key)),(m=k[w])&&m.key===_.key?w++:N.push({key:_.key,to:E})):N.push({key:_.key,to:E}),E++):m&&m.key&&O.push(d(k,w,m.key))}for(;w<k.length;)m=k[w],O.push(d(k,w,m&&m.key));if(O.length===f&&!N.length)return{children:s,moves:null};return{children:s,moves:{removes:O,inserts:N}}}(s,n.children),c=a.children,f=s.length,l=c.length,v=f>l?f:l,h=0;h<v;h++){var x=s[h],m=c[h];u+=1,x?p(x,m,t,u):m&&(r=g(r,new o(o.INSERT,null,m))),i(x)&&x.count&&(u+=x.count)}a.moves&&(r=g(r,new o(o.ORDER,e,a.moves)));return r}(e,n,t,c,r)}else c=g(c,new o(o.VNODE,e,n)),l=!0;else c=g(c,new o(o.VNODE,e,n)),l=!0;else u(n)?u(e)?e.text!==n.text&&(c=g(c,new o(o.VTEXT,e,n))):(c=g(c,new o(o.VTEXT,e,n)),l=!0):s(n)&&(s(e)||(l=!0),c=g(c,new o(o.WIDGET,e,n)));c&&(t[r]=c),l&&v(e,t,r)}}function v(e,n,t){!function e(n,t,r){if(i(n)){if(n.hooks&&(t[r]=g(t[r],new o(o.PROPS,n,function(e){var n={};for(var t in e)n[t]=void 0;return n}(n.hooks)))),n.descendantHooks||n.hasThunks)for(var u=n.children,s=u.length,c=0;c<s;c++){var f=u[c];e(f,t,r+=1),i(f)&&f.count&&(r+=f.count)}}else a(n)&&h(n,null,t,r)}(e,n,t),function e(n,t,r){if(s(n))"function"==typeof n.destroy&&(t[r]=g(t[r],new o(o.REMOVE,n,null)));else if(i(n)&&(n.hasWidgets||n.hasThunks))for(var u=n.children,c=u.length,f=0;f<c;f++){var l=u[f];e(l,t,r+=1),i(l)&&l.count&&(r+=l.count)}else a(n)&&h(n,null,t,r)}(e,n,t)}function h(e,n,t,r){var i=c(e,n),u=l(i.a,i.b);(function(e){for(var n in e)if("a"!==n)return!0;return!1})(u)&&(t[r]=new o(o.THUNK,null,u))}function d(e,n,t){return e.splice(n,1),{from:n,key:t}}function y(e){for(var n={},t=[],r=e.length,o=0;o<r;o++){var i=e[o];i.key?n[i.key]=o:t.push(o)}return{keys:n,free:t}}function g(e,n){return e?(r(e)?e.push(n):e=[e,n],e):n}e.exports=l},function(e,n,t){var r=t(21);e.exports=r},function(e,n,t){const r=t(22),o=t(19);e.exports=(({rootNode:e,currentVDomTree:n,newVDomTree:t}={})=>{const i=r(n,t);return{rootNode:o(e,i),currentVDomTree:t}})},function(e,n,t){const r=t(14);e.exports=((e,n,...t)=>r(e,n,t))},function(e,n,t){const r=t(24),o=(e,n=null,t=r)=>{if("string"==typeof e&&null===n){return e}const i={},u=[e,i],s="function"==typeof e;if(n(i,(e,n)=>{const r=o(e,n,t);u.push(r)}),s){return e(i)}return r(...u)};e.exports=o},function(e,n,t){const r=t(25);var o,i;e.exports=((e,n)=>{let t=null;return(o=>(e=e,i=n,void(t=r(e,i))))(),t})},function(e,n){},function(e,n,t){var r=t(12);e.exports=r},function(e,n,t){"use strict";(function(n){var t="undefined"!=typeof window?window:void 0!==n?n:{};e.exports=function(e,n){if(e in t)return t[e];return t[e]=n,n}}).call(this,t(13))},function(e,n,t){"use strict";var r=t(29);e.exports=function(e,n,t){var o="__INDIVIDUAL_ONE_VERSION_"+e,i=r(o+"_ENFORCE_SINGLETON",n);if(i!==n)throw new Error("Can only have one copy of "+e+".\nYou already have version "+i+" installed.\nThis means you cannot install version "+n);return r(o,t)}},function(e,n,t){"use strict";t(30)("ev-store","7");var r="__EV_STORE_KEY@7";e.exports=function(e){var n=e[r];n||(n=e[r]={});return n}},function(e,n,t){"use strict";var r=t(31);function o(e){if(!(this instanceof o))return new o(e);this.value=e}e.exports=o,o.prototype.hook=function(e,n){r(e)[n.substr(3)]=this.value},o.prototype.unhook=function(e,n){r(e)[n.substr(3)]=void 0}},function(e,n,t){"use strict";function r(e){if(!(this instanceof r))return new r(e);this.value=e}e.exports=r,r.prototype.hook=function(e,n){e[n]!==this.value&&(e[n]=this.value)}},function(e,n){var t,r,o;
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */
e.exports=(r=String.prototype.split,o=/()??/.exec("")[1]===t,function(e,n,i){if("[object RegExp]"!==Object.prototype.toString.call(n))return r.call(e,n,i);var u,s,a,c,f=[],l=(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.extended?"x":"")+(n.sticky?"y":""),p=0;for(n=new RegExp(n.source,l+"g"),e+="",o||(u=new RegExp("^"+n.source+"$(?!\\s)",l)),i=i===t?-1>>>0:i>>>0;(s=n.exec(e))&&!((a=s.index+s[0].length)>p&&(f.push(e.slice(p,s.index)),!o&&s.length>1&&s[0].replace(u,function(){for(var e=1;e<arguments.length-2;e++)arguments[e]===t&&(s[e]=t)}),s.length>1&&s.index<e.length&&Array.prototype.push.apply(f,s.slice(1)),c=s[0].length,p=a,f.length>=i));)n.lastIndex===s.index&&n.lastIndex++;return p===e.length?!c&&n.test("")||f.push(""):f.push(e.slice(p)),f.length>i?f.slice(0,i):f})},function(e,n,t){"use strict";var r=t(34),o=/([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/,i=/^\.|#/;e.exports=function(e,n){if(!e)return"DIV";var t,u,s,a,c=!n.hasOwnProperty("id"),f=r(e,o),l=null;i.test(f[1])&&(l="DIV");for(a=0;a<f.length;a++)(u=f[a])&&(s=u.charAt(0),l?"."===s?(t=t||[]).push(u.substring(1,u.length)):"#"===s&&c&&(n.id=u.substring(1,u.length)):l=u);t&&(n.className&&t.push(n.className),n.className=t.join(" "));return n.namespace?l:l.toUpperCase()}},function(e,n,t){var r=t(2);function o(e){this.text=String(e)}e.exports=o,o.prototype.version=r,o.prototype.type="VirtualText"},function(e,n,t){var r=t(2),o=t(1),i=t(0),u=t(5),s=t(4);e.exports=f;var a={},c=[];function f(e,n,t,r,f){this.tagName=e,this.properties=n||a,this.children=t||c,this.key=null!=r?String(r):void 0,this.namespace="string"==typeof f?f:null;var l,p=t&&t.length||0,v=0,h=!1,d=!1,y=!1;for(var g in n)if(n.hasOwnProperty(g)){var x=n[g];s(x)&&x.unhook&&(l||(l={}),l[g]=x)}for(var m=0;m<p;m++){var k=t[m];o(k)?(v+=k.count||0,!h&&k.hasWidgets&&(h=!0),!d&&k.hasThunks&&(d=!0),y||!k.hooks&&!k.descendantHooks||(y=!0)):!h&&i(k)?"function"==typeof k.destroy&&(h=!0):!d&&u(k)&&(d=!0)}this.count=p+v,this.hasWidgets=h,this.hasThunks=d,this.hooks=l,this.descendantHooks=y}f.prototype.version=r,f.prototype.type="VirtualNode"},function(e,n,t){"use strict";var r=t(6),o=t(37),i=t(36),u=t(1),s=t(3),a=t(0),c=t(4),f=t(5),l=t(35),p=t(33),v=t(32);function h(e){return u(e)||s(e)||a(e)||f(e)}function d(e){try{return JSON.stringify(e,null,"    ")}catch(n){return String(e)}}e.exports=function(e,n,t){var u,s,a,f,y=[];!t&&(g=n,"string"==typeof g||r(g)||h(g))&&(t=n,s={});var g;u=l(e,s=s||n||{}),s.hasOwnProperty("key")&&(a=s.key,s.key=void 0);s.hasOwnProperty("namespace")&&(f=s.namespace,s.namespace=void 0);"INPUT"!==u||f||!s.hasOwnProperty("value")||void 0===s.value||c(s.value)||(s.value=p(s.value));(function(e){for(var n in e)if(e.hasOwnProperty(n)){var t=e[n];if(c(t))continue;"ev-"===n.substr(0,3)&&(e[n]=v(t))}})(s),void 0!==t&&null!==t&&function e(n,t,o,u){if("string"==typeof n)t.push(new i(n));else if("number"==typeof n)t.push(new i(String(n)));else if(h(n))t.push(n);else{if(!r(n)){if(null===n||void 0===n)return;throw a={foreignObject:n,parentVnode:{tagName:o,properties:u}},(c=new Error).type="virtual-hyperscript.unexpected.virtual-element",c.message="Unexpected virtual child passed to h().\nExpected a VNode / Vthunk / VWidget / string but:\ngot:\n"+d(a.foreignObject)+".\nThe parent vnode is:\n"+d(a.parentVnode),c.foreignObject=a.foreignObject,c.parentVnode=a.parentVnode,c}for(var s=0;s<n.length;s++)e(n[s],t,o,u)}var a,c}(t,y,u,s);return new o(u,s,y,a,f)}},function(e,n,t){const r=t(14),o=t(28);e.exports=(({domContainerElement:e=window.document.body}={})=>{const n=r("div"),t=o(n);return e.appendChild(t),{rootNode:t,currentVDomTree:n}})},function(e,n,t){const r=t(39),o=t(26),i=t(23);e.exports={initDom:r,renderVDomTree:o,updateDom:i}}])});
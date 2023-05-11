var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function r(){return Object.create(null)}function o(t){t.forEach(n)}function s(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function a(e,...n){if(null==e)return t;const r=e.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}function c(t,e,n){t.$$.on_destroy.push(a(e,n))}function u(t,e,n,r){if(t){const o=l(t,e,n,r);return t[0](o)}}function l(t,n,r,o){return t[1]&&o?e(r.ctx.slice(),t[1](o(n))):r.ctx}function f(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|o[r];return t}return e.dirty|o}return e.dirty}function p(t,e,n,r,o,s){if(o){const i=l(e,n,r,s);t.p(i,o)}}function d(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}function h(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}function m(t,e){t.appendChild(e)}function g(t,e,n){t.insertBefore(e,n||null)}function y(t){t.parentNode&&t.parentNode.removeChild(t)}function v(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function $(t){return document.createElement(t)}function b(t){return document.createTextNode(t)}function w(){return b(" ")}function x(){return b("")}function E(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function k(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function S(t,e){e=""+e,t.data!==e&&(t.data=e)}function _(t,e){t.value=null==e?"":e}function O(t,e,n){for(let n=0;n<t.options.length;n+=1){const r=t.options[n];if(r.__value===e)return void(r.selected=!0)}n&&void 0===e||(t.selectedIndex=-1)}function C(t,e,n){t.classList[n?"add":"remove"](e)}function j(t,e){return new t(e)}let T;function N(t){T=t}function A(){if(!T)throw new Error("Function called outside component initialization");return T}function R(t){A().$$.on_mount.push(t)}function P(t,e){return A().$$.context.set(t,e),e}function U(t){return A().$$.context.get(t)}const L=[],B=[];let q=[];const D=[],I=Promise.resolve();let z=!1;function F(t){q.push(t)}const H=new Set;let J=0;function M(){if(0!==J)return;const t=T;do{try{for(;J<L.length;){const t=L[J];J++,N(t),W(t.$$)}}catch(t){throw L.length=0,J=0,t}for(N(null),L.length=0,J=0;B.length;)B.pop()();for(let t=0;t<q.length;t+=1){const e=q[t];H.has(e)||(H.add(e),e())}q.length=0}while(L.length);for(;D.length;)D.pop()();z=!1,H.clear(),N(t)}function W(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(F)}}const K=new Set;let V;function X(){V={r:0,c:[],p:V}}function G(){V.r||o(V.c),V=V.p}function Y(t,e){t&&t.i&&(K.delete(t),t.i(e))}function Z(t,e,n,r){if(t&&t.o){if(K.has(t))return;K.add(t),V.c.push((()=>{K.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}else r&&r()}function Q(t){return"object"==typeof t&&null!==t?t:{}}function tt(t){t&&t.c()}function et(t,e,r,i){const{fragment:a,after_update:c}=t.$$;a&&a.m(e,r),i||F((()=>{const e=t.$$.on_mount.map(n).filter(s);t.$$.on_destroy?t.$$.on_destroy.push(...e):o(e),t.$$.on_mount=[]})),c.forEach(F)}function nt(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];q.forEach((r=>-1===t.indexOf(r)?e.push(r):n.push(r))),n.forEach((t=>t())),q=e}(n.after_update),o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function rt(t,e){-1===t.$$.dirty[0]&&(L.push(t),z||(z=!0,I.then(M)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ot(e,n,s,i,a,c,u,l=[-1]){const f=T;N(e);const p=e.$$={fragment:null,ctx:[],props:c,update:t,not_equal:a,bound:r(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(f?f.$$.context:[])),callbacks:r(),dirty:l,skip_bound:!1,root:n.target||f.$$.root};u&&u(p.root);let d=!1;if(p.ctx=s?s(e,n.props||{},((t,n,...r)=>{const o=r.length?r[0]:n;return p.ctx&&a(p.ctx[t],p.ctx[t]=o)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](o),d&&rt(e,t)),n})):[],p.update(),d=!0,o(p.before_update),p.fragment=!!i&&i(p.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);p.fragment&&p.fragment.l(t),t.forEach(y)}else p.fragment&&p.fragment.c();n.intro&&Y(e.$$.fragment),et(e,n.target,n.anchor,n.customElement),M()}N(f)}class st{$destroy(){nt(this,1),this.$destroy=t}$on(e,n){if(!s(n))return t;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const t=r.indexOf(n);-1!==t&&r.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const it=[];function at(e,n=t){let r;const o=new Set;function s(t){if(i(e,t)&&(e=t,r)){const t=!it.length;for(const t of o)t[1](),it.push(t,e);if(t){for(let t=0;t<it.length;t+=2)it[t][0](it[t+1]);it.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(i,a=t){const c=[i,a];return o.add(c),1===o.size&&(r=n(s)||t),i(e),()=>{o.delete(c),0===o.size&&r&&(r(),r=null)}}}}function ct(e,n,r){const i=!Array.isArray(e),c=i?[e]:e,u=n.length<2;return l=e=>{let r=!1;const l=[];let f=0,p=t;const d=()=>{if(f)return;p();const r=n(i?l[0]:l,e);u?e(r):p=s(r)?r:t},h=c.map(((t,e)=>a(t,(t=>{l[e]=t,f&=~(1<<e),r&&d()}),(()=>{f|=1<<e}))));return r=!0,d(),function(){o(h),p(),r=!1}},{subscribe:at(r,l).subscribe};var l}const ut={},lt={};function ft(t){return{...t.location,state:t.history.state,key:t.history.state&&t.history.state.key||"initial"}}const pt=function(t,e){const n=[];let r=ft(t);return{get location(){return r},listen(e){n.push(e);const o=()=>{r=ft(t),e({location:r,action:"POP"})};return t.addEventListener("popstate",o),()=>{t.removeEventListener("popstate",o);const r=n.indexOf(e);n.splice(r,1)}},navigate(e,{state:o,replace:s=!1}={}){o={...o,key:Date.now()+""};try{s?t.history.replaceState(o,null,e):t.history.pushState(o,null,e)}catch(n){t.location[s?"replace":"assign"](e)}r=ft(t),n.forEach((t=>t({location:r,action:"PUSH"})))}}}(Boolean("undefined"!=typeof window&&window.document&&window.document.createElement)?window:function(t="/"){let e=0;const n=[{pathname:t,search:""}],r=[];return{get location(){return n[e]},addEventListener(t,e){},removeEventListener(t,e){},history:{get entries(){return n},get index(){return e},get state(){return r[e]},pushState(t,o,s){const[i,a=""]=s.split("?");e++,n.push({pathname:i,search:a}),r.push(t)},replaceState(t,o,s){const[i,a=""]=s.split("?");n[e]={pathname:i,search:a},r[e]=t}}}}()),{navigate:dt}=pt,ht=/^:(.+)/,mt=4,gt=3,yt=2,vt=1,$t=1;function bt(t){return"*"===t[0]}function wt(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function xt(t){return t.replace(/(^\/+|\/+$)/g,"")}function Et(t,e){return{route:t,score:t.default?0:wt(t.path).reduce(((t,e)=>(t+=mt,!function(t){return""===t}(e)?!function(t){return ht.test(t)}(e)?bt(e)?t-=mt+vt:t+=gt:t+=yt:t+=$t,t)),0),index:e}}function kt(t,e){let n,r;const[o]=e.split("?"),s=wt(o),i=""===s[0],a=function(t){return t.map(Et).sort(((t,e)=>t.score<e.score?1:t.score>e.score?-1:t.index-e.index))}(t);for(let t=0,o=a.length;t<o;t++){const o=a[t].route;let c=!1;if(o.default){r={route:o,params:{},uri:e};continue}const u=wt(o.path),l={},f=Math.max(s.length,u.length);let p=0;for(;p<f;p++){const t=u[p],e=s[p];if(void 0!==t&&bt(t)){l["*"===t?"*":t.slice(1)]=s.slice(p).map(decodeURIComponent).join("/");break}if(void 0===e){c=!0;break}let n=ht.exec(t);if(n&&!i){const t=decodeURIComponent(e);l[n[1]]=t}else if(t!==e){c=!0;break}}if(!c){n={route:o,params:l,uri:"/"+s.slice(0,p).join("/")};break}}return n||r||null}function St(t,e){return`${xt("/"===e?t:`${xt(t)}/${xt(e)}`)}/`}function _t(t){let e;const n=t[9].default,r=u(n,t,t[8],null);return{c(){r&&r.c()},m(t,n){r&&r.m(t,n),e=!0},p(t,[o]){r&&r.p&&(!e||256&o)&&p(r,n,t,t[8],e?f(n,t[8],o,null):d(t[8]),null)},i(t){e||(Y(r,t),e=!0)},o(t){Z(r,t),e=!1},d(t){r&&r.d(t)}}}function Ot(t,e,n){let r,o,s,{$$slots:i={},$$scope:a}=e,{basepath:u="/"}=e,{url:l=null}=e;const f=U(ut),p=U(lt),d=at([]);c(t,d,(t=>n(6,o=t)));const h=at(null);let m=!1;const g=f||at(l?{pathname:l}:pt.location);c(t,g,(t=>n(5,r=t)));const y=p?p.routerBase:at({path:u,uri:u});c(t,y,(t=>n(7,s=t)));const v=ct([y,h],(([t,e])=>{if(null===e)return t;const{path:n}=t,{route:r,uri:o}=e;return{path:r.default?n:r.path.replace(/\*.*$/,""),uri:o}}));return f||(R((()=>pt.listen((t=>{g.set(t.location)})))),P(ut,g)),P(lt,{activeRoute:h,base:y,routerBase:v,registerRoute:function(t){const{path:e}=s;let{path:n}=t;if(t._path=n,t.path=St(e,n),"undefined"==typeof window){if(m)return;const e=function(t,e){return kt([t],e)}(t,r.pathname);e&&(h.set(e),m=!0)}else d.update((e=>(e.push(t),e)))},unregisterRoute:function(t){d.update((e=>{const n=e.indexOf(t);return e.splice(n,1),e}))}}),t.$$set=t=>{"basepath"in t&&n(3,u=t.basepath),"url"in t&&n(4,l=t.url),"$$scope"in t&&n(8,a=t.$$scope)},t.$$.update=()=>{if(128&t.$$.dirty){const{path:t}=s;d.update((e=>(e.forEach((e=>e.path=St(t,e._path))),e)))}if(96&t.$$.dirty){const t=kt(o,r.pathname);h.set(t)}},[d,g,y,u,l,r,o,s,a,i]}class Ct extends st{constructor(t){super(),ot(this,t,Ot,_t,i,{basepath:3,url:4})}}const jt=t=>({params:4&t,location:16&t}),Tt=t=>({params:t[2],location:t[4]});function Nt(t){let e,n,r,o;const s=[Rt,At],i=[];function a(t,e){return null!==t[0]?0:1}return e=a(t),n=i[e]=s[e](t),{c(){n.c(),r=x()},m(t,n){i[e].m(t,n),g(t,r,n),o=!0},p(t,o){let c=e;e=a(t),e===c?i[e].p(t,o):(X(),Z(i[c],1,1,(()=>{i[c]=null})),G(),n=i[e],n?n.p(t,o):(n=i[e]=s[e](t),n.c()),Y(n,1),n.m(r.parentNode,r))},i(t){o||(Y(n),o=!0)},o(t){Z(n),o=!1},d(t){i[e].d(t),t&&y(r)}}}function At(t){let e;const n=t[10].default,r=u(n,t,t[9],Tt);return{c(){r&&r.c()},m(t,n){r&&r.m(t,n),e=!0},p(t,o){r&&r.p&&(!e||532&o)&&p(r,n,t,t[9],e?f(n,t[9],o,jt):d(t[9]),Tt)},i(t){e||(Y(r,t),e=!0)},o(t){Z(r,t),e=!1},d(t){r&&r.d(t)}}}function Rt(t){let n,r,o;const s=[{location:t[4]},t[2],t[3]];var i=t[0];function a(t){let n={};for(let t=0;t<s.length;t+=1)n=e(n,s[t]);return{props:n}}return i&&(n=j(i,a())),{c(){n&&tt(n.$$.fragment),r=x()},m(t,e){n&&et(n,t,e),g(t,r,e),o=!0},p(t,e){const o=28&e?function(t,e){const n={},r={},o={$$scope:1};let s=t.length;for(;s--;){const i=t[s],a=e[s];if(a){for(const t in i)t in a||(r[t]=1);for(const t in a)o[t]||(n[t]=a[t],o[t]=1);t[s]=a}else for(const t in i)o[t]=1}for(const t in r)t in n||(n[t]=void 0);return n}(s,[16&e&&{location:t[4]},4&e&&Q(t[2]),8&e&&Q(t[3])]):{};if(1&e&&i!==(i=t[0])){if(n){X();const t=n;Z(t.$$.fragment,1,0,(()=>{nt(t,1)})),G()}i?(n=j(i,a()),tt(n.$$.fragment),Y(n.$$.fragment,1),et(n,r.parentNode,r)):n=null}else i&&n.$set(o)},i(t){o||(n&&Y(n.$$.fragment,t),o=!0)},o(t){n&&Z(n.$$.fragment,t),o=!1},d(t){t&&y(r),n&&nt(n,t)}}}function Pt(t){let e,n,r=null!==t[1]&&t[1].route===t[7]&&Nt(t);return{c(){r&&r.c(),e=x()},m(t,o){r&&r.m(t,o),g(t,e,o),n=!0},p(t,[n]){null!==t[1]&&t[1].route===t[7]?r?(r.p(t,n),2&n&&Y(r,1)):(r=Nt(t),r.c(),Y(r,1),r.m(e.parentNode,e)):r&&(X(),Z(r,1,1,(()=>{r=null})),G())},i(t){n||(Y(r),n=!0)},o(t){Z(r),n=!1},d(t){r&&r.d(t),t&&y(e)}}}function Ut(t,n,r){let o,s,{$$slots:i={},$$scope:a}=n,{path:u=""}=n,{component:l=null}=n;const{registerRoute:f,unregisterRoute:p,activeRoute:d}=U(lt);c(t,d,(t=>r(1,o=t)));const m=U(ut);c(t,m,(t=>r(4,s=t)));const g={path:u,default:""===u};let y={},v={};var $;return f(g),"undefined"!=typeof window&&($=()=>{p(g)},A().$$.on_destroy.push($)),t.$$set=t=>{r(13,n=e(e({},n),h(t))),"path"in t&&r(8,u=t.path),"component"in t&&r(0,l=t.component),"$$scope"in t&&r(9,a=t.$$scope)},t.$$.update=()=>{2&t.$$.dirty&&o&&o.route===g&&r(2,y=o.params);{const{path:t,component:e,...o}=n;r(3,v=o)}},n=h(n),[l,o,y,v,s,d,m,g,u,a,i]}class Lt extends st{constructor(t){super(),ot(this,t,Ut,Pt,i,{path:8,component:0})}}function Bt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var qt={exports:{}},Dt=function(t,e){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return t.apply(e,n)}},It=Dt,zt=Object.prototype.toString;function Ft(t){return"[object Array]"===zt.call(t)}function Ht(t){return void 0===t}function Jt(t){return null!==t&&"object"==typeof t}function Mt(t){if("[object Object]"!==zt.call(t))return!1;var e=Object.getPrototypeOf(t);return null===e||e===Object.prototype}function Wt(t){return"[object Function]"===zt.call(t)}function Kt(t,e){if(null!=t)if("object"!=typeof t&&(t=[t]),Ft(t))for(var n=0,r=t.length;n<r;n++)e.call(null,t[n],n,t);else for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.call(null,t[o],o,t)}var Vt={isArray:Ft,isArrayBuffer:function(t){return"[object ArrayBuffer]"===zt.call(t)},isBuffer:function(t){return null!==t&&!Ht(t)&&null!==t.constructor&&!Ht(t.constructor)&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)},isFormData:function(t){return"undefined"!=typeof FormData&&t instanceof FormData},isArrayBufferView:function(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isObject:Jt,isPlainObject:Mt,isUndefined:Ht,isDate:function(t){return"[object Date]"===zt.call(t)},isFile:function(t){return"[object File]"===zt.call(t)},isBlob:function(t){return"[object Blob]"===zt.call(t)},isFunction:Wt,isStream:function(t){return Jt(t)&&Wt(t.pipe)},isURLSearchParams:function(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:Kt,merge:function t(){var e={};function n(n,r){Mt(e[r])&&Mt(n)?e[r]=t(e[r],n):Mt(n)?e[r]=t({},n):Ft(n)?e[r]=n.slice():e[r]=n}for(var r=0,o=arguments.length;r<o;r++)Kt(arguments[r],n);return e},extend:function(t,e,n){return Kt(e,(function(e,r){t[r]=n&&"function"==typeof e?It(e,n):e})),t},trim:function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")},stripBOM:function(t){return 65279===t.charCodeAt(0)&&(t=t.slice(1)),t}},Xt=Vt;function Gt(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var Yt=function(t,e,n){if(!e)return t;var r;if(n)r=n(e);else if(Xt.isURLSearchParams(e))r=e.toString();else{var o=[];Xt.forEach(e,(function(t,e){null!=t&&(Xt.isArray(t)?e+="[]":t=[t],Xt.forEach(t,(function(t){Xt.isDate(t)?t=t.toISOString():Xt.isObject(t)&&(t=JSON.stringify(t)),o.push(Gt(e)+"="+Gt(t))})))})),r=o.join("&")}if(r){var s=t.indexOf("#");-1!==s&&(t=t.slice(0,s)),t+=(-1===t.indexOf("?")?"?":"&")+r}return t},Zt=Vt;function Qt(){this.handlers=[]}Qt.prototype.use=function(t,e,n){return this.handlers.push({fulfilled:t,rejected:e,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1},Qt.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},Qt.prototype.forEach=function(t){Zt.forEach(this.handlers,(function(e){null!==e&&t(e)}))};var te,ee,ne,re,oe,se,ie,ae,ce,ue,le,fe,pe,de,he,me,ge,ye,ve,$e,be,we,xe=Qt,Ee=Vt,ke=function(t,e){Ee.forEach(t,(function(n,r){r!==e&&r.toUpperCase()===e.toUpperCase()&&(t[e]=n,delete t[r])}))},Se=function(t,e,n,r,o){return t.config=e,n&&(t.code=n),t.request=r,t.response=o,t.isAxiosError=!0,t.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},t};function _e(){if(ee)return te;ee=1;var t=Se;return te=function(e,n,r,o,s){var i=new Error(e);return t(i,n,r,o,s)}}function Oe(){if(re)return ne;re=1;var t=_e();return ne=function(e,n,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?n(t("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}}function Ce(){if(se)return oe;se=1;var t=Vt;return oe=t.isStandardBrowserEnv()?{write:function(e,n,r,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(n)),t.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),t.isString(o)&&a.push("path="+o),t.isString(s)&&a.push("domain="+s),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}},oe}function je(){return ae?ie:(ae=1,ie=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)})}function Te(){return ue?ce:(ue=1,ce=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t})}function Ne(){if(fe)return le;fe=1;var t=je(),e=Te();return le=function(n,r){return n&&!t(r)?e(n,r):r}}function Ae(){if(de)return pe;de=1;var t=Vt,e=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];return pe=function(n){var r,o,s,i={};return n?(t.forEach(n.split("\n"),(function(n){if(s=n.indexOf(":"),r=t.trim(n.substr(0,s)).toLowerCase(),o=t.trim(n.substr(s+1)),r){if(i[r]&&e.indexOf(r)>=0)return;i[r]="set-cookie"===r?(i[r]?i[r]:[]).concat([o]):i[r]?i[r]+", "+o:o}})),i):i}}function Re(){if(me)return he;me=1;var t=Vt;return he=t.isStandardBrowserEnv()?function(){var e,n=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(t){var e=t;return n&&(r.setAttribute("href",e),e=r.href),r.setAttribute("href",e),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(n){var r=t.isString(n)?o(n):n;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}}function Pe(){if(ye)return ge;function t(t){this.message=t}return ye=1,t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,ge=t}function Ue(){if($e)return ve;$e=1;var t=Vt,e=Oe(),n=Ce(),r=Yt,o=Ne(),s=Ae(),i=Re(),a=_e(),c=Le(),u=Pe();return ve=function(l){return new Promise((function(f,p){var d,h=l.data,m=l.headers,g=l.responseType;function y(){l.cancelToken&&l.cancelToken.unsubscribe(d),l.signal&&l.signal.removeEventListener("abort",d)}t.isFormData(h)&&delete m["Content-Type"];var v=new XMLHttpRequest;if(l.auth){var $=l.auth.username||"",b=l.auth.password?unescape(encodeURIComponent(l.auth.password)):"";m.Authorization="Basic "+btoa($+":"+b)}var w=o(l.baseURL,l.url);function x(){if(v){var t="getAllResponseHeaders"in v?s(v.getAllResponseHeaders()):null,n={data:g&&"text"!==g&&"json"!==g?v.response:v.responseText,status:v.status,statusText:v.statusText,headers:t,config:l,request:v};e((function(t){f(t),y()}),(function(t){p(t),y()}),n),v=null}}if(v.open(l.method.toUpperCase(),r(w,l.params,l.paramsSerializer),!0),v.timeout=l.timeout,"onloadend"in v?v.onloadend=x:v.onreadystatechange=function(){v&&4===v.readyState&&(0!==v.status||v.responseURL&&0===v.responseURL.indexOf("file:"))&&setTimeout(x)},v.onabort=function(){v&&(p(a("Request aborted",l,"ECONNABORTED",v)),v=null)},v.onerror=function(){p(a("Network Error",l,null,v)),v=null},v.ontimeout=function(){var t=l.timeout?"timeout of "+l.timeout+"ms exceeded":"timeout exceeded",e=l.transitional||c.transitional;l.timeoutErrorMessage&&(t=l.timeoutErrorMessage),p(a(t,l,e.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",v)),v=null},t.isStandardBrowserEnv()){var E=(l.withCredentials||i(w))&&l.xsrfCookieName?n.read(l.xsrfCookieName):void 0;E&&(m[l.xsrfHeaderName]=E)}"setRequestHeader"in v&&t.forEach(m,(function(t,e){void 0===h&&"content-type"===e.toLowerCase()?delete m[e]:v.setRequestHeader(e,t)})),t.isUndefined(l.withCredentials)||(v.withCredentials=!!l.withCredentials),g&&"json"!==g&&(v.responseType=l.responseType),"function"==typeof l.onDownloadProgress&&v.addEventListener("progress",l.onDownloadProgress),"function"==typeof l.onUploadProgress&&v.upload&&v.upload.addEventListener("progress",l.onUploadProgress),(l.cancelToken||l.signal)&&(d=function(t){v&&(p(!t||t&&t.type?new u("canceled"):t),v.abort(),v=null)},l.cancelToken&&l.cancelToken.subscribe(d),l.signal&&(l.signal.aborted?d():l.signal.addEventListener("abort",d))),h||(h=null),v.send(h)}))}}function Le(){if(we)return be;we=1;var t=Vt,e=ke,n=Se,r={"Content-Type":"application/x-www-form-urlencoded"};function o(e,n){!t.isUndefined(e)&&t.isUndefined(e["Content-Type"])&&(e["Content-Type"]=n)}var s,i={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(s=Ue()),s),transformRequest:[function(n,r){return e(r,"Accept"),e(r,"Content-Type"),t.isFormData(n)||t.isArrayBuffer(n)||t.isBuffer(n)||t.isStream(n)||t.isFile(n)||t.isBlob(n)?n:t.isArrayBufferView(n)?n.buffer:t.isURLSearchParams(n)?(o(r,"application/x-www-form-urlencoded;charset=utf-8"),n.toString()):t.isObject(n)||r&&"application/json"===r["Content-Type"]?(o(r,"application/json"),function(e,n,r){if(t.isString(e))try{return(n||JSON.parse)(e),t.trim(e)}catch(t){if("SyntaxError"!==t.name)throw t}return(r||JSON.stringify)(e)}(n)):n}],transformResponse:[function(e){var r=this.transitional||i.transitional,o=r&&r.silentJSONParsing,s=r&&r.forcedJSONParsing,a=!o&&"json"===this.responseType;if(a||s&&t.isString(e)&&e.length)try{return JSON.parse(e)}catch(t){if(a){if("SyntaxError"===t.name)throw n(t,this,"E_JSON_PARSE");throw t}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};return t.forEach(["delete","get","head"],(function(t){i.headers[t]={}})),t.forEach(["post","put","patch"],(function(e){i.headers[e]=t.merge(r)})),be=i}var Be,qe,De=Vt,Ie=Le();function ze(){return qe?Be:(qe=1,Be=function(t){return!(!t||!t.__CANCEL__)})}var Fe=Vt,He=function(t,e,n){var r=this||Ie;return De.forEach(n,(function(n){t=n.call(r,t,e)})),t},Je=ze(),Me=Le(),We=Pe();function Ke(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new We("canceled")}var Ve,Xe,Ge=Vt,Ye=function(t,e){e=e||{};var n={};function r(t,e){return Ge.isPlainObject(t)&&Ge.isPlainObject(e)?Ge.merge(t,e):Ge.isPlainObject(e)?Ge.merge({},e):Ge.isArray(e)?e.slice():e}function o(n){return Ge.isUndefined(e[n])?Ge.isUndefined(t[n])?void 0:r(void 0,t[n]):r(t[n],e[n])}function s(t){if(!Ge.isUndefined(e[t]))return r(void 0,e[t])}function i(n){return Ge.isUndefined(e[n])?Ge.isUndefined(t[n])?void 0:r(void 0,t[n]):r(void 0,e[n])}function a(n){return n in e?r(t[n],e[n]):n in t?r(void 0,t[n]):void 0}var c={url:s,method:s,data:s,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:a};return Ge.forEach(Object.keys(t).concat(Object.keys(e)),(function(t){var e=c[t]||o,r=e(t);Ge.isUndefined(r)&&e!==a||(n[t]=r)})),n};function Ze(){return Xe?Ve:(Xe=1,Ve={version:"0.24.0"})}var Qe=Ze().version,tn={};["object","boolean","number","function","string","symbol"].forEach((function(t,e){tn[t]=function(n){return typeof n===t||"a"+(e<1?"n ":" ")+t}}));var en={};tn.transitional=function(t,e,n){function r(t,e){return"[Axios v"+Qe+"] Transitional option '"+t+"'"+e+(n?". "+n:"")}return function(n,o,s){if(!1===t)throw new Error(r(o," has been removed"+(e?" in "+e:"")));return e&&!en[o]&&(en[o]=!0,console.warn(r(o," has been deprecated since v"+e+" and will be removed in the near future"))),!t||t(n,o,s)}};var nn,rn,on,sn,an,cn,un={assertOptions:function(t,e,n){if("object"!=typeof t)throw new TypeError("options must be an object");for(var r=Object.keys(t),o=r.length;o-- >0;){var s=r[o],i=e[s];if(i){var a=t[s],c=void 0===a||i(a,s,t);if(!0!==c)throw new TypeError("option "+s+" must be "+c)}else if(!0!==n)throw Error("Unknown option "+s)}},validators:tn},ln=Vt,fn=Yt,pn=xe,dn=function(t){return Ke(t),t.headers=t.headers||{},t.data=He.call(t,t.data,t.headers,t.transformRequest),t.headers=Fe.merge(t.headers.common||{},t.headers[t.method]||{},t.headers),Fe.forEach(["delete","get","head","post","put","patch","common"],(function(e){delete t.headers[e]})),(t.adapter||Me.adapter)(t).then((function(e){return Ke(t),e.data=He.call(t,e.data,e.headers,t.transformResponse),e}),(function(e){return Je(e)||(Ke(t),e&&e.response&&(e.response.data=He.call(t,e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)}))},hn=Ye,mn=un,gn=mn.validators;function yn(t){this.defaults=t,this.interceptors={request:new pn,response:new pn}}yn.prototype.request=function(t){"string"==typeof t?(t=arguments[1]||{}).url=arguments[0]:t=t||{},(t=hn(this.defaults,t)).method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var e=t.transitional;void 0!==e&&mn.assertOptions(e,{silentJSONParsing:gn.transitional(gn.boolean),forcedJSONParsing:gn.transitional(gn.boolean),clarifyTimeoutError:gn.transitional(gn.boolean)},!1);var n=[],r=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(r=r&&e.synchronous,n.unshift(e.fulfilled,e.rejected))}));var o,s=[];if(this.interceptors.response.forEach((function(t){s.push(t.fulfilled,t.rejected)})),!r){var i=[dn,void 0];for(Array.prototype.unshift.apply(i,n),i=i.concat(s),o=Promise.resolve(t);i.length;)o=o.then(i.shift(),i.shift());return o}for(var a=t;n.length;){var c=n.shift(),u=n.shift();try{a=c(a)}catch(t){u(t);break}}try{o=dn(a)}catch(t){return Promise.reject(t)}for(;s.length;)o=o.then(s.shift(),s.shift());return o},yn.prototype.getUri=function(t){return t=hn(this.defaults,t),fn(t.url,t.params,t.paramsSerializer).replace(/^\?/,"")},ln.forEach(["delete","get","head","options"],(function(t){yn.prototype[t]=function(e,n){return this.request(hn(n||{},{method:t,url:e,data:(n||{}).data}))}})),ln.forEach(["post","put","patch"],(function(t){yn.prototype[t]=function(e,n,r){return this.request(hn(r||{},{method:t,url:e,data:n}))}}));var vn=Vt,$n=Dt,bn=yn,wn=Ye;var xn=function t(e){var n=new bn(e),r=$n(bn.prototype.request,n);return vn.extend(r,bn.prototype,n),vn.extend(r,n),r.create=function(n){return t(wn(e,n))},r}(Le());xn.Axios=bn,xn.Cancel=Pe(),xn.CancelToken=function(){if(rn)return nn;rn=1;var t=Pe();function e(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var n;this.promise=new Promise((function(t){n=t}));var r=this;this.promise.then((function(t){if(r._listeners){var e,n=r._listeners.length;for(e=0;e<n;e++)r._listeners[e](t);r._listeners=null}})),this.promise.then=function(t){var e,n=new Promise((function(t){r.subscribe(t),e=t})).then(t);return n.cancel=function(){r.unsubscribe(e)},n},e((function(e){r.reason||(r.reason=new t(e),n(r.reason))}))}return e.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},e.prototype.subscribe=function(t){this.reason?t(this.reason):this._listeners?this._listeners.push(t):this._listeners=[t]},e.prototype.unsubscribe=function(t){if(this._listeners){var e=this._listeners.indexOf(t);-1!==e&&this._listeners.splice(e,1)}},e.source=function(){var t;return{token:new e((function(e){t=e})),cancel:t}},nn=e}(),xn.isCancel=ze(),xn.VERSION=Ze().version,xn.all=function(t){return Promise.all(t)},xn.spread=sn?on:(sn=1,on=function(t){return function(e){return t.apply(null,e)}}),xn.isAxiosError=cn?an:(cn=1,an=function(t){return"object"==typeof t&&!0===t.isAxiosError}),qt.exports=xn,qt.exports.default=xn;var En=qt.exports,kn=Bt(En);function Sn(e){let n,r,s,i,a,c,u,l,f,p,d,h,v;return{c(){n=$("div"),r=$("h2"),r.textContent="Login",s=w(),i=$("p"),a=b(e[2]),c=w(),u=$("input"),l=w(),f=$("input"),p=w(),d=$("button"),d.textContent="Login",k(r,"class","svelte-1v1cm4r"),k(i,"class","error-message svelte-1v1cm4r"),k(u,"type","username"),k(u,"placeholder","username"),u.required=!0,k(u,"class","svelte-1v1cm4r"),k(f,"type","password"),k(f,"placeholder","password"),f.required=!0,k(f,"class","svelte-1v1cm4r"),k(d,"class","svelte-1v1cm4r"),k(n,"class","login-form svelte-1v1cm4r")},m(t,o){g(t,n,o),m(n,r),m(n,s),m(n,i),m(i,a),m(n,c),m(n,u),_(u,e[0]),m(n,l),m(n,f),_(f,e[1]),m(n,p),m(n,d),h||(v=[E(u,"input",e[4]),E(f,"input",e[5]),E(d,"click",e[3])],h=!0)},p(t,[e]){4&e&&S(a,t[2]),1&e&&_(u,t[0]),2&e&&f.value!==t[1]&&_(f,t[1])},i:t,o:t,d(t){t&&y(n),h=!1,o(v)}}}function _n(t,e,n){let r="",o="",s="";return[r,o,s,async function(){try{(await En.post("https://unibank.herokuapp.com/api/login",{username:r,password:o})).data.success?(localStorage.setItem("username",r),dt("/authentication")):n(2,s="User was not found")}catch(t){console.error("Error:",t)}},function(){r=this.value,n(0,r)},function(){o=this.value,n(1,o)}]}function On(e){let n,r,s,i,a,c,u,l,f,p,d;return{c(){n=$("div"),r=$("h2"),r.textContent="Authentication",s=w(),i=$("p"),a=b(e[1]),c=w(),u=$("input"),l=w(),f=$("button"),f.textContent="Authenticate",k(r,"class","svelte-1pasy9z"),k(i,"class","error-message svelte-1pasy9z"),k(u,"type","text"),k(u,"inputmode","numeric"),k(u,"pattern","[0-9]*"),k(u,"minlength","6"),k(u,"maxlength","6"),k(u,"placeholder","6-digit code"),u.required=!0,k(u,"class","svelte-1pasy9z"),k(f,"class","svelte-1pasy9z"),k(n,"class","auth-form svelte-1pasy9z")},m(t,o){g(t,n,o),m(n,r),m(n,s),m(n,i),m(i,a),m(n,c),m(n,u),_(u,e[0]),m(n,l),m(n,f),p||(d=[E(u,"input",e[3]),E(f,"click",e[2])],p=!0)},p(t,[e]){2&e&&S(a,t[1]),1&e&&u.value!==t[0]&&_(u,t[0])},i:t,o:t,d(t){t&&y(n),p=!1,o(d)}}}function Cn(t,e,n){let r="",o="";return[r,o,async function(){const t=localStorage.getItem("username");try{(await kn.post("https://unibank.herokuapp.com/api/authenticate",{username:t,code:r})).data.success?(console.log("Authenticated"),dt("/main")):(console.log("Not Authenticated"),n(1,o="Wrong code"))}catch(t){console.error("Error:",t)}},function(){r=this.value,n(0,r)}]}function jn(t,e,n){const r=t.slice();return r[14]=e[n],r}function Tn(t,e,n){const r=t.slice();return r[17]=e[n],r}function Nn(e){let n;return{c(){n=$("div"),n.textContent="Loading..."},m(t,e){g(t,n,e)},p:t,d(t){t&&y(n)}}}function An(t){let e,n,r,s,i,a,c,u,l,f,p,d,h,x,C,j,T,N,A,R,P,U,L,B,q,D=t[0][t[1]].balance+"",I=Ln(t[0][t[1]].currency)+"",z=t[2],H=[];for(let e=0;e<z.length;e+=1)H[e]=Rn(Tn(t,z,e));let J=t[0][t[1]].transactions,M=[];for(let e=0;e<J.length;e+=1)M[e]=Pn(jn(t,J,e));return{c(){e=$("div"),n=$("h2"),r=b(D),s=w(),i=b(I),a=w(),c=$("button"),c.textContent="Change currency",u=w(),l=$("div"),f=$("div"),p=$("h3"),p.textContent="Transaction history:",d=w(),h=$("div"),x=$("input"),C=w(),j=$("select");for(let t=0;t<H.length;t+=1)H[t].c();T=w(),N=$("button"),N.textContent="Pay",A=w(),R=$("table"),P=$("thead"),P.innerHTML='<tr class="svelte-ks4ywx"><th class="svelte-ks4ywx">Date</th> \n            <th class="svelte-ks4ywx">Time</th> \n            <th class="svelte-ks4ywx">Amount</th></tr>',U=w(),L=$("tbody");for(let t=0;t<M.length;t+=1)M[t].c();k(n,"class","svelte-ks4ywx"),k(c,"class","change-currency svelte-ks4ywx"),k(e,"class","balance-and-change-currency svelte-ks4ywx"),x.required="",k(x,"placeholder","Amount"),k(x,"inputmode","numeric"),k(x,"maxlength","10"),k(x,"pattern","^[0-9]+([-.][0-9]+)?$"),k(x,"class","svelte-ks4ywx"),k(j,"class","svelte-ks4ywx"),void 0===t[5]&&F((()=>t[10].call(j))),k(N,"class","invite-btn svelte-ks4ywx"),k(N,"type","button"),k(h,"class","input-container svelte-ks4ywx"),k(f,"class","title-and-input svelte-ks4ywx"),k(P,"class","svelte-ks4ywx"),k(R,"class","history svelte-ks4ywx"),k(l,"class","operations svelte-ks4ywx")},m(o,y){g(o,e,y),m(e,n),m(n,r),m(n,s),m(n,i),m(e,a),m(e,c),g(o,u,y),g(o,l,y),m(l,f),m(f,p),m(f,d),m(f,h),m(h,x),_(x,t[4]),m(h,C),m(h,j);for(let t=0;t<H.length;t+=1)H[t]&&H[t].m(j,null);O(j,t[5],!0),m(h,T),m(h,N),m(l,A),m(l,R),m(R,P),m(R,U),m(R,L);for(let t=0;t<M.length;t+=1)M[t]&&M[t].m(L,null);B||(q=[E(c,"click",t[8]),E(x,"input",t[9]),E(j,"change",t[10]),E(N,"click",t[11])],B=!0)},p(t,e){if(3&e&&D!==(D=t[0][t[1]].balance+"")&&S(r,D),3&e&&I!==(I=Ln(t[0][t[1]].currency)+"")&&S(i,I),16&e&&x.value!==t[4]&&_(x,t[4]),4&e){let n;for(z=t[2],n=0;n<z.length;n+=1){const r=Tn(t,z,n);H[n]?H[n].p(r,e):(H[n]=Rn(r),H[n].c(),H[n].m(j,null))}for(;n<H.length;n+=1)H[n].d(1);H.length=z.length}if(36&e&&O(j,t[5]),3&e){let n;for(J=t[0][t[1]].transactions,n=0;n<J.length;n+=1){const r=jn(t,J,n);M[n]?M[n].p(r,e):(M[n]=Pn(r),M[n].c(),M[n].m(L,null))}for(;n<M.length;n+=1)M[n].d(1);M.length=J.length}},d(t){t&&y(e),t&&y(u),t&&y(l),v(H,t),v(M,t),B=!1,o(q)}}}function Rn(t){let e,n,r,o,s,i,a=t[17].code+"",c=Ln(t[17].code)+"";return{c(){e=$("option"),n=b(a),r=b(" ("),o=b(c),s=b(")\n              "),e.__value=i=t[17].code,e.value=e.__value},m(t,i){g(t,e,i),m(e,n),m(e,r),m(e,o),m(e,s)},p(t,r){4&r&&a!==(a=t[17].code+"")&&S(n,a),4&r&&c!==(c=Ln(t[17].code)+"")&&S(o,c),4&r&&i!==(i=t[17].code)&&(e.__value=i,e.value=e.__value)},d(t){t&&y(e)}}}function Pn(t){let e,n,r,o,s,i,a,c,u,l,f=Bn(t[14].dateTime).date+"",p=Bn(t[14].dateTime).time+"",d=t[14].amount+"";return{c(){e=$("tr"),n=$("td"),r=b(f),o=w(),s=$("td"),i=b(p),a=w(),c=$("td"),u=b(d),l=w(),k(n,"class","svelte-ks4ywx"),k(s,"class","svelte-ks4ywx"),k(c,"class","svelte-ks4ywx"),C(c,"positive",t[14].amount>=0),C(c,"negative",t[14].amount<0),k(e,"class","svelte-ks4ywx")},m(t,f){g(t,e,f),m(e,n),m(n,r),m(e,o),m(e,s),m(s,i),m(e,a),m(e,c),m(c,u),m(e,l)},p(t,e){3&e&&f!==(f=Bn(t[14].dateTime).date+"")&&S(r,f),3&e&&p!==(p=Bn(t[14].dateTime).time+"")&&S(i,p),3&e&&d!==(d=t[14].amount+"")&&S(u,d),3&e&&C(c,"positive",t[14].amount>=0),3&e&&C(c,"negative",t[14].amount<0)},d(t){t&&y(e)}}}function Un(e){let n,r,o,s,i,a,c;function u(t,e){return t[0].length>0?An:Nn}let l=u(e),f=l(e);return{c(){n=$("div"),r=$("div"),o=$("h1"),o.textContent="Uni Bank transactions",s=w(),i=$("p"),a=b(e[3]),c=w(),f.c(),k(i,"class","error-message svelte-ks4ywx"),k(r,"class","header-container svelte-ks4ywx"),k(n,"class","main-page svelte-ks4ywx")},m(t,e){g(t,n,e),m(n,r),m(r,o),m(r,s),m(r,i),m(i,a),m(n,c),f.m(n,null)},p(t,[e]){8&e&&S(a,t[3]),l===(l=u(t))&&f?f.p(t,e):(f.d(1),f=l(t),f&&(f.c(),f.m(n,null)))},i:t,o:t,d(t){t&&y(n),f.d()}}}function Ln(t){return{EUR:"€",INR:"₹",ILS:"₪",JPY:"¥",KRW:"원",USD:"$",GBP:"£",CZK:"Kč"}[t]||t}function Bn(t){const e=new Date(t);return{date:`${String(e.getDate()).padStart(2,"0")}.${String(e.getMonth()+1).padStart(2,"0")}.${e.getFullYear()}`,time:e.toLocaleTimeString("cs-CZ",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}}function qn(t,e,n){let r,o,s=localStorage.getItem("username"),i=[],a=0,c=[],u="";async function l(){try{const t=`https://unibank.herokuapp.com/api/user-data/${s}`,e=await fetch(t);if(!e.ok)throw new Error(`HTTP error ${e.status}`);const r=await e.json();n(0,i=r.currencies),console.log(i[0].transaction)}catch(t){console.error("Error fetching user data:",t),n(3,u="Error fetching user data")}try{const t="https://unibank.herokuapp.com/api/currencies",e=await fetch(t);if(!e.ok)throw new Error(`HTTP error ${e.status}`);const r=await e.json();n(2,c=r.currencies)}catch(t){console.error("Error fetching currencies:",t),n(3,u="Error fetching currencies")}}async function f(t,e){if(t&&e){t=Number(t);try{const r="https://unibank.herokuapp.com/api/payment",o=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:s,currency:e,amount:t})});if(!o.ok)throw new Error(`HTTP error ${o.status}`);(await o.json()).result?(console.log("Payment successful"),l()):(console.log("Payment failed"),n(3,u="Transaction was not successful"))}catch(t){console.error("Error making payment:",t)}}}async function p(){n(1,a=(a+1)%i.length)}R((async()=>{l()}));return[i,a,c,u,r,o,f,p,()=>p(),function(){r=this.value,n(4,r)},function(){o=function(t){const e=t.querySelector(":checked");return e&&e.__value}(this),n(5,o),n(2,c)},()=>f(r,o)]}const Dn=[{name:"/",component:class extends st{constructor(t){super(),ot(this,t,_n,Sn,i,{})}}},{name:"authentication",component:class extends st{constructor(t){super(),ot(this,t,Cn,On,i,{})}}},{name:"main",component:class extends st{constructor(t){super(),ot(this,t,qn,Un,i,{})}}}];function In(t,e,n){const r=t.slice();return r[0]=e[n].name,r[1]=e[n].component,r}function zn(t){let e,n,r;var o=t[1];function s(t){return{props:{params:t[4]}}}return o&&(e=j(o,s(t))),{c(){e&&tt(e.$$.fragment),n=w()},m(t,o){e&&et(e,t,o),g(t,n,o),r=!0},p(t,r){const i={};if(16&r&&(i.params=t[4]),o!==(o=t[1])){if(e){X();const t=e;Z(t.$$.fragment,1,0,(()=>{nt(t,1)})),G()}o?(e=j(o,s(t)),tt(e.$$.fragment),Y(e.$$.fragment,1),et(e,n.parentNode,n)):e=null}else o&&e.$set(i)},i(t){r||(e&&Y(e.$$.fragment,t),r=!0)},o(t){e&&Z(e.$$.fragment,t),r=!1},d(t){e&&nt(e,t),t&&y(n)}}}function Fn(t){let e,n;return e=new Lt({props:{path:t[0],$$slots:{default:[zn,({params:t})=>({4:t}),({params:t})=>t?16:0]},$$scope:{ctx:t}}}),{c(){tt(e.$$.fragment)},m(t,r){et(e,t,r),n=!0},p(t,n){const r={};48&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(Y(e.$$.fragment,t),n=!0)},o(t){Z(e.$$.fragment,t),n=!1},d(t){nt(e,t)}}}function Hn(t){let e,n,r=Dn,o=[];for(let e=0;e<r.length;e+=1)o[e]=Fn(In(t,r,e));const s=t=>Z(o[t],1,1,(()=>{o[t]=null}));return{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=x()},m(t,r){for(let e=0;e<o.length;e+=1)o[e]&&o[e].m(t,r);g(t,e,r),n=!0},p(t,n){if(16&n){let i;for(r=Dn,i=0;i<r.length;i+=1){const s=In(t,r,i);o[i]?(o[i].p(s,n),Y(o[i],1)):(o[i]=Fn(s),o[i].c(),Y(o[i],1),o[i].m(e.parentNode,e))}for(X(),i=r.length;i<o.length;i+=1)s(i);G()}},i(t){if(!n){for(let t=0;t<r.length;t+=1)Y(o[t]);n=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)Z(o[t]);n=!1},d(t){v(o,t),t&&y(e)}}}function Jn(t){let e,n;return e=new Ct({props:{$$slots:{default:[Hn]},$$scope:{ctx:t}}}),{c(){tt(e.$$.fragment)},m(t,r){et(e,t,r),n=!0},p(t,[n]){const r={};32&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(Y(e.$$.fragment,t),n=!0)},o(t){Z(e.$$.fragment,t),n=!1},d(t){nt(e,t)}}}return new class extends st{constructor(t){super(),ot(this,t,null,Jn,i,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map

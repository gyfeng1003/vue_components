(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["audio-player"],{"02f4":function(t,e,n){var r=n("4588"),i=n("be13");t.exports=function(t){return function(e,n){var o,a,c=String(i(e)),s=r(n),u=c.length;return s<0||s>=u?t?"":void 0:(o=c.charCodeAt(s),o<55296||o>56319||s+1===u||(a=c.charCodeAt(s+1))<56320||a>57343?t?c.charAt(s):o:t?c.slice(s,s+2):a-56320+(o-55296<<10)+65536)}}},"0390":function(t,e,n){"use strict";var r=n("02f4")(!0);t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},"0bfb":function(t,e,n){"use strict";var r=n("cb7c");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"11e9":function(t,e,n){var r=n("52a7"),i=n("4630"),o=n("6821"),a=n("6a99"),c=n("69a8"),s=n("c69a"),u=Object.getOwnPropertyDescriptor;e.f=n("9e1e")?u:function(t,e){if(t=o(t),e=a(e,!0),s)try{return u(t,e)}catch(n){}if(c(t,e))return i(!r.f.call(t,e),t[e])}},"214f":function(t,e,n){"use strict";n("b0c5");var r=n("2aba"),i=n("32e9"),o=n("79e5"),a=n("be13"),c=n("2b4c"),s=n("520a"),u=c("species"),l=!o(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),f=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var d=c(t),p=!o(function(){var e={};return e[d]=function(){return 7},7!=""[t](e)}),h=p?!o(function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[u]=function(){return n}),n[d](""),!e}):void 0;if(!p||!h||"replace"===t&&!l||"split"===t&&!f){var g=/./[d],v=n(a,d,""[t],function(t,e,n,r,i){return e.exec===s?p&&!i?{done:!0,value:g.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),b=v[0],m=v[1];r(String.prototype,t,b),i(RegExp.prototype,d,2==e?function(t,e){return m.call(t,this,e)}:function(t){return m.call(t,this)})}}},"28a5":function(t,e,n){"use strict";var r=n("aae3"),i=n("cb7c"),o=n("ebd6"),a=n("0390"),c=n("9def"),s=n("5f1b"),u=n("520a"),l=n("79e5"),f=Math.min,d=[].push,p="split",h="length",g="lastIndex",v=4294967295,b=!l(function(){RegExp(v,"y")});n("214f")("split",2,function(t,e,n,l){var m;return m="c"=="abbc"[p](/(b)*/)[1]||4!="test"[p](/(?:)/,-1)[h]||2!="ab"[p](/(?:ab)*/)[h]||4!="."[p](/(.?)(.?)/)[h]||"."[p](/()()/)[h]>1||""[p](/.?/)[h]?function(t,e){var i=String(this);if(void 0===t&&0===e)return[];if(!r(t))return n.call(i,t,e);var o,a,c,s=[],l=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),f=0,p=void 0===e?v:e>>>0,b=new RegExp(t.source,l+"g");while(o=u.call(b,i)){if(a=b[g],a>f&&(s.push(i.slice(f,o.index)),o[h]>1&&o.index<i[h]&&d.apply(s,o.slice(1)),c=o[0][h],f=a,s[h]>=p))break;b[g]===o.index&&b[g]++}return f===i[h]?!c&&b.test("")||s.push(""):s.push(i.slice(f)),s[h]>p?s.slice(0,p):s}:"0"[p](void 0,0)[h]?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,r){var i=t(this),o=void 0==n?void 0:n[e];return void 0!==o?o.call(n,i,r):m.call(String(i),n,r)},function(t,e){var r=l(m,t,this,e,m!==n);if(r.done)return r.value;var u=i(t),d=String(this),p=o(u,RegExp),h=u.unicode,g=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(b?"y":"g"),x=new p(b?u:"^(?:"+u.source+")",g),y=void 0===e?v:e>>>0;if(0===y)return[];if(0===d.length)return null===s(x,d)?[d]:[];var w=0,S=0,C=[];while(S<d.length){x.lastIndex=b?S:0;var E,_=s(x,b?d:d.slice(S));if(null===_||(E=f(c(x.lastIndex+(b?0:S)),d.length))===w)S=a(d,S,h);else{if(C.push(d.slice(w,S)),C.length===y)return C;for(var R=1;R<=_.length-1;R++)if(C.push(_[R]),C.length===y)return C;S=w=E}}return C.push(d.slice(w)),C}]})},"2e08":function(t,e,n){var r=n("9def"),i=n("9744"),o=n("be13");t.exports=function(t,e,n,a){var c=String(o(t)),s=c.length,u=void 0===n?" ":String(n),l=r(e);if(l<=s||""==u)return c;var f=l-s,d=i.call(u,Math.ceil(f/u.length));return d.length>f&&(d=d.slice(0,f)),a?d+c:c+d}},3846:function(t,e,n){n("9e1e")&&"g"!=/./g.flags&&n("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:n("0bfb")})},"3b2b":function(t,e,n){var r=n("7726"),i=n("5dbc"),o=n("86cc").f,a=n("9093").f,c=n("aae3"),s=n("0bfb"),u=r.RegExp,l=u,f=u.prototype,d=/a/g,p=/a/g,h=new u(d)!==d;if(n("9e1e")&&(!h||n("79e5")(function(){return p[n("2b4c")("match")]=!1,u(d)!=d||u(p)==p||"/a/i"!=u(d,"i")}))){u=function(t,e){var n=this instanceof u,r=c(t),o=void 0===e;return!n&&r&&t.constructor===u&&o?t:i(h?new l(r&&!o?t.source:t,e):l((r=t instanceof u)?t.source:t,r&&o?s.call(t):e),n?this:f,u)};for(var g=function(t){t in u||o(u,t,{configurable:!0,get:function(){return l[t]},set:function(e){l[t]=e}})},v=a(l),b=0;v.length>b;)g(v[b++]);f.constructor=u,u.prototype=f,n("2aba")(r,"RegExp",u)}n("7a56")("RegExp")},4917:function(t,e,n){"use strict";var r=n("cb7c"),i=n("9def"),o=n("0390"),a=n("5f1b");n("214f")("match",1,function(t,e,n,c){return[function(n){var r=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,r):new RegExp(n)[e](String(r))},function(t){var e=c(n,t,this);if(e.done)return e.value;var s=r(t),u=String(this);if(!s.global)return a(s,u);var l=s.unicode;s.lastIndex=0;var f,d=[],p=0;while(null!==(f=a(s,u))){var h=String(f[0]);d[p]=h,""===h&&(s.lastIndex=o(u,i(s.lastIndex),l)),p++}return 0===p?null:d}]})},4953:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"audio-player-page"},[n("m-header",{attrs:{title:"音频播放器"}}),n("audio-player",{attrs:{source:t.src}})],1)},i=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"audio-box",class:{IOS:t._isiOS},on:{touchmove:function(t){t.preventDefault()}}},[n("audio",{ref:"audio",attrs:{preload:"metadata",src:t.source},on:{canplay:t.canplayHandler,timeupdate:t.timeUpdateHandler,ended:t.endedHandler}},[n("source",{attrs:{loop:t.cycle,type:"audio/mp3"}})]),n("div",{staticClass:"item-title"},[t._v("语音导览")]),n("div",{staticClass:"progress-box"},[n("div",{ref:"progressBar",staticClass:"progressBar",on:{touchstart:t.justifyProgress}},[n("div",{staticClass:"progress",style:{width:t.progressBarWidth}}),n("div",{staticClass:"progressDot",style:{left:t.progressDotLeft},attrs:{id:"progressDot"},on:{touchstart:t.touchstartHandler,touchmove:t.touchmoveHandler,touchend:t.touchendHandler}})]),n("div",{staticClass:"audio-time"},[n("span",{staticClass:"audio-current"},[t._v(t._s(t.currentTime))]),n("span",{staticClass:"audio-total"},[t._v(t._s(t.totalTime))])])]),n("div",{staticClass:"control-box"},[n("div",{staticClass:"cycle",on:{click:function(e){t.cycle=!t.cycle}}},[n("i",{staticClass:"iconfont",class:{iconxunhuanx:t.cycle,iconxunhuanstop:!t.cycle}})]),n("div",{staticClass:"left-speed",on:{click:t.prevAudio}},[n("i",{staticClass:"iconfont iconhoutuix"})]),n("div",{staticClass:"play",attrs:{id:"audioPlayer"},on:{click:t.playPlayer}},[n("i",{staticClass:"iconfont",class:{iconplay:t.paused,iconstop:!t.paused}})]),n("div",{staticClass:"right-speed",on:{click:t.nextAudio}},[n("i",{staticClass:"iconfont iconqianjinx"})]),n("div",{staticClass:"volume",on:{click:t.setMuted}},[n("i",{staticClass:"iconfont",class:{iconno_volcex:t.muted,iconvolcex:!t.muted}})])])])},a=[],c=(n("4917"),n("ed08")),s=window.navigator.userAgent,u={name:"audio-comp",data:function(){return{cycle:!0,muted:!1,paused:!0,progressBarWidth:"",progressDotLeft:"",currentTime:"00.00",totalTime:"00.00",flag:!1,position:{oriOffestLeft:0,oriX:0,maxLeft:0,maxRight:0}}},props:{source:{type:String,default:""}},methods:{_isiOS:function(){return!!s.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)},canplayHandler:function(){var t=this.$refs.audio;this.totalTime=this.transTime(t.duration)},timeUpdateHandler:function(){var t=this.$refs.audio;this.updateProgress(t)},endedHandler:function(){var t=this.$refs.audio;this.audioEnded(),t.currentTime=0,this.cycle&&(this.paused=!1,t.play())},setMuted:function(){var t=this.$refs.audio;this.muted=!this.muted,t.muted=this.muted},prevAudio:function(){if(!this.paused){var t=this.$refs.audio,e=t.currentTime-10;t.currentTime=e<0?0:e}},nextAudio:function(){if(!this.paused){var t=this.$refs.audio,e=t.currentTime+10;t.currentTime=e<t.duration?e:t.duration}},justifyProgress:function(t){var e=this.$refs.audio;if(!e.paused||0!==e.currentTime){var n=parseFloat(getComputedStyle(document.getElementsByClassName("audio-box")[0]).paddingLeft),r=this.$refs.progressBar.offsetWidth,i=(t.touches[0].clientX-n)/r;e.currentTime=e.duration*i,this.updateProgress(e)}},updateProgress:function(t){var e=t.currentTime/t.duration;this.progressBarWidth=100*e+"%",this.progressDotLeft=100*e+"%",this.currentTime=this.transTime(t.currentTime)},audioEnded:function(){this.progressBarWidth=0,this.progressDotLeft=0,this.paused=!0},transTime:function(t){var e="",n=parseInt(t/3600);t%=3600;var r=parseInt(t/60),i=parseInt(t%60);return e=n>0?Object(c["c"])(n+":"+r+":"+i):Object(c["c"])(r+":"+i),e},playPlayer:function(){var t=this.$refs.audio;t.src?t.paused?(t.play(),this.paused=!1):(t.pause(),this.paused=!0):alert("音频链接不存在")},touchstartHandler:function(t){var e=this.$refs.audio,n=this.position.oriOffestLeft;e.paused&&0===e.currentTime||(this.flag=!0,this.position={oriOffestLeft:t.target.offsetLeft,oriX:t.touches?t.touches[0].clientX:t.clientX,maxLeft:n,maxRight:this.$refs.progressBar.offsetWidth-n},t&&t.preventDefault?t.preventDefault():t.returnValue=!1,t&&t.stopPropagation?t.stopPropagation():window.event.cancelBubble=!0)},touchmoveHandler:function(t){var e=this.$refs.audio,n=this.position,r=n.oriOffestLeft,i=n.oriX,o=n.maxLeft,a=n.maxRight;if(this.flag){var c=t.touches?t.touches[0].clientX:t.clientX,s=c-i;s>a?s=a:s<-o&&(s=-o);var u=this.$refs.progressBar.offsetWidth,l=(r+s)/u;e.currentTime=e.duration*l,this.updateProgress(e)}},touchendHandler:function(t){this.flag=!1}}},l=u,f=(n("f0cc"),n("2877")),d=Object(f["a"])(l,o,a,!1,null,"3973d16a",null),p=d.exports,h={data:function(){return{src:"http://jplayer.org/audio/mp3/Miaow-snip-Stirring-of-a-fool.mp3"}},components:{AudioPlayer:p},mounted:function(){},methods:{}},g=h,v=(n("64ad"),Object(f["a"])(g,r,i,!1,null,"078b3d16",null));e["default"]=v.exports},"520a":function(t,e,n){"use strict";var r=n("0bfb"),i=RegExp.prototype.exec,o=String.prototype.replace,a=i,c="lastIndex",s=function(){var t=/a/,e=/b*/g;return i.call(t,"a"),i.call(e,"a"),0!==t[c]||0!==e[c]}(),u=void 0!==/()??/.exec("")[1],l=s||u;l&&(a=function(t){var e,n,a,l,f=this;return u&&(n=new RegExp("^"+f.source+"$(?!\\s)",r.call(f))),s&&(e=f[c]),a=i.call(f,t),s&&a&&(f[c]=f.global?a.index+a[0].length:e),u&&a&&a.length>1&&o.call(a[0],n,function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(a[l]=void 0)}),a}),t.exports=a},"5dbc":function(t,e,n){var r=n("d3f4"),i=n("8b97").set;t.exports=function(t,e,n){var o,a=e.constructor;return a!==n&&"function"==typeof a&&(o=a.prototype)!==n.prototype&&r(o)&&i&&i(t,o),t}},"5f1b":function(t,e,n){"use strict";var r=n("23c6"),i=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var o=n.call(t,e);if("object"!==typeof o)throw new TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"64ad":function(t,e,n){"use strict";var r=n("82ce"),i=n.n(r);i.a},"6b54":function(t,e,n){"use strict";n("3846");var r=n("cb7c"),i=n("0bfb"),o=n("9e1e"),a="toString",c=/./[a],s=function(t){n("2aba")(RegExp.prototype,a,t,!0)};n("79e5")(function(){return"/a/b"!=c.call({source:"a",flags:"b"})})?s(function(){var t=r(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?i.call(t):void 0)}):c.name!=a&&s(function(){return c.call(this)})},"82ce":function(t,e,n){},"8b97":function(t,e,n){var r=n("d3f4"),i=n("cb7c"),o=function(t,e){if(i(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{r=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),r(t,[]),e=!(t instanceof Array)}catch(i){e=!0}return function(t,n){return o(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:o}},9093:function(t,e,n){var r=n("ce10"),i=n("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},9744:function(t,e,n){"use strict";var r=n("4588"),i=n("be13");t.exports=function(t){var e=String(i(this)),n="",o=r(t);if(o<0||o==1/0)throw RangeError("Count can't be negative");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(n+=e);return n}},aae3:function(t,e,n){var r=n("d3f4"),i=n("2d95"),o=n("2b4c")("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==i(t))}},b0c5:function(t,e,n){"use strict";var r=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},cb69:function(t,e,n){},ed08:function(t,e,n){"use strict";n.d(e,"c",function(){return r}),n.d(e,"b",function(){return i});n("6b54"),n("3b2b"),n("f576"),n("28a5");function r(t){for(var e="",n=t.split(":"),r=0;r<n.length-1;r++)e+=1===n[r].length?"0"+n[r]:n[r],e+=":";return e+=1===n[r].length?"0"+n[r]:n[r],e}var i=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",n=new Date(t),r=n.getFullYear(),i=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return"".concat(r).concat(e).concat(i).concat(e).concat(o)};e["a"]={getPara:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:location.href;if(this._isString(t)){var n,r=new RegExp("(?:&|\\?)".concat(t,"=(.*?)(?=\\?|&|/|#|$)"),"g"),i=[];while(n=r.exec(e))i.push(decodeURIComponent(n[1]));return i.length>1?i:i[0]}},_isString:function(t){return"[object String]"===this._toString(t)},_toString:function(t){return Object.prototype.toString.call(t)}}},f0cc:function(t,e,n){"use strict";var r=n("cb69"),i=n.n(r);i.a},f576:function(t,e,n){"use strict";var r=n("5ca1"),i=n("2e08"),o=n("a25f"),a=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);r(r.P+r.F*a,"String",{padStart:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0,!0)}})}}]);
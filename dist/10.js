(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{369:function(e,t,n){"use strict";var a=n(3),c=n.n(a),r=n(13),o=n.n(r),l=n(29),i=n.n(l),s=n(0),u=n(2),m=n.n(u),f=n(33),d=n(185),p=n(19),b=n(77);function v(e){return null!=e}var h=function(e){var t,n=e.itemPrefixCls,a=e.component,r=e.span,o=e.className,l=e.style,i=e.bordered,u=e.label,f=e.content,d=e.colon,p=a;return i?s.createElement(p,{className:m()((t={},c()(t,"".concat(n,"-item-label"),v(u)),c()(t,"".concat(n,"-item-content"),v(f)),t),o),style:l,colSpan:r},v(u)?u:f):s.createElement(p,{className:m()("".concat(n,"-item"),o),style:l,colSpan:r},u&&s.createElement("span",{className:m()("".concat(n,"-item-label"),c()({},"".concat(n,"-item-no-colon"),!d))},u),f&&s.createElement("span",{className:m()("".concat(n,"-item-content"))},f))};function w(e,t,n){var a=t.colon,c=t.prefixCls,r=t.bordered,o=n.component,l=n.type,i=n.showLabel,u=n.showContent;return e.map((function(e,t){var n=e.props,m=n.label,f=n.children,d=n.prefixCls,p=void 0===d?c:d,b=n.className,v=n.style,w=n.span,y=void 0===w?1:w,E=e.key;return"string"==typeof o?s.createElement(h,{key:"".concat(l,"-").concat(E||t),className:b,style:v,span:y,colon:a,component:o,itemPrefixCls:p,bordered:r,label:i?m:null,content:u?f:null}):[s.createElement(h,{key:"label-".concat(E||t),className:b,style:v,span:1,colon:a,component:o[0],itemPrefixCls:p,bordered:r,label:m}),s.createElement(h,{key:"content-".concat(E||t),className:b,style:v,span:2*y-1,component:o[1],itemPrefixCls:p,bordered:r,content:f})]}))}var y=function(e){var t=e.prefixCls,n=e.vertical,a=e.row,c=e.index,r=e.bordered;return n?s.createElement(s.Fragment,null,s.createElement("tr",{key:"label-".concat(c),className:"".concat(t,"-row")},w(a,e,{component:"th",type:"label",showLabel:!0})),s.createElement("tr",{key:"content-".concat(c),className:"".concat(t,"-row")},w(a,e,{component:"td",type:"content",showContent:!0}))):s.createElement("tr",{key:c,className:"".concat(t,"-row")},w(a,e,{component:r?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0}))},E=function(e){return e.children},g=n(8),x={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1};function C(e,t,n){var a=e;return(void 0===t||t>n)&&(a=Object(g.a)(e,{span:n}),Object(p.a)(void 0===t,"Descriptions","Sum of column `span` in a line not match `column` of Descriptions.")),a}function N(e){var t,n=e.prefixCls,a=e.title,r=e.extra,l=e.column,u=void 0===l?x:l,p=e.colon,v=void 0===p||p,h=e.bordered,w=e.layout,E=e.children,g=e.className,N=e.style,k=e.size,O=s.useContext(b.b),j=O.getPrefixCls,z=O.direction,P=j("descriptions",n),I=s.useState({}),S=o()(I,2),M=S[0],T=S[1],H=function(e,t){if("number"==typeof e)return e;if("object"===i()(e))for(var n=0;n<d.b.length;n++){var a=d.b[n];if(t[a]&&void 0!==e[a])return e[a]||x[a]}return 3}(u,M);s.useEffect((function(){var e=d.a.subscribe((function(e){"object"===i()(u)&&T(e)}));return function(){d.a.unsubscribe(e)}}),[]);var L=function(e,t){var n=Object(f.a)(e).filter((function(e){return e})),a=[],c=[],r=t;return n.forEach((function(e,o){var l,i=null===(l=e.props)||void 0===l?void 0:l.span,s=i||1;if(o===n.length-1)return c.push(C(e,i,r)),void a.push(c);s<r?(r-=s,c.push(e)):(c.push(C(e,s,r)),a.push(c),r=t,c=[])})),a}(E,H);return s.createElement("div",{className:m()(P,g,(t={},c()(t,"".concat(P,"-").concat(k),k&&"default"!==k),c()(t,"".concat(P,"-bordered"),!!h),c()(t,"".concat(P,"-rtl"),"rtl"===z),t)),style:N},(a||r)&&s.createElement("div",{className:"".concat(P,"-header")},a&&s.createElement("div",{className:"".concat(P,"-title")},a),r&&s.createElement("div",{className:"".concat(P,"-extra")},r)),s.createElement("div",{className:"".concat(P,"-view")},s.createElement("table",null,s.createElement("tbody",null,L.map((function(e,t){return s.createElement(y,{key:t,index:t,colon:v,prefixCls:P,vertical:"vertical"===w,bordered:h,row:e})}))))))}N.Item=E;t.a=N},372:function(e,t,n){"use strict";var a=n(0),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-32 736H663.9V602.2h104l15.6-120.7H663.9v-77.1c0-35 9.7-58.8 59.8-58.8h63.9v-108c-11.1-1.5-49-4.8-93.2-4.8-92.2 0-155.3 56.3-155.3 159.6v89H434.9v120.7h104.3V848H176V176h672v672z"}}]},name:"facebook",theme:"outlined"},r=n(42),o=function(e,t){return a.createElement(r.a,Object.assign({},e,{ref:t,icon:c}))};o.displayName="FacebookOutlined";t.a=a.forwardRef(o)},373:function(e,t,n){"use strict";var a=n(0),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0075-94 336.64 336.64 0 01-108.2 41.2A170.1 170.1 0 00672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 00-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 01-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 01-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"}}]},name:"twitter",theme:"outlined"},r=n(42),o=function(e,t){return a.createElement(r.a,Object.assign({},e,{ref:t,icon:c}))};o.displayName="TwitterOutlined";t.a=a.forwardRef(o)},374:function(e,t,n){"use strict";var a=n(0),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M928 512.3v-.3c0-229.8-186.2-416-416-416S96 282.2 96 512v.4c0 229.8 186.2 416 416 416s416-186.2 416-416v-.3.2zm-6.7-74.6l.6 3.3-.6-3.3zM676.7 638.2c53.5-82.2 52.5-189.4-11.1-263.7l162.4-8.4c20.5 44.4 32 93.8 32 145.9 0 185.2-144.6 336.6-327.1 347.4l143.8-221.2zM512 652.3c-77.5 0-140.2-62.7-140.2-140.2 0-77.7 62.7-140.2 140.2-140.2S652.2 434.5 652.2 512 589.5 652.3 512 652.3zm369.2-331.7l-3-5.7 3 5.7zM512 164c121.3 0 228.2 62.1 290.4 156.2l-263.6-13.9c-97.5-5.7-190.2 49.2-222.3 141.1L227.8 311c63.1-88.9 166.9-147 284.2-147zM102.5 585.8c26 145 127.1 264 261.6 315.1C229.6 850 128.5 731 102.5 585.8zM164 512c0-55.9 13.2-108.7 36.6-155.5l119.7 235.4c44.1 86.7 137.4 139.7 234 121.6l-74 145.1C302.9 842.5 164 693.5 164 512zm324.7 415.4c4 .2 8 .4 12 .5-4-.2-8-.3-12-.5z"}}]},name:"chrome",theme:"outlined"},r=n(42),o=function(e,t){return a.createElement(r.a,Object.assign({},e,{ref:t,icon:c}))};o.displayName="ChromeOutlined";t.a=a.forwardRef(o)},391:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(14),r=n(16),o=n(36),l=n(385),i=n(368),s=n(282),u=n(284),m=n(369),f=n(383),d=n(52),p=n(372),b=n(373),v=n(374),h=n.p+"78763896ef2ffb2bd4e79c2e26a20bb7.png",w=n(37),y=function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e},E=function(e,t,n,a){return new(n||(n=Promise))((function(c,r){function o(e){try{i(a.next(e))}catch(e){r(e)}}function l(e){try{i(a.throw(e))}catch(e){r(e)}}function i(e){var t;e.done?c(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,l)}i((a=a.apply(e,t||[])).next())}))},g=function(e,t){var n,a,c,r,o={label:0,sent:function(){if(1&c[0])throw c[1];return c[1]},trys:[],ops:[]};return r={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function l(r){return function(l){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,a&&(c=2&r[0]?a.return:r[0]?a.throw||((c=a.return)&&c.call(a),0):a.next)&&!(c=c.call(a,r[1])).done)return c;switch(a=0,c&&(r=[2&r[0],c.value]),r[0]){case 0:case 1:c=r;break;case 4:return o.label++,{value:r[1],done:!1};case 5:o.label++,a=r[1],r=[0];continue;case 7:r=o.ops.pop(),o.trys.pop();continue;default:if(!(c=o.trys,(c=c.length>0&&c[c.length-1])||6!==r[0]&&2!==r[0])){o=0;continue}if(3===r[0]&&(!c||r[1]>c[0]&&r[1]<c[3])){o.label=r[1];break}if(6===r[0]&&o.label<c[1]){o.label=c[1],c=r;break}if(c&&o.label<c[2]){o.label=c[2],o.ops.push(r);break}c[2]&&o.ops.pop(),o.trys.pop();continue}r=t.call(e,o)}catch(e){r=[6,e],a=0}finally{n=c=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,l])}}},x=l.a.Title,C=i.a.TextArea,N=w.b.img(P||(P=y(["\n    width: 100px;\n    margin-bottom: 25px;\n"],["\n    width: 100px;\n    margin-bottom: 25px;\n"]))),k=Object(w.b)(C)(I||(I=y(["\n    resize: none;\n"],["\n    resize: none;\n"]))),O=Object(w.b)(x)(S||(S=y(["\n    margin-top: 50px;\n"],["\n    margin-top: 50px;\n"]))),j=w.b.a(M||(M=y(["\n  padding: 0px;\n  font-weight: bold;\n"],["\n  padding: 0px;\n  font-weight: bold;\n"]))),z=function(){return E(void 0,void 0,void 0,(function(){return g(this,(function(e){return console.log("bxcxcv"),[2]}))}))};var P,I,S,M;t.default=Object(o.c)((function(e){var t=e.safehub;return{userProfile:t.userProfile,viewedOrganisation:t.viewedOrganisation}}),(function(e){return Object(r.b)({changePage:function(e){return Object(c.d)(e)}},e)}))((function(e){var t=Object(a.useState)(""),n=t[0],c=t[1],r=e.viewedOrganisation;return a.createElement("div",{className:"layout"},a.createElement(s.a,null,a.createElement(u.a,{span:2,lg:6}),a.createElement(u.a,{span:20,lg:12},a.createElement(x,null,r.name),a.createElement(N,{src:h,alt:"placeholder"}),a.createElement(m.a,{title:"Organisation Info"},a.createElement(m.a.Item,{label:"Telephone"},r.contactNumber),a.createElement(m.a.Item,{label:"FB"},a.createElement(p.a,{onClick:function(){window.location.href=r.facebook}})),a.createElement(m.a.Item,{label:"Twitter"},a.createElement(b.a,{onClick:function(){window.location.href=r.twitter}})),a.createElement(m.a.Item,{label:"Web"},a.createElement(v.a,{onClick:function(){window.location.href=r.website}})),a.createElement(m.a.Item,{label:"Address"},r.address),a.createElement(m.a.Item,{label:"Location"},r.location)),a.createElement(j,{href:"tel:"+r.contactNumber},"Call now"),a.createElement(f.a.Item,null,a.createElement(O,{level:4},"Send "+r.name+" a message"),a.createElement(k,{rows:4,value:n,onChange:function(e){c(e.target.value)}})),a.createElement(f.a.Item,null,a.createElement(d.a,{htmlType:"submit",loading:!1,onClick:z,type:"primary"},"Add Comment")))))}))}}]);
//# sourceMappingURL=10.js.map
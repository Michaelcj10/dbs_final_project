(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{166:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return f}));var r=n(56),a=function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},o=function(e,t,n,r){return new(n||(n=Promise))((function(a,o){function i(e){try{l(r.next(e))}catch(e){o(e)}}function c(e){try{l(r.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}l((r=r.apply(e,t||[])).next())}))},i=function(e,t){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=i.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}},c=n(172),l="https://project-10521262.herokuapp.com/",u=function(e){return o(void 0,void 0,void 0,(function(){var t;return i(this,(function(n){switch(n.label){case 0:return t=Object(r.c)("token"),[4,c(l+e,{method:"GET",withCredentials:!0,headers:{Accept:"application/json","Content-Type":"application/json",Authorization:t}},{method:"GET"}).then((function(e){return e.json()}))];case 1:return[2,n.sent()]}}))}))},s=function(e,t){return o(void 0,void 0,void 0,(function(){var n;return i(this,(function(r){switch(r.label){case 0:return n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(a({},t))},[4,c(l+e,n,{method:"POST"}).then((function(e){return e.json()}))];case 1:return[2,r.sent()]}}))}))},f=function(e,t,n){return void 0===n&&(n=!1),o(void 0,void 0,void 0,(function(){var o,u;return i(this,(function(i){switch(i.label){case 0:return o=Object(r.c)("token"),u={method:n?"PUT":"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:o},withCredentials:!0,body:JSON.stringify(a({},t))},[4,c(l+e,u,{method:"POST"}).then((function(e){return e.json()})).catch((function(e){console.log(e)}))];case 1:return[2,i.sent()]}}))}))}},224:function(e,t,n){"use strict";var r=n(1),a=n.n(r),o=n(3),i=n.n(o),c=n(0),l=n(2),u=n.n(l),s=n(162),f=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};t.a=function(e){return c.createElement(s.a,null,(function(t){var n,r=t.getPrefixCls,o=t.direction,l=e.prefixCls,s=e.type,p=void 0===s?"horizontal":s,d=e.orientation,h=void 0===d?"center":d,b=e.className,y=e.children,m=e.dashed,v=e.plain,w=f(e,["prefixCls","type","orientation","className","children","dashed","plain"]),g=r("divider",l),O=h.length>0?"-".concat(h):h,j=!!y,E=u()(b,g,"".concat(g,"-").concat(p),(n={},i()(n,"".concat(g,"-with-text"),j),i()(n,"".concat(g,"-with-text").concat(O),j),i()(n,"".concat(g,"-dashed"),!!m),i()(n,"".concat(g,"-plain"),!!v),i()(n,"".concat(g,"-rtl"),"rtl"===o),n));return c.createElement("div",a()({className:E},w,{role:"separator"}),y&&c.createElement("span",{className:"".concat(g,"-inner-text")},y))}))}},361:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(40),o=n(13),i=n(15),c=n(35),l=n(367),u=n(52),s=n(357),f=n(274),p=n(276),d=n(366),h=n(356),b=n(224),y=n(166),m=n(56),v=function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e},w=function(e,t,n,r){return new(n||(n=Promise))((function(a,o){function i(e){try{l(r.next(e))}catch(e){o(e)}}function c(e){try{l(r.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}l((r=r.apply(e,t||[])).next())}))},g=function(e,t){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=i.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}},O=l.a.Title,j=l.a.Paragraph,E=Object(a.b)(u.a)(k||(k=v(["\n  width: 100%;\n"],["\n  width: 100%;\n"]))),P=Object(a.b)(u.a)(x||(x=v(["\n  padding: 0px;\n  font-weight: bold;\n"],["\n  padding: 0px;\n  font-weight: bold;\n"])));var k,x;t.default=Object(c.c)((function(e){return{userProfile:e.counter.userProfile}}),(function(e){return Object(i.b)({changePage:function(e){return Object(o.d)(e)}},e)}))((function(e){var t=this,n=Object(r.useState)(!0),a=n[0],o=n[1],i=Object(r.useState)(!1),c=i[0],l=i[1];return Object(r.useEffect)((function(){s.b.info("Please login or register to continue")}),[]),r.createElement("div",{className:"layout"},r.createElement(f.a,null,r.createElement(p.a,{span:2,lg:8}),r.createElement(p.a,{span:20,lg:8},r.createElement(O,null,a?"Welcome back":"Register now"),r.createElement(d.a,{layout:"vertical",name:"basic",initialValues:{remember:!0},onFinish:function(n){return w(t,void 0,void 0,(function(){var t,r;return g(this,(function(o){switch(o.label){case 0:l(!0),t={email:n.id,password:n.password},o.label=1;case 1:return o.trys.push([1,3,,4]),[4,Object(y.b)(a?"login":"register",t)];case 2:return(r=o.sent()).errors?(s.b.error("Invalid details, try again"),l(!1)):(Object(m.d)("token",r.token),e.changePage("/dashboard")),[3,4];case 3:return o.sent(),s.b.error("Invalid details, try again"),l(!1),[3,4];case 4:return[2]}}))}))}},r.createElement(d.a.Item,{label:"Email",name:"id",rules:[{required:!0,message:"Enter your email address"}]},r.createElement(h.a,{disabled:c})),r.createElement(d.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Enter your password"}]},r.createElement(h.a.Password,{disabled:c})),r.createElement(d.a.Item,null,r.createElement(E,{type:"primary",htmlType:"submit",loading:c},a?"Login":"Register")),r.createElement(P,{type:"link",size:"large",onClick:function(){o(!a)}},a?"New to the site? Register now":"Have an account? Login now")),r.createElement(b.a,null,"Our terms"),r.createElement(j,null,"By logging in you are accepting our terms and conditions and privacy policy. You can read those  ",r.createElement(P,{type:"link",onClick:function(){e.changePage("/privacy-policy")}},"here"))),r.createElement(p.a,{span:2,lg:8})))}))}}]);
//# sourceMappingURL=8.js.map
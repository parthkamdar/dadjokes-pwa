(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{229:function(e,t,n){},230:function(e,t,n){},231:function(e,t,n){},232:function(e,t,n){e.exports=n.p+"img/5177402.gif"},233:function(e,t,n){e.exports=n.p+"img/49aa58f.svg"},234:function(e,t,n){e.exports=n.p+"img/f8d940c.svg"},235:function(e,t,n){"use strict";var r=n(229);n.n(r).a},236:function(e,t,n){"use strict";var r=n(230);n.n(r).a},237:function(e,t,n){"use strict";var r=n(231);n.n(r).a},238:function(e,t,n){"use strict";n.r(t);var r=[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"like-options"},[t("hr"),this._v(" "),t("span",{staticClass:"like"},[t("img",{attrs:{src:n(233)}}),this._v("\n              Like\n            ")]),this._v(" "),t("span",{staticClass:"dislike"},[t("img",{attrs:{src:n(234)}}),this._v("\n              Dislike\n            ")])])}],c=(n(110),n(35),n(12)),o=n(41),l=n.n(o),d={name:"AllJokesInner",data:function(){return{jokes:[],page:1,disableNext:!1,disablePrev:!1,loading:!0,like:"Like",dislike:"Dislike",liked:[],error:""}},created:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={headers:{Accept:"application/json"}},t.next=3,l.a.get("".concat(e.$store.state.url,"/getJokes?page=").concat(e.page),n);case 3:(r=t.sent).data.error?e.error=r.data.data:(e.jokes=r.data.data,e.loading=!1,e.disablePrev=!0);case 5:case"end":return t.stop()}}),t)})))()},methods:{nextPage:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,n={headers:{Accept:"application/json"}},t.next=4,l.a.get("https://icanhazdadjoke.com/search?page=".concat(e.page),n);case 4:r=t.sent,e.jokes=r.data.results,e.loading=!1,r.data.pageCount===e.page&&(e.disableNext=!0),e.disablePrev=!1,e.page+=1;case 10:case"end":return t.stop()}}),t)})))()},prevPage:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.loading=!0,!(e.page>0)){t.next=10;break}return e.page-=1,n={headers:{Accept:"application/json"}},t.next=6,l.a.get("https://icanhazdadjoke.com/search?page=".concat(e.page),n);case 6:r=t.sent,e.jokes=r.data.results,e.loading=!1,1===e.page&&(e.disablePrev=!0);case 10:case"end":return t.stop()}}),t)})))()}}},v=(n(235),n(28)),h={name:"AllJokes",components:{AllJokesInner:Object(v.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"row"},[e.loading?r("div",{staticClass:"row loading"},[r("img",{staticClass:"rounded mx-auto d-block",attrs:{src:n(232)}})]):e._e(),e._v(" "),e.loading?e._e():r("div",{staticClass:"cards-row row"},[r("p",[e._v(e._s(e.error))]),e._v(" "),e._l(e.jokes,(function(t){return r("div",{key:t.id,staticClass:"card"},[r("div",{staticClass:"card-body"},[r("p",[e._v(e._s(t.joke))]),e._v(" "),r("div",{staticClass:"like-options"},[r("hr"),e._v(" "),r("span",{staticClass:"like"},[r("img",{attrs:{src:n(233)}}),e._v("\n            "+e._s(e.like)+"\n          ")]),e._v(" "),r("span",{staticClass:"dislike"},[r("img",{attrs:{src:n(234)}}),e._v("\n            "+e._s(e.dislike)+"\n          ")])])])])}))],2),e._v(" "),r("div",{staticClass:"pagination"},[r("div",{staticClass:"row"},[r("button",{staticClass:"btn btn-primary prev-btn",attrs:{disabled:e.disablePrev},on:{click:e.prevPage}},[e._v("\n        Previous\n      ")]),e._v(" "),r("button",{staticClass:"btn btn-primary next-btn",attrs:{disabled:e.disableNext},on:{click:e.nextPage}},[e._v("\n        Next\n      ")])])])])}),[],!1,null,"f3b6d348",null).exports},data:function(){return{search:"",searchJokes:!1,title:"All Jokes",jokes:[],page:1,showPagination:!1,disableNext:!1,disablePrev:!1,noData:"",loading:!0}},methods:{submitSearch:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.noData="",""===e.search){t.next=12;break}return e.title="Jokes for: ".concat(e.search),e.searchJokes=!0,e.$emit("search",e.search),n={headers:{Accept:"application/json"}},t.next=8,l.a.get("https://icanhazdadjoke.com/search?term=".concat(e.search),n);case 8:(r=t.sent).data.results.length>0?(e.jokes=r.data.results,e.loading=!1):(e.noData="No jokes found with these keywords, Try Again!",e.loading=!1),r.data.total_pages>1&&(e.showPagination=!0),e.disablePrev=!0;case 12:case"end":return t.stop()}}),t)})))()},nextPage:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,n={headers:{Accept:"application/json"}},t.next=4,l.a.get("https://icanhazdadjoke.com/search?term=".concat(e.search,"&page=").concat(e.page),n);case 4:r=t.sent,e.jokes=r.data.results,r.data.total_pages===e.page&&(e.disableNext=!0,e.loading=!1),e.disablePrev=!1,e.page+=1;case 9:case"end":return t.stop()}}),t)})))()},prevPage:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.loading=!0,!(e.page>0)){t.next=10;break}return e.page-=1,n={headers:{Accept:"application/json"}},t.next=6,l.a.get("https://icanhazdadjoke.com/search?term=".concat(e.search,"&page=").concat(e.page),n);case 6:r=t.sent,e.jokes=r.data.results,e.loading=!1,1===e.page&&(e.disablePrev=!0);case 10:case"end":return t.stop()}}),t)})))()},clearSearch:function(){this.title="All Jokes",this.search="",this.searchJokes=!1}}},k=(n(236),{components:{AllJokes:Object(v.a)(h,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"row"},[r("div",{staticClass:"row header"},[r("h3",[e._v(e._s(e.title))]),e._v(" "),r("div",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],staticClass:"form-control",attrs:{id:"exampleInputEmail1",type:"text","aria-describedby":"emailHelp",placeholder:"Search..."},domProps:{value:e.search},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitSearch(t)},input:function(t){t.target.composing||(e.search=t.target.value)}}}),e._v(" "),e.searchJokes?r("small",{on:{click:e.clearSearch}},[e._v("Clear")]):e._e()])]),e._v(" "),e.searchJokes?e._e():r("AllJokesInner"),e._v(" "),e.searchJokes?r("div",{staticClass:"row jokes-row"},[e.loading?r("div",{staticClass:"row loading"},[r("img",{staticClass:"rounded mx-auto d-block",attrs:{src:n(232)}})]):e._e(),e._v(" "),r("p",{staticClass:"no-data"},[e._v(e._s(e.noData))]),e._v(" "),e.loading?e._e():r("div",{staticClass:"cards-row row"},e._l(e.jokes,(function(t){return r("div",{key:t.id,staticClass:"card"},[r("div",{staticClass:"card-body"},[r("p",[e._v(e._s(t.joke))]),e._v(" "),e._m(0,!0)])])})),0),e._v(" "),e.showPagination?r("div",{staticClass:"pagination"},[r("div",{staticClass:"row"},[r("button",{staticClass:"btn btn-primary prev-btn",attrs:{disabled:e.disablePrev},on:{click:e.prevPage}},[e._v("\n          Previous\n        ")]),e._v(" "),r("button",{staticClass:"btn btn-primary next-btn",attrs:{disabled:e.disableNext},on:{click:e.nextPage}},[e._v("\n          Next Page\n        ")])])]):e._e()]):e._e()],1)}),r,!1,null,"09ead19c",null).exports}}),m=(n(237),Object(v.a)(k,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("AllJokes")],1)}),[],!1,null,null,null));t.default=m.exports}}]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/welcome/welcome"],{"1ccd":function(t,e,n){"use strict";var i=n("9a78"),c=n.n(i);c.a},"55c8":function(t,e,n){"use strict";(function(t){n("f495");i(n("66fd"));var e=i(n("8ca2"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"79bb":function(t,e,n){"use strict";n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var i={uSwiper:function(){return n.e("node-modules/uview-ui/components/u-swiper/u-swiper").then(n.bind(null,"1a14"))}},c=function(){var t=this,e=t.$createElement;t._self._c},u=[]},"86be":function(t,e,n){"use strict";n.r(e);var i=n("d889"),c=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=c.a},"8ca2":function(t,e,n){"use strict";n.r(e);var i=n("79bb"),c=n("86be");for(var u in c)"default"!==u&&function(t){n.d(e,t,(function(){return c[t]}))}(u);n("1ccd");var r,a=n("f0c5"),o=Object(a["a"])(c["default"],i["b"],i["c"],!1,null,"24c6965e",null,!1,i["a"],r);e["default"]=o.exports},"9a78":function(t,e,n){},d889:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{list:[{image:"/static/bg1.png",title:"开始复习"},{image:"/static/bg2.png",title:"开始测试"},{image:"/static/bg5.jpg",title:"查看历史成绩"}]}},methods:{click:function(e){1==t.getStorageSync("status")?0==e?t.redirectTo({url:"/pages/index/review/review"}):1==e?t.redirectTo({url:"/pages/index/training/training"}):t.redirectTo({url:"/pages/history/history"}):t.showToast({title:"请先登录",icon:"none"})}}};e.default=n}).call(this,n("543d")["default"])}},[["55c8","common/runtime","common/vendor"]]]);
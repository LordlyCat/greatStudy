(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t){e.exports=function(e){var t={method:"GET",url:"",data:"",async:!0,cache:!0,contentType:"application/x-www-form-urlencoded",headers:{"Content-type":"application/x-www-form-urlencoded"},success:function(){},error:function(){}};for(var a in e)t[a]=e[a];if("object"===typeof t.data){var n="";for(var a in t.data)n+=a+"="+t.data[a]+"&";t.data=n.substring(0,n.length-1)}t.method=t.method.toUpperCase(),t.cache=t.cache?"":"&"+(new Date).getTime(),"GET"===t.method&&(t.data||t.cache)&&(t.url+="?"+t.data+t.cache);var s=new XMLHttpRequest;s.open(t.method,t.url,t.async),"GET"===t.method?(Object.keys(e.headers).forEach(function(t){s.setRequestHeader(t,e.headers[t])}),s.send(null)):(Object.keys(e.headers).forEach(function(t){s.setRequestHeader(t,e.headers[t])}),s.send(t.data)),s.onreadystatechange=function(){4===s.readyState&&(200===s.status?t.success.call(s,s.responseText):t.error())}}},16:function(e,t,a){e.exports=a(31)},22:function(e,t,a){},24:function(e,t,a){},26:function(e,t,a){},31:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),c=a(14),o=a.n(c);a(22),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var r=a(33),i=a(35),l=a(34),h=a(6),u=a(7),d=a(9),m=a(8),p=a(10),b=(a(24),a(12)),v=a.n(b),y=function(e){function t(){var e;return Object(h.a)(this,t),(e=Object(d.a)(this,Object(m.a)(t).call(this))).state={data:""},e}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){var e=this;v.a.bind(this)({url:"BranchesTrees.json",method:"GET",async:!0,headers:{"Content-type":"application/json"},success:function(t){e.setState({})},error:function(e){console.log(e)}})}},{key:"render",value:function(){return console.log(this.state.data[0]),s.a.createElement("div",{className:"home"},s.a.createElement(j,{name:"\u533a\u53bf\u7cfb\u7edf",class:"btn one",data:this.state.data[0]}),s.a.createElement(j,{name:"\u9ad8\u6821\u7cfb\u7edf",class:"btn two",data:this.state.data[1]}),s.a.createElement(j,{name:"\u57ce\u5e02\u7cfb\u7edf",class:"btn three",data:this.state.data[2]}))}}]),t}(n.Component),j=function(e){function t(){return Object(h.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:this.props.class,onClick:function(){localStorage.setItem("system",e.props.name),localStorage.setItem("selectData",e.props.data),console.log(e.props.data),window.location.hash="choose"}},this.props.name)}}]),t}(n.Component),f=y,g=a(2),O=(a(26),!0),S=function(e){function t(){var e;return Object(h.a)(this,t),(e=Object(d.a)(this,Object(m.a)(t).call(this))).state={coverStyle:{display:"none"}},e.systemName=localStorage.getItem("system"),e.systemName||(e.systemName="\u533a\u53bf\u7cfb\u7edf"),e.setCoverStyle=e.setCoverStyle.bind(Object(g.a)(Object(g.a)(e))),e}return Object(p.a)(t,e),Object(u.a)(t,[{key:"setCoverStyle",value:function(){if(!O)return!1;"none"===this.state.coverStyle.display?this.setState({coverStyle:{display:"block"}}):this.setState({coverStyle:{display:"none"}})}},{key:"render",value:function(){return s.a.createElement("div",{id:"choose"},s.a.createElement("div",{className:"systemName"},this.systemName),s.a.createElement(E,{classname:"dropWrapper firstBox",data:["haha1","233","wawawa","\u6797\u514b"]}),s.a.createElement(E,{classname:"dropWrapper secondBox",data:["haha1","233","wawawa","\u6797\u514b"]}),s.a.createElement(E,{classname:"dropWrapper thirdBox",data:["haha1","233","wawawa","\u6797\u514b"]}),s.a.createElement(C,{setCoverStyle:this.setCoverStyle}),s.a.createElement(N,{style:this.state.coverStyle,setCoverStyle:this.setCoverStyle}))}}]),t}(n.Component),E=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={showList:!1,height:"7vw",selected:a.props.data[0],moveFlag:!1,zIndex:1},a.touchStartTime=null,a.show=a.show.bind(Object(g.a)(Object(g.a)(a))),a.touchStart=a.touchStart.bind(Object(g.a)(Object(g.a)(a))),a.setSelected=a.setSelected.bind(Object(g.a)(Object(g.a)(a))),a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"touchStart",value:function(){this.touchStartTime=Date.parse(new Date),this.setState({zIndex:9999})}},{key:"show",value:function(){if(Date.parse(new Date)-this.touchStartTime>40)return!1;if(this.state.showList||this.state.moveFlag)this.state.showList&&!this.state.moveFlag&&(this.setState({height:"7vw",showList:!1,zIndex:1}),setTimeout(function(){O=!0},600));else{O=!1;var e=this.props.data.length;e<=3?(this.setState({height:7*e+"vw",showList:!0}),O=!1):(this.setState({height:"21vw",showList:!0}),O=!1)}console.log(O)}},{key:"setSelected",value:function(e){this.setState({selected:e})}},{key:"render",value:function(){var e=null;return e=this.state.showList?s.a.createElement(w,{classname:"selectInput",childSelect:this.props.data,setSelected:this.setSelected}):this.state.selected,s.a.createElement("div",{className:this.props.classname,style:{height:this.state.height,zIndex:this.state.zIndex},onTouchEnd:this.show,onTouchStart:this.touchStart},e)}}]),t}(n.Component),w=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).childSelect=a.props.childSelect,a.state={selected:a.childSelect[0],backgroundColor:"rgb(248, 248, 229)"},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.childSelect.map(function(t,a){return s.a.createElement(k,{value:t,key:a,setSelected:e.props.setSelected})});return s.a.createElement("div",{className:this.props.classname},t)}}]),t}(n.Component),k=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={backgroundColor:"rgb(248, 248, 229)"},a.touchStart=a.touchStart.bind(Object(g.a)(Object(g.a)(a))),a.onTouchEnd=a.onTouchEnd.bind(Object(g.a)(Object(g.a)(a))),a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"touchStart",value:function(e){this.setState({backgroundColor:"lightblue"})}},{key:"onTouchEnd",value:function(e){this.setState({backgroundColor:"rgb(248, 248, 229)"}),this.props.setSelected(this.props.value)}},{key:"render",value:function(){return s.a.createElement("div",{className:"valueBox",style:{background:this.state.backgroundColor},onTouchStart:this.touchStart,onTouchEnd:this.onTouchEnd},this.props.value)}}]),t}(n.Component),C=function(e){function t(){return Object(h.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"nextBtn",onClick:this.props.setCoverStyle},"\u4e0b\u4e00\u6b65")}}]),t}(n.Component),N=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={name:"",age:"",job:""},a.getName=a.getName.bind(Object(g.a)(Object(g.a)(a))),a.getAge=a.getAge.bind(Object(g.a)(Object(g.a)(a))),a.getJob=a.getJob.bind(Object(g.a)(Object(g.a)(a))),a.submitData=a.submitData.bind(Object(g.a)(Object(g.a)(a))),a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"getName",value:function(e){this.setState({name:e.target.value})}},{key:"getAge",value:function(e){this.setState({age:e.target.value})}},{key:"getJob",value:function(e){this.setState({job:e.target.value})}},{key:"submitData",value:function(){console.log(this.state.name),this.props.setCoverStyle()}},{key:"render",value:function(){return s.a.createElement("div",{className:"cover",style:this.props.style},s.a.createElement("div",{className:"bullet"},s.a.createElement("div",{className:"cancel",onTouchEnd:this.props.setCoverStyle}),s.a.createElement("div",{className:"nameWrapper"},s.a.createElement("p",null,"\u59d3\u540d\uff1a"),s.a.createElement("input",{type:"text",className:"name",value:this.state.name,onChange:this.getName})),s.a.createElement("div",{className:"nameWrapper"},s.a.createElement("p",null,"\u5e74\u9f84\uff1a"),s.a.createElement("input",{type:"text",className:"name",value:this.state.age,onChange:this.getAge})),s.a.createElement("div",{className:"nameWrapper"},s.a.createElement("p",null,"\u804c\u4e1a\uff1a"),s.a.createElement("input",{type:"text",className:"name",value:this.state.job,onChange:this.getJob})),s.a.createElement("div",{className:"submit",onTouchEnd:this.submitData},"\u63d0\u4ea4")))}}]),t}(n.Component),T=S;o.a.render(s.a.createElement(r.a,{basename:""},s.a.createElement(i.a,null,s.a.createElement(l.a,{exact:!0,path:"/choose",component:T}),s.a.createElement(l.a,{path:"/",component:f}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[16,2,1]]]);
//# sourceMappingURL=main.bbfb8d19.chunk.js.map
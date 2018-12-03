(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(35)},22:function(e,t,n){},29:function(e,t,n){},31:function(e,t,n){},33:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(14),s=n.n(o),i=(n(22),n(2)),c=n(3),p=n(6),m=n(5),l=n(7),d=n(9),u=function(e){return a.a.createElement("div",{className:e.cn,onClick:e.onClick},r.Children.toArray(e.children))},y=[-4,1,4,-1],h="toxuh_fifteens_session",v="toxuh_fifteens_history",f=(n(29),function(e){function t(){var e,n;Object(i.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(a)))).clickHandler=function(e){var t=n.props,r=t.emptyIndex,a=t.array,o=e.target.innerText;if(o){var s=a.findIndex(function(e){return e===parseInt(o)});y.forEach(function(e){(r+e<16&&r+e===s||r+e>0&&r+e===s)&&n.move(s)})}},n.move=function(e){var t=n.props,r=t.emptyIndex,a=t.array,o=t.onUpdate,s=t.onSaveGame,i=t.onCheckResult,c=t.onMove,p=a[r],m=a[e];a[e]=p,a[r]=m,c(),o(a,e),s(),i()},n}return Object(l.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.array;return a.a.createElement("div",{className:"Game"},t.map(function(t){var n="empty"===t?"empty":"";return a.a.createElement(u,{key:t,cn:"Game__cell ".concat(n),onClick:e.clickHandler},"empty"!==t&&t)}))}}]),t}(r.Component)),A=function(e){return a.a.createElement("p",{className:e.cn},r.Children.toArray(e.children))},O=function(e){return a.a.createElement("button",{className:e.cn,onClick:e.onClick},r.Children.toArray(e.children))},x=function(e){return a.a.createElement("span",{className:e.cn},r.Children.toArray(e.children))},I=(n(31),function(e){function t(){var e,n;Object(i.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(a)))).resetGame=function(){n.props.onResetGame()},n.undo=function(){n.props.onUndo()},n}return Object(l.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"Info"},a.a.createElement(A,{cn:"Info__steps"},this.props.isWin?a.a.createElement(x,{cn:"Info__greetings"},"YOU WIN! Number of moves: ",this.props.moves):a.a.createElement(x,null,"Moves:",a.a.createElement(x,{cn:"Info__counter"},this.props.moves),a.a.createElement(O,{cn:"Info__button",onClick:this.undo},"Undo")),a.a.createElement(O,{cn:"Info__button",onClick:this.resetGame},"Reset Game")))}}]),t}(r.Component)),E=function(e){return a.a.createElement("h1",{className:e.cn},r.Children.toArray(e.children))},_=new(function(){function e(){Object(i.a)(this,e),this._ls=window.localStorage}return Object(c.a)(e,[{key:"get",value:function(e){var t=this._ls.getItem(e);try{t=JSON.parse(t)}catch(n){console.warn(n)}return t}},{key:"set",value:function(e,t){var n=JSON.stringify(t);this._ls.setItem(e,n)}},{key:"remove",value:function(e){this._ls.removeItem(e)}},{key:"clear",value:function(){this._ls.clear()}}]),e}()),b=(n(33),function(e){function t(){var e,n;Object(i.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(a)))).componentDidMount=function(){if(_.get(h)){var e=JSON.parse(_.get(h));n.props.dispatch({type:"LOAD_GAME",payloads:{mixedArray:e.array,emptyIndex:e.empty,moves:e.moves}})}else n.props.dispatch({type:"MIX_ARRAY"}),n.props.dispatch({type:"UPDATE_HISTORY"})},n.saveSession=function(){var e={array:n.props.mixedArray,empty:n.props.emptyIndex,moves:n.props.moves};_.set(h,JSON.stringify(e))},n.onUpdateMixedCells=function(e,t){n.props.dispatch({type:"UPDATE_BOARD",payloads:{mixedArray:e,emptyIndex:t}}),n.props.dispatch({type:"UPDATE_HISTORY"})},n.onCheckResult=function(){n.props.dispatch({type:"CHECK_GAME"})},n.onIncrementMoves=function(){n.props.dispatch({type:"MOVE"})},n.onResetGame=function(){_.remove(h),_.remove(v),n.props.dispatch({type:"MIX_ARRAY"}),n.props.dispatch({type:"UPDATE_HISTORY"})},n.onUndo=function(){n.props.dispatch({type:"UNDO"}),n.props.dispatch({type:"UPDATE_HISTORY"})},n}return Object(l.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.mixedArray,n=e.emptyIndex,r=e.win,o=e.moves,s=e.isSavedSession;return a.a.createElement("div",{className:"App"},a.a.createElement(E,{cn:"App__heading"},"Fifteens game"),s&&a.a.createElement(A,{cn:"App__lead"},"Yor game was restored from last session."),a.a.createElement(I,{moves:o,isWin:r,onResetGame:this.onResetGame,onUndo:this.onUndo}),t&&a.a.createElement(f,{array:t,emptyIndex:n,onUpdate:this.onUpdateMixedCells,onSaveGame:this.saveSession,onCheckResult:this.onCheckResult,onMove:this.onIncrementMoves}))}}]),t}(r.Component)),S=Object(d.b)(function(e){return{initialArray:e.initialArray,emptyIndex:e.emptyIndex,mixedArray:e.mixedArray,win:e.win,moves:e.moves,isSavedSession:e.isSavedSession,history:e.history}})(b);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var g=n(8),j=n(4),w=function e(t){var n=t instanceof Array?[]:{};return Object.keys(t).forEach(function(r){t instanceof Array&&"object"===typeof t[r]&&null!==t[r]?n[r]=e(t[r]):n[r]=t[r]}),n},k={initialArray:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],emptyIndex:15,mixedArray:null,win:!1,moves:0,isSavedSession:!1,history:[]},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"MIX_ARRAY":var n=e.initialArray.sort(function(){return Math.random()-.5}).concat("empty"),r=w(n);return Object(j.a)({},e,{mixedArray:n,moves:0,emptyIndex:15,win:!1,isSavedSession:!1,history:[{mixedArray:r,moves:0,emptyIndex:15}]});case"LOAD_GAME":var a=t.payloads,o=a.mixedArray,s=a.emptyIndex,i=a.moves;return Object(j.a)({},e,{mixedArray:o,emptyIndex:s,moves:i,isSavedSession:!0});case"UPDATE_BOARD":var c=w(e.history),p=t.payloads,m=p.emptyIndex,l=p.mixedArray,d=w(l);return c.push({emptyIndex:m,mixedArray:d,moves:e.moves}),Object(j.a)({},e,{mixedArray:l,emptyIndex:m,history:c});case"MOVE":return Object(j.a)({},e,{moves:e.moves+1});case"CHECK_GAME":var u=!e.mixedArray.some(function(e,t){return e>0&&e-1!==t});return Object(j.a)({},e,{win:u});case"UNDO":var y=_.get(v);if(y){var h=JSON.parse(y);if(h.length>1){var f=h[h.length-2],A=f.mixedArray,O=f.emptyIndex,x=f.moves;return h.splice(-1,1),Object(j.a)({},e,{mixedArray:A,emptyIndex:O,moves:x,history:h})}alert("Nothing to undo")}return e;case"UPDATE_HISTORY":return _.set(v,JSON.stringify(e.history)),e;default:return e}},R=Object(g.b)(C);s.a.render(a.a.createElement(d.a,{store:R},a.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,2,1]]]);
//# sourceMappingURL=main.b7424949.chunk.js.map
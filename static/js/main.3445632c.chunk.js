(window.webpackJsonpfireworks=window.webpackJsonpfireworks||[]).push([[0],{12:function(e,t,i){e.exports=i(18)},18:function(e,t,i){"use strict";i.r(t);var n=i(8),r=i.n(n),a=i(0),o=i.n(a);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=i(9),s=i(1),l=i(10),u=i(4),d=i(3),h=i(5),v=i(6),f=i.n(v),y=i(11),p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=e,n=t;return i=Math.ceil(e),n=Math.floor(t),Math.floor(Math.random()*(n-i+1))+i},w=function(e){return e.replace("rgb(","").replace(")","").split(",")},b=function(e){var t=e.toString(16);return 1===t.length?"0".concat(t):t},m=function(e,t,i){return"#".concat(b(e)).concat(b(t)).concat(b(i))},g=function(e,t){var i=t||2;return(new Array(i).join("0")+e).slice(-i)},k=function(e){var t=e;0===t.indexOf("#")&&(t=t.slice(1)),3===t.length&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]);var i=parseInt(t.slice(0,2),16),n=parseInt(t.slice(2,4),16),r=parseInt(t.slice(4,6),16);return i=(255-i).toString(16),n=(255-n).toString(16),r=(255-r).toString(16),"#".concat(g(i)).concat(g(n)).concat(g(r))},x=i(2),O=function e(t,i,n,r,a){var o=this;Object(s.a)(this,e),this.update=function(){o.velocity.x+=o.acceleration.x,o.velocity.y+=o.acceleration.y,o.position.x+=o.velocity.x,o.position.y+=o.velocity.y,o.acceleration.x*=0,o.acceleration.y*=0},this.applyForce=function(e){o.acceleration.x+=e.x,o.acceleration.y+=e.y},this.draw=function(){if(o.canvas){var e=o.canvas.getContext("2d");e.beginPath(),e.arc(o.position.x,o.position.y,2.5,0,2*Math.PI),e.fillStyle=o.color,e.strokeStyle=o.color,e.fill(),e.stroke(),e.closePath()}},this.position={x:t,y:i},this.velocity=a,this.acceleration={x:0,y:0},this.canvas=n,this.color=r},j=function(e){function t(e,i,n,r,a,o){var c;return Object(s.a)(this,t),(c=Object(u.a)(this,Object(d.a)(t).call(this,e,i,n,r,a))).valid=function(){return c.lifespan<=0},c.update=function(){c.velocity.x*=.8,c.velocity.y*=.8,c.lifespan-=.011,c.velocity.x+=c.acceleration.x,c.velocity.y+=c.acceleration.y,c.position.x+=c.velocity.x,c.position.y+=c.velocity.y,c.acceleration.x*=0,c.acceleration.y*=0},c.drawCircle=function(e){e.arc(c.position.x,c.position.y,c.size,0,2*Math.PI)},c.drawTriangle=function(e){var t=Object(x.a)(c),i=t.size,n=t.position,r=n.x,a=n.y;e.moveTo(r+i,a),e.lineTo(r,a-i),e.lineTo(r-i,a),e.lineTo(r+i,a)},c.drawSquare=function(e){var t=Object(x.a)(c),i=t.size,n=t.position,r=n.x,a=n.y;e.moveTo(r,a),e.lineTo(r+i,a),e.lineTo(r+i,a+i),e.lineTo(r,a+i),e.lineTo(r,a)},c.getDrawMethod=function(e){switch(c.type){case 0:return c.drawCircle(e);case 1:return c.drawTriangle(e);case 2:return c.drawSquare(e);default:return null}},c.draw=function(){if(c.canvas){var e=c.canvas.getContext("2d");e.beginPath(),e.globalAlpha=c.lifespan>0?c.lifespan:0,c.getDrawMethod(e),e.strokeStyle=c.color,e.stroke(),e.closePath()}},c.velocity={x:Math.random()*p(-30,30),y:Math.random()*p(-30,30)},c.lifespan=p(80,100)/100,c.size=p(10,20)/10,c.type=p(0,3),c.color=o&&0===p(0,5)?k(m(w(r)[0],w(r)[1],w(r)[2])):r,c}return Object(h.a)(t,e),t}(O),T=function e(t,i,n){var r=this;Object(s.a)(this,e),this.valid=function(){return r.exploded&&r.particles.length<=0},this.update=function(){var e=r.exploded,t=r.firework,i=r.explode,n=r.gravity,a=t.applyForce,o=t.update,c=t.velocity;e?(r.particles.forEach(function(e){e.applyForce(n),e.update()}),r.particles=r.particles.filter(function(e){return!e.valid()})):(a(n),o(),c.y>=0&&i())},this.explode=function(){var e=r.firework,t=r.canvas,i=r.particles,n=r.color,a=r.velocity,o=r.hasInverted;Array.apply(void 0,Object(y.a)(Array(100))).forEach(function(){i.push(new j(e.position.x,e.position.y,t,n,a,o))}),r.exploded=!0},this.draw=function(){var e=r.firework.draw;r.exploded||e(),r.particles.forEach(function(e){return e.draw()})},this.canvas=t,this.color="rgb(".concat(Math.floor(256*Math.random()),",").concat(Math.floor(256*Math.random()),",").concat(Math.floor(256*Math.random()),")"),this.gravity=i,this.velocity=n,this.hasInverted=0===p(0,3),this.firework=new O(p(0,t.width),t.height,t,this.color,this.velocity),this.exploded=!1,this.particles=[]};function I(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,n)}return i}function M(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?I(i,!0).forEach(function(t){Object(c.a)(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):I(i).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}var S=function(e){function t(){var e,i;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(i=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={dimensions:{width:0,height:0},fireworks:[],visibility:{visible:!0,hidden:"",visibilityChange:""},age:0},i.fireworkTimeout=null,i.cleanInterval=null,i.canvas=Object(a.createRef)(),i.setupIntervals=function(){i.cleanInterval=setInterval(function(){i.cleanFireworks()},7.5);i.fireworkTimeout=setTimeout(function e(){var t=i.state,n=t.dimensions.height,r=t.visibility.visible,a={x:0,y:.1},o={x:-p(-1,1),y:-Math.sqrt(0+2*a.y*p(.8*n,.9*n))};r?i.createFirework(o,a):i.cleanFireworks(!0),clearTimeout(i.fireworkTimeout),i.fireworkTimeout=setTimeout(e,p(300,600))},p(300,600))},i.removeIntervals=function(){clearInterval(i.cleanInterval),clearInterval(i.fireworkTimeout)},i.setupListeners=function(){i.setupVisibilityListener(),window.addEventListener("resize",i.handleResize)},i.removeListeners=function(){var e=i.state.visibility.visibilityChange;document.removeEventListener(e,i.handleVisibilityChange),window.removeEventListener("resize",i.handleResize)},i.handleResize=function(){return i.setState(function(e){var t=M({},e);return t.dimensions={width:window.innerWidth,height:window.innerHeight},t})},i.setupVisibilityListener=function(){return i.setState(function(e){var t=M({},e);return"undefined"!==typeof document.hidden?(t.visibility.hidden="hidden",t.visibility.visibilityChange="visibilitychange"):"undefined"!==typeof document.msHidden?(t.visibility.hidden="msHidden",t.visibility.visibilityChange="msvisibilitychange"):"undefined"!==typeof document.webkitHidden&&(t.visibility.hidden="webkitHidden",t.visibility.visibilityChange="webkitvisibilitychange"),t},function(){var e=i.state.visibility.visibilityChange;document.addEventListener(e,i.handleVisibilityChange)})},i.handleVisibilityChange=function(){return i.setState(function(e){var t=M({},e);return t.visibility.visible=!document[t.visibility.hidden],t})},i.createFirework=function(e,t){return i.setState(function(n){var r=M({},n);return r.visibility.visible&&r.fireworks.push(new T(i.canvas.current,t,e)),r})},i.animateFireworks=function(){var e=i.state,t=e.fireworks,n=e.dimensions,r=n.width,a=n.height,o=i.canvas.current.getContext("2d");o.globalCompositeOperation="destination-out",o.fillStyle="rgba(0, 0, 0, 0.575)",o.fillRect(0,0,r,a),o.globalCompositeOperation="source-over",t.forEach(function(e){e.update(),e.draw()})},i.cleanFireworks=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return i.setState(function(t){var i=M({},t);return i.fireworks=e?[]:i.fireworks.filter(function(e){return!e.valid()}),i.age=f()().diff(f()("2000-03-23"),"years"),i},i.animateFireworks)},i.getAgeText=function(){var e=i.state.age,t=e.toString().startsWith("8")||18===e?"an":"a";return"I'm ".concat(t," ").concat(e," year-old, web-based software developer.")},i}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.handleResize(),this.setupListeners(),this.setupIntervals()}},{key:"componentWillUnmount",value:function(){this.removeListeners(),this.removeIntervals()}},{key:"render",value:function(){var e=this.state.dimensions;return o.a.createElement("div",{className:"main-container"},o.a.createElement("canvas",Object.assign({ref:this.canvas},e)),o.a.createElement("div",{className:"details-container"},o.a.createElement("h1",{className:"white header"},"Salem Cresswell"),o.a.createElement("p",{className:"white secondary"},this.getAgeText()),o.a.createElement("p",{className:"white secondary"},"On a day-to-day basis, I'll mainly program in Javascript, HTML & PHP.")))}}]),t}(a.Component);r.a.render(o.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[12,1,2]]]);
//# sourceMappingURL=main.3445632c.chunk.js.map
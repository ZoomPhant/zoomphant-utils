var w=function(o,r){return r.reduce((n,i)=>{return n[i]=o[i],n},{})},R=function(){const{userAgent:o}=window.navigator;let r="Unknown";if(/Windows/.test(o))r="Windows";else if(/Mac OS|Macintosh/.test(o))r="macOS";else if(/Linux/.test(o))r="Linux";else if(/Android/.test(o))r="Android";else if(/iOS|iPad|iPhone|iPod/.test(o))r="iOS";return r},a=function(){const{userAgent:o}=window.navigator;let r="Unknown",n="Unknown";if(/Firefox\/([\d.]+)/.test(o))r="Firefox",n=RegExp.$1;else if(/Chrome\/([\d.]+)/.test(o))r="Chrome",n=RegExp.$1;else if(/Safari\/([\d.]+)/.test(o))r="Safari",n=RegExp.$1;else if(/MSIE (\d+\.\d+);/.test(o))r="Internet Explorer",n=RegExp.$1;else if(/Edge\/([\d.]+)/.test(o))r="Edge",n=RegExp.$1;else if(/Opera\/([\d.]+)/.test(o))r="Opera",n=RegExp.$1;return{name:r,version:n}},h="0.0.1",E=(o)=>{try{return JSON.stringify(o)}catch(r){return String(o)}};class u{type;level;message;timestamp;extra;constructor(o,r,n){this.level=r,this.message=n,this.type=o,this.timestamp=(new Date()).getTime(),this.extra={},this.generateExtra()}generateExtra(){this.timestamp=(new Date()).getTime();const{name:o,version:r}=a(),n=this.extra||{};n.url=window.location.href,n.os=R(),n.browser=o,n.browserVersion=r,n.title=document.title,this.extra=n}destroy(){this.message=null,this.type=null,this.timestamp=null,this.extra=null}}class f{list;max;constructor({max:o=1}){this.max=o,this.list=[]}push(o){this.list=[...(this.list||[]).slice(-1*this.max+1),o]}toNormalize(o){if(!this.list||this.list.length<=0)return null;const r=this.list[this.list.length-1];return{...w(r.extra||{},["browser","url","os","title"]),level:r.level,instance:o,stack:(this.list||[]).reduce((n,i)=>{const{message:M,timestamp:C,type:d}=i;return[...n,(Array.isArray(M)?M:[M]).map((m)=>`[${d}] [${C}] ${typeof m==="string"?m.trim():E(m)}`)]},[]).reverse().join("\n")}}stringify(o){return JSON.stringify(this.toNormalize(o))}destroy(){(this.list||[]).forEach((o)=>o.destroy()),this.list=null}}class p{core;maxStacks=10;stacks=[];constructor(o,r){this.core=o,this.maxStacks=r,this.stacks=[new f({max:this.maxStacks})]}capture(o){if(this.core)if(o instanceof u){const[r]=this.stacks;r.push(o)}else{const[r]=this.stacks;r.push(new u(...o))}}captureAndSync(o){if(this.core){this.capture(o),this.stacks.unshift(new f({max:this.maxStacks}));let r=this.stacks.pop();if(r)return this.core.post({type:"logs",body:r.stringify(this.core.baseSettings.instanceId)}).finally(()=>{if(r)r.destroy(),r=void 0})}return Promise.resolve()}}class l{static version=h;connectorId="zoomphant-connector";monitorId="zoomphant-monitor";baseSettings=null;pluginSettings={xhr:!1,fetch:!1,console:!1};connector=null;messageResolvers={};logs;constructor(o){if(new.target!==l)throw new Error("A static class cannot be instantiated.");if(!o)throw new Error("Settings is required");if(this.baseSettings={account:o.account,agent:o.agent,token:o.token,domain:o.domain,instanceId:o.instanceId},this.logs=new p(this,o.maxStacks||10),o.plugins){if(o.plugins.xhr)this.pluginSettings.xhr=!0;if(o.plugins.fetch)this.pluginSettings.fetch=!0;if(o.plugins.console)this.pluginSettings.console=!0}this.initialize()}initialize(){this.createConnector(),this.addEventListeners()}createConnector(){this.connector=document.getElementById(this.connectorId)??document.createElement("iframe"),this.connector.id=this.connectorId,this.connector.src=`${this.baseSettings.domain}/connector.html?${new URLSearchParams({...this.baseSettings||{},domain:window.location.origin})}`,this.connector.style.position="absolute",this.connector.style.width="0",this.connector.style.height="0",this.connector.style.border="none",this.connector.style.marginLeft="-999px",document.body.appendChild(this.connector)}addEventListeners(){window.addEventListener("message",this.handleMessage.bind(this))}handleMessage(o){const{source:r,body:n,messageId:i}=o.data;if(r===this.connectorId){const M=this.messageResolvers[i];if(M)M(n),delete this.messageResolvers[i]}}post({type:o,body:r}){if(!this.connector)throw new Error("Connector not found");const n=crypto.randomUUID(),i=new Promise((M)=>{this.messageResolvers[n]=M});return this.connector.contentWindow?.postMessage({source:this.monitorId,type:o,body:r,messageId:n},this.baseSettings.domain),i}destroy(){if(this.connector)document.body.removeChild(this.connector),this.connector=null}}var F=l,x=F;import c,{useEffect as W} from"react";import{jsxDEV as b} from"react/jsx-dev-runtime";var P,v=c.createContext(null),z=({monitor:o,children:r})=>{return W(()=>{P=o},[]),b(v.Provider,{value:o,children:r},void 0,!1,void 0,this)},A=()=>{const o=c.useContext(v);if(!o)throw new Error("useMonitor must be used within a MonitorProvider");return o},G=()=>P;var O=x;export{A as useMonitor,G as getMonitor,O as default,z as MonitorProvider};

//# debugId=405AE5ADFA53CB4664756e2164756e21
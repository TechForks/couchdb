/**
* XMLHttpRequest.js Copyright (C) 2011 Sergey Ilinsky (http://www.ilinsky.com)
*
* This work is free software; you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation; either version 2.1 of the License, or
* (at your option) any later version.
*
* This work is distributed in the hope that it will be useful,
* but without any warranty; without even the implied warranty of
* merchantability or fitness for a particular purpose. See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with this library; if not, write to the Free Software Foundation, Inc.,
* 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/

// Browser-Request
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.
(function(){function e(){this._object=a&&!d?new a:new window.ActiveXObject("Microsoft.XMLHTTP"),this._listeners=[]}function f(){return new e}function g(a){a._object.send(a._data);if(b&&!a._async){a.readyState=f.OPENED,j(a);while(a.readyState<f.DONE){a.readyState++,h(a);if(a._aborted)return}}}function h(a){f.onreadystatechange&&f.onreadystatechange.apply(a),a.dispatchEvent({type:"readystatechange",bubbles:!1,cancelable:!1,timeStamp:new Date+0})}function i(a){var b=a.responseXML,d=a.responseText;c&&d&&b&&!b.documentElement&&a.getResponseHeader("Content-Type").match(/[^\/]+\/[^\+]+\+xml/)&&(b=new window.ActiveXObject("Microsoft.XMLDOM"),b.async=!1,b.validateOnParse=!1,b.loadXML(d));if(b)if(c&&b.parseError!==0||!b.documentElement||b.documentElement&&b.documentElement.tagName=="parsererror")return null;return b}function j(a){try{a.responseText=a._object.responseText}catch(b){}try{a.responseXML=i(a._object)}catch(b){}try{a.status=a._object.status}catch(b){}try{a.statusText=a._object.statusText}catch(b){}}function k(a){a._object.onreadystatechange=new window.Function}var a=window.XMLHttpRequest,b=!!window.controllers,c=!!window.document.namespaces,d=c&&window.navigator.userAgent.match(/MSIE 7.0/);f.prototype=e.prototype,b&&a.wrapped&&(f.wrapped=a.wrapped),f.UNSENT=0,f.OPENED=1,f.HEADERS_RECEIVED=2,f.LOADING=3,f.DONE=4,f.prototype.UNSENT=f.UNSENT,f.prototype.OPENED=f.OPENED,f.prototype.HEADERS_RECEIVED=f.HEADERS_RECEIVED,f.prototype.LOADING=f.LOADING,f.prototype.DONE=f.DONE,f.prototype.readyState=f.UNSENT,f.prototype.responseText="",f.prototype.responseXML=null,f.prototype.status=0,f.prototype.statusText="",f.prototype.priority="NORMAL",f.prototype.onreadystatechange=null,f.onreadystatechange=null,f.onopen=null,f.onsend=null,f.onabort=null,f.prototype.open=function(a,d,e,g,i){var l=a.toLowerCase();if(l=="connect"||l=="trace"||l=="track")throw new Error(18);delete this._headers,arguments.length<3&&(e=!0),this._async=e;var m=this,n=this.readyState,o=null;c&&e&&(o=function(){n!=f.DONE&&(k(m),m.abort())},window.attachEvent("onunload",o)),f.onopen&&f.onopen.apply(this,arguments),arguments.length>4?this._object.open(a,d,e,g,i):arguments.length>3?this._object.open(a,d,e,g):this._object.open(a,d,e),this.readyState=f.OPENED,h(this),this._object.onreadystatechange=function(){if(b&&!e)return;m.readyState=m._object.readyState,j(m);if(m._aborted){m.readyState=f.UNSENT;return}m.readyState==f.DONE&&(delete m._data,k(m),c&&e&&window.detachEvent("onunload",o),n!=m.readyState&&h(m),n=m.readyState)}},f.prototype.send=function(a){f.onsend&&f.onsend.apply(this,arguments),arguments.length||(a=null),a&&a.nodeType&&(a=window.XMLSerializer?(new window.XMLSerializer).serializeToString(a):a.xml,this._headers["Content-Type"]||this._object.setRequestHeader("Content-Type","application/xml")),this._data=a,g(this)},f.prototype.abort=function(){f.onabort&&f.onabort.apply(this,arguments),this.readyState>f.UNSENT&&(this._aborted=!0),this._object.abort(),k(this),this.readyState=f.UNSENT,delete this._data},f.prototype.getAllResponseHeaders=function(){return this._object.getAllResponseHeaders()},f.prototype.getResponseHeader=function(a){return this._object.getResponseHeader(a)},f.prototype.setRequestHeader=function(a,b){return this._headers||(this._headers={}),this._headers[a]=b,this._object.setRequestHeader(a,b)},f.prototype.addEventListener=function(a,b,c){for(var d=0,e;e=this._listeners[d];d++)if(e[0]==a&&e[1]==b&&e[2]==c)return;this._listeners.push([a,b,c])},f.prototype.removeEventListener=function(a,b,c){for(var d=0,e;e=this._listeners[d];d++)if(e[0]==a&&e[1]==b&&e[2]==c)break;e&&this._listeners.splice(d,1)},f.prototype.dispatchEvent=function(a){var b={type:a.type,target:this,currentTarget:this,eventPhase:2,bubbles:a.bubbles,cancelable:a.cancelable,timeStamp:a.timeStamp,stopPropagation:function(){},preventDefault:function(){},initEvent:function(){}};b.type=="readystatechange"&&this.onreadystatechange&&(this.onreadystatechange.handleEvent||this.onreadystatechange).apply(this,[b]);for(var c=0,d;d=this._listeners[c];c++)d[0]==b.type&&!d[2]&&(d[1].handleEvent||d[1]).apply(this,[b])},f.prototype.toString=function(){return"[object XMLHttpRequest]"},f.toString=function(){return"[XMLHttpRequest]"},window.Function.prototype.apply||(window.Function.prototype.apply=function(a,b){b||(b=[]),a.__func=this,a.__func(b[0],b[1],b[2],b[3],b[4]),delete a.__func}),window.XMLHttpRequest=f})(),!function(){function a(a){if(a==="./xmlhttprequest")return window&&{XMLHttpRequest:window.XMLHttpRequest};throw new Error("require() unsupported in the browser build. Use RequireJS or Ender.")}function d(){function f(a,b){if(typeof b!="function")throw new Error("Bad callback given: "+b);if(!a)throw new Error("No options given");var c=a.onResponse;typeof a=="string"?a={uri:a}:a=JSON.parse(JSON.stringify(a)),a.onResponse=c,a.url&&(a.uri=a.url,delete a.url);if(!a.uri&&a.uri!=="")throw new Error("options.uri is a required argument");if(typeof a.uri!="string")throw new Error("options.uri must be a string");var d=["proxy","_redirectsFollowed","maxRedirects","followRedirect"];for(var e=0;e<d.length;e++)if(a[d[e]])throw new Error("options."+d[e]+" is not supported");a.callback=b,a.method=a.method||"GET",a.headers=a.headers||{},a.body=a.body||null,a.timeout=a.timeout||f.DEFAULT_TIMEOUT;if(a.headers.host)throw new Error("Options.headers.host is not supported");return a.json&&(a.headers.accept=a.headers.accept||"application/json",a.method!=="GET"&&(a.headers["content-type"]="application/json"),typeof a.json!="boolean"?a.body=JSON.stringify(a.json):typeof a.body!="string"&&(a.body=JSON.stringify(a.body))),a.onResponse=a.onResponse||j,a.onResponse===!0&&(a.onResponse=b,a.callback=j),!a.headers.authorization&&a.auth&&(a.headers.authorization="Basic "+n(a.auth.username+":"+a.auth.password)),h(a)}function h(a){function j(){c=!0;var d=new Error("ETIMEDOUT");return d.code="ETIMEDOUT",d.duration=a.timeout,f.log.error("Timeout",{id:b._id,milliseconds:a.timeout}),a.callback(d,b)}function l(e){if(c)return f.log.debug("Ignoring timed out state change",{state:b.readyState,id:b.id});f.log.debug("State change",{state:b.readyState,id:b.id,timed_out:c});if(b.readyState===d.OPENED){f.log.debug("Request started",{id:b.id});for(var g in a.headers)b.setRequestHeader(g,a.headers[g])}else b.readyState===d.HEADERS_RECEIVED?n():b.readyState===d.LOADING?(n(),o()):b.readyState===d.DONE&&(n(),o(),p())}function n(){if(k.response)return;k.response=!0,f.log.debug("Got response",{id:b.id,status:b.status}),clearTimeout(b.timeoutTimer),b.statusCode=b.status;if(e&&b.statusCode==0){var c=new Error("CORS request rejected: "+a.uri);return c.cors="rejected",k.loading=!0,k.end=!0,a.callback(c,b)}a.onResponse(null,b)}function o(){if(k.loading)return;k.loading=!0,f.log.debug("Response body loading",{id:b.id})}function p(){if(k.end)return;k.end=!0,f.log.debug("Request done",{id:b.id}),b.body=b.responseText;if(a.json)try{b.body=JSON.parse(b.responseText)}catch(c){return a.callback(c,b)}a.callback(null,b,b.body)}var b=new d,c=!1,e=m(a.uri),h="withCredentials"in b._object;g+=1,b.seq_id=g,b.id=g+": "+a.method+" "+a.uri,b._id=b.id;if(e&&!h){var i=new Error("Browser does not support cross-origin request: "+a.uri);return i.cors="unsupported",a.callback(i,b)}b.timeoutTimer=setTimeout(j,a.timeout);var k={response:!1,loading:!1,end:!1};return b.onreadystatechange=l,b.open(a.method,a.uri,!0),e&&(b._object.withCredentials=!!a.withCredentials),b.send(a.body),b}function j(){}function k(){var a={},b=["trace","debug","info","warn","error"],c,d;for(d=0;d<b.length;d++)c=b[d],a[c]=j,typeof console!="undefined"&&console&&console[c]&&(a[c]=l(console,c));return a}function l(a,b){function c(c,d){return typeof d=="object"&&(c+=" "+JSON.stringify(d)),a[b].call(a,c)}return c}function m(a){var b=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,c;try{c=location.href}catch(d){c=document.createElement("a"),c.href="",c=c.href}var e=b.exec(c.toLowerCase())||[],f=b.exec(a.toLowerCase()),g=!(!f||f[1]==e[1]&&f[2]==e[2]&&(f[3]||(f[1]==="http:"?80:443))==(e[3]||(e[1]==="http:"?80:443)));return g}function n(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c,d,e,f,g,h,i,j,k=0,l=0,m="",n=[];if(!a)return a;do c=a.charCodeAt(k++),d=a.charCodeAt(k++),e=a.charCodeAt(k++),j=c<<16|d<<8|e,f=j>>18&63,g=j>>12&63,h=j>>6&63,i=j&63,n[l++]=b.charAt(f)+b.charAt(g)+b.charAt(h)+b.charAt(i);while(k<a.length);m=n.join("");switch(a.length%3){case 1:m=m.slice(0,-2)+"==";break;case 2:m=m.slice(0,-1)+"="}return m}var b=a("./xmlhttprequest");if(!b||typeof b!="object")throw new Error("Could not find ./xmlhttprequest");var d=b.XMLHttpRequest;if(!d)throw new Error("Bad xmlhttprequest.XMLHttpRequest");if(!("_object"in new d))throw new Error("This is not portable XMLHttpRequest");c.exports=f,f.XMLHttpRequest=d,f.log=k();var e=18e4,g=0;f.withCredentials=!1,f.DEFAULT_TIMEOUT=e;var i=["get","put","post","head"];i.forEach(function(a){var b=a.toUpperCase(),c=a.toLowerCase();f[c]=function(a){typeof a=="string"?a={method:b,uri:a}:(a=JSON.parse(JSON.stringify(a)),a.method=b);var c=[a].concat(Array.prototype.slice.apply(arguments,[1]));return f.apply(this,c)}}),f.couch=function(a,b){function d(a,c,d){if(a)return b(a,c,d);if((c.statusCode<200||c.statusCode>299)&&d.error){a=new Error("CouchDB error: "+(d.error.reason||d.error.error));for(var e in d)a[e]=d[e];return b(a,c,d)}return b(a,c,d)}typeof a=="string"&&(a={uri:a}),a.json=!0,a.body&&(a.json=a.body),delete a.body,b=b||j;var c=f(a,d);return c}}var b={},c={exports:b};typeof window=="undefined"&&(typeof console!="undefined"&&console&&console.error&&console.error('Cannot find global "window" object. Is this a browser?'),window={}),d(),window.request=c.exports}();

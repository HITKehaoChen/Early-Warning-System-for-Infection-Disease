!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";$(".button-collapse").sideNav({closeOnClick:!0,draggable:!0}),$(document).ready(function(){$(".modal").modal({dismissible:!0,opacity:.3,inDuration:300,outDuration:200,startingTop:"0%",endingTop:"10%",ready:function(e,t){window.dispatchEvent(new Event("resize"))}})}),$(document).ready(function(){$("#form-signin").submit(function(e){e.preventDefault(),$.ajax({url:"/signin",data:$("#form-signin").serialize(),type:"POST",success:function(e,t){console.log("succeeded with data: "+this.data+","+this.url+","+t),setTimeout(function(){$("#modal1").modal("close")},200);var n=$("<h4>Sign in successfully !</h4>");Materialize.toast(n,3e3,"toast-success")},error:function(e,t){console.log("failed with data"+this.data+","+this.url+","+t);var n=$("<h4>Sign in Failed !</h4>");Materialize.toast(n,3e3,"toast-fail")}})})}),$(function(){$("#mobile-nav").perfectScrollbar(),$("#modal1").perfectScrollbar()}),$(".carousel.carousel-slider").carousel({fullWidth:!0}),$(document).ready(function(){var e=setInterval(function(){$(".carousel").carousel("next")},2e3);$(".carousel.carousel-slider").on("click",function(t){clearInterval(e),console.log("click cleared setInterval func..."),$(void 0).off(t)})}),$("a[href='#top']").click(function(){return $("html, body").animate({scrollTop:0},400),!1})}]);
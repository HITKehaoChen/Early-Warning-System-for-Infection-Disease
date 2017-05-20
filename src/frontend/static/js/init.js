/**
 *
 * Created by lty96117 on 5/19/2017.
 */
//set the menu btn for mobile
$(".button-collapse").sideNav({
  draggable: true
});

$(document).ready(function () {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});

$(function() {
  $('#mobile-nav').perfectScrollbar();
});

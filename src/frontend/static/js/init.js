/**
 *
 * Created by lty96117 on 5/19/2017.
 */
//set the menu btn for mobile
$(".button-collapse").sideNav({
  closeOnClick: true,
  draggable: true
});

$(document).ready(function () {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '0%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      window.dispatchEvent(new Event('resize'));
      // alert("Ready");
      // console.log(modal, trigger);

    },
    // complete: function () {
    //   alert('Closed');
    // } // Callback for Modal close
  });
});

$(function () {
  $('#mobile-nav').perfectScrollbar();
  $('#modal1').perfectScrollbar();
});

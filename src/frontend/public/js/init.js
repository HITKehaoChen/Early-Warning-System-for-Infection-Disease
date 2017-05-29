/**
 *
 * Created by lty96117 on 5/19/2017.
 */

import '../css/init.css';


$(document).ready(() => {

  //set the menu btn for mobile
  $(".button-collapse").sideNav({
    closeOnClick: true,
    draggable: true
  });


  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .3, // Opacity of modal background .5 default
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '0%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
      window.dispatchEvent(new Event('resize'));
      // alert("Ready");
      // console.log(modal, trigger);

    },
    // complete: function () {
    //   alert('Closed');
    // } // Callback for Modal close
  });
  //
  $('#form-train').submit((e) => {
    e.preventDefault();

    $.ajax({
      url: '/test',
      data: new FormData($('#form-train')[0]),
      // data: $('#form-train').serialize(),

      type: 'POST',
      contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
      processData: false, // NEEDED, DON'T OMIT THIS
      success: function (data, textStatus) {
        console.log('succeeded with data: ' + this.data + "," + this.url + "," + textStatus);

      },
      error: function (data, textStatus) {
        console.log('failed with data' + this.data + "," + this.url + "," + textStatus);

      },
    });
  });//prevents the submit});
  //get the signin form
  $('#form-signin').submit((e) => {
    e.preventDefault();//prevents the submit
    $.ajax({
      url: '/signin',
      data: $('#form-signin').serialize(),
      type: 'POST',
      success: function (data, textStatus) {
        console.log('succeeded with data: ' + this.data + "," + this.url + "," + textStatus);
        setTimeout(() => {
          $('#modal1').modal('close');
        }, 200);
        let $toastContent = $('<h4>Sign in successfully !</h4>');
        Materialize.toast($toastContent, 3000, 'toast-success');
      },
      error: function (data, textStatus) {
        console.log('failed with data' + this.data + "," + this.url + "," + textStatus);
        let $toastContent = $('<h4>Sign in Failed !</h4>');
        Materialize.toast($toastContent, 3000, 'toast-fail');
      },
    });
  });


  $(function () {
    $('#mobile-nav').perfectScrollbar();
    $('#modal1').perfectScrollbar();
  });

  let timer = setInterval(() => {
    $('.carousel').carousel('next');
  }, 2000);
  $('.carousel.carousel-slider')
    .carousel({fullWidth: true})
    .on('click', (e) => {
      clearInterval(timer);
      // alert('clicked me!');
      console.log('click cleared setInterval func...');
      $(this).off(e);// unbind successfully!
    });
  //   .on('tap', (e) => {
  //   clearInterval(timer);
  //   alert('tapped me!');
  //   console.log('tap cleared setInterval func...');
  //   $(this).off(e);
  // });
  // $('#c-btn').on('click', (e) => {
  //   clearInterval(timer);
  //   // alert('clicked btn!');
  //   $(this).off(e);
  // });
  // $('#c-btn2').on('click', (e) => {
  //   clearInterval(timer);
  //   // alert('clicked btn!');
  //   $(this).off(e);
  // })


  $("a[href='#top']").click(() => {
    $('html, body').animate({scrollTop: 0}, 400);
    return false;
  });
  $('select').material_select();


});

console.log('initialization completed');
/**
 *
 * Created by lty96117 on 5/19/2017.
 */

import '../css/init.css';

const Axios = require('axios');
const _ = require('underscore');
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

    const obj = {
      name: $('#signin-name').val(),
      password: $('#signin-pwd').val()
    };
    console.log('post obj: ', obj);
    Axios.post('/userSignIn', obj).then((res) => {
      console.log('res: ', res);
      console.log('res.data: ', res.data);

      if (res.data.success) {
        setTimeout(() => {
          $('#modal1').modal('close');
        }, 200);
        sessionStorage.setItem('alarm-token', res.data.token);

        let $toastContent = res.data.info;
        Materialize.toast($toastContent, 3000, 'toast-success');


      } else {

        let $toastContent = res.data.info || $('<h4>INVALID REQUEST !</h4>');
        Materialize.toast($toastContent, 3000, 'toast-fail');
        sessionStorage.setItem('alarm-token', null);

      }
    }, (err) => {

      console.log('err: ', err);
      // let $toastContent = $('<h4>INVALID REQUEST !</h4>');
      let $toastContent = $('<h4>INVALID REQUEST !</h4>');
      Materialize.toast($toastContent, 3000, 'toast-fail');
      sessionStorage.setItem('alarm-token', null);
    });

  });

  $('#form-signup').submit((e) => {
    e.preventDefault();
    const obj = _.object($("#form-signup").serializeArray().map(function (v) {
      return [v.name, v.value];
    }));
    console.log(obj);

    Axios.post('/userSignUp', obj).then((res) => {
      console.log(res);

      if (res.data.success) {
        let $toastContent = '注册成功！';
        Materialize.toast($toastContent, 3000, 'toast-success');
      } else {
        let $toastContent = '注册失败： ' + res.data.info;
        Materialize.toast($toastContent, 3000, 'toast-fail');
      }

    })
  });

  // for four systems redirect



  function getOnClick(id) {
    return function () {
      const token = sessionStorage.getItem('alarm-token');
      if (token === null) {
        Materialize.toast('Unauthorized, need to login in first!', 3000, 'toast-fail');
        console.log('Unauthorized!!');
        // window.location.href = '/';
      } else {
        window.location.href = '/' + id + '?token=' + token;
      }
    }
  }

  $('.warning_auth').click(getOnClick('warning'));
  $('.training_auth').click(getOnClick('training'));
  $('.diagnosis_auth').click(getOnClick('diagnosis'));
  $('.health_auth').click(getOnClick('health'));

  // $('#id_warning').click(() => {
  //   const token = sessionStorage.getItem('alarm-token');
  //   if (token === null) {
  //     // window.location.href = '/';
  //     Materialize.toast('Unauthorized, need to login in first!', 3000, 'toast-fail');
  //     console.log('Unauthorized!!');
  //   }
  //   console.log(token);
  //   if (token !== null) {
  //     window.location.href = '/' + '#id_warning'.substring(4) + '?token=' + token;
  //   }
  // });

  $(function () {
    $('#mobile-nav').perfectScrollbar();
    $('#modal1').perfectScrollbar();
  });

  let timer = setInterval(() => {
    $('.carousel').carousel('next');
  }, 2000);
  $('.carousel.carousel-slider')
    .carousel({fullWidth: true});
    // .on('click', (e) => {
    //   clearInterval(timer);
    //   // alert('clicked me!');
    //   console.log('click cleared setInterval func...');
    //   $(this).off(e);// unbind successfully!
    // });


  $("a[href='#top']").click(() => {
    $('html, body').animate({scrollTop: 0}, 400);
    return false;
  });
  $('select').material_select();
  $('textarea#textarea1').characterCounter();

  $('.demo_link').attr('href', 'javascript:;');
});
console.log('initialization completed');
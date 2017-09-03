$(function(){
  var timer = '';
  $('.rarabai-form').submit(function(){
    if (timer !== '') {
      clearTimeout(timer);
      timer = '';
    }

    var time_settings = function() {
      settings = {};
      settings.none_abi = timeStrToSec($('#none-abi input').val(), 'アビ無し');
      settings.naitoru = timeStrToSec($('#naitoru input').val(), 'ナイトル');
      settings.naitoru_maruka = timeStrToSec($('#naitoru-maruka input').val(), 'ナイトルマルカート');
      settings.kurarion_naitoru_maruka = timeStrToSec($('#kurarion-naitoru-maruka input').val(), 'クラリオンナイトルマルカート');
      return settings;
    }();

    updateTime(time_settings, now())

    return false
  });

  function updateTime(time_settings, startTime) {
    timer = setTimeout(function(){
      var elapsedTime = now() - startTime;
      $('.elapsed-time').text(secToTimeStr(elapsedTime));

      func_update_remaining_sec = function($element, remaining_time) {
        if (remaining_time > -1) {
          $element.css('color', '');
          $element.text('残り ' + secToTimeStr(remaining_time));
        } else {
          $element.text('残り ' + secToTimeStr(0));
        }
        if (remaining_time < 30) {
          $element.css('color', 'red');
        }
      }

      if (time_settings.none_abi > 0) {
        func_update_remaining_sec($('#none-abi .remaining-time'), time_settings.none_abi - elapsedTime);
      } else {
        $('#none-abi .remaining-time').text('');
      }
      if (time_settings.naitoru > 0) {
        func_update_remaining_sec($('#naitoru .remaining-time'), time_settings.naitoru - elapsedTime);
      } else {
        $('#naitoru .remaining-time').text('');
      }
      if (time_settings.naitoru_maruka > 0) {
        func_update_remaining_sec($('#naitoru-maruka .remaining-time'), time_settings.naitoru_maruka - elapsedTime);
      } else {
        $('#naitoru-maruka .remaining-time').text('');
      }
      if (time_settings.kurarion_naitoru_maruka > 0) {
        func_update_remaining_sec($('#kurarion-naitoru-maruka .remaining-time'), time_settings.kurarion_naitoru_maruka - elapsedTime);
      } else {
        $('#kurarion-naitoru-maruka .remaining-time').text('');
      }

      if (timer !== '') {
        updateTime(time_settings, startTime);
      }
    }, 1000);
  }

  function timeStrToSec(str, type) {
    if (str === '') {
      return 0;
    }
    var tpl = str.split(':');
    var sec=0;
    if (tpl.length == 1) {
      sec = tpl[0];
    } else if (tpl.length == 2) {
      sec = (tpl[0] * 60) + (tpl[1] * 1);
    } else if (tpl.length == 3) {
      sec = (tpl[0] * 3600) + (tpl[1] * 60) + (tpl[2] * 1);
    }
    return sec;
  }

  function secToTimeStr(sec, type) {
    var hour = Math.floor(sec / 3600);
    var min = Math.floor((sec % 3600) / 60);
    var sec = Math.floor(sec % 60);
    var str = '';
    if (hour > 0) {
      str = hour + ':';
    }
    str = str + ("0"+min).slice(-2) + ':' + ("0"+sec).slice(-2);
    return str;
  }

  function now() {
    return Math.floor(Date.now() / 1000);
  }

});

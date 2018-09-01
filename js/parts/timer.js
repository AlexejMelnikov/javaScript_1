"use strict";

function timer() {
  var deadLine = '2018-09-01';

  var geTimeRemainig = function geTimeRemainig(endTime) {
    var t = Date.parse(endTime) - Date.parse(new Date());
    t < 0 ? t = 0 : t = t;
    var seconds = Math.floor(t / 1000 % 60),
        minutes = Math.floor(t / 1000 / 60 % 60),
        hours = Math.floor(t / (1000 * 60 * 60));
    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  var setClock = function setClock(id, endtime) {
    var timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds');

    var checkTime = function checkTime(a) {
      a < 10 ? a = "0" + a : a = a;
      return a;
    };

    var updateClock = function updateClock() {
      var t = geTimeRemainig(endtime);
      hours.innerHTML = checkTime(t.hours);
      minutes.innerHTML = checkTime(t.minutes);
      seconds.innerHTML = checkTime(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    };

    updateClock();
    var timeInterval = setInterval(updateClock, 1000);
  };

  setClock('timer', deadLine);
}

module.exports = timer;
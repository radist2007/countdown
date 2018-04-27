document.addEventListener('DOMContentLoaded', function() {
  console.log('Hello from main.js');

  var firstInputDate = document.getElementById('firstInputDate'),
      firstInputTime = document.getElementById('firstInputTime'),
      secondInputDate = document.getElementById('secondInputDate'),
      secondInputTime = document.getElementById('secondInputTime'),
      inputs = document.getElementsByClassName('input');
      result = document.getElementById('result');

  function getCurrentDate(){
    var cd = new Date();
    console.log(cd);
    return cd;
  }

  function checkZero(tc){
    var toCheck = tc;
    (toCheck.toString().length < 2) ? toCheck = '0' + toCheck : toCheck;
    return toCheck;
  }

  function setDateToInput(date, input){
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = checkZero(month);
    day = checkZero(day);
    var dataToInput = year + '-' + month + '-' + day;
    input.value = dataToInput;
  }

  function setTimeToInput(date, input) {
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    hour = checkZero(hour);
    minute = checkZero(minute);
    second = checkZero(second);
    var dataToInput = hour + ':' + minute + ':' + second;
    input.value = dataToInput;
  }

  function checkTimeInput(){
    var sitv = secondInputTime.value;
    if(sitv == ''){
      sitv = '00:00:00'
    }else if(sitv.toString().length < 8){
      sitv = sitv + ':00'
    }
    return sitv;
  }

  function getEventDate() {
    var year, month, day, ed;
    var sidv = secondInputDate.value;
    var sitv = checkTimeInput();

    if(sidv !== "" && sitv !== "") {
      sidv = sidv.split('-');
      sitv = sitv.split(':');
      ed = new Date(sidv[0],(sidv[1]-1),sidv[2],sitv[0],sitv[1],sitv[2]);
      return ed;
    }else if(sidv !== "" && sitv == "") {
      sidv = sidv.split('-');
      ed = new Date(sidv[0],sidv[1],sidv[2]);
      return ed;
    }else if(sidv == "" && sitv !== "") {
      sitv = sitv.split(':');
      ed = new Date();
      ed.setHours(sitv[0]);
      ed.setMinutes(sitv[1]);
      ed.setSeconds(sitv[2])
      return ed;
    }else if(sidv == "" && sitv == "") {
      return false;
    }
  }
  function checkMinus(val){
    if(val < 0) val = Math.abs(val)
    return val
  }
  function getTimeFromDiff(fd, sd) {
    var sec, min, hour, day, value;
    var res = fd - sd;

    if(res > 0){
      value = '';
      sec = Math.floor(res/1000);
      min = Math.floor(sec/60);
      hour = Math.floor(min/60);
      day = Math.floor(hour/24);
    }else{
      value = '-';
      sec = Math.ceil(res/1000);
      min = Math.ceil(sec/60);
      hour = Math.ceil(min/60);
      day = Math.ceil(hour/24);
    }

    hour = hour % 24;
    min = min % 60;
    sec = sec % 60;

    if(value == '-'){
      day = checkMinus(day);
      hour = checkMinus(hour);
      min = checkMinus(min);
      sec = checkMinus(sec);
    }

    day = checkZero(day);
    hour = checkZero(hour);
    min = checkZero(min);
    sec = checkZero(sec);
    
    var result = value + day + ':' + hour + ':' + min + ':' + sec;
    
    return result;
  }
  function startCountdown() {
    setInterval(function() {
      var currentDate = getCurrentDate();
      var eventDate = getEventDate();
      var remTime = getTimeFromDiff(eventDate, currentDate);
      result.textContent = remTime;

    },1000)
  }

  setDateToInput(new Date(),firstInputDate);
  setTimeToInput(new Date(),firstInputTime);
  setInterval(()=>{setTimeToInput(new Date(),firstInputTime)},1000)
  // startCountdown();

  secondInputDate.addEventListener('change', startCountdown);
  secondInputTime.addEventListener('change', startCountdown);
  
});
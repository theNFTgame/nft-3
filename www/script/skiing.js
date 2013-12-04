(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if(!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      },
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
  };
  if(!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
  };
}());

  var requestAnimationFrame = window.requestAnimationFrame || 
                              window.mozRequestAnimationFrame || 
                              window.webkitRequestAnimationFrame || 
                              window.msRequestAnimationFrame;
  // hopefully get a valid cancelAnimationFrame function!                     
  var cancelRAF = window.cancelAnimationFrame || 
                  window.mozCancelAnimationFrame || 
                  window.webkitCancelAnimationFrame || 
                  window.msCancelAnimationFrame;
    // var ctx =  document.getElementById('myCanvas').getContext('2d');
    var fntA = new Object();
    fntA.image1 = new Image();
    fntA.image1.src = 'img/maps/p01.png';
//ctx.strokeText("Hello World",10,50);
//ctx.drawImage(fntA.image0,10,10,320,540);
console.log(fntA);
    // ctx.drawImage(fntA.image0,10,10);
    // ctx.drawImage(fntA.image1,10,10);
    var initialX = null;
    var initialY = null;
    var ball = document.getElementById('ball');
    function handleOrientationEvent(event) {
        var x = event.beta ? event.beta : event.y * 90;
        var y = event.gamma ? event.gamma : event.x * 90;
        //window.console && console.info('Raw position: x, y: ', x, y);
        if (!initialX && !initialY) {
            initialX = x;
            initialY = y;
        } else {
            var positionX = initialX - x;
            var positionY = initialY - y;
            ball.style.top = (90 + positionX * 5) + 'px';
            ball.style.left = (90 + positionY * 5) + 'px';
            ctx.clearRect(0,0,320,540); 
            // ctx.drawImage(fntA.image0,0,0,320,503);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            // ctx.rotate(0.2);
            ctx.drawImage(fntA.image1,90 + positionY ,190 + positionX*(0.5) ,127,232);
        }
    }
    function isEventFired() {
        if (!initialX && !initialY) {
            var warningElement = document.getElementById('warning');
            warningElement.innerText = 'Warning: Cannot receive device orientation events, this browser is not supported.';
            warningElement.style.display = 'inline-block';
        }
    }
    // Webkit en Mozilla variant beide registreren.
    window.addEventListener("MozOrientation", handleOrientationEvent, true);
    window.addEventListener("deviceorientation", handleOrientationEvent, true);
    setTimeout(isEventFired, 2000);

$(document).ready(function(){



  function fntSkiing(){
    fntA.mapFrame = 1;
    var $map =  $('#mapCanvas');
    function animate() {
      // update
      var srcUrl;
      fntA.map = new Image();
      if(fntA.mapFrame<=9){
        srcUrl = 'img/maps/a0'+ fntA.mapFrame +'.png';
      }else if (fntA.mapFrame>10){
        srcUrl = 'img/maps/a'+ fntA.mapFrame +'.png';
      }
      console.log('fntA.mapFrame:' + fntA.mapFrame);
      // in ms


      // clear
      // context.clearRect(0, 0, canvas.width, canvas.height);

      // draw
      // context.drawImage(fntA.map,0,0,320,503);
      $map.css('background-image', 'url('+srcUrl+')');
      fntA.requestId = window.requestAnimationFrame(animate);
      fntA.mapFrame = fntA.mapFrame + 1;
      if(fntA.mapFrame>18){
        fntA.mapFrame = 1;
      }
    }


    animate();
  }

  fntSkiing();
});

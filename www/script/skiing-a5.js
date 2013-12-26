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

  // var requestAnimationFrame = window.requestAnimationFrame || 
  //                           window.mozRequestAnimationFrame || 
  //                           window.webkitRequestAnimationFrame || 
  //                           window.msRequestAnimationFrame;
  // // hopefully get a valid cancelAnimationFrame function!                     
  // var cancelRAF = window.cancelAnimationFrame || 
  //               window.mozCancelAnimationFrame || 
  //               window.webkitCancelAnimationFrame || 
  //               window.msCancelAnimationFrame;

$(document).ready(function(){

  var fntA = new Object();
  var totalFrames = 18;
  fntA.record = 0;
  fntA.tiltRecord = 1;

  fntA.image1 = new Image();
  fntA.image1.src = 'img/maps/p01.png';
  //ctx.strokeText("Hello World",10,50);
  //ctx.drawImage(fntA.image0,10,10,320,540);
  console.log(fntA);
  // ctx.drawImage(fntA.image0,10,10);
  // ctx.drawImage(fntA.image1,10,10);
  var initialX = null;
  var initialY = null;
  var $player =  $('#myCanvas');

  function fRandomBy(under, over){
    switch(arguments.length){
      case 1: return parseInt(Math.random()*under+1);
      case 2: return parseInt(Math.random()*(over-under+1) + under);
      default: return 0;
    }
  }

  skiingGame = function() {

    var map    = $('#mapCanvas'),
        player = $('#myCanvas'),
        left   = $('.left'),
        right  = $('.right'),
        count  = 0;

    var log = function(msg, separate) {
      count = count + (separate ? 1 : 0);
      output.value = count + ": " + msg + "\n" + (separate ? "\n" : "") + output.value;
      demo.className = fsm.current;
      // panic.disabled = fsm.cannot('panic');
      // warn.disabled  = fsm.cannot('warn');
      // calm.disabled  = fsm.cannot('calm');
      // clear.disabled = fsm.cannot('clear');
    };


    var fsm = StateMachine.create({
      // balance, tiltLeft, tiltRight, fall, start
      intial:'start',

      events: [
        { name: 'start', from: 'none',   to: 'start'  },
        { name: 'join', from: 'start',     to: 'balance'  },
        { name: 'tiltL', from: 'balance',   to: 'tiltLeft' },
        { name: 'tiltR', from: 'balance',   to: 'tiltRight'},
        { name: 'backL', from: 'tiltLeft',  to: 'balance'  },
        { name: 'backR', from: 'tiltRight', to: 'balance'  },
        { name: 'down', from: 'tiltLeft',  to: 'fall'     },
        { name: 'down', from: 'tiltRight', to: 'fall'     },
        { name: 'open', from: 'fall',      to: 'start'    },
      ],

      callbacks: {
        onbeforestart: function(event, from, to) { log("STARTING UP"); },
        onstart:       function(event, from, to) { log("READY");       },

        onleavered:    function(event, from, to) { 
                          log("LEAVE   STATE: red");    
                          async(to); 
                          return false; 
                        },
        onbalance: function(event, from, to){
          var tempy = 0;
            $player.css('-webkit-transform', 'rotateZ('+tempy+'deg)');
            $player.css('-ms-transform', 'rotateZ('+tempy+'deg)');
            $player.css('transform', 'rotateZ('+tempy+'deg)');
        },
        onchangestate: function(event, from, to) { log("CHANGED STATE: " + from + " to " + to); },
        ondown: function(event, from, to){
          log("ENTER   STATE: down");
          stopAnimationClimer();
        }
      }
    });

    var async = function(to) {
      pending(to, 3);
      setTimeout(function() {
        pending(to, 2);
        setTimeout(function() {
          pending(to, 1);
          setTimeout(function() {
            fsm.transition(); // trigger deferred state transition
          }, 1000);
        }, 1000);
      }, 1000);
    };

    var pending = function(to, n) { log("PENDING STATE: " + to + " in ..." + n); };
    fsm.start();
    return fsm;
  }();

    function fntSkiing(){
      fntA.mapFrame = 1;
      var $map =  $('#mapCanvas');
      function animate() {
        // update
        // fntA.record = fntA.record + 1;
        // fntA.tiltRecord = fntA.tiltRecord + 1;
        // var srcUrl;
        // // fntA.map = new Image();
        // srcUrl = 'img/maps/a'+ Math.round(fntA.mapFrame) +'.png';
        // // console.log('image:' + srcUrl + 'map:' + fntA.mapFrame);
        // // in ms
        // // clear
        // // context.clearRect(0, 0, canvas.width, canvas.height);
        // // draw
        // // context.drawImage(fntA.map,0,0,320,503);
        // $map.css('background-image', 'url('+srcUrl+')');
        // fntA.requestId = window.requestAnimationFrame(animate);
        // fntA.mapFrame = fntA.mapFrame + 0.8;
        // if(fntA.mapFrame>18){
        //   fntA.mapFrame = 1;
        // }
              // update
        fntA.record = fntA.record + 1;
        fntA.tiltRecord = fntA.tiltRecord + 1;

        fntA.positionX = fntA.pX;
        fntA.positionY = fntA.pY;
        // var srcUrl;
        // fntA.map = new Image();
        // srcUrl = 'img/maps/a'+ Math.round(fntA.mapFrame) +'.png';
        // console.log('image:' + srcUrl + 'map:' + fntA.mapFrame);
        // in ms
        // clear
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // draw
        // context.drawImage(fntA.map,0,0,320,503);
        // $map.css('background-image', 'url('+srcUrl+')');

        $map.css('background-position', '-' + (Math.round(fntA.mapFrame ) - 1)*320 +'px 0px');

        fntA.requestId = window.requestAnimationFrame(animate);
        fntA.mapFrame = fntA.mapFrame + 1;
        if(fntA.mapFrame>18){
          fntA.mapFrame = 1;
        }
        // console.log(fntA.tiltRecord);
        if (fntA.tiltRecord == fRandomBy(120,150) || fntA.tiltRecord > 144 ){
          fntA.tiltRecord = 0;
          console.log('Try tilt!' + fntA.record + ',current:' + skiingGame.current );
          if (skiingGame.current === 'balance'){
            if (fRandomBy(0,40) > 20){
              skiingGame.tiltL();
            }else{
              skiingGame.tiltR();
            }
          }else{
            skiingGame.down();
          }
        }
        if (skiingGame.current === 'tiltLeft'){
          var tempy = fntA.tiltRecord/3;
            $player.css('-webkit-transform', 'rotateZ(-'+tempy+'deg)');
            $player.css('-ms-transform', 'rotateZ(-'+tempy+'deg)');
            $player.css('transform', 'rotateZ(-'+tempy+'deg)');
        }
        if (skiingGame.current === 'tiltRight'){
            var tempy = fntA.tiltRecord/3;
            $player.css('-webkit-transform', 'rotateZ('+tempy+'deg)');
            $player.css('-ms-transform', 'rotateZ('+tempy+'deg)');
            $player.css('transform', 'rotateZ('+tempy+'deg)');
        }
      }
      animate();
      skiingGame.join();
    }
    function stopAnimationClimer(e) {
      // use the requestID to cancel the requestAnimationFrame call
      window.cancelAnimationFrame(fntA.requestId);
    }

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
            // ball.style.top = (90 + positionX * 5) + 'px';
            // ball.style.left = (90 + positionY * 5) + 'px';
            //-webkit-transform:rotate(10deg);
            // var tempy = positionY/2
            $player.css('top',160+positionX*(0.5) + 'px');
            if(positionY > 20 && fntA.tiltRecord > 20){
              skiingGame.backR();
            }
            if(positionY < -20  && fntA.tiltRecord > 20){
              skiingGame.backL();
            }
            if (skiingGame.current === 'balance'){
              var tempy = positionY/5;
              $player.css('-webkit-transform', 'rotateZ('+tempy+'deg)');
              $player.css('-ms-transform', 'rotateZ('+tempy+'deg)');
              $player.css('transform', 'rotateZ('+tempy+'deg)');
            }
            
            // ctx.clearRect(0,0,320,540); 
            // ctx.drawImage(fntA.image0,0,0,320,503);
            // ctx.setTransform(1, 0, 0, 1, 0, 0);
            // ctx.rotate(0.2);
            // ctx.drawImage(fntA.image1,90 + positionY ,190 + positionX*(0.5) ,127,232);
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

    $(".stop").on("click", function(){
      stopAnimationClimer();
    });
    $(".left").on("click", function(){
      skiingGame.backR();
    });
    $(".right").on("click", function(){
      skiingGame.backL();
    });

    fntSkiing();

});

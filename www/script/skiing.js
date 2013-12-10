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
      var $player =  $('#myCanvas');
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
            //-webkit-transform:rotate(10deg);
            $player.css('-webkit-transform', 'rotate('+positionY/2+'deg)');
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

Demo = function() {

  var map    = $('#mapCanvas'),
      player = $('#myCanvas'),
      left   = $('.left'),
      right  = $('.right'),
      count  = 0;

  var log = function(msg, separate) {
    count = count + (separate ? 1 : 0);
    output.value = count + ": " + msg + "\n" + (separate ? "\n" : "") + output.value;
    demo.className = fsm.current;
    panic.disabled = fsm.cannot('panic');
    warn.disabled  = fsm.cannot('warn');
    calm.disabled  = fsm.cannot('calm');
    clear.disabled = fsm.cannot('clear');
  };

  var fsm = StateMachine.create({

    events: [
      { name: 'start', from: 'none',   to: 'green'  },
      { name: 'warn',  from: 'green',  to: 'yellow' },
      { name: 'panic', from: 'green',  to: 'red'    },
      { name: 'panic', from: 'yellow', to: 'red'    },
      { name: 'calm',  from: 'red',    to: 'yellow' },
      { name: 'clear', from: 'red',    to: 'green'  },
      { name: 'clear', from: 'yellow', to: 'green'  },
    ],

    callbacks: {
      onbeforestart: function(event, from, to) { log("STARTING UP"); },
      onstart:       function(event, from, to) { log("READY");       },

      onbeforewarn:  function(event, from, to) { log("START   EVENT: warn!",  true);  },
      onbeforepanic: function(event, from, to) { log("START   EVENT: panic!", true);  },
      onbeforecalm:  function(event, from, to) { log("START   EVENT: calm!",  true);  },
      onbeforeclear: function(event, from, to) { log("START   EVENT: clear!", true);  },

      onwarn:        function(event, from, to) { log("FINISH  EVENT: warn!");         },
      onpanic:       function(event, from, to) { log("FINISH  EVENT: panic!");        },
      oncalm:        function(event, from, to) { log("FINISH  EVENT: calm!");         },
      onclear:       function(event, from, to) { log("FINISH  EVENT: clear!");        },

      onleavegreen:  function(event, from, to) { log("LEAVE   STATE: green");  },
      onleaveyellow: function(event, from, to) { log("LEAVE   STATE: yellow"); },
      onleavered:    function(event, from, to) { 
                        log("LEAVE   STATE: red");    
                        async(to); return false; 
                      },

      ongreen:       function(event, from, to) { log("ENTER   STATE: green");  },
      onyellow:      function(event, from, to) { log("ENTER   STATE: yellow"); },
      onred:         function(event, from, to) { log("ENTER   STATE: red");    },

      onchangestate: function(event, from, to) { log("CHANGED STATE: " + from + " to " + to); }
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
      }else if (fntA.mapFrame>=10){
        srcUrl = 'img/maps/a'+ fntA.mapFrame +'.png';
      }
      // console.log('image:' + srcUrl);
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
function stopAnimationClimer(e) {
        // use the requestID to cancel the requestAnimationFrame call
        cancelRAF(fntA.requestId);
    }

$(".stop").on("click", function(){
        stopAnimationClimer();
        $("body").append('<p>' + fntA.x);
      });

  fntSkiing();
});



var fntA = new Object();

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
  function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  }
   
  function addClass(ele,cls) {
    if (!this.hasClass(ele,cls)) ele.className += " "+cls;
  }
   
  function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      ele.className=ele.className.replace(reg,' ');
    }
  }

  function showFrame(framename) {
    if(!framename){ framename = 'homepage'}
      $('.frame').hide();
    //if(framename !=='homepage' ){ };
    $('.' + framename ).show();
    setTimeout(function(){window.scrollTo(0, 0);}, 0);
  }
  function showSubFrame(framename,subframename) {
    if(!framename && !subframename) {return false;};
    showFrame(framename);
    $('.' + framename + ' .subframe').hide();
    $('.' + framename + ' .' + subframename).show();
  }
  function showMask(framename) {
    if(!framename){ $('.maskbox').hide();}
      $('.maskbox').hide();
    //if(framename !=='homepage' ){ };
    $('.' + framename ).show();
  }
  function showSubMask(framename,subframename) {
    if(!subframename) {
      $('.' + framename + ' .submask').hide();
      $('.maskbox').hide();
    }else{
      showMask(framename);
      $('.' + framename + ' .submask').hide();
      $('.' + framename + ' .' + subframename).show();
    }
  }

$(document).ready(function(){

  // var $player =  $('#myCanvas');
  // var $map =  $('#mapCanvas');
  var $map = document.querySelector("#mapCanvas");
  var $player = document.querySelector("#myCanvas");
  var $infobox = document.querySelector("div.skiingnote span");

  var flatStyle = $player.style,
    _transform = "WebkitTransform" in flatStyle ? "WebkitTransform" :
        "MozTransform" in flatStyle ? "MozTransform" :
            "msTransform" in flatStyle ? "msTransform" : false;

  fntA.record = 0;
  fntA.tiltRecord = 1;
  fntA.mapFrame = 1;
  fntA.Trend = '';
  fntA.rotate = 0;
  fntA.positionX = 0;
  fntA.positionY = 0;
  fntA.pX = 0;
  fntA.pY = 0;



  // create GUID 
  function G() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  function NewGuid() {
    return (G()+G());
  }
  fntA.key = NewGuid();
  console.log(fntA.key)
  function stopAnimationClimer(e) {
    // use the requestID to cancel the requestAnimationFrame call
    window.cancelAnimationFrame(fntA.requestId);
  }



  function fRandomBy(under, over){ 
    switch(arguments.length){ 
      case 1: return parseInt(Math.random()*under+1); 
      case 2: return parseInt(Math.random()*(over-under+1) + under);  
      default: return 0; 
    } 
  }

  var AppRouter = Backbone.Router.extend({  
    routes : {  
      '' : 'levelfun', 
      'index' : 'levelfun', 
      'intro' : 'levelfun',
      'replay' : 'replayfun',
      'energy' : 'energyfun',
      'run':'runfun',
      'coupon':'couponfun',
      'nocoupon':'nocouponfun',
      'more':'morefun',
      '*error' : 'levelfun'  
    },
    mainfun : function() {

    }, 
    couponfun : function(){
      $('.mask').hide();
      $('.maskbg').show();
      $('.couponbox').show();
      $('.nocouponbox').hide();
      router.navigate('');
    },
    nocouponfun : function() {
      $('.mask').hide();
      $('.maskbg').show();
      $('.couponbox').hide();
      $('.nocouponbox').show();
      router.navigate('');
    },
    morefun : function(){
      $('.mask').hide();
      $('.maskbg').hide();
      router.navigate('');
    },
    levelfun : function() {
    	//alert("111");
    	console.log('levelfun');

    	showSubFrame('homepage','levelbox');
      $('.energybox').removeClass('energybox_on');
      $('.logo').show();
      $('.mask').hide();
      $('.maskbg').hide();
      $('.couponbox').hide();
      $('.nocouponbox').hide();
    }, 
    energyfun : function() {
      //alert("111");
      console.log('energyfun');
      showFrame('energybox');
      router.navigate('');
    }, 
    repowerfun : function() {
      router.navigate('index');
      window.location.reload();
    }, 
    replayfun : function() {
      router.navigate('');
      
      fntA.gameFinish = false;
      fntA.skiingOn = false;
      fntA.gameLevel = 1;
      fntA.player = new Image();
      fntA.gameResult = 'replay';
      fntA.skiingAniMove = fntA.skiingAniStep;
      fntA.rotate = 0;
      fntA.record = 0;
      fntA.tiltRecord = 0;
      window.location.reload();
    },
    shakefun : function (level){
    	console.log('lelve:'+ level);
      fntA.gameLevel = level;
      console.log('fntA.gameLevel:'+ fntA.gameLevel);
      $('.introbox .txt1').removeClass('txt1_l1 txt1_l2 txt1_l3').addClass('txt1_l'+fntA.gameLevel);
      $('.energybox').addClass('energybox_on');
      fntA.shakerecord = 0;
      showSubFrame('energybox','introbox');
      loadPower(fntA.gameLevel*10);
      fntRun();
    },
    runfun : function (){
    	showFrame('runbox');
      skiingGame = function() {

        var map    = $('#mapCanvas'),
            player = $('#myCanvas'),
            left   = $('.left'),
            right  = $('.right'),
            count  = 0;

        var log = function(msg, separate) {
          count = count + (separate ? 1 : 0);
          // output.value = count + ": " + msg + "\n" + (separate ? "\n" : "") + output.value;
          // demo.className = fsm.current;

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
            { name: 'replay', from: 'fall',      to: 'start'    },
            { name: 'replay', from: 'tiltLeft',      to: 'start'    },
            { name: 'replay', from: 'tiltLeft',      to: 'start'    }
          ],

          callbacks: {
            onbeforestart: function(event, from, to) { log("STARTING UP"); },
            onstart:       function(event, from, to) { 
              log("READY");
              // fntA.gameOn = false;  
              $('.skiingnote span').html(0);     
            },

            onleavered:    function(event, from, to) { 
                              log("LEAVE   STATE: red");    
                              async(to); 
                              return false; 
                            },
            onbalance: function(event, from, to){
              // var tempy = 0;
              //   $player.css('-webkit-transform', 'rotateZ('+tempy+'deg)');
              //   $player.css('-ms-transform', 'rotateZ('+tempy+'deg)');
              //   $player.css('transform', 'rotateZ('+tempy+'deg)');
            },
            //fntA.Trend
            onbeforetiltL: function(event, from, to) { fntA.Trend = 'left'; },
            onbeforetiltR: function(event, from, to) { fntA.Trend = 'right'; },
            onbackL: function(event, from, to){

            },
            onbackR: function(event, from, to){

            },
            onchangestate: function(event, from, to) { log("CHANGED STATE: " + from + " to " + to); },
            onbeforereplay: function(event, from, to) { 
              fntA.Trend = '';
              $player.removeClass();
              // fntA.rotate = 0;
              // $player.css('-webkit-transform', 'rotateZ('+fntA.rotate+'deg)');
              // $player.css('-ms-transform', 'rotateZ('+fntA.rotate+'deg)');
              // $player.css('transform', 'rotateZ('+fntA.rotate+'deg)'); 
              $('.skiingnote span').html(0);
              fntA.rotate = 0;
            },
            ondown: function(event, from, to){
              log("ENTER   STATE: down");
              fntA.gameOn = false;
              stopAnimationClimer();

              console.log(fntA.rotate);
              if( fntA.rotate < 0 ){
                // $player.removeClass().addClass('left');
                removeClass($player, "left");
                removeClass($player, "right");
                addClass($player,'left');
              } else{
                // $player.removeClass().addClass('right');
                removeClass($player, "left");
                removeClass($player, "right");
                addClass($player,'right');
              }
              fntA.rotate = 0;
              // fntA.record = 0;
              fntA.tiltRecord = 0;
              // $player.css('-webkit-transform', 'rotateZ('+fntA.rotate+'deg)');
              // $player.css('-ms-transform', 'rotateZ('+fntA.rotate+'deg)');
              // $player.css('transform', 'rotateZ('+fntA.rotate+'deg)'); 

              flatStyle[_transform] = "rotateZ(" + ( fntA.rotate ) + "deg) ";

              fntA.gameResult = 'lost';
              // stopAnimationClimer();
              postGameRecordSingle(fntA.playerId,fntA.playerName,fntA.record*8,fntA.gameResult);

              setTimeout(function() {
                showSubMask('gamemask','loading');
                //id,name,record,result
                console.log('post records.');
                // cancelRAF(fntA.requestId);
                
                postGameRewardSingle(fntA.gameResult);
                $('.recordbox').show();
                $('.maskbg').show();
                $('.logo').hide();
                $('.recordbox .mi').html(fntA.record*8);
                // var newPx = new Number(Number(fntA.record*8)/10010);
                // newPx = newPx.toFixed(2)*100;
                // newPx = Math.floor(Math.max(5,Math.min(newPx,99)));
                var newPx = Math.log(fntA.record*7)*10;
                newPx = newPx.toFixed(2);
                newPx = Math.floor(Math.max(5,Math.min(newPx,99)));
                $('.recordbox .px').html(newPx + '%');
              }, 600);

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
      console.log(fntA.gameOn);
      skiingGame.join();
      
      router.navigate('');
      if(!fntA.gameOn){
        fntA.gameOn = true;
        console.log(fntA.gameOn);
        fntskiing();
      }
      

    	
    },
     
    renderError : function(error) {  
      console.log('URL错误, 错误信息: ' + error); 
      router.navigate('');
        //$('.link_home').show(); 
      }  
    });  

  var router = new AppRouter();  
  Backbone.history.start(); 





  function G() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  function postGameRecordSingle(record){ 
    /*
    请先调用 game/save, 注意传入的game_type为1（单机游戏）和score，没有game_result。其它参数和双屏游戏相同。
    然后在刮奖时调用  game/reward获得优惠券号码。

    返回

    失败：
     {"result":"failed","message":"no game data found"}
    成功：
     {"result":"success","message":"","game_id":54,"user_id":"124578","user_name":"cgzhang2003","coupon_id":123,"coupon_code":xxx,"coupon_discount":null,"coupon_description":null}
    ​
    如果没有获奖则coupon_code为空。
    */
    var postData = 'game_type=1&gamename=game3&score='+fntA.record ;
    var tempIp = 'http://www.quyeba.com/event/explorerchallenge/';
    
    var shareWord = 'http://service.weibo.com/share/share.php?title=';
      shareWord = shareWord + '%e6%88%91%e5%9c%a8%40TheNorthFace+%23%e6%8e%a2%e7%b4%a2%e6%8c%91%e6%88%98%23+%e3%80%8a%e7%96%af%e7%8b%82%e6%bb%91%e9%9b%aa%e3%80%8b%e4%b8%ad%e5%ae%8c%e6%88%90%e4%ba%86';
      shareWord = shareWord + fntA.record*8 ;
      shareWord = shareWord + '%e7%b1%b3%e4%b8%8d%e5%80%92%e7%9a%84%e9%a9%b0%e9%aa%8b%e8%b7%9d%e7%a6%bb%ef%bc%8c%e5%a6%82%e6%9e%9c%e4%bd%a0%e6%83%b3%e8%b6%85%e8%bf%87%e6%88%91%ef%bc%8c%e8%af%b7%e6%89%ab%e6%8f%8f%e4%ba%8c%e7%bb%b4%e7%a0%81%ef%bc%8c%e5%bc%80%e5%90%af%e6%b8%b8%e6%88%8f%e4%b8%8e%e6%88%91%e4%b8%80%e8%be%83%e9%ab%98%e4%b8%8b%ef%bc%81%e5%ae%8c%e6%88%90+%23%e6%96%b0%e6%8e%a2%e7%b4%a2%e5%ae%a2%23+%e6%8c%91%e6%88%98%ef%bc%8c%e6%9b%b4%e6%9c%89%e6%b5%b7%e9%87%8f%e6%8e%a2%e7%b4%a2%e8%a3%85%e5%a4%87%e7%ad%89%e4%bd%a0%e8%b5%a2%ef%bc%81%ef%bc%88%e6%b8%b8%e6%88%8f%e5%bc%80%e5%90%af%e6%96%b9%e6%b3%95%e8%a7%81%e5%9b%be%ef%bc%89';
      shareWord = shareWord + '&url=http%3a%2f%2fwww.quyeba.com%2fevent%2fexplorerchallenge3%2fsingle.html&source=bookmark&appkey=&ralateUid=&pic=http%3a%2f%2fwww.quyeba.com%2fevent%2fexplorerchallenge3%2fimg%2fshearsingle.jpg';

    console.log(postData);
    $('.getmore').attr('href', shareWord);


    $.ajax({type:'POST',url: tempIp +'game/save',data:postData,
      success:function(json){
          console.log(json);
        //var jsdata = eval('('+json+')');  
        var jsdata = json;
          console.log('status='+ jsdata.result);
        if(jsdata.result==='success'){
          if (jsdata.game_id != null){
            fntA.game_id = jsdata.game_id;
          }
        }

        //console.log('mid='+ jsdata.data.mid );
      },
      error: function(xhr, type){
        
      }
    });
  }
  //game/reward
  function postGameRewardSingle(record){ 
    if (fntA.record > 1000){
      var postData = 'game_type=1&gamename=game3&score='+fntA.record + '&game_id=' + fntA.game_id;
      var tempIp = 'http://www.quyeba.com/event/explorerchallenge/';
      console.log(postData);

      $.ajax({type:'POST',url: tempIp +'game/reward',data:postData,
        success:function(json){
            console.log(json);
          //var jsdata = eval('('+json+')');  
          var jsdata = json;
            console.log('status='+ jsdata.result);
          if(jsdata.result==='success'){
            if (jsdata.coupon_code !== ''){
              $('.getcoupon').attr('href', '#/coupon');
              $('.couponbox .cp').html(jsdata.coupon_code);
            }else{
              $('.getcoupon').attr('href', '#/nocoupon');
            } 
          }else{
            $('.getcoupon').attr('href', '#/nocoupon');
          }

          //console.log('mid='+ jsdata.data.mid );
        },
        error: function(xhr, type){
          $('.getcoupon').attr('href', '#/nocoupon');
        }
      });
    }else{
      $('.getcoupon').attr('href', '#/nocoupon');
    }
    
  }




  function doUpdateTime(num) {
    //document.getElementById('ShowDiv').innerHTML = '' + num + '秒';
    //alert(num);
    var opacity = ((fntA.gameLevel*10 - num + 0.1) / fntA.gameLevel*10)/100  ;
    //console.log('fntA.gameLevel:'+ fntA.gameLevel + ',opacity:' + opacity);
    $('.redbg').css('opacity',opacity);
    $('.debuginfo').html( num + '秒,power:' + fntA.shakerecord );
    $('.powerbox .countdown').html( num );
    
    if (num == 0) {
      console.log("shake remove!");
      $('.debuginfo').html('<a class="navlink linkrun" href="#/run">Run with power:'+ fntA.shakerecord +'</a>');
      window.removeEventListener('shake', shakeEventDidOccur, false);
      showSubFrame('energybox','readybox');
    }
  }

  //skiing game


  function fntskiing(){
    

    var totalFrames = 18;

    //ctx.strokeText("Hello World",10,50);
    //ctx.drawImage(fntA.image0,10,10,320,540);
    console.log(fntA);
    // ctx.drawImage(fntA.image0,10,10);
    // ctx.drawImage(fntA.image1,10,10);
    var initialX = null;
    var initialY = null;


    // var canvas = document.getElementById('myCanvas');
    // var context = canvas.getContext('2d');
    // var mapcanvas =  document.getElementById('mapCanvas');
    // var ctx0 = mapcanvas.getContext('2d');


    function countdownNewTime(secs) {
      //countdown
      secs = Number(secs);
      for (var i = secs; i >= 0; i--) {
        (function(index) {
          setTimeout(function(){
          doUpdateTime(index);
        }, (secs - index) * 1000);
      })(i);
      }
    }
    function doUpdateTime(num) {
      //console.log('now countdown number is :' + num);
      if(num == 9 || num == 8){
        showSubMask('gamemask','howplay');
        $('.gamemask .countdown').html('');
      }
      if(num == 6 || num == 7 || num == 5 ){
        showSubMask('gamemask','connection');
      }
      if(num == 4 || num == 3 || num == 2 ){
        showSubMask('gamemask','countdown');
        $('.gamemask .countdown').html('<span class="'+ (num-1) + '">' + (num-1) + '</span>');
      }
      if(num === 1) {
        showSubMask('gamemask','countdown');
        $('.gamemask .countdown').html('<div class="pao"></div>');
      }
      if(num === 0) {
        // showSubMask('gamemask','connection');
        // if(!fntA.startime){
          showSubMask('gamemask');
          $('.gamemask .countdown').html();
          //clearTimeout();
          animate();
          skiingGame.join();
          fntA.skiingOn = true;
        // }
      }
    }


    function handleOrientationEvent(event) {
      var x = event.beta ? event.beta : event.y * 90;
      var y = event.gamma ? event.gamma : event.x * 90;
      
      if (!initialX && !initialY) {
        initialX = x;
        initialY = y;
      } else {
        var positionX = initialX - x;
        var positionY = initialY - y;
        fntA.pX = positionX;
        fntA.pY = positionY;
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


    function animate() {
      // update
      // if(!fntA.rotate){fntA.rotate = 0}
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

      // $map.css('background-position', '-' + (Math.round(fntA.mapFrame ) - 1)*320 +'px 0px');


      fntA.requestId = window.requestAnimationFrame(animate);
      fntA.mapFrame = fntA.mapFrame + 1;
      if(fntA.mapFrame>18){
        fntA.mapFrame = 1;
      }
      
      // console.log(fntA.tiltRecord);

      if (skiingGame.current === 'tiltLeft'){
        // var tempy = fntA.tiltRecord/(58 - fntA.record/500);
        // fntA.rotate = fntA.rotate - tempy - fntA.positionY/(10 - fntA.record/1000);
        var tempy = fntA.tiltRecord/(48 + Math.abs(fntA.rotate)/3 );
        fntA.rotate = fntA.rotate + tempy - fntA.positionY/(10 - fntA.record/1000);
          // $player.css('-webkit-transform', 'rotateZ('+fntA.rotate+'deg)');
          // $player.css('-ms-transform', 'rotateZ('+fntA.rotate+'deg)');
          // $player.css('transform', 'rotateZ('+fntA.rotate+'deg)');

          if(fntA.positionY < -10  && fntA.tiltRecord > 10 && Math.abs(fntA.rotate) < 10 ){
            skiingGame.backL();
          }
          if (Math.abs(fntA.rotate)>70){
            skiingGame.down();
          }
          console.log('Try tilt!' + fntA.tiltRecord + ',current:' + skiingGame.current + ',fntA.rotate:' + fntA.rotate + ',fntA.positionY:' +fntA.positionY + '.fntA.positionX:' + fntA.positionY );
      }
      if (skiingGame.current === 'tiltRight'){
          // var tempy = fntA.tiltRecord/(58 - fntA.record/500);
          // fntA.rotate = fntA.rotate + tempy - fntA.positionY/(10 - fntA.record/1000);
          var tempy = fntA.tiltRecord/(48 + Math.abs(fntA.rotate)/3 );
          fntA.rotate = fntA.rotate + tempy - fntA.positionY/20;
          // $player.css('-webkit-transform', 'rotateZ('+fntA.rotate+'deg)');
          // $player.css('-ms-transform', 'rotateZ('+fntA.rotate+'deg)');
          // $player.css('transform', 'rotateZ('+fntA.rotate+'deg)');
          console.log('Try tilt!' + fntA.tiltRecord + ',current:' + skiingGame.current + ',fntA.rotate:' + fntA.rotate + ',fntA.positionY:' +fntA.positionY + '.fntA.positionX:' + fntA.positionY );
          if(fntA.positionY > 10 && fntA.tiltRecord > 10 && Math.abs(fntA.rotate) < 10 ){
            skiingGame.backR();
          }
          if (Math.abs(fntA.rotate)>70){
            skiingGame.down();
          }
      }
      if (skiingGame.current === 'balance'){
        fntA.rotate = fntA.rotate - (fntA.positionY/28);
        // $player.css('-webkit-transform', 'rotateZ('+fntA.rotate+'deg)');
        // $player.css('-ms-transform', 'rotateZ('+fntA.rotate+'deg)');
        // $player.css('transform', 'rotateZ('+fntA.rotate+'deg)'); 
      }
      if (fntA.tiltRecord == fRandomBy(80,150) || fntA.tiltRecord > 149 || Math.abs(fntA.rotate) > 20){
          
        // console.log('Try tilt!' + fntA.tiltRecord + ',current:' + skiingGame.current + ',fntA.rotate:' + fntA.rotate + ',fntA.positionY:' +fntA.positionY + '.fntA.positionX:' + fntA.positionY );
        if (skiingGame.current === 'balance'){
          fntA.tiltRecord = 0;
          if (fRandomBy(0,40) > 20){
            skiingGame.tiltL();
            
            // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
          }else{
            skiingGame.tiltR();
            
            // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
          }
        }else{
          if (fntA.tiltRecord >149){fntA.tiltRecord = 0;};
        }

      }

      if(skiingGame.current !== 'down'){
        $map.style.backgroundPosition = ( '-' + (Math.round(fntA.mapFrame ) - 1)*320 +'px 0px');
        // $('.skiingnote span').html(fntA.record*8 );
        $infobox.innerHTML = fntA.record*8;
        flatStyle[_transform] = "rotateZ(" + ( fntA.rotate ) + "deg) ";
      }
      if (Math.abs(fntA.rotate)>70){
        skiingGame.down();
      }

      // if(fntA.record * 8 > 9999){
        
      //   //game resort

      //   //  console.log("stop running at " + time + ", and allmoveA = " + fntA.allmoveA + ",fntA.alltimes= " +fntA.alltimes);
      //   stopAnimationClimer();
      //   showSubMask('gamemask','loading');
      //   fntA.gameResult = 'win';
      //   //id,name,record,result
      //   postGameRecordSingle(fntA.playerId,fntA.playerName,fntA.record*8,fntA.gameResult);
      //   setTimeout(function() {
      //     showSubMask('gamemask','loading'); 
      //     //id,name,record,result
      //     console.log('post records.')
      //     // cancelRAF(fntA.requestId);
          
      //     postGameRewardSingle(fntA.gameResult);
      //     $('.recordbox').show();
      //     $('.maskbg').show();
      //     $('.logo').hide();
      //     $('.recordbox .mi').html(fntA.record*8);
      //     var newPx = new Number(Number(fntA.record*8)/10010);
      //     newPx = newPx.toFixed(2)*100;
      //     newPx = Math.floor(Math.max(5,Math.min(newPx,99)));
      //     $('.recordbox .px').html(newPx + '%');
      //   }, 1000);
      //   fntA.gameFinish = true;
      // }
    }//animate


    //init

    // drawRectangle(myRectangle, context);
    // var startTime = (new Date()).getTime();
    // // animate(myRectangle, canvas, context, startTime);
    // function stopAnimation(e) {
    //     // use the requestID to cancel the requestAnimationFrame call
    //     cancelRAF(fntA.requestId);
    // }
    // function stopAnimationskiing(e) {
    //     // use the requestID to cancel the requestAnimationFrame call
    //     cancelRAF(fntA.skiingRequestId);
    // }
    // function pauseAnimation(e) {
    //     // use the requestID to cancel the requestAnimationFrame call
    //     animate();
    // }
    //debug;

    // $(".start").on("click", function(){
    //     $('.gamemask .countdown').html();
    //       //clearTimeout();

    //   });
    // $(".clean").on("click", function(){
    //     $("p").remove();
    //   });
    // $(".stop").on("click", function(){
    //     stopAnimation();
    //     $("body").append('<p>' + fntA.x);
    //   });
    // $(".pause").on("click", function(){
    //     pauseAnimation();
    //     $("body").append('<p>' + fntA.x);
    //   });
    // $(".connection").on("click", function(){
    //   // if(!fntA.startime){
    //     showSubMask('gamemask');
    //     $('.gamemask .countdown').html();
    //     clearTimeout();
    //     countdownskiingTime(6);
    //     animate();
    //     fntA.skiingOn = true;
    //   // }
    // });
          console.log(skiingGame.current);
          // animate();
          // // skiingGame.join();
          countdownNewTime(1);
          fntA.skiingOn = true;

  }//skiing game

  //main run


  //fntA.gameLevel = 1;
  fntA.gameOn = false ;


  //postRegiste
  $(".btn_register").on("click", function(){
    postRegister();
  });
  //login
  $(".btn_login").on("click", function(){
    postLogin();
  });
  $(".btn_login").on("click", function(){
    postLogin();
  });

});


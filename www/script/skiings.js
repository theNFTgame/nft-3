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

var fntA = new Object();
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
  // create GUID 
  function G() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  function NewGuid() {
    return (G()+G());
  }
  fntA.key = NewGuid();
  console.log(fntA.key)


$(document).ready(function(){

  
  var AppRouter = Backbone.Router.extend({  
    routes : {  
      '' : 'mainfunc', 
      'index' : 'mainfunc', 
      'reg' : 'regfunc',
      'run':'runfunc',
      'run/:action':'runfunc',
      '*error' : 'mainfunc'  
    },
    mainfunc : function() {
      //  console.log('mainfunc'); 
      var echoUid = $('.userinfo').attr('data-userid');
      var echoName = $('.userinfo').attr('data-username');
      var echoAvatar = $('.userinfo').attr('data-avatar');
      // console.log(echoUid + ',' + echoName);
      if(echoUid != null){
        fntA.playerId = echoUid;
        fntA.playername = echoName;
        fntA.playerAvatar = echoAvatar;
        // console.log(fntA);
        //router.navigate('run');
        $('.playerinfo .playername').html(fntA.playername);
        $('.playerinfo img').attr('src',fntA.playerAvatar);
        // console.log('fntA.playername:' + fntA.playername);
        showSubFrame('runbox','qrcodebox');
        // fntRun();
        if(!fntA.period){
          console.log('mainfunc call fntskiing');
          fntskiing();
        }
        
        $('.iframbox iframe').attr('src','');
        _smq.push(['pageview', '/qrcode', '扫描二维码']);
      }else{
        showSubFrame('homepage','loginbox');
        $('.errormsg').hide();
        $('.iframbox iframe').attr('src','http://www.quyeba.com/explorer/#_challenge');
        _smq.push(['pageview', '/login', '登陆']);
        //http://www.quyeba.com/explorer/#_challenge
      }
      // temp
      // showSubFrame('runbox','rundivbox');
    }, 
    regfunc : function() {
      //alert("111");
      //console.log('levelfunc'); 
      showSubFrame('homepage','registerbox');
      _smq.push(['pageview', '/reg', '注册']);
    }, 
    shakefunc : function (level){
      if(!level){ fntA.level = 1 };
      fntA.level = level;
      showFrame('energybox');
    },
    runfunc : function (action){
      // console.log('fntA.playerId=' + fntA.playerId);
      // if(!fntA.playerId){
      //   router.navigate('index');
      //   showFrame('homepage');
      //   showSubFrame('homepage','loginbox');
      //   $('.iframbox iframe').attr('src','http://www.quyeba.com/explorer/#_challenge');
      //   _smq.push(['pageview', '/login', '登陆']);
      // }else{
         // console.log(action);

        if(action == 'replay'){
          // router.navigate('run');
          console.log('replay call fntskiing');
          // fntA.gameOn = null;
          delete fntA.gameOn;
          fntA.gameFinish = false;
          fntA.skiingOn = false;
          fntA.gameLevel = 1;
          fntA.player = new Image();
          fntA.gameResult = 'replay';
          fntA.skiingAniMove = fntA.skiingAniStep;
          $('#myCanvas').css('background-position','0px 0px');
          fntA.player.src = 'img/player/g0.png';
          router.navigate('');
          _smq.push(['pageview', '/replay', '再战一次']);
        }
        $('#pagebody').removeClass('on');
        showSubFrame('runbox','qrcodebox');
        // fntRun();
        if(!fntA.period){
          console.log('#run call fntskiing');
          fntskiing();
        }
        $('.iframbox').html('');
        //$('.iframbox iframe').attr('src','');
        _smq.push(['pageview', '/run', '攀岩']);
      // }
    },
    renderError : function(error) {  
      //  console.log('URL错误, 错误信息: ' + error); 
      //$('.link_home').show(); 
    }  
  });  

  var router = new AppRouter();  
  Backbone.history.start(); 



  var requestAnimationFrame = window.requestAnimationFrame || 
                              window.mozRequestAnimationFrame || 
                              window.webkitRequestAnimationFrame || 
                              window.msRequestAnimationFrame;
                               
  // hopefully get a valid cancelAnimationFrame function!                     
  var cancelRAF = window.cancelAnimationFrame || 
                  window.mozCancelAnimationFrame || 
                  window.webkitCancelAnimationFrame || 
                  window.msCancelAnimationFrame;


  function fRandomBy(under, over){ 
    switch(arguments.length){ 
      case 1: return parseInt(Math.random()*under+1); 
      case 2: return parseInt(Math.random()*(over-under+1) + under);  
      default: return 0; 
    } 
  }

  function postGameRecord(id,name,record,result){ 
    var postData = 'game_type=0&gamename=game2&score='+record + '&user_id=' + id + '&user_name=' + name + '&result=' +result ;
    //  console.log(postData);
    var tempIp = 'http://www.quyeba.com/event/explorerchallenge/'
    $.ajax({type:'POST',url: tempIp +'game/save',data:postData,
      success:function(json){
        //  console.log(json);
        //var jsdata = eval('('+json+')');  
        var jsdata = json;
        //  console.log('status='+ jsdata.status);
        if(result==='win'){
          if (jsdata.point === "success"){
            showSubMask('gamemask','winwithpoint');
          }else{
            showSubMask('gamemask','winwithoutpoint');
          } 
        }else{
          showSubMask('gamemask','lost');
        }

        //console.log('mid='+ jsdata.data.mid );
      },
      error: function(xhr, type){
        showSubMask('gamemask','lost');
      }
    });
  }
  function postLogin(){
    //  console.log('post login');
    var userName  = $('#uname').val()
    ,   userPwd = $('#upwd').val()
    ,   postData;
    if (!userName || !userPwd){
      alert("请完整填写信息！")
      return false;
    }
    var reMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    //  console.log(userName.match(reMail));
    if(userName.match(reMail)){
      postData = 'email=' + userName + '&password=' + userPwd ;
    }else{
      postData = 'name=' + userName + '&password=' + userPwd ;
    }
    //  console.log(postData);
    var tempIp = 'http://www.quyeba.com/event/explorerchallenge/'
    $.ajax({type:'POST',url: tempIp +'user/login',data:postData,
      success:function(json){
        //  console.log(json);
        //var jsdata = eval('('+json+')');  
        var jsdata = json;
        if(jsdata.result ==='failed'){
          $('.loginbox .errormsg').show();
          return false;
        }
        //  console.log(jsdata);
        fntA.playername = jsdata.user_name;
        fntA.playerId = jsdata.user_id;
        fntA.playerAvatar = 'http://tnf-avatar.b0.upaiyun.com/'+jsdata.user_avatar;
        router.navigate('run');
        showSubFrame('runbox','qrcodebox');

        $('.playerinfoa .playername').html(fntA.playername);
        if(jsdata.user_avatar!==''){
          $('.playerinfoa img').attr('src',fntA.playerAvatar);
        }
        $('.loginbox .errormsg').hide();
        
        //console.log('mid='+ jsdata.data.mid );
      },
      error: function(xhr, type){
        //  console.log('Ajax error!')
        $('.loginbox .errormsg').show();
      }
    });
    // fntRun();
    if(!fntA.period){
      console.log('pose login call fntskiing');
          fntskiing();
        }
  }
  function postRegister(){
    var userName  = $('#regumail').val()
    ,   userMail  = $('#reguname').val()
    ,   userPwd = $('#regupwd').val()
    ,   userPwd2 = $('#regupwd2').val()
    ,   postData;
    if (!userName || !userPwd || !userMail || !userPwd2){
      $('.registerbox .errormsg').html('请完整填写信息！').show();
      return false;
    }
    if(userPwd!==userPwd2){
      $('.registerbox .errormsg').html('请确认两次输入密码相同！').show();
      return false;
    }
    $('.loginbox .errormsg').hide();
    var reMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    //  console.log('post register, regumail=' + userMail + ', valmail=' + userMail.match(reMail));
    // if(userMail.match(reMail)){
    //   alert("请正确填写邮箱信息！")
    //   return false;
    // }
    postData = 'name=' + userName + '&email=' + userMail + '&password=' + userPwd ;
    //  console.log(postData);
    var tempIp = 'http://www.quyeba.com/event/explorerchallenge/'
    $.ajax({type:'POST',url: tempIp +'user/register',data:postData,
      success:function(json){
        //  console.log(json);
        //var jsdata = eval('('+json+')');
        var jsdata = json;
        if(jsdata.result ==='failed'){
          $('.registerbox .errormsg').html('注册失败，您的邮箱或昵称已被注册').show();
          return false;
        }
        //console.log('status='+ jsdata.result);
        fntA.playername = jsdata.user_name;
        fntA.playerId = jsdata.user_id;
        fntA.playerAvatar = jsdata.user_avatar;
        $('.playerinfoa .playername').html(fntA.playername);
        router.navigate('run');
        showSubFrame('runbox','qrcodebox');
        //console.log('mid='+ jsdata.data.mid );
      },
      error: function(xhr, type){
        //  console.log('Ajax error!')
      }
    });
    // fntRun();
    if(!fntA.period){
          fntskiing();
        }
  }

  //skiing game
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
            $player.css('-webkit-transform', 'rotate('+tempy+'deg)');
            $player.css('-ms-transform', 'rotate('+tempy+'deg)');
            $player.css('transform', 'rotate('+tempy+'deg)');
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



  function fntskiing(){


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

    // var canvas = document.getElementById('myCanvas');
    // var context = canvas.getContext('2d');
    // var mapcanvas =  document.getElementById('mapCanvas');
    // var ctx0 = mapcanvas.getContext('2d');

    
    var myRectangle = {
      x: fRandomBy(0,40),
      y: 3,
      width: 20,
      height: 50,
      borderWidth: 0
    };

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
      }
    }
    function countdownskiingTime(secs) {
      //countdown
      secs = Number(secs);
      fntA.TimerOn = true;
      fntA.UpdateTime = (new Date()).getTime();
      var updateTime = fntA.UpdateTime;
      for (var i = secs; i >= 0; i--) {
        (function(index) {
          fntA.clickTimout = setTimeout(function(){
            if(updateTime ===fntA.UpdateTime){
              doUpdateskiingTime(index);
            }else{
              console.log('updateTime:'+ updateTime + ',fntA.UpdateTime:' + fntA.UpdateTime);
              return;
            }
        }, (secs - index) * 1000);
      })(i);
      }
    }
    function doUpdateskiingTime(num) {
      // console.log('countdonwTime:' + num + '\n' + 'fntA.skiingOn:' +fntA.skiingOn + ',fntA.TimerOn:' + fntA.TimerOn + ',fntA.UpdateTime:' + fntA.UpdateTime);
      if(num >0 ){
        if(fntA.skiingOn && fntA.TimerOn){
          $('.light span').removeClass().addClass('lite'+num);
          $('.gamenote span').removeClass().addClass('note'+num);
        }
      }
      if(num === 0) {
          // stopAnimationskiing();
          stopAnimation();
          // fntA.skiingOn = false;
          fntA.TimerOn = false;
          console.log( 'fntA.StepStarted :'+ fntA.StepStarted + ', fntA.gameFinish: ' + fntA.gameFinish  + ',fntA.skiingRecord:' + fntA.skiingRecord + ',fntA.skiingRuning:' + fntA.skiingRuning + ',fntA.gameResult:' + fntA.gameResult);
          if((!fntA.StepStarted || !fntA.gameFinish) && fntA.skiingRecord == 0 && !fntA.skiingRuning && fntA.gameResult !=='lost'){
            console.log( 'level 2~5 doUpdateskiingTime call down' );
            fntA.thisStpe = 'down';
            skiingAnimate();
          }
          if(fntA.gameLevel == 1 && !fntA.StepStarted && !fntA.skiingRuning){
            console.log( 'level=1 doUpdateskiingTime call down' );
            fntA.thisStpe = 'down';
            skiingAnimate();
          }
      }
    }
    // NodeJS Server
    // var nodejs_server = "222.73.241.60:8082";
    var nodejs_server = "127.0.0.1:8082";
    // connect
    var socket = io.connect("http://" + nodejs_server);
    socket.emit("send", {
        key: fntA.key,
        act: "pcenter"
    });
    console.log(fntA.key);

    socket.on("get_response", function (b) {
      console.log(b);
      // var combine = b.key + "_" + b.act;
      // switch (combine) {
      //   // when open m.page，call enter event，then show the game
      //   case fntA.key + "_enter":
      //     console.log('enter');
      //     // setTimeout(function () {
      //     //   if(!fntA.gameOn){
      //     //     $('#pagebody').addClass('on');

      //     //     showSubFrame('runbox','rundivbox');
      //     //     fntA.gameOn = true;
      //     //     ctx0.drawImage(fntA.image0,-10,-436,360,912);
      //     //     fntA.player.src = 'img/player/g0.png';
      //     //     ctx0.drawImage(fntA.player,20,-40,320,504);
      //     //     countdownNewTime(9);
      //     //   }
      //     // }, 100);
      //     break;
      //   // shake event
      //   case fntA.key + "_changebg":
      //     console.log('_changebg');
      //     // stopAnimation();
      //     // // console.log('fntA.skiingOn:' +fntA.skiingOn + ',fntA.TimerOn:' + fntA.TimerOn + ',fntA.UpdateTime:' + fntA.UpdateTime);
      //     // if(fntA.skiingOn && fntA.skiingRecord==0 && !fntA.gameFinish){
      //     //   fntA.TimerOn = false;
      //     //   var g = canvas.width/2 - (canvas.width/10)*(fntA.gameLevel-1) + 4;
      //     //   if(fntA.gameLevel==5){ g = g + 20; }
      //     //   console.log(fntA.x +',goal:' + g + ',canvas.width:'+ canvas.width);
      //     //   // fntA.gameLevel 
      //     //   if(fntA.x< g) {
      //     //     console.log('You win this step!');
      //     //     if(fntA.gameLevel<5){
      //     //       // $('#myCanvas').css('background-position','0px -' + fntA.gameLevel*30 + 'px');
      //     //       $('.gamenote span').removeClass().addClass('notes');
      //     //     }
      //     //     fntA.shakerecord = fntA.x;
      //     //     // fntA.StepStarted = true;
      //     //     // if(fntA.clickTimout){
      //     //     //   clearTimeout(fntA.clickTimout);
      //     //     //   console.log('clearTimeout(fntA.clickTimout)');
      //     //     // }
      //     //     // fntA.x = 999;
      //     //     fntA.skiingRecord = 0;
      //     //     fntA.thisStpe = 'ok';
      //     //     // skiingAnimate();
      //     //     // fntA.gameLevel = fntA.gameLevel + 1;
      //     //   }else{
      //     //     console.log('You lost!');
      //     //     fntA.shakerecord = 0;
      //     //     fntA.skiingRecord = 0;
      //     //     fntA.thisStpe = 'down';
      //     //     // skiingAnimate();
      //     //     // postGameRecord(fntA.playerId,fntA.playername,fntA.x,fntA.gameResult);
      //     //   }
      //     // }else{
      //     //   console.log('Your time is out.');
      //     // }
      //     break;
      // }
    });//socket.on

    function animate() {
      // update
      var time = (new Date()).getTime() - startTime;
      var amplitude = 160;

      // in ms
      var period = fntA.period;
      var centerX = canvas.width / 2 - myRectangle.width / 2;
      var nextX = amplitude * Math.sin(time * 2 * Math.PI / period) + centerX;

      myRectangle.x = nextX;
      fntA.x = canvas.width - nextX;

      // clear

      // draw
      fntA.requestId = window.requestAnimationFrame(animate);
    }
    //init

    // drawRectangle(myRectangle, context);
    var startTime = (new Date()).getTime();
    // animate(myRectangle, canvas, context, startTime);
    function stopAnimation(e) {
        // use the requestID to cancel the requestAnimationFrame call
        cancelRAF(fntA.requestId);
    }
    function stopAnimationskiing(e) {
        // use the requestID to cancel the requestAnimationFrame call
        cancelRAF(fntA.skiingRequestId);
    }
    function pauseAnimation(e) {
        // use the requestID to cancel the requestAnimationFrame call
        animate();
    }
    //debug;

    $(".get").on("click", function(){
        $("body").append('<p>' + fntA.x);
      });
    $(".clean").on("click", function(){
        $("p").remove();
      });
    $(".stop").on("click", function(){
        stopAnimation();
        $("body").append('<p>' + fntA.x);
      });
    $(".pause").on("click", function(){
        pauseAnimation();
        $("body").append('<p>' + fntA.x);
      });
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

  }//skiing game

  //main run

  var pageUrl = 'http://www.quyeba.com/event/explorerchallenge3/m_s.html'; 

  //fntA.gameLevel = 1;
  fntA.gameOn = false ;

  var loadedImages = 0;
  //run
  
  var newUrl = pageUrl +"?key=" +fntA.key;
  $("#qrcode").append("<img src='http://chart.apis.google.com/chart?chs=320x320&cht=qr&chld=H|2&chl="+ newUrl + "&choe=UTF-8' />");
  console.log( newUrl);
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



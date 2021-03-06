<?php
if(isset($_REQUEST['uid'])){
    $url = 'game.php';
    $user_id = '';
    $user_name = '';
    $user_avatar = '';

    $key = 'explorer1234!@';
    $request_user_id = urldecode($_REQUEST['uid']);
    $request_user_name = urldecode($_REQUEST['name']);
    $request_user_avatar = urldecode($_REQUEST['head']);
    $sign = $_REQUEST['sign'];
    $expected_key = md5($request_user_id.$request_user_name.$request_user_avatar.$key);
    //echo $request_user_id.$request_user_name.$request_user_avatar.$key;
    //echo $expected_key;
    if($expected_key == $sign || strtoupper($expected_key) == $sign){
        $user_id = $request_user_id;
        $user_name = $request_user_name;
        $user_avatar = $request_user_avatar;
    }
    session_start();
    $_SESSION['user_id'] = $user_id;
    $_SESSION['user_name'] = $user_name;
    $_SESSION['user_avatar'] = $user_avatar;
    header("Location: $url");
}
else{
    session_start();
    /* 用$user_id 和 $user_name判断 */
    $user_id =  $_SESSION['user_id'];
    $user_name =  $_SESSION['user_name'];
    $user_avatar = $_SESSION['user_avatar'];
    //echo $user_id;
    //echo $user_name;
    //echo $user_avatar;
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="description" content="去野吧是The North Face®品牌精心为你打造的一站式购买，分享，摄影，旅游，户外的平台。这里还有最新的社交机制，你向寻找自己，贴近自然踏出的每一步，The North Face®都准备了惊喜和激励，与你的户外旅程一起成长。" />
    <title>The North Face®新探索客</title>

    <link rel="stylesheet" href="css/skiing.css" media="screen" type="text/css" />
    <meta name="author" content="Vitrum.Zhu" />
    <script type="text/javascript">
      var _smq = _smq || [];
      _smq.push(['_setAccount', '18A1A3A5', new Date()]);
      _smq.push(['_setDirectoryIndex', '']);
      _smq.push(['_setClickTimeOut', 200]);
      _smq.push(['pageview']);

      (function() {
      var sm = document.createElement('script'); sm.type = 'text/javascript'; sm.async = true;
      sm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdnmaster.com/sitemaster/sm.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sm, s);
      })();
    </script>
  </head>
  <body>
      <div class="userinfo" style="dislpay:none" data-userid="<?php echo $user_id; ?>" data-username="<?php echo $user_name; ?>" data-avatar="<?php echo $user_avatar; ?>" ></div>
      <section id="intro" class="clearfix frame homepage" style="display:none">
        <div class="minisite">
          <div class="sitemask"></div>
          <div class="iframbox">
            <iframe src="" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
          </div>
        </div>
        <div class="acountbox">
          <div class="subframe loginbox">
                <ul>
                  <li>
                    <label class="forname">用户名／邮箱</label>
                    <input type="text" class="form-text" placeholder="邮箱或昵称" name="uname" id="uname" validate="{required:true}" maxlength="22">
                  </li>
                  <li>
                    <label class="upwd">密码</label>
                    <input type="password" class="form-text" placeholder="请输入密码" type="password" name="upwd" id="upwd"  maxlength="22" validate="{required:true}">
                  </li>
                </ul>
            <span class="errormsg">很抱歉，用户账号错误，或您输入的密码错误。</span>
            <a class="btn btn_login" >登录</a>
            <a class="navlink btn_reg" href="#/reg">个人用户注册》</a>
          </div>
          <div class="subframe registerbox">
                <ul>
                  <li><label class="forname">用户名</label><input type="text" name="reguname" id="reguname"  maxlength="22" /></li>
                  <li><label class="forname">邮箱</label><input type="text" name="regumail" id="regumail"  maxlength="22" /></li>
                  <li><label class="upwd">密码</label><input type="password" name="regupwd" id="regupwd"  maxlength="22" /></li>
                  <li class="repwdli"><label class="upwd">密码</label><input type="password" name="regupwd2" id="regupwd2"  maxlength="22" /></li>
                  <li class="tiaokuanli">
                    <div class="form-item">
                      <input type="checkbox" class="form-checkbox ext-button" checked="">
                      <label class="tiaokuan"><a href="http://www.quyeba.com/help/agreement" target="_blank">我同意去野吧服务条款</a></label>
                    </div>
                  </li>
                </ul>
            <span class="errormsg">很抱歉，</span>
            <a class="btn btn_register" >注册</a>
            <a class="navlink linklevel" href="#/index">登录</a>
          </div>
        </div>
      </section>

    <div id="pagebody"> 

      <section id="run" class="clearfix frame runbox">
        <div class="subframe qrcodebox">
          <div id="qrcode"></div>
          <div class="qrinfo"></div>
        </div>
        <div class="subframe rundivbox">
          <div class="runningbox">
            <!-- <a class="startrun">Start Run!</a> -->
            <div class="header">
              <div class="playerinfo playerinfoa">
                <img src="img/player/default.jpg" />
                <span class="playername yahei">Mr_阿温</span>
              </div>
            </div>
            <div class="skiingnote">
              <span class="note1">10000mi</span>
            </div>
            <div class="map">
              <div id="mapCanvas" width="320" height="540" style=""></div>
              <div id="myCanvas" width="320" height="540" style=""></div>
            </div>
          </div>
          <div class="maskbox gamemask ">
            <div class="submask howplay">
            </div>
            <div class="submask connection">
            </div>
            <div class="submask countdown">
            </div>
            <div class="submask winwithpoint">
              <a class="playagain" href="#/run/replay" title="再战一场">再战一场</a>
              <a class="gameshear" href="http://service.weibo.com/share/share.php?title=%e6%88%91%e5%88%9a%e6%88%90%e5%8a%9f%e5%ae%8c%e6%88%90%e4%ba%86+%23%e6%96%b0%e6%8e%a2%e7%b4%a2%e5%ae%a2%23+%e6%8c%91%e6%88%98%ef%bc%81%40TheNorthFace+%23%e6%8e%a2%e7%b4%a2%e6%8c%91%e6%88%98%23+%e3%80%8a%e7%96%af%e7%8b%82%e6%bb%91%e9%9b%aa%e3%80%8b%e7%ad%89%e4%bd%a0%e6%9d%a5%e6%88%98%ef%bc%81%e5%bc%80%e5%90%af%e5%8f%8c%e5%b1%8f%e4%ba%92%e5%8a%a8%e6%a8%a1%e5%bc%8f%ef%bc%8c%e6%91%86%e5%8a%a8%e6%89%8b%e6%9c%ba%e6%8e%a7%e5%88%b6%e9%80%89%e6%89%8b%e5%b9%b3%e8%a1%a1%ef%bc%8c%e6%8c%91%e6%88%98%e9%a3%9e%e9%9b%aa%e9%a9%b0%e9%aa%8b%e4%b8%8d%e5%80%92%e8%ae%b0%e5%bd%95%ef%bc%8c%e6%9b%b4%e6%9c%89%e6%b5%b7%e9%87%8f%e6%8e%a2%e7%b4%a2%e8%a3%85%e5%a4%87%e7%ad%89%e4%bd%a0%e8%b5%a2%e5%8f%96%e3%80%82&url=http%3a%2f%2fwww.quyeba.com%2fexplorer%2f%23_challenge&source=bookmark&appkey=&ralateUid=&pic=http%3a%2f%2fwww.quyeba.com%2fevent%2fexplorerchallenge3%2fimg%2fshear.jpg" target="_blank" title="分享成绩">分享成绩</a>
            </div>
            <div class="submask winwithoutpoint">
              <a class="playagain" href="#/run/replay" title="再战一场">再战一场</a>
              <a class="gameshear" href="http://service.weibo.com/share/share.php?title=%e6%88%91%e5%88%9a%e6%88%90%e5%8a%9f%e5%ae%8c%e6%88%90%e4%ba%86+%23%e6%96%b0%e6%8e%a2%e7%b4%a2%e5%ae%a2%23+%e6%8c%91%e6%88%98%ef%bc%81%40TheNorthFace+%23%e6%8e%a2%e7%b4%a2%e6%8c%91%e6%88%98%23+%e3%80%8a%e7%96%af%e7%8b%82%e6%bb%91%e9%9b%aa%e3%80%8b%e7%ad%89%e4%bd%a0%e6%9d%a5%e6%88%98%ef%bc%81%e5%bc%80%e5%90%af%e5%8f%8c%e5%b1%8f%e4%ba%92%e5%8a%a8%e6%a8%a1%e5%bc%8f%ef%bc%8c%e6%91%86%e5%8a%a8%e6%89%8b%e6%9c%ba%e6%8e%a7%e5%88%b6%e9%80%89%e6%89%8b%e5%b9%b3%e8%a1%a1%ef%bc%8c%e6%8c%91%e6%88%98%e9%a3%9e%e9%9b%aa%e9%a9%b0%e9%aa%8b%e4%b8%8d%e5%80%92%e8%ae%b0%e5%bd%95%ef%bc%8c%e6%9b%b4%e6%9c%89%e6%b5%b7%e9%87%8f%e6%8e%a2%e7%b4%a2%e8%a3%85%e5%a4%87%e7%ad%89%e4%bd%a0%e8%b5%a2%e5%8f%96%e3%80%82&url=http%3a%2f%2fwww.quyeba.com%2fexplorer%2f%23_challenge&source=bookmark&appkey=&ralateUid=&pic=http%3a%2f%2fwww.quyeba.com%2fevent%2fexplorerchallenge3%2fimg%2fshear.jpg" target="_blank" title="分享成绩">分享成绩</a>
            </div>
            <div class="submask lost">
              <a class="playagain" href="#/run/replay" title="再战一场">再战一场</a>
              <a class="gameshear" href="http://service.weibo.com/share/share.php?title=%e5%8f%aa%e5%b7%ae%e4%b8%80%e7%82%b9%e6%88%91%e5%b0%b1%e8%83%bd%e5%ae%8c%e6%88%90+%23%e6%96%b0%e6%8e%a2%e7%b4%a2%e5%ae%a2%23+%e6%8c%91%e6%88%98%ef%bc%8c%e6%88%91%e8%bf%98%e8%a6%81%e5%86%8d%e6%88%98%e4%b8%80%e6%ac%a1%ef%bc%81%40TheNorthFace+%23%e6%8e%a2%e7%b4%a2%e6%8c%91%e6%88%98%23+%e3%80%8a%e7%96%af%e7%8b%82%e6%bb%91%e9%9b%aa%e3%80%8b%e7%ad%89%e4%bd%a0%e6%9d%a5%e6%88%98%ef%bc%81%e5%bc%80%e5%90%af%e5%8f%8c%e5%b1%8f%e4%ba%92%e5%8a%a8%e6%a8%a1%e5%bc%8f%ef%bc%8c%e6%91%86%e5%8a%a8%e6%89%8b%e6%9c%ba%e6%8e%a7%e5%88%b6%e9%80%89%e6%89%8b%e5%b9%b3%e8%a1%a1%ef%bc%8c%e6%8c%91%e6%88%98%e9%a3%9e%e9%9b%aa%e9%a9%b0%e9%aa%8b%e4%b8%8d%e5%80%92%e8%ae%b0%e5%bd%95%ef%bc%8c%e6%9b%b4%e6%9c%89%e6%b5%b7%e9%87%8f%e6%8e%a2%e7%b4%a2%e8%a3%85%e5%a4%87%e7%ad%89%e4%bd%a0%e8%b5%a2%e5%8f%96%e3%80%82&url=http%3a%2f%2fwww.quyeba.com%2fexplorer%2f%23_challenge&source=bookmark&appkey=&ralateUid=&pic=http%3a%2f%2fwww.quyeba.com%2fevent%2fexplorerchallenge3%2fimg%2fshear.jpg" target="_blank" title="分享成绩">分享成绩</a>
            </div>
            <div class="submask loading">
              
            </div>
          </div>
        </div>
      </section>
      <div class="lefticon"></div>
      <div class="righticon">
        <a class="link link_home" href="http://www.thenorthface.com.cn/explorer/" title="返回首页">返回首页</a>
        <a class="link link_store" href="http://www.thenorthface.com.cn/" title="官方商城">官方商城</a>
      </div>
    </div>

<div class="debug">
  <h1>TNF Skiing - Demo</h1>

  <textarea id="output">
    </textarea>
    <div id="demo" class='green'></div>
<!-- <p><a class="left">left</a></p>
<p><a class="right">right</a></p> -->
<a class="stop">stop</a>
  <div id="canvas">
      <div id="middle"></div>
      <div id="ball"></div>
  </div>
  <img id="map" src="img/maps/maps2.jpg" alt="The Scream" width="220" height="277">


  <img id="player" src="img/maps/p01.png" alt="The Scream" width="220" height="277">
  <img id="player" src="img/maps/p02.png" alt="The Scream" width="220" height="277">
  <img id="player" src="img/maps/p03.png" alt="The Scream" width="220" height="277">
   <p id="warning"></p>
</div>

    <script type="text/javascript" src="script/lib/jquery-2.0.3.min.js"></script>
    <script type="text/javascript" src="script/lib/underscore-min.js"></script>
    <script type="text/javascript" src="script/lib/backbone-min.js"></script>
    <script src="http://222.73.241.60:8082/socket.io/socket.io.js" type="text/javascript"></script>
    <script src="script/state-machine.js"></script>
    <script type="text/javascript" src="script/skiings.js"></script>
    <script type="text/javascript" src="http://www.quyeba.com/sites/all/libraries/js/s_code.js?men2yk"></script>
  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-44967050-1', 'quyeba.com');
  ga('send', 'pageview');

</script>
  <!-- SiteCatalyst code version: H.25.2. Copyright 1996-2013 Adobe, Inc. All Rights Reserved More info available at http://www.omniture.com -->
  <script language="JavaScript" type="text/javascript">
  <!--
        /* You may give each page an identifying name, server, and channel on the next lines. */
        s.pageName="minisite:freeski(explorerchallenge)"
        s.server="www.quyeba.com"
        s.channel=""
        s.pageType=""
        s.prop1="minisite:freeski(explorerchallenge)"
        s.prop2="minisite:freeski(explorerchallenge)"
        s.prop3="minisite:freeski(explorerchallenge)"
        s.prop4="minisite:freeski(explorerchallenge)"
        s.prop5=""
        s.prop23=''
        s.prop24='' 
        s.prop25='' 
        s.prop26=''
        s.prop27='' 
        /* Conversion Variables */
        s.campaign=""
        s.state=""
        s.zip=""
        s.events=""
        s.products=""
        s.purchaseID=""
        s.eVar1=""
        s.eVar2=""
        s.eVar3=""
        s.eVar4=""
        s.eVar5=""
        s.eVar21="uid()"
        s.eVar22=''
        s.eVar23=''
       
        /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
        var s_code=s.t();if(s_code)document.write(s_code)//-->
</script>
<script language="JavaScript" type="text/javascript"><!--
  if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-')
  //--></script><noscript><img src="http://vfcorpchina.sc.omtrdc.net/b/ss/vfcc-vf-prd/1/H.25.2--NS/0"
  height="1" width="1" border="0" alt="" /></noscript><!--/DO NOT REMOVE/-->
<!-- End SiteCatalyst code version: H.25.2. -->


<script type="text/javascript"> 
var _gaq = _gaq || [];
_gaq.push(['_setCustomVar', 1, 'u-visitor', ' uid(见附5)', 1]); 
    
    _gaq.push(['_setAccount', 'UA-32978798-1']);
    _gaq.push(['_setDomainName', 'quyeba.com']);  
    _gaq.push(['_addOrganic', 'so.360.cn', 'q']);
    _gaq.push(['_addOrganic', 'so', 'q']);
    _gaq.push(['_addOrganic', 'sogou', 'query']);
    _gaq.push(['_addOrganic', 'soso', 'w']);
    _gaq.push(['_addOrganic', 'yodao', 'q']);
    _gaq.push(['_trackPageview']);
    _gaq.push(['_trackPageLoadTime']);
    
    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })(); 
  </script>


  <span style="display:none;">
    <script type="text/javascript">
      var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
      document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F9690d1389cb48f77a69e88511b7d7ca0' type='text/javascript'%3E%3C/script%3E"));
    </script>
  </span>

  <script type="text/javascript">
  var _mvq = _mvq || [];
  _mvq.push(['$setAccount', 'm-21223-0']);
  _mvq.push(['$logConversion']);
  (function() {
          var mvl = document.createElement('script');
          mvl.type = 'text/javascript'; mvl.async = true;
          mvl.src = ('https:' == document.location.protocol ? 'https://secure' : 'http://static') + '.mediav.com/mvl.js';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(mvl, s); 
  })(); 
  </script>
  </body>
</html>
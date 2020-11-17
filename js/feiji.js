$(function(){
  // 点击开始游戏
   $("#kaishi").click(function(){
       //start界面隐藏
       $(".start").css("display","none")
      //header显示
      $(".header").stop().fadeIn(100);
    //   飞机显示
    $(".my").stop().fadeIn(100);
    var step =4;
    var estep=6;
  var  bullet_step=15;
    var G_UP=false;
    var G_LEFT=false;
    var G_RIGHT=false;
    var G_DOWN=false;
    var bullet_G=false
      // 帧率
    
    
    $(document).keydown(function(event){
          if(event.keyCode==87){
                  G_UP=true
         }
         if(event.keyCode==65){
                 G_LEFT=true
    }
          if(event.keyCode==68){
                 G_RIGHT=true
          }
          if(event.keyCode==83){
            G_DOWN=true
        }
        // 发子弹
        if(event.keyCode==70){
          bullet_G=true
      }
     
    　　　});
    $(document).keyup(function(event){
        if(event.keyCode==87){
          G_UP=false
        }
        if(event.keyCode==65){
          G_LEFT=false
        }
        if(event.keyCode==68){
          G_RIGHT=false
        }
        if(event.keyCode==83){
          G_DOWN=false
        }
        if(event.keyCode==70){
          bullet_G=false
      }
    })
        var plane_y =$(".my").css("bottom").replace('px','');
        var plane_Y= parseInt(plane_y)
        var plane_x =$(".my").css("left").replace('px','');
        var plane_X= parseInt(plane_x)
    // 子弹   按  f   70 发子弹
        $(document).keydown(function(event){
          if(bullet_G){
        setTimeout(() => {
           var $my_bullet_img=$("<img src='./img/bullet2.png'  class='bullets'>")
                $my_bullet_img.css({
                  position:"absolute",
                  left:plane_X+18,
                  bottom:plane_Y+34,
                  //  bottom: bullet_y
                })
            $(".container").append($my_bullet_img)
      },1);  
          }
          // console.log(($bullets[i].style.bottom))
        })
  // SET  Y坐标函数
      function setY(flyobject,y){
        flyobject.style.bottom=y+'px'
      }
   //GET  Y坐标函数
      function getY(flyobject){
        return flyobject.style.bottom.replace('px','')-0;
      }
    // SET  X坐标函数
    function setX(flyobject,x){
      flyobject.style.left=x+'px'
    }
 //GET  X坐标函数
    function getX(flyobject){
      return flyobject.style.left.replace('px','')-0;
    }
    
    // 飞机的飞行函数
    var gameInterval =setInterval(function(){
     
      //  向上飞    
      if(G_UP){
        plane_Y += step
          $(".my").css("bottom", plane_Y)
        if( plane_Y>=455){
          plane_Y=455
         }
         }  
        //  向左飞   
         if(G_LEFT){
          plane_X -= step
            $(".my").css("left",plane_X)
          if(plane_X<=0){
            plane_X=0
           }
           }  
        // 向右飞   
           if(G_RIGHT){
              plane_X+= step
              $(".my").css("left",plane_X)
              
            if(plane_X>260){
              plane_X=260
             }
             }   
          // 向下飞
             if(G_DOWN){
              plane_Y -= step
                $(".my").css("bottom", plane_Y)
              if( plane_Y<=0){
                 plane_Y=0
                }
              }  
    // 子弹移动起来
        // console.log($('.bullets'))
         bullets=$('.bullets')
        if(bullets.length>0){
          for(var i=0;i<bullets.length;i++){
            // 获取子弹的坐标
    
           var yy= getY(bullets[i])+bullet_step;
          //  飞出边界，子弹删除
           if(yy>490){
             bullets[i].remove();
            continue
           }
           setY(bullets[i],yy);
         } 
        }
       
    },30)
    // 敌机产生
    var enemy_1=['./img/enemy1.png','./img/enemy1_down1.png','./img/enemy1_down2.png','./img/enemy1_down3.png','./img/enemy1_down4.png']
    enemy_P=setInterval(() => {
        // $enemy_img=$("<img src='./img/enemy1.png' class='enemys'>")
        $enemy_img=$("<img src='' class='enemys'>")
        // 将飞机的图片替换成数组中的，坠机的动画效果
       
        window.enemy_step=0;
        // window.enemy_step_end=1;
        
        //  生成
       $enemy_img.attr("src",enemy_1[enemy_step])
      // 敌机出现的位置随机在最上面的一排，可以重叠
      // 生产left的随机数
     var l= Math.floor(Math.random()*260);
      $enemy_img.css({
        position:'absolute',
        bottom:470,
        // left放一个随机数
        left:l
      })
     
      $(".container").append( $enemy_img)
   
    }, 800);
    
    // 敌机移动的函数
  var enemy_Move=setInterval(() => {
     var enemys=$(".enemys")
       if(enemys.length>0){
            for(var i=0;i<enemys.length;i++){
              // 敌机y向下
              var e_y=getY(enemys[i])-estep;
              if(e_y<0){
                enemys[i].remove()
              }
              setY(enemys[i],e_y)
        // 调用碰撞函数
              isfight()
              my_boom()
       

       }
        
       }
  
  }, 60);

// 子弹与敌机碰撞，敌机坠毁函数

  // 碰撞函数
  function isfight(){
   window.bulletss=$('.bullets');
// console.log(bullets)
for(var t=0;t<bulletss.length;t++){
  var x1=getX(bulletss[t])
  var y1=getY(bulletss[t])
}
 window.enemyss=$(".enemys")
for(var g=0;g<enemyss.length;g++){
 window.x2= getX(enemyss[g])
 window.y2=getY(enemyss[g])
  var marg_X=x1>x2-5 && x1<x2+40  ;
  var marg_Y=y1>y2-11 && y1<y2+30 ;
  // var marg= Math.abs(x1+2.5-x2+20)<11.25 && Math.abs(y1+6.5-y2+15)<25.5;
 if(marg_X){
   if(marg_Y){
// console.log("撞上了")
  enemy_step=1;
//  敌机被击中，消失的函数
    enemyss[g].src=enemy_1[enemy_step]
    c_c(enemyss[g])
    bullet_boom()
   function bullet_boom(){
         for(var t=0;t<bulletss.length;t++){
      // console.log(bulletss[t])
      bulletss[t].remove(); 
      $(".score").text(parseInt( $(".score").text())+10)
    
}

   }

  function c_c(enemys){
    // console.log(enemys)
    // 
    if(enemys.src=enemy_1[1]){
        setTimeout(function(){ 
          enemys.remove(); 
          // bullets.remove()
      },300); 
        }
}(enemyss[g])
  
}
  }
}

  }

// 当敌机撞到我机，结束的函数
   function my_boom(){
    // console.log(enemyss)
    for(var o=0;o<enemyss.length;o++){
      x_e= getX(enemyss[o])
      y_e=getY(enemyss[o])
    var my_x=  $('.my').css('left').replace('px','')
    var my_X=parseInt(my_x)
      // console.log( my_X)
      var my_y=  $('.my').css('bottom').replace('px','')
      var my_Y=parseInt(my_y)
      // console.log( my_Y)
    var  marg_x= my_X>x_e-40 &&  my_X<x_e+40 ;
    var marg_y=my_Y>y_e-45 && my_Y<y_e+30 ;
    // console.log(my_X,my_Y)
    // console.log(x_e,y_e)
    if(marg_x){
      if(marg_y){

        // console.log("我机坠毁")
        $('.my').css({
          background:'url(./img/me_destroy_3.png) no-repeat', 
          "background-size":"100% 100%",
          width:40,
          height:45
         
        } );
     setTimeout(game_over(),3000)

      }
      }
    }

    // }

   }




//*******************************************************
function game_over(){
  clearInterval(gameInterval) ;
  clearInterval( enemy_P)
  clearInterval(enemy_Move)
  $(".start").css("display","block")
  $("#kaishi").css("display","none")
  
}

})   ;

  


    //-------------------------------------
   })





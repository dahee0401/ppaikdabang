$(function(){

  //window에 대한 scroll 이벤트 구문

let scrollTop;
  $(window).on('scroll', function(){
    
    //현재시점 스크롤바의 top값을 추출
   scrollTop = $(window).scrollTop();

    console.log(scrollTop);
    if(scrollTop<300){
      $('.to_top').stop().fadeOut();
    }else{
      $('.to_top').stop().fadeIn(200);
    }
  });


  $('.to_top').on('click', function(evt){
    evt.preventDefault();
    $('html,body').stop().animate({scrollTop:0});
  });
  $('h1.logo').on('click', function(evt){
    evt.preventDefault();
    $('html,body').stop().animate({scrollTop:0});
  });

  const $mainmnu=$('nav > .gnb> li');
  const $submnu=$('.gnb > li > .lnb');
  const $bg_lnb=$('.bg-lnb ');
  const $arrow=$('nav > .gnb > li > a:after')
  let nowIdx=0;
// gnb lnb
  $mainmnu.on('mouseover', function(){
    nowIdx=$mainmnu.index(this);
    $bg_lnb.stop().slideDown();
    $submnu.eq(nowIdx).stop().fadeIn();
    // $arrow.eq(nowIdx).stop().show();
  });
  $mainmnu.on('mouseout', function(){
    $bg_lnb.stop().slideUp();
    $submnu.eq(nowIdx).stop().fadeOut();
  });
  $mainmnu.eq(6).on('mouseover', function(){
    nowIdx=$mainmnu.index(this);
    $bg_lnb.hide();
  });

  // 배너슬라이드
const $indicator=$('body #wrap > section > .slides > .slides-pagination > li > a');
const $container=$('body #wrap > section > .slides > .slides-container');
 let slideIdx=0;

 const moveFn=function(){
   $container.stop().animate({
     left : -(100 * slideIdx)+'%'
   });
   $indicator.eq(slideIdx).parent().addClass('on').siblings().removeClass('on');
 };

$indicator.on('click',function(evt){
  evt.preventDefault();
 slideIdx=$indicator.index(this);
 moveFn();
});

// 재생정지

const $btnAuto = $('.slides>.slides-auto');
let intervalKey;

$btnAuto.on('click', function(){
  
  if($(this).hasClass('pause')){
    //재생중인 상태
    clearInterval(intervalKey);
    $(this).removeClass('pause');

  }else{//정지된 상태
    intervalKey = setInterval(()=>{
      if(slideIdx<3){
        slideIdx++;
      }else{
        slideIdx=0;
      }
      moveFn();
    },2000);
    $(this).addClass('pause');
  }

});
// 페이지 로딩 시 자동실행
$(window).on('load',function(){
  moveFn();
intervalKey = setInterval(()=>{
  if(slideIdx<3){
    slideIdx++;
  }else{
    slideIdx=0;
  }
  moveFn();
}, 3000);
});

  

// 메뉴슬라이드
const $thmbs=$('.mnu-swiper > li');
const $sliding=$('.mnu-slides .mnu-swiper');
const $btnPrev = $('.slides-prev');
const $btnNext = $('.slides-next');
  let currentIdx = 0;
  let aniChk = false;
const slideFn=function(){
  $sliding.stop().animate({left:-343*currentIdx});
  }
  // 다음버튼
   $btnNext.on('click', function(evt){
    evt.preventDefault();

    if(aniChk === false){

        aniChk = true;
      
          if(currentIdx<8){
            currentIdx++;
          }else{
           currentIdx=0;
          }
      
          //컨테이너 이동
          $sliding.stop().animate({left : -343},400,function(){
            //$slides.first().appendTo($container);
            $('.mnu-swiper>li').first().appendTo($sliding); 
           $sliding.css({left : 0});

            aniChk = false;
          });

    }

  });

  // 이전버튼
  $btnPrev.on('click', function(evt){
    evt.preventDefault();

    if(aniChk === false){
      aniChk = true;

      if(currentIdx > 0){
        currentIdx--;
      }else{
        currentIdx = 8;
      }
      $sliding.stop().animate({left: 0}, function(){
        $('.mnu-swiper>li').last().prependTo($sliding);
       $sliding.css({left: -343});

        aniChk = false;
      });
    };
  });


// 메뉴슬라이드 리스트
const $mnu_list=$('.mnu-swiper>li');
const $mnu_Info=$('.mnu-swiper>li .list-info');
const $mnu_clse=$('.mnu-swiper>li .list-info>.clse');
  let mnuIdx;
  $mnu_list.on('click', function (evt) {
  evt.preventDefault();
 mnuIdx= $mnu_list.index(this);
  $mnu_Info.eq(mnuIdx).parent().removeClass('on').siblings().addClass('on');
 $mnu_Info.eq(mnuIdx).toggle();
});

$mnu_clse.on('click', function (evt) {
  evt.preventDefault();
  // console.log(listIdx);
 mnuIdx= $mnu_list.index(this);
 $mnu_Info.eq(mnuIdx).hide();
});


// 메뉴 리스트
const $list=$('.list> .list-on > li');
const $listInfo=$('.list .list-info');
const $listclse=$('.clse');
let listIdx;

$list.on('click', function (evt) {
  evt.preventDefault();
  listIdx=$list.index(this);
  $listInfo.eq(listIdx).parent().removeClass('on').siblings().addClass('on');
  $listInfo.eq(listIdx).toggle();
});

$listclse.on('click', function (evt) {
  evt.preventDefault();
  // console.log(listIdx);
  listIdx=$list.index(this);
  $listInfo.eq(listIdx).hide();
});

});
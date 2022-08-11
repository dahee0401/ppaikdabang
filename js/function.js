$(function () {
	//window에 대한 scroll 이벤트 구문
	let scrollTop
	$(window).on('scroll', function () {
		//현재시점 스크롤바의 top값을 추출
		scrollTop = $(window).scrollTop()
		if (scrollTop < 300) {
			$('.to_top').stop().fadeOut(200)
		} else {
			$('.to_top').stop().fadeIn(200)
		}
	})

	$('.to_top').on('click', function (evt) {
		evt.preventDefault()
		$('html,body').stop().animate({ scrollTop: 0 })
	})

	// 메인메뉴
	const $mainmnu = $('.in_header .navbar>li')
	const $submnu = $('.in_header .navbar>li .sub-menu ')
	const $bg_lnb = $('.sub-bg')
	let nowIdx = 0
	$mainmnu.on('mouseover', function () {
		nowIdx = $mainmnu.index(this)
		$bg_lnb.stop().slideDown()
		$submnu.eq(nowIdx).stop().fadeIn()
	})
	$mainmnu.on('mouseout', function () {
		$bg_lnb.stop().slideUp()
		$submnu.eq(nowIdx).stop().fadeOut()
	})
	$mainmnu.eq(6).on('mouseover', function () {
		nowIdx = $mainmnu.index(this)
		$bg_lnb.hide()
	})

	// 배너슬라이드
	const $indicator = $('.slides > .slides-pagination > li > a')
	const $container = $('.slides > .slides-container')
	let slideIdx = 0

	const moveFn = function () {
		$container.stop().animate({
			left: -(100 * slideIdx) + '%',
		})
		$indicator.eq(slideIdx).parent().addClass('on').siblings().removeClass('on')
	}

	$indicator.on('click', function (evt) {
		evt.preventDefault()
		slideIdx = $indicator.index(this)
		moveFn()
	})

	// 재생정지

	const $btnAuto = $('.slides>.slides-auto')
	let intervalKey

	$btnAuto.on('click', function () {
		if ($(this).hasClass('pause')) {
			//재생중인 상태
			clearInterval(intervalKey)
			$(this).removeClass('pause')
		} else {
			//정지된 상태
			intervalKey = setInterval(() => {
				if (slideIdx < 3) {
					slideIdx++
				} else {
					slideIdx = 0
				}
				moveFn()
			}, 2000)
			$(this).addClass('pause')
		}
	})
	// 페이지 로딩 시 자동실행
	$(window).on('load', function () {
		moveFn()
		intervalKey = setInterval(() => {
			if (slideIdx < 3) {
				slideIdx++
			} else {
				slideIdx = 0
			}
			moveFn()
		}, 3000)
	})

	// mob 메뉴
	const $mobNav = $('.nav-icon')
	const $mobMnu = $('.mob')
	const $mobList = $('.mob .gnb_mob>li')
	const $subList = $('.mob .gnb_mob>li .sub-list')
	$mobNav.on('click', function () {
		$(this).stop().toggleClass('active')
		$mobMnu.stop().animate({ width: 'toggle' }, 400)
	})
	$mobList.on('click', function () {
		$(this).children('.sub-list').stop().slideToggle(300)
		$(this).siblings().children('.sub-list').stop().slideUp(300)
	})

	// 패밀리사이트
	const $family = $('#family_site')
	$family.on('click', function () {
		$(this).children('#fmenu').stop().slideToggle(300)
	})
})

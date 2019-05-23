require(['./config'], function() {
	require(['swiper', 'loadHF'], function(Swiper) {
		// 主页类
		class Home {

			constructor() {
				this.initCarousel()
			}

			// 初始化轮播图
			initCarousel() {
				new Swiper ('.swiper-container', {
				    // direction: 'vertical', // 垂直切换选项
				    loop: true, // 循环模式选项
				    autoplay: true, // 自动轮播
				    
				    // 如果需要分页器
				    pagination: {
				      el: '.swiper-pagination',
				    },
				    
				    // 如果需要前进后退按钮
				    navigation: {
				      nextEl: '.swiper-button-next',
				      prevEl: '.swiper-button-prev',
				    },
				})
			}
		}

		new Home()
	})
})
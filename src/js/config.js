// 配置
require.config({
	baseUrl: '/',
	paths: {
		jquery: 'libs/jquery/jquery-1.12.4.min',
		loadHF : "js/loadHeaderAndFooter",
		swiper: "libs/swiper/js/swiper.min",
		template: "libs/art-template/template-web",
		fly: "libs/jquery-plugins/jquery.fly.min",
		zoom: "libs/jquery-plugins/jquery.elevateZoom-3.0.8.min"
	},
	shim: {
		fly: {
			deps: ['jquery']
		},
		zoom: {
			deps: ['jquery']
		}
	}
})
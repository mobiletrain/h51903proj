// 定义模块，复用页面的头部、尾部
define(['jquery'], function($) {
	// 定义类，该类主要用于加载头部、尾部
	class LoadHeaderAndFooter {
		constructor() {			
			this.loadHeader()
			this.loadFooter()
		}

		// 加载头
		loadHeader() {
			$('header').load('/html/include/header.html', () => {
				// 该回调函数是在 header.html 加载到 header 标签内部后再执行的函数
				this.addListener()
			})
		}

		// 添加事件监听
		addListener() {
			// 搜索框，绑定"keyup"事件
			$(".search input:first").on("keyup", this.suggesteHandler)
			// 提示的内容点击，显示到搜索框中：事件委派（事件委托、事件代理）
			$('.suggest').delegate("div", "click", this.suggestClickHandler)
		}

		// 点击建议项处理
		suggestClickHandler(e) {
			// 将选中项内容填充到搜索框中
			$(".search input:first").val($(e.target).html())
			// 清空提示内容
			$(".suggest").empty()
		}

		// 提示建议处理
		suggesteHandler(e) {
			// 获取输入的内容
			const _val = $(e.target).val()
			// 跨域访问淘宝的提示接口:https://suggest.taobao.com/sug?code=utf-8&q=${word}&callback=${callback}
			const _url = `https://suggest.taobao.com/sug?code=utf-8&q=${_val}&callback=?`
			$.getJSON(_url, (data) => {
				// 相当于就是原生jsonp中定义的全局回调函数，用于处理响应回来的数据
				console.log(data)
				const html = data.result.map(curr => `<div>${curr[0]}</div>`).join("")
				$(".search .suggest").html(html)
			})
		}

		// 加载尾部
		loadFooter() {
			$('footer').load('/html/include/footer.html')
		}
	}

	return new LoadHeaderAndFooter()
})
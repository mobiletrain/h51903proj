require(['./config'], function() {
	require(['jquery', 'template', 'loadHF'], function($, template) {
		// List列表类
		class List {
			constructor() {
				this.initProductList()
			}

			// 初始化渲染页面
			initProductList() {
				const url = "http://www.xiongmaoyouxuan.com/api/tab/2"
				$.getJSON(url, function(resp){
					// 获取响应数据中需要使用部分
					const list = resp.data.items.list
					// 利用 art-template 渲染数据
					const data = { products: list }
					const html =  template('list-template', data)
					$(".prod_list").html(html)
				})

				/*const list = [
					{id: 1, title: 'xlkjsa', subtitle: 'aslfdkjasiow', price: 999, img: ''},
					{id: 2, title: 'asfd', subtitle: 'aslfdkjasiow', price: 999, img: ''},
					{id: 3, title: 'wqre', subtitle: 'aslfdkjasiow', price: 999, img: ''},
					{id: 4, title: '21432143', subtitle: 'aslfdkjasiow', price: 999, img: ''},
					{id: 5, title: 'wqreewqr', subtitle: 'aslfdkjasiow', price: 999, img: ''},
					{id: 6, title: '21421', subtitle: 'aslfdkjasiow', price: 999, img: ''},
				]

				setTimeout(function() {
					const data = { products: list }
					const html =  template('list-template', data)
					$(".prod_list").html(html)
				}, 2000)*/
			}
		}

		new List()
	})
})
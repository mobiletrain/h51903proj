require(['./config'], function() {
	require(['jquery', 'template', 'loadHF', 'fly', 'zoom'], function($, template) {
		// 商品详情类
		class Detail {
			constructor() {
				// 购物车数组，如果 localStorage 中有保存购物车数组，则转换为JS数组结构，否则创建空数组
				this.cart = JSON.parse(localStorage.getItem("cart")) || []

				this.init()
				this.addListener()
			}

			// 初始化渲染详情页面
			init() {
				// 获取待加载详情的商品id      ?id=xxxxxxxxx
				const _id = window.location.search.slice(4)
				// 构建请求后端的 url
				const url = `http://www.xiongmaoyouxuan.com/api/detail?id=${_id}`
				// ajax请求
				$.getJSON(url, resp => {
					// 获取响应数据中使用的商品信息部分
					const _prod = resp.data.detail
					// 准备渲染的数据
					const data = {prod: _prod}
					// 利用模板引擎渲染
					const html = template("detail-template", data)
					// 显示渲染结果
					$(".detail_box").prepend(html)

					// 添加放大镜效果
					$("img.prod-img").elevateZoom({
						gallery:'gallery',
						cursor: 'pointer',
						galleryActiveClass: 'active',
						tint:true,
						tintColour:'#F90',
						tintOpacity:0.5
					})
				})
				/*$.ajax({
					type: "get/post",
					url,
					data,
					dataType,
					success
				})
				$.get(url, data, success, dataType)
				$.getJSON(url, data, success)
				$.post()*/
			}

			// 注册事件监听
			addListener() {
				// 点击"加入购物车"按钮，触发表单提交的事件
				$(".detail_box").on("click", ".form-add-to-cart input:submit", this.addToCartHandler.bind(this))
			}

			// 加入购物车处理
			addToCartHandler(e) {
				// 阻止表单的默认提交
				e.preventDefault()
				// 获取表单的祖先元素 ".prod-detail"
				const parents = $(e.target).parents(".prod-detail")
				// 获取当前选购商品的信息
				const currProd = {
					id: parents.data("id"),
					title: parents.find(".prod-title").text(),
					image: parents.find(".prod-img").attr("src"),
					price: parents.find(".prod-price").text(),
					amount: 1
				}

				// 确认 localStorage 中保存的购物车数组
				// 如果不确认，可能多个页面同时打开添加购物车时会出现问题
				this.cart = JSON.parse(localStorage.getItem("cart")) || []

				// 判断在购物车数组中是否存在当前选购的商品
				const has = this.cart.some(prod => prod.id == currProd.id)
				// 如果存在，则修改数组，不存在，则添加到数组中
				if (has) {
					this.cart = this.cart.map(prod => {
						if (prod.id == currProd.id)
							prod.amount += 1
						return prod
					})
				} else {
					// 将当前选购商品保存到购物车数组中
					this.cart.push(currProd)
				}
				// 将购物车数组保存到 localStorage 中
				localStorage.setItem("cart", JSON.stringify(this.cart))

				// 加入购物车成功，添加抛物线效果
				this.fly(e)
			}

			// 加入购物车抛物线效果
			fly(e) {
				// 起点坐标
				const start = {
					top: e.pageY,
					left: e.pageX
				}
				// 终点坐标
				const end = $(".bag").offset()
				// 待运动的元素
				const flyerImgHtml = $(".prod-img").attr("src")
				const flyer = $(`<img src="${flyerImgHtml}" style="width: 40px;">`)
				// 实现抛物线运动
				flyer.fly({
					start,
					end,
					onEnd() {
						this.destroy()
					}
				})
			}
		}

		new Detail()
	})
})
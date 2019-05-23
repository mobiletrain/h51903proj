require(['./config'], function() {
	require(['jquery', 'template', 'loadHF'], function($, template) {
		// 购物车类
		class Cart {
			constructor() {
				// 购物车数组
				this.cart = JSON.parse(localStorage.cart) || []

				this.initCart()
				this.addListener()
			}

			// 初始化渲染购物车
			initCart() {
				// 如果购物车为空，则显示为空的提示信息
				if (this.cart.length === 0){
					$('.cart-empty').show()
								.next().hide()
					return
				}
				// 购物车非空
				$(".cart-empty").hide()
							.next().removeClass("hidden")
				// 渲染显示购物车内容
				const html = template("cart-template", {cart: this.cart})
				$(".cart-body").html(html)
			}

			// 添加事件监听
			addListener() {
				// 删除
				$(".cart-body").on("click", ".del", this.removeHandler.bind(this))
				// 加减数量
				$(".cart-body").on("click", ".increment, .decrement", this.modifyHandler.bind(this))
				// 输入修改数量
				$(".cart-body").on("blur", ".prod-amount", this.modifyHandler.bind(this))
				// 全选
				$(".chk_all").on("click", this.checkAllHandler.bind(this))
				// 部分选中
				$(".cart-body").on("click", ".chk-prod", this.checkProductHandler.bind(this))
			}

			// 删除处理
			removeHandler(e) {
				// 获取待删除的行
				const _tr = $(e.target).parents("tr")
				// 获取待删除行中商品的id
				const _id = _tr.data("id")
				// 从购物车数组中删除该 id 对应的商品元素
				this.cart = this.cart.filter(curr => curr.id != _id) // function(curr) {return curr.id != _id}
				// 从存储的结果中移除行所对应表示的商品
				localStorage.cart = JSON.stringify(this.cart)
				// 从DOM树中删除行
				_tr.remove()

				this.calcTotalPrice()
			}

			// 修改数量处理
			modifyHandler(e) {
				// 获取待修改数量的行
				const _tr = $(e.target).parents("tr")
				// 获取待修改的商品id
				const _id = _tr.data("id")
				// 将购物车数组中对应元素数量更新
				const prod = this.cart.find(curr => curr.id == _id) // 数组中存在的对应元素
				if ($(e.target).is(".increment")) { // 加
					prod.amount += 1
				} else if ($(e.target).is(".decrement")) { // 减
					if (prod.amount <= 1)
						return
					prod.amount -= 1
				} else if($(e.target).is(".prod-amount")) { // 输入修改数量
					// 获取输入的值
					const _val = $(e.target).val()
					// 判断输入是否合法
					if (!/^[1-9]\d*$/.test(_val)) { // 输入不是整数数字，则将数量还原为原始数量值
						$(e.target).val(prod.amount)
						return
					}
					prod.amount = Number(_val)
				}
				// 保存到 localStorage
				localStorage.cart = JSON.stringify(this.cart)
				// 更新显示修改后的数量及小计
				_tr.find(".prod-amount").val(prod.amount)
				_tr.find(".sub").text((prod.amount * prod.price).toFixed(2))

				this.calcTotalPrice()
			}

			// 全选、取消全选
			checkAllHandler(e) {
				// 获取“全选”复选框的选中状态
				// 通常 checked、selected、disabled 这些个属性值获取与设置使用 prop() 方法
				const _status = $(e.target).prop("checked")
				// 将各行前复选框选中状态设置为与“全选”状态一致
				$(".chk-prod").prop("checked", _status)

				this.calcTotalPrice()
			}

			// 部分选中
			checkProductHandler(e) {
				// console.log($(".chk-prod:checked"))
				$(".chk_all").prop("checked", $(".chk-prod:checked").length === this.cart.length)

				this.calcTotalPrice()
			}

			// 计算合计金额
			calcTotalPrice() {
				let sum = 0
				$(".chk-prod:checked").each((index, element) => {
					sum += Number($(element).parents("tr").find(".sub").text())
				})
				$(".total-price").text(sum.toFixed(2))
			}
		}

		new Cart()
	})
})
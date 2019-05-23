require(['./config'], function() {
	require(['jquery', 'loadHF'], function($) {
		class Register {
			constructor() {
				this.addListener()
			}

			addListener() {
				// 点击“注册”提交注册表单
				$('.btn-register').on('click', this.registerHandler)
			}

			// 实现注册处理
			registerHandler(e) {
				// 阻止表单的默认提交
				e.preventDefault()
				// 获取待提交的用户注册信息
				const data = $('.form-register').serialize()
				// 提交到后端注册:AJAX
				$.post('/api/register.php', data, (res) => {
					console.log(res)
					if (res.data.status === 1) { // 注册成功
						location = '/html/login.html'
					} else { // 注册失败
						$('.register-error').removeClass('hidden').text(res.data.message)
					}
				}, 'json')
			}
		}

		new Register()
	})
})
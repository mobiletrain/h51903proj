require(['./config'], function() {
	require(['jquery', 'loadHF'], function($) {
		class Login {
			constructor() {
				this.addListener()
			}

			addListener() {
				// 点击“登录”提交登录表单
				$('.form-login').on('submit', this.loginHandler)
			}

			// 实现登录处理
			loginHandler(e) {
				// 阻止表单的默认提交
				e.preventDefault()
				// 获取待提交的用户注册信息
				const data = $('.form-login').serialize()
				// 提交到后端注册:AJAX
				$.post('/api/login.php', data, (res) => {
					if (res.data.status === 1) { // 登录成功
						// 保存登录成功的用户信息
						// 将登录用户的用户名保存到 cookie （或 localStorage/sessionStorage）中
						sessionStorage.loginUser = $("input:text[name='email']").val()
						// 跳转到首页
						location = '/index.html'
					} else { // 登录失败
						$('.login-error').removeClass('hidden').text(res.data.message)
					}
				}, 'json')
			}
		}

		new Login()
	})
})
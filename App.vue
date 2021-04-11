<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getProvider({
				// oauth  代表授权登录
				service: 'oauth',
				success: function (res) {
					// 登录
					uni.login({
						provider: 'weixin',
						success: res => {
							//可以拿到code
							// console.log(res)
							let appid = 'wx9caf5b4ac8e3f908'
							// AppSecret
							let secret = '10ff20c2d0c0824a9e35a3df8d5f95ca'
							let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' +res.code + '&grant_type=authorization_code';
							uni.request({
								url: url, // 请求路径
								success: result => {
									// 获取Id(唯一的)
									console.log(result)
									getApp().globalData.openid = result.data.openid;
									console.log("这是openID:"+result.data.openid)
									
								},
							});
						},
					});
				},
			});
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>

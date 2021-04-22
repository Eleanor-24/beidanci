<template>
	<view class="wrap">
		<u-swiper @click="click()" :list="list" :effect3d="true" bg-color="#fff" :title="true" height="600" mode="none" :autoplay="false" border-radius="20"></u-swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						image: '/static/bg1.png',
						title: '开始复习'
					},
					{
						image: '/static/bg2.png',
						title: '开始测试'
					},
					{
						image: '/static/bg5.jpg',
						title: '查看历史成绩'
					}
				],
			}
		},
		methods: {
			click(index){
				// console.log(index)
				if(uni.getStorageSync("status")==1){
					if(index==0){
						uni.redirectTo({
							url:"/pages/index/review/review"
						})
					}else if(index==1){
						uni.redirectTo({
							url:"/pages/index/training/training"
						})
					}else{
						uni.redirectTo({
							url:"/pages/history/history"
						})
					}
				}else{
					uni.showToast({
						title:"请先登录",
						icon:"none"
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
		margin-top: 200rpx;
		
		
	}
	
</style>

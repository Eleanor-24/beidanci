<template>
	<view class="content">
		
		<view class="header">
			<img src="@/static/logo.png" alt="" class="photo">
			<view class="nickname">hey,阿白</view>
			<view class="tip">今天是你学习的第2天，累计学习0个单词</view>
			
		</view>
		<view class="card">
			<view class="calendar"><u-icon name="calendar" color="#fff" size="40"></u-icon></view>
			<view class="type">考研词汇</view>
			<view class="today">
				<view class="today_num">5</view>
				<view class="text">今日词汇</view>
			</view>
			<view class="pross">
				<view class="computed">0/5个</view>
				<u-line-progress active-color="#FED136" :percent="70"></u-line-progress>
			</view>
			<view class="button" @click="gotoStudy">开始学习</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gotoStudy(){
				uni.navigateTo({
					url:'/pages/study/study'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	height: 100%;
	width: 100%;
}
.content{
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	.header{
		height: 268rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 0 25rpx;
		justify-content: space-around;
		box-sizing: border-box;
		
		
		.photo{
			width: 84rpx;
			height: 84rpx;
			border-radius: 50%;
		}
			
		
		.nickname{
			font-size: 44rpx;
		}
		.tip{
			font-size: 22rpx;
			color: #B2B3B5;
		}
	}
	.card{
		position: relative;
		height: 660rpx;
		width: 624rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
		background-color: #fff;
		margin-top: 32rpx;
		border-radius: 20rpx;
		box-shadow: 0 0 20rpx #e0e0e0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.calendar{
			height: 80rpx;
			width: 80rpx;
			border-radius: 50%;
			background-color: #FED136;
			position: absolute;
			right: 40rpx;
			top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.type,.text,.computed{
			font-size: 32rpx;
			color: #B2B3B5;
		}
		.today_num{
			font-size: 92rpx;
			font-weight: 700;
			text-align: center;
		}
		.text{
			text-align: center;
		}
		.button{
			margin: 0 auto;
			width: 432rpx;
			height: 100rpx;
			border-radius: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #FED136;
			font-size: 40rpx;
			font-weight: 700;
		}
		
	}
}
</style>

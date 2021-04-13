<template>
<view class="content">
			<view class="card">
				<view class="word">word</view>
				<view class="pronun" @click="playAudio">
					<u-icon name="volume-up-fill" size="28"></u-icon>
					<view class="mask">/mask/</view>
				</view>
				
				<view class="means" v-if="isShow">
					{{means}}
				</view>
				
			</view>
			<view class="sentences" v-if="isShow">
				<view  v-for="(item,index) in sentenceList" :key="index">
					<view class="en">{{item.en}}</view>
					<view class="ch">{{item.ch}}</view>
				</view>
			</view>
			<view class="btns">
				<view class="btn">认识</view>
				<view class="btn">不认识</view>
			</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				isShow:false
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
page{
	height: 100%;
	.content{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.card{
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			width: 100%;
			height: 300rpx;
			padding-top: 20rpx;
			box-sizing: border-box;
			background-color: #FED136;
			.word{
				font-size: 64rpx;
				font-weight: 700;
			}
			.means{
				width: 80%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.pronun{
				display: flex;
			}
		}
		.sentences{
			width: 100%;
			height: 700rpx;
			margin-top: 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 40rpx;
			box-sizing: border-box;
		}
		.btns{
			width: 100%;
			height: 100rpx;
			position: fixed;
			bottom: 40rpx;
			display: flex;
			justify-content: space-around;
			.btn{
				width: 200rpx;
				height: 100rpx;
				padding: 10rpx;
				box-sizing: border-box;
				border-radius: 50rpx;
				background-color: #FED136;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		
	}
}

</style>

<template>
		<view class="content">
			<view class="card">
				<view class="word">word</view>
				<view class="pronun">
					<u-icon name="volume-up-fill" size="28"></u-icon>
					<view class="mask">/wo:d/</view>
				</view>
				<view class="mean">n.单词</view>
			</view>
			<view class="sentences">
				<view  v-for="(item,index) in sentenceList" :key="index">
					<view class="en">{{item.en}}</view>
					<view class="ch">{{item.ch}}</view>
				</view>
			</view>
			<view class="btns">
				<view class="btn"><u-icon name="arrow-left" color="#fff" size="36"></u-icon></view>
				<view class="btn"><u-icon name="star" color="#fff" size="36"></u-icon></view>
				<view class="btn"><u-icon name="arrow-right" color="#fff" size="36"></u-icon></view>
			</view>
		</view>

</template>

<script>
	export default {
		data() {
			return {
				sentenceList:[{
						en:"This is a word",
						ch:"这是个单词"
					},{
						en:"This is a word",
						ch:"这是个单词"
					},{
						en:"This is a word",
						ch:"这是个单词"
					}]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
	}
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
		.pronun{
			display: flex;
		}
	}
	.sentences{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 40rpx;
	}
	.btns{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100rpx;
		width: 100%;
		padding: 0 40rpx;
		box-sizing: border-box;
		.btn{
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background-color: #FED136;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	
}
</style>

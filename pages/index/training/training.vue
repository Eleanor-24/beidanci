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
			<view class="choices">
				<view  v-for="(item,index) in choicesList" :key="index" class="choiceitem" @click="chooseItem(item)" :style="{'border-color':item.border}">
					<view class="en">{{item.mean}}</view>
				</view>
			</view>
			
		</view>

</template>

<script>
	export default {
		data() {
			return {
				choicesList:[{
						mean:'n.单词',
						border: "#e0e0e0"
						
					},{
						mean:"n.发音",
						border: "#e0e0e0"
						
					},{
						mean:"n.世界",
						border: "#e0e0e0"
						
					},{
						mean:"adj.我的",
						border: "#e0e0e0"
						
				}]
			}
		},
		methods: {
			chooseItem(item){
				
				this.$set(item,"border",'#FED136')
			}
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
	.choices{
		width: 100%;
		height: 700rpx;
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		.choiceitem{
			height: 100rpx;
			width: 80%;
			border: 2rpx solid;
			border-radius: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	
}
</style>

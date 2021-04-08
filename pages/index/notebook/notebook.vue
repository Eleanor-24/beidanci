<template>
	<view class="content">
		<view class="notelist">
			<view v-for="(item,index) in noteList" :key="index" class="noteitem">
				<u-icon name="trash" color="#fa3534" size="28"></u-icon>
				<view class="word">{{item.word}}</view>
				<view class="mean">{{item.mean}}</view>
				<view style="flex: 1;display: flex;justify-content: flex-end;"><u-icon name="arrow-right" color="#82848" size="28" ></u-icon></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noteList:[
					{
						word:'word',
						mean:'n.单词'
					},
					{
						word:'word',
						mean:'n.单词'
					},
					{
						word:'word',
						mean:'n.单词'
					}
				]
			}
		},
		
		methods: {
			
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
	.notelist{
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		.noteitem{
			height: 100rpx;
			width: 100%;
			padding: 20rpx 40rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #e0e0e0;
			.word{
				margin-left: 30rpx;
				margin-right: 30rpx;
			}
		}
	}
}
</style>

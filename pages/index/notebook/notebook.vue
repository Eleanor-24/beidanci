<template>
	<view class="content">
		<view v-if="status==0">
			<u-empty :text="text" mode="list" margin-top="200"></u-empty>
		</view>
		<view v-else class="notelist" >
			<view v-for="(item,index) in noteList" :key="index" class="noteitem" @click="jumpToDetail(item.word_id)">
				
				<view  @tap.stop="removeNoteList(item._id)"><u-icon name="trash" color="#fa3534" size="28"></u-icon></view>
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
				status:1,
				noteList:[],
				text:"",
				show:false
			}
		},
		mounted(){
			if(uni.getStorageSync("status")==1){
				this.getLikeList()
			}else{
				this.status=0
				this.text="请先登录"
			}
			
		},
		methods: {
			getLikeList(){
				uniCloud.callFunction({
					name:"user_c",
					data:{
						type:"searchLikelist",
						openid:uni.getStorageSync("openid")
					}
				}).then(res=>{
					console.log(res)
				
					if(res.result.data.data.length==0){
						this.status=0
					}else{
						this.noteList=res.result.data.data
						this.text="列表为空"
					}
					
				})
			},
			removeNoteList(_id){
				this.show=true
				console.log(_id)
				uni.showModal({
					title:"提示",
					content:"是否移除该单词",
					success:(res)=>{
						if(res.confirm){
							uniCloud.callFunction({
								name:'user_c',
								data:{
									type:"removeLikeList",
									_id:_id
								}
							}).then(res=>{
								console.log(res)
								this.getLikeList()
								
							}).catch(err=>{
								console.log(err)
							})
						}
					}
				})
			},
			
			jumpToDetail(word_id){
				uni.navigateTo({
					url:"/pages/study/study?index="+word_id+"&from=notebook"
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

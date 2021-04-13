<template>
	<view class="content">
		<view class="header">
			<button   @click="getUserInfo" class="avabtn" :disabled="disabled">
				<img :src="avatarUrl" alt="" class="photo">
			</button>
			<view class="nickname">hey,{{nickName}}</view>
			<view class="tip">今天是你学习的第{{days}}天，累计学习{{studied}}个单词</view>
			
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
	// import user_c from '../../../common/user_c.js'
	export default {
		data() {
			return {
				disabled:false,
				userId:'',
				avatarUrl:'https://himg.bdimg.com/sys/portraitn/item/29f8aeb3',
				nickName:'游客',
				date:'',
				days:0,
				studied:0,
				like_list:[]
			}
		},
		mounted(){
			if(uni.getStorageSync("status")==1){
				this.nickName=uni.getStorageSync("nickname")
				this.avatarUrl=uni.getStorageSync("avatarUrl")
				this.getUserData(uni.getStorageSync("openid"))
			}
			
		},
		
			
		
		methods: {
			gotoStudy(){
				console.log(this.studied)
				if(uni.getStorageSync("status")==1){
					
					uni.redirectTo({
						url:'/pages/study/study?index='+this.studied
					})
				}else{
					uni.showToast({
						title:"请先登录",
						icon:"none"
					})
				}
				
			},
			
			getUserInfo(){
				
				uni.getUserProfile({
				    desc:'Wexin',     // 这个参数是必须的
				    success:res=>{
						this.disabled=true
				        console.log(res)
						this.nickName=res.userInfo.nickName
						this.avatarUrl=res.userInfo.avatarUrl
						uni.setStorageSync("nickname",this.nickName)
						uni.setStorageSync("avatarUrl",this.avatarUrl)
						uni.setStorageSync("status",1)//登录状态
						// console.log(openid)
						this.getUserData(uni.getStorageSync("openid"))
				    },
				    fail:err=>{
				        console.log(err)
				    }
				})
			},
			getUserData(openid){
				uniCloud.callFunction({
					name:"user_c",
					data:{
						type:"getUserData",
						openid:openid
					}
				}).then(res=>{
					console.log(res)
					if(res.result.msg=="查询失败"){
						//添加到数据库
						this.userDataAdd(openid,this.nickName,this.avatarUrl)
					}else{
						this.days=res.result.data.data[0].days
						console.log(res.result.data.data[0].studied.length)
						this.studied=res.result.data.data[0].studied.length
						console.log(this.studied)
						getApp().globalData._id=res.result.data.data[0]._id//索引
					}
				})
			},
			userDataAdd(openid,nickName,avatarUrl){
				uniCloud.callFunction({
					name:"user_c",
					data:{
						type:"addUserData",
						openid:openid,
						nickName:nickName,
						avatarUrl:avatarUrl
					}
				}).then(res=>{
					console.log(res)
					
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
	align-items: center;
	.header{
		height: 268rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 0 25rpx;
		justify-content: space-around;
		box-sizing: border-box;
		.avabtn{
			width: 84rpx;
			height: 84rpx;
			border: none;
			border-radius: 50%;
			margin: 0;
			padding: 0;
			background-color: transparent;
		}
		
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

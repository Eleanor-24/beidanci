<template>
		<view class="content">
			<view v-if="status==0">
				<u-empty :text="text" mode="list" margin-top="200"></u-empty>
			</view>
			<view v-else>
				<view class="card">
					<view class="word">{{word}}</view>
				</view>
				<view class="choices">
					
					<view class="choiceitem" @click="choice($event)" :id="da4"  :style="{'border-color':border0}">{{da4}}</view>
					<view class="choiceitem" @click="choice($event)" :id="da3"  :style="{'border-color':border1}">{{da3}}</view>
					<view class="choiceitem" @click="choice($event)" :id="da2"  :style="{'border-color':border2}">{{da2}}</view>
					<view class="choiceitem" @click="choice($event)" :id="da1"  :style="{'border-color':border3}">{{da1}}</view>
				</view>
				<u-popup v-model="show" mode="center"  width="600rpx" height="400px" border-radius="14" :mask-close-able="false">
					<view style="width: 100%;height: 100%; display: flex;flex-direction: column;align-items: center;justify-content: center;">
						<view style="font-size: 32rpx;color: #555;">你的成绩是</view>
						<view style="font-size: 40rpx;color: #fa3534;font-weight: 700;margin-top: 40rpx;">{{score}}</view>
						<view style="width: 100%;padding: 0 20rpx; display: flex;justify-content: space-around;margin-top: 100rpx;">
							<view style=" width: 200rpx;color:#fff; height: 80rpx;border-radius: 40rpx;background-color: #FED136;display: flex;justify-content: center;
							align-items: center;" @click="backHome()">返回首页</view>
							<view style=" width: 200rpx;color:#fff; height: 80rpx;border-radius: 40rpx;background-color: #FED136;display: flex;justify-content: center;
							align-items: center;" @click="gotoHistory()">查看历史成绩</view>
						</view>
					</view>
					
				</u-popup>
			</view>
			
			
		</view>

</template>

<script>
	import kaoyan from '../../../common/kaoyan.js'
	export default {
		data() {
			return {
				status:1,
				text:"",
				show:false,
				score:0,
				index:0,
				word:'',
				da1:'',
				da2:'',
				da3:'',
				da4:'',
				dataList:[],
				
				border0:"#e0e0e0",
				border1:"#e0e0e0",
				border2:"#e0e0e0",
				border3:"#e0e0e0",
				truemean:''
			}
		},
		mounted(){
			if(uni.getStorageSync("status")==1){
				this.requestWordData(this.index)
			}else{
				this.status=0
				this.text="请先登录"
			}
			
		},
		methods: {
			saveScore(){
				let year =new Date().getFullYear()
				let month=new Date().getMonth()+1
				month = month < 10 ? '0' + month : month;
				let day =new Date().getDate()
				day = day < 10 ? '0' + day : day;
				let second=new Date().getSeconds()
				
				let date=year+'-'+month+'-'+day
				uniCloud.callFunction({
					name:"user_c",
					data:{
						type:"saveScore",
						openid:uni.getStorageSync("openid"),
						score:this.score,
						date:date
						
					}
				}).then(res=>{
					console.log(res)
				})
			},
			backHome(){
				this.saveScore()
				uni.redirectTo({
					url:"/pages/index/home/home"
				})
			},
			gotoHistory(){
				this.saveScore()
				uni.redirectTo({
					url:"/pages/history/history"
				})
			},
			requestWordData(index){
				uniCloud.callFunction({
					name:"user_c",
					data:{
						type:"searchTestKu"
					}
				}).then(res=>{
					console.log(res)
					this.dataList=res.result.data.data
					this.showData(index)
					
				})
			},
			showData(index){
				this.word=this.dataList[index].word
				this.truemean=this.dataList[index].truemean
				let wrong1=this.dataList[index].wrong1
				let wrong2=this.dataList[index].wrong2
				let wrong3=this.dataList[index].wrong3
				
				let choices=[]
				choices.push(this.truemean,wrong1,wrong2,wrong3);
				let rand1 = Math.floor(Math.random()*4+0);
				let rand2 = Math.floor(Math.random() * 4 + 0);
				let rand3 = Math.floor(Math.random() * 4 + 0);
				let rand4 = Math.floor(Math.random() * 4 + 0);
				//判断rand是否重复
				while((rand1==rand2)||(rand1==rand3)||(rand1==rand4)||(rand2==rand3)||(rand2==rand4)||(rand3==rand4)){
				  rand1 = Math.floor(Math.random() * 4 + 0);
				  rand2 = Math.floor(Math.random() * 4 + 0);
				  rand3 = Math.floor(Math.random() * 4 + 0);
				  rand4 = Math.floor(Math.random() * 4 + 0);
				}
				this.da1=choices[rand1]
				this.da2=choices[rand2]
				this.da3=choices[rand3]
				this.da4=choices[rand4]
			},
			choice(e){
				console.log(e)
				if(e.target.id==this.da4){
					if(this.da4==this.truemean){
						this.border0="#19b16b"
						this.score+=10
					}else{
						this.border0="#fa3534"
						
					}
					this.showTrue()
				}
				if(e.target.id==this.da3){
					if(this.da3==this.truemean){
						this.border1="#19b16b"
						this.score+=10
					}else{
						this.border1="#fa3534"
						
					}
					this.showTrue()
				}
				if(e.target.id==this.da2){
					if(this.da2==this.truemean){
						this.border2="#19b16b"
						this.score+=10
					}else{
						this.border2="#fa3534"
						
					}
					this.showTrue()
				}
				if(e.target.id==this.da1){
					if(this.da1==this.truemean){
						this.border3="#19b16b"
						this.score+=10
					}else{
						this.border3="#fa3534"
						
					}
					this.showTrue()
				}
			},
			showTrue(e){
				if(this.da4==this.truemean){
					this.border0="#19b16b"
				}
				if(this.da3==this.truemean){
					this.border1="#19b16b"
				}
				if(this.da2==this.truemean){
					this.border2="#19b16b"
				}
				if(this.da1==this.truemean){
					this.border3="#19b16b"
				}
				setTimeout(()=>{
					this.index++;
					this.border0="#e0e0e0"
					this.border1="#e0e0e0"
					this.border2="#e0e0e0"
					this.border3="#e0e0e0"
					if(this.index==this.dataList.length-1){
						this.show=true
					}else{
						this.requestWordData(this.index)
					}
					
				},1500)
				
				
				
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
			border: 2rpx solid ;
			border-radius: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	
}
</style>

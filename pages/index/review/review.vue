<template>
		<view class="content">
			<view v-if="status==0">
				<u-empty :text="text" mode="list" margin-top="200"></u-empty>
			</view>
			<view  v-else>
				<view class="card">
					<view class="word">{{word}}</view>
					
					<view class="means" v-if="stnShow">
						{{means}}
					</view>
					
				</view>
				<view class="sentences" v-if="stnShow">
					<view  v-for="(item,index) in sentenceList" :key="index">
						<view class="en">{{item.en}}</view>
						<view class="ch">{{item.ch}}</view>
					</view>
				</view>
				<view v-else>
					<u-empty text="先思考一下" mode="page" margin-top="200"></u-empty>
				</view>
				<view class="btns">
					<view class="btn" @click="clickKnow()" v-if="click">认识</view>
					<view class="btn" @click="clikUnknow()" v-if="click">不认识</view>
					<view class="btn" @click="reviewNext()">下一个</view>
				</view>
			</view>
		</view>

</template>

<script>
	export default {
		data() {
			return {
				status:1,
				stnShow:false,
				word:'',
				means:'',
				sentenceList:[],
				index:0,
				date:'',
				unknowList:[],
				knowCount:0,
				unknowCount:0,
				click:true,
				dataList:[],
				_id:'',
				text:"",
				
				
			}
		},
		mounted(){
			if(uni.getStorageSync("status")==1){
				let year =new Date().getFullYear()
				let month=new Date().getMonth()+1
				let day =new Date().getDate()
				this.date=year+'-'+month+'-'+day
				this.getStudiedData(this.index,this.date)
			}else{
				this.status=0
				this.text="请先登录"
			}
			
		},
		
		
		methods: {
			getStudiedData(index,date){
				
				uniCloud.callFunction({
					name:"user_c",
					data:{
						type:"searchStudied",
						openid:uni.getStorageSync("openid"),
						index:index,
						date:date
					}
				}).then(res=>{
					console.log(res)
					this.dataList=res.result.data
					
					if(res.result.msg=="已经是最后一个"){
						uni.showModal({
							content:"已经是最后一个单词，是否继续复习",
							success:(res)=>{
								if(res.confirm){
									
										uni.redirectTo({
											url:"/pages/index/review/review"
										})
									
									
								}
							}
						})
					}else if(res.result.msg=="还没有学习"){
						this.status=0
						this.text="今天还没有学习新单词，先去学习再来吧~"
					}else{
						this.showData(index)
					}
				})
			},
			showData(index){
				
				this.stnShow=false
				this.click=true
				if(this.dataList.length==0){
					this.status=0
					this.text="今日还没有学习新单词"
				}else if(index>=this.dataList.length){
					uni.showModal({
						content:"已经是最后一个单词，是否继续复习",
						success:(res)=>{
							if(res.confirm){
								uni.redirectTo({
									url:"/pages/index/review/review"
								})
							}
						}
					})
				}else{
					this.word=this.dataList[index].word
					this.means=this.dataList[index].mean
					this._id=this.dataList[index]._id
					this.weight=this.dataList[index].weight
					this.$request(this.dataList[index].word).then(res2=>{
						let sentenceList=[];
						for(let i=0;i<res2.web.length;i++){
							sentenceList.push({
								en:res2.web[i].key,
								ch:res2.web[i].value[0]
							})
						}
						this.sentenceList=sentenceList
						
					})
				}
				
			},
			clikUnknow(){
				this.stnShow=true
				this.click=false
				this.weight+=0.5;
				
			},
			clickKnow(){
				this.stnShow=true
				this.weight-=0.5;
				this.click=false
				uniCloud.callFunction({
					name:"user_c",
					data:{
						type:"updateWeight",
						_id:this._id,
						weight:this.weight
					}
				}).then(res=>{
					console.log(res)
				})
				
			},
			reviewNext(){
				this.index++;
				this.showData(this.index)
				uniCloud.callFunction({
					name:"user_c",
					data:{
						type:"updateWeight",
						_id:this._id,
						weight:this.weight
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
			position: fixed;
			bottom: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			height: 100rpx;
			width: 100%;
			padding: 0 40rpx;
			box-sizing: border-box;
			.btn{
				width: 140rpx;
				height: 80rpx;
				border-radius: 40rpx;
				background-color: #FED136;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		
	}
}

</style>


</style>

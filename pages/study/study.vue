<template>
		<view class="content">
			<view class="card">
				<view class="word">{{word}}</view>
				<view class="pronun">
					<u-icon name="volume-up-fill" size="28"></u-icon>
					<view class="mask">/{{mask}}/</view>
				</view>
				<view class="means">
					<view class="mean" v-for="(item,index) in means" v-if="index<3">{{item}}</view>
				</view>
				
			</view>
			<view class="sentences">
				<view  v-for="(item,index) in sentenceList" :key="index">
					<view class="en">{{item.en}}</view>
					<view class="ch">{{item.ch}}</view>
				</view>
			</view>
			<view class="btns" v-if="isShow">
				<view class="btn" @click="clickLast()"><u-icon name="arrow-left" color="#fff" size="36" ></u-icon></view>
				<view class="btn" @click="addToLikelist()"><u-icon name="plus" color="#fff" size="36"></u-icon></view>
				<view class="btn"  @click="clickNext()"><u-icon name="arrow-right" color="#fff" size="36"></u-icon></view>
			</view>
		</view>

</template>

<script>
	import CryptoJS from 'crypto-js'
	import kaoyan from '../../common/kaoyan.js'
	export default {
		data() {
			return {
				word:'',
				mask:'',
				means:[],
				sentenceList:[],
				voice:'',
				index:0,
				maxIndex:0,
				isShow:true
				
			}
		},
		onLoad(opt){
			console.log(opt.from)
			if(opt.from=="notebook"){
				this.isShow=false
			}
			this.index=opt.index
			this.maxIndex=opt.index
			this.requestWordData(opt.index)
			
		},
		beforeDestroy(){
			console.log(this.maxIndex)
			let studied=[];
			for(let i=0;i<this.maxIndex;i++){
				studied.push(kaoyan.wordList[i])
			}
			console.log(getApp().globalData._id)
			uniCloud.callFunction({
				name:"user_c",
				data:{
					type:"updateStudied",
					_id:getApp().globalData._id,
					studied:studied
				}
				}).then(res=>{
					console.log(res)
					
			})
			
		},
		methods: {
			requestWordData(index){
				let wordList=kaoyan.wordList
				this.word=wordList[index];
				this.$request(wordList[index]).then(res=>{
					console.log(res)
					this.mask=res.basic.phonetic
					this.means=res.basic.explains
					this.voice=res.speakUrl
					let sentenceList=[];
					for(let i=0;i<res.web.length;i++){
						sentenceList.push({
							en:res.web[i].key,
							ch:res.web[i].value[0]
						})
					}
					this.sentenceList=sentenceList
					// this.index=index
				})
			},
			clickNext(){
				this.index++;
				if(this.index>this.maxIndex){
					this.maxIndex=this.index
				}
				// console.log(this.index)
				this.requestWordData(this.index)
				
			},
			clickLast(){
				this.index--;
				if(this.index==0){
					uni.showToast({
						title:"已经是第一个单词",
						icon:"none"
					})
				}
				this.requestWordData(this.index)
			},
			addToLikelist(){
				uniCloud.callFunction({
					name:"user_action",
					data:{
						type:"addLikelist",
						word_id:this.index,
						openid:uni.getStorageSync("openid"),
						word:this.word,
						mean:this.means[0]
					}
					}).then(res=>{
						console.log(res)
						uni.showToast({
							title:"添加到单词本",
							icon:"success"
						})
						
				}).catch(err=>{
					console.log(err)
					uni.showToast({
						title:"单词已在单词本中",
						icon:"none"
					})
				})
				
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
		.means{
			width: 80%;
			.mean{
				display: inline;
			}
			// justify-content: space-around;
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

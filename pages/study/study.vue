<template>
		<view class="content">
			<view class="card">
				<view class="word">{{word}}</view>
				<view class="pronun" @click="playAudio">
					<u-icon name="volume-up-fill" size="28"></u-icon>
					<view class="mask">/{{mask}}/</view>
				</view>
				<view class="means">
					{{means}}
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
				means:'',
				sentenceList:[],
				voice:'',
				index:0,
				maxIndex:0,
				isShow:true,
				studied:[],
				like_list:[],
			
				
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
		
		methods: {
			playAudio(){
				console.log(this.voice)
				const Audio = uni.createInnerAudioContext();
				Audio.autoplay = true;
				Audio.src = "http://dict.youdao.com/dictvoice?audio="+this.word; //音频地址  
				Audio.play(); //执行播放  
			},
			requestWordData(index){
				let wordList=kaoyan.wordList
				this.word=wordList[index];
				this.$request(wordList[index]).then(res=>{
					console.log(res)
					this.mask=res.basic.phonetic
					this.means=res.basic.explains[0]
					this.voice=res.speakUrl
					let sentenceList=[];
					for(let i=0;i<res.web.length;i++){
						sentenceList.push({
							en:res.web[i].key,
							ch:res.web[i].value[0]
						})
					}
					this.sentenceList=sentenceList
					let year =new Date().getFullYear()
					let month=new Date().getMonth()+1
					let day =new Date().getDate()
					let date=year+'-'+month+'-'+day
					this.date=date
					
				})
			},
			
			clickNext(){
				this.index++;
				uniCloud.callFunction({
					name:"user_c",
					data:{
						type:"updateStudied",
						openid:uni.getStorageSync("openid"),
						word_id:this.index-0,
						word:this.word,
						mean:this.means,
						date:this.date
						
					}
				}).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
				
				if(this.index>this.maxIndex){
					this.maxIndex=this.index
				}
				
				
				
				this.requestWordData(this.index)
				
				
				
			},
			clickLast(){
				this.index--;
				if(this.index==-1){
					this.index=0
					uni.showToast({
						title:"已经是第一个单词",
						icon:"none"
					})
				}
				this.requestWordData(this.index)
			},
			addToLikelist(){
					uniCloud.callFunction({
						name:"user_c",
						data:{
							type:"addLikelist",
							openid:uni.getStorageSync("openid"),
							word_id:this.index,
							word:this.word,
							mean:this.means.substring(0,this.means.indexOf("；"))
						}
						}).then(res=>{
							console.log(res)
							if(res.result==null){
								uni.showToast({
									title:"单词已在单词本中",
									icon:"none"
								})
							}else{
								uni.showToast({
									title:"添加到单词本",
									icon:"success"
								})
							}
							
						
							
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
}

</style>

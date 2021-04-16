<template>
	<view>
		<button class="sign" @click="sign">打卡</button>
		<imt-calendar :selected="selected" v-if="length==0||selected.length!=0" color="#FED136"></imt-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selected:[],
				length:1,
				_id:"",
				
				
			}
		},
		onLoad(){
			this.getSign()
		},
		methods: {
			getSign(){
				uniCloud.callFunction({
					name:"user_c",
					data:{
						type:"searchSign",
						openid:uni.getStorageSync("openid")
					}
				}).then(res=>{
					console.log(res)
					if(res.result.data.data.length==0){
						this.length=0
					}else{
						this.selected=res.result.data.data[0].selected
						this._id=res.result.data.data[0]._id
						console.log(this._id)
					}
					
				})
			},
			sign(){
				
				let year =new Date().getFullYear()
				let month=new Date().getMonth()+1
				month = month < 10 ? '0' + month : month;
				let day =new Date().getDate()
				let date=year+'-'+month+'-'+day
				if(this.length==0){
					uniCloud.callFunction({
						name:"user_c",
						data:{
							type:"addSign",
							openid:uni.getStorageSync("openid"),
							selected:date
							
						}
					}).then(res=>{
						console.log(res)
						 uni.showToast({
						     title:"打卡成功",
						     duration:1000
						 });
						setTimeout(function(){
							let that=this
							uni.redirectTo({
								url:"/pages/sign/sign",
								success:()=>{
								
									console.log(that.disabled)
								}
							})
						},1000)
						
						
					})
				}else{
					uniCloud.callFunction({
						name:"user_c",
						data:{
							type:"updateSign",
							_id:this._id,
							date:date
							
						}
					}).then(res=>{
						console.log(res)
						uni.showToast({
						     title:"打卡成功",
						     duration:1000
						 });
						 
						setTimeout(function(){
							
							uni.redirectTo({
								url:"/pages/sign/sign",
								success:()=>{
									
									console.log(this.disabled)
								}
							})
						},1000)
						
					})
				}
				
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.sign{
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100rpx;
	height: 60rpx;
	border-radius: 40rpx;
	background-color: #FED136;
	color: #FFFFFF;
	border: none;
	margin: 0;
	padding: 0;
	
}
</style>

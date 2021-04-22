<template>
	<view>
		<view style="padding: 20rpx;box-sizing: border-box; display: flex;align-items: center;justify-content: center;width: 100%;font-size: 28rpx;font-weight: 700;">最近20次的成绩</view>
		<u-table>
			<u-tr class="u-tr">
				<u-th class="u-th">昵称</u-th>
				<u-th class="u-th">成绩</u-th>
				<u-th class="u-th">日期</u-th>
			</u-tr>
			<u-tr class="u-tr" v-for="(item,index) in dataList" :key="index">
				<u-td class="u-td">{{nickName}}</u-td>
				<u-td class="u-td">{{item.score}}</u-td>
				<u-td class="u-td">{{item.date}}</u-td>
			</u-tr>
		</u-table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[],
				nickName:""
			}
		},
		onLoad(){
			this.getUserScore()
		},
		methods: {
			getUserScore(){
				uniCloud.callFunction({
					name:"user_c",
					data:{
						type:"getUserScore",
						openid:uni.getStorageSync("openid")
					}
				}).then(r=>{
					console.log(r)
					this.dataList=r.result.res.data[0].score
					this.nickName=r.result.user.data[0].nickName
					
				})
			}
		}
	}
</script>

<style>

</style>

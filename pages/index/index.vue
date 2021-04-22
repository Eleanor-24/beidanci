<template>
	<view class="content">
		<view v-if="current==0">
			<home></home>
		</view>
		<view v-else-if="current==1">
			<notebook></notebook>
		</view>
		<!-- <view v-else-if="current==2">
			<review></review>
		</view> -->
		<view v-else>
			<welcome></welcome>
		</view>
		<view style="position: fixed; bottom: 0;left: 0;">
			<u-tabbar v-model="current" :list="list" active-color="#FED136"></u-tabbar>
		</view>
		
	</view>
	
</template>

<script>
	import home from "@/pages/index/home/home.vue"
	import notebook from '@/pages/index/notebook/notebook.vue'
	import training from '@/pages/index/training/training.vue'
	import review from '@/pages/index/review/review.vue'
	import welcome from '@/pages/index/welcome/welcome.vue'
	export default {
		data() {
			return {
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
					},
					{
						iconPath: "star",
						selectedIconPath: "star-fill",
						text: '单词本',
					},
					{
						iconPath: "edit-pen",
						selectedIconPath: "edit-pen-fill",
						text: '加强',
						
					}
				],
				current:0,
				
			}
		},
		components:{
			home,
			notebook,
			training,
			review,
			welcome
		},
		onLoad() {
			
			
		},
		methods: {
			tabSwitch(index){
				console.log(index)
				this.current=index
				
			},
			
		}
	}
</script>

<style lang="scss" scoped >
	
.content{
	height: 100%;
	width: 100%;
}
</style>

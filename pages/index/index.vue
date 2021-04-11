<template>
	<view>
		<view v-if="current==0">
			<home></home>
		</view>
		<view v-else-if="current==1">
			<notebook></notebook>
		</view>
		<view v-else>
			<training></training>
		</view>
		<u-tabbar v-model="current" :list="list" active-color="#FED136"></u-tabbar>
	</view>
	
</template>

<script>
	import home from "@/pages/index/home/home.vue"
	import notebook from '@/pages/index/notebook/notebook.vue'
	import training from '@/pages/index/training/training.vue'
	export default {
		data() {
			return {
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '学习',
					},
					{
						iconPath: "file-text",
						selectedIconPath: "file-text-fill",
						text: '单词本',
					},
					
					{
						iconPath: "edit-pen",
						selectedIconPath: "edit-pen-fill",
						text: '练习',
						
					}
				],
				current:0,
				
			}
		},
		components:{
			home,
			notebook,
			training
		},
		onLoad() {
			
			
		},
		methods: {
			tabSwitch(index){
				this.current=index
				
			},
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

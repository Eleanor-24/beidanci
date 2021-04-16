<template>
	<view class="content">
		<imt-calendar :selected="data"></imt-calendar>
	</view>
</template>

<script>
	import imtCalendar from 'components/imt-calendar/imt-calendar'
	export default {
		data() {
			return {
				data:['2018-10-14','2018-11-11','2019-01-02','2019-02-15','2019-03-29']
			}
		},
		components: {
			imtCalendar
		}
	}
</script>

<style>
	page{
		background: #f2f2f2;
	}
	.content{
		padding-top: 30upx;
	}
</style>
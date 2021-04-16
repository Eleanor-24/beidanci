export default function btfRequest(){
	let apiKey='b6edb18be77e49b25f2a35dae34dffd5'
	return new Promise((resolve,reject)=>{
		uni.request({
			 url: 'http://api.tianapi.com/txapi/everyday/index',
			 methods: 'get',
			 type:'json',
			 
			 data: {
			     key:apiKey
			 },
			 success(res){
			 	// uni.hideLoading()
			 	
			 	resolve(res.data)
			 },
			 fail(err){
			 	reject(err)
			 },
			 
		})
	})
}
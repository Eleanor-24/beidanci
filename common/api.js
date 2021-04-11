import CryptoJS from 'crypto-js'
export default function request(query){
	var appKey = '271a22bbba77fe3c';
	var key = '9pBWNewJljiPQwOht1uYDH44UmKgsQzf';//注意：暴露appSecret，有被盗用造成损失的风险
	var salt = (new Date).getTime();
	var curtime = Math.round(new Date().getTime()/1000);
	var query = query;
	// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
	var from = 'zh-CHS';
	var to = 'en';
	var str1 = appKey + truncate(query) + salt + curtime + key;
	var vocabId =  '';
	var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
	return new Promise((resolve,reject)=>{
		uni.request({
			 url: 'http://openapi.youdao.com/api',
			 methods: 'post',
			 header: {'content-type':'application/json'},
			 type:'json',
			 data: {
			     q: query,
			     appKey: appKey,
			     salt: salt,
			     from: from,
			     to: to,
			     sign: sign,
			     signType: "v3",
			     curtime: curtime,
			     vocabId: vocabId,
			 },
			 success(res){
			 	uni.hideLoading()
			 	
			 	resolve(res.data)
			 },
			 fail(err){
			 	reject(err)
			 },
			 
		})
	})
			
}

function truncate(q){
	var len = q.length;
	if(len<=20) return q;
	return q.substring(0, 10) + len + q.substring(len-10, len);
}

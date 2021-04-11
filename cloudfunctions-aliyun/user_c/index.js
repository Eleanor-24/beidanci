'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	if(event.type=='getUserData'){
		let result=await db.collection('user_common').where({
			openid:event.openid
		}).get()
		if(result.data.length==0){
			return {
				code:"200",
				msg:"查询失败",
				data:result
			}
		}else{
			return {
				code:"200",
				msg:"查询成功",
				data:result
			}
		}
		 
	}
	if(event.type=="addUserData"){
		let result=await db.collection('user_common').add({
			openid:event.openid,
			nickName:event.nickName,
			avatarUrl:event.avatarUrl,
			like_list:[],
			days:0,
			studied:[]
		})
		return {
			code:"200",
			msg:"插入成功",
			data:result
		}
	}
	if(event.type=="updateStudied"){
		let result=await db.collection('user_common').doc(event._id).update({
			studied:event.studied
		})
		return {
			code:"200",
			msg:"更新成功",
			data:result
		}
	}
	

};

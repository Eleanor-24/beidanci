'use strict';
const db = uniCloud.database()
const _ = db.command
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
			avatarUrl:event.avatarUrl
		})
		return {
			code:"200",
			msg:"插入成功",
			data:result
		}
	}
	if(event.type=="searchStudiedLength"){
		let result = await db.collection('user_studied').where({
			openid:event.openid
		}).count()
		return {
			code:"200",
			msg:"查询成功",
			data:result,
		}
	}
	if(event.type=="searchStudied"){
		let result=await db.collection('user_studied').where({
			openid:event.openid,
		}).orderBy('weight','desc').get()
		let total = await db.collection('user_studied').where({
			openid:event.openid
		}).count()
		if(event.index>=total.total){
			return{
				code:"200",
				msg:"已经是最后一个",
			}
		}
		else if(result.data){
			return {
				code:"200",
				msg:"查询已学成功",
				total:total.total,
				data:result.data,
				index:event.index
			}
		}
		else{
			return {
				code:"200",
				msg:"还没有学习",
			}
		}
		
	}
	if(event.type=="updateStudied"){
		let exist =await db.collection('user_studied').where({
			openid:event.openid,
			word_id:event.word_id
		}).get()
		if(exist.data.length==0){
			let result=await db.collection('user_studied').add({
				openid:event.openid,
				word_id:event.word_id,
				word:event.word,
				mean:event.mean,
				date:event.date,
				weight:0
			})
			
			return {
				code:"200",
				msg:"更新成功",
				data:result,
				exist:exist
			}
		}
		
	}
	if(event.type=='updateWeight'){
		let result =await db.collection('user_studied').doc(event._id).update({
			weight:event.weight
		})
		return {
			code:"200",
			msg:"更新权重成功",
			data:result
		}
		
	}
	if(event.type=="searchLikelist"){
		let result=await db.collection('user_book').where({
			openid:event.openid
		}).get()
		return {
			code:"200",
			msg:"查询单词本成功",
			data:result
		}
	}
	if(event.type=="addLikelist"){
		let exist =await db.collection('user_book').where({
			openid:event.openid,
			word_id:event.word_id
		}).get()
		if(exist.data.length==0){
			let result=await db.collection('user_book').add({
				openid:event.openid,
				word_id:event.word_id,
				word:event.word,
				mean:event.mean
			})
			
			return {
				code:"200",
				msg:"更新成功",
				data:result,
				exist:exist
			}
		}
	}
	if(event.type=="removeLikeList"){
		let result =await db.collection('user_book').doc(event._id).remove()
		return {
			code:"200",
			msg:"删除成功",
			data:result,
			_id:event._id
		}
	}
	if(event.type=="searchSign"){
		let result =await db.collection('user_sign').where({
			openid:event.openid
		}).get()
		
			return {
				code:"200",
				msg:"查询成功",
				data:result,
			
			}
		
		
	}
	if(event.type=="updateSign"){
		let result =await db.collection('user_sign').doc(event._id).update({
			selected:_.push(event.date)
		})
		return {
			code:"200",
			msg:"更新成功",
			data:result,
		} 
	}
	// if(event.type=="addSign"){
	// 	let result =await db.collection('user_sign').add({
	// 		openid:event.openid,
	// 		selected:[event.selected]
	// 	})
	// 	return {
	// 		code:"200",
	// 		msg:"添加成功",
	// 		data:result,
	// 	} 
	// }
	if(event.type=="searchTestKu"){
		let result =await db.collection('testKu').get()
		return {
			code:"200",
			msg:"题库返回成功",
			data:result,
		} 
	}
	
	if(event.type=="saveScore"){
		let res=await db.collection('user_score').where({
			openid:event.openid
		}).get()
		if(res.data.length!=0){
			let _id=res.data[0]._id
			let result =await db.collection('user_score').doc(_id).update({
				score:_.push({date:event.date,score:event.score})
			})
			return {
				code:"200",
				msg:"添加成绩成功",
				data:result
			} 
		}else{
			let result =await db.collection('user_score').add({
				openid:event.openid,
				score:[{date:event.date,score:event.score}]
			})
			return {
				code:"200",
				msg:"添加成绩成功",
				data:result
			} 
		}
		
		
	}
	if(event.type=="getUserScore"){
		let res=await db.collection('user_score').where({
			openid:event.openid
		}).limit(20)
		.get()
		let user=await db.collection('user_common').where({
			openid:event.openid
		}).get()
		return {
			code:"200",
			msg:"添加成绩成功",
			res:res,
			user:user
		} 
		
	}
	

};

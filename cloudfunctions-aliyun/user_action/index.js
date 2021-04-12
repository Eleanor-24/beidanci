'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	if(event.type=="addLikelist"){
		let result=await db.collection('user_book').add({
			word_id:event.word_id,
			openid:event.openid,
			word:event.word,
			mean:event.mean
		})
		return {
			code:"200",
			msg:"添加单词本成功",
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
};

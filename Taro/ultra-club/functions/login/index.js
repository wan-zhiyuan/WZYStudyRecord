// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
   env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
   // const wxContext = cloud.getWXContext()

   const { userInfo } = event
   console.log('event',event);
   try {
      const { data } = await db
      .collection('user')
      .where({
         nickName: userInfo.nickName
      })
      .get()

      if (data.length > 0) {
         // 用户存在，直接返回此用户数据
         return {
            user: data[0]
         }
      } else {
         // 用户不存在，插入用户数据并返回
         const { _id } = await db
         .collection('user')
         .add({
            data: {
               ...userInfo,
               createdAt: db.serverDate(),
               updatedAt: db.serverDate(),
            }
         })

         const user = await db.collection('user').doc(_id)

         return {
            user,
         }
      }

   } catch (err) {
      console.error(`login ERR: ${err}`);
   }

   // return {
   //    event,
   //    openid: wxContext.OPENID,
   //    appid: wxContext.APPID,
   //    unionid: wxContext.UNIONID,
   // }
}
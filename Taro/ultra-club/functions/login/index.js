// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
   env: cloud.DYNAMIC_CURRENT_ENV
   // env: 'ultra-club-6g1sg2rx8e3afd48'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
   const { userInfo } = event
   console.log('event', event);
   try {
      const { data } = await db
         .collection('user')
         .where({
            nickName: userInfo.nickName
         })
         .get()
      console.log('get');
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
         console.log('add');
         const user = await db.collection('user').doc(_id) // 获取指定引用的记录，返回仅一条记录，非数组
         console.log('doc');
         return { user, }
      }

   } catch (err) {
      console.error(`login ERR: ${err}`);
   }

}
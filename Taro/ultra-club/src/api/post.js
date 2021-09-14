import Taro from '@tarojs/taro'

async function createPost(postData, userId) {
    const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
    const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY

    console.log('postData', postData, userId);

    try {
        if (isWeapp) {
            const { result } = await Taro.cloud.callFunction({
                name: 'createPost', // 调用的云函数名
                data: { // 传递给云函数的参数
                    postData,
                    userId,
                },
            })

            return result.post // 接口返回为 { post: { ...newPost.data } }
        }
    } catch (err) {
        console.error('createPost ERR:',err);
    }
}

async function getPosts() {
    const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

    try {
        if (isWeapp) {
            const { result } = await Taro.cloud.callFunction({
                name: 'getPosts',
            })

            return result.posts // { posts: data, }
        }
    } catch (err) {
        console.error('getPosts ERR:', err);
    }
}

const postApi = {
    createPost,
    getPosts,
}

export default postApi
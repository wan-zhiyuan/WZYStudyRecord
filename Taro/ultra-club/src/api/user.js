import Taro from '@tarojs/taro'

async function login(userInfo) {
    const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
    const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY

    try {
        if (isWeapp) {
            const { result } = await Taro.cloud.callFunction({
                name: 'login', // 调用的云函数名
                data: { // 传递给云函数的参数
                    userInfo
                },
            })

            return result.user
        }
    } catch (err) {
        console.log('login ERR:',err);
    }

}

const userApi = {
    login,
}

export default userApi
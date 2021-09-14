import Taro, { useState } from '@tarojs/taro'
import { Button, } from '@tarojs/components'
import { useDispatch } from '@tarojs/redux'

import './index.scss'
import { LOGIN } from '../../constants'

// 微信登录按钮
export default function LoginButton() {
    const [isLogin, setIsLogin] = useState(false) // 是否登陆中

    const dispatch = useDispatch()

    async function onGetUserInfo(e) {
        setIsLogin(true)

        const { avatarUrl, nickName } = e.detail.userInfo
        const userInfo = { avatar: avatarUrl, nickName }

        // 老
        // try {
        //     await Taro.setStorage({
        //         key: 'userInfo',
        //         data: {
        //             avatar: avatarUrl,
        //             nickName
        //         },
        //     })
        // } catch (err) {
        //     console.log('setStorage ERR: ', err)
        // }

        // dispatch({
        //     type: SET_LOGIN_INFO,
        //     payload: {
        //         avatar: avatarUrl,
        //         nickName,
        //     }
        // })


        // 新 （包含了请求登录、存storage、本地登录数据修改）
        dispatch({
            type: LOGIN,
            payload: {
                userInfo
            }
        })

        setIsLogin(false) // 等待props.setLoginInfo执行完后，取消登录中状态
    }


    return (
        <Button
            openType="getUserInfo"
            onGetUserInfo={onGetUserInfo}
            type="primary"
            className="login-button"
            loading={isLogin}
        >
            微信登录
        </Button>
    )
}
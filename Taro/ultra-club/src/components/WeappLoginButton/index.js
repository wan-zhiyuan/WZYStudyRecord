import Taro, { useState } from '@tarojs/taro'
import { Button, } from '@tarojs/components'

import './index.scss'

export default function LoginButton(props) {
    const [isLogin, setIsLogin] = useState(false) // 是否登陆中

    async function onGetUserInfo(e) {
        setIsLogin(true)

        const { avatarUrl, nickName } = e.detail.userInfo
        await props.setLoginInfo(avatarUrl, nickName)

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
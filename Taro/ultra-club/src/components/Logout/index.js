import Taro, { useState } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { useDispatch } from '@tarojs/redux'

import { SET_LOGIN_INFO } from '../../constants'

// 退出登录按钮
export default function LogoutButton(props) {
    const [isLogout, setIsLogout] = useState(false) // 是否正在退出登录
    const dispatch = useDispatch()

    async function handleLogout() {
        // 1、移除storage中存储的登录用户信息
        // 2、更新mine页面重置 nickName 和 avatar
        setIsLogout(true)

        try {
            await Taro.removeStorage({ key: 'userInfo' })

            dispatch({
                type: SET_LOGIN_INFO,
                payload: {
                    avatar: '',
                    nickName: '',
                }
            })
        } catch (err) {
            console.log('removeStorage ERR: ', err)
        }

        setIsLogout(false)
    }

    return (
        <AtButton type='secondary' full loading={isLogout} onClick={handleLogout}>
            退出登录
        </AtButton>
    )
}
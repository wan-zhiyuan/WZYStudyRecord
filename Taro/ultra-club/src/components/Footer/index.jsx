import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'
import { useSelector, useDispatch } from '@tarojs/redux'

import Logout from '../Logout'  // 登出按钮
import LoginForm from '../LoginForm'
import './index.scss'
import { SET_IS_OPENED } from '../../constants'

export default function Footer(props) {
    const nickName = useSelector(state => state.user.nickName)

    const dispatch = useDispatch()

    // 双取反来构造字符串对应的布尔值，用于标志此时是否用户已经登录 不需要从props中获取，直接取得store中的nickName自己判断
    // 如果nickName有值，第一次取反获得false，第二次true，表明用户已登录 隐藏登录按钮
    // 如果nickName无值，第一次取反获得true，第二次false，表明用户未登录 显示登录按钮
    const isLogged = !!nickName 

    // 使用 useSelector Hooks 获取 Redux Store 数据
    const isOpened = useSelector(state => state.user.isOpened)

    return (
        <View className='mine-footer'>
            {/* 已登录状态 显示退出登录按钮 */}
            {/* 正在退出登录时，显示loading的button */}
            {isLogged && 
                <Logout
                    // loading={props.isLogout}         // 按钮loading状态
                    // handleLogout={props.handleLogout}// 登出按钮点击事件
                />
            }
            <View className='tuture-motto'>
                {isLogged ? 'From 图雀社区 with Love ❤' : '您还未登录'}
            </View>
            <AtFloatLayout
                isOpened={isOpened}
                title='登录'
                onClose={() => dispatch({type: SET_IS_OPENED, payload:{ isOpened: false}})}
            >
                <LoginForm
                    // formNickName={formNickName}
                    // files={files}
                    // handleSubmit={e => handleSubmit(e)}
                    // handleNickNameInput={e => setFormNickName(e.target.value)}  // 昵称变化时触发
                    // handleFilesSelect={files => setFiles(files)}                // 头像图片文件变化时触发
                />
            </AtFloatLayout>
        </View>
    )
}
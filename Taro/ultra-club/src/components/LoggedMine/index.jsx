import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'
import avatar from '../../images/avatar.png'

export default function LoggedMine(props) {
    const { userInfo = {} } = props
    function onImageClick() {
        Taro.previewImage({
            urls: [userInfo.avatar]
        })
    }

    return (
        <View className='logged-mine'>
            <Image
                // 已登录，存在userInfo，显示userInfo中的头像。未登录，不存在userInfo，显示本地的默认头像
                src={userInfo.avatar ? userInfo.avatar : avatar}
                className='mine-avatar'
                onClick={onImageClick}
            />
            <View className='mine-nickName'>
                {userInfo.nickName ? userInfo.nickName : '未登录'}
            </View>
            <View className='mine-username'>{userInfo.username}</View>
        </View>
    )
}
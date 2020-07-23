import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { AtAvatar } from 'taro-ui'

import './index.scss'

export default function LoggedMine(props) {
    // 原：通过props传入userInfo
    // const { userInfo = {} } = props
    // 现：通过useSelector从store中获取
    const nickName = useSelector(state => state.user.nickName) // 从state.user中获取对应的state值
    const avatar = useSelector(state => state.user.avatar)

    function onImageClick() {
        Taro.previewImage({
            urls: [avatar]
        })
    }

    return (
        <View className='logged-mine'>
            {avatar ? (
                <Image src={avatar} className='mine-avatar' onClick={onImageClick} />
            ) : (
                    <AtAvatar size='large' circle text='志' />
                )}
            <View className='mine-nickName'>
                {userInfo.nickName ? userInfo.nickName : '未登录'}
            </View>
            <View className='mine-username'>{nickName}</View>
        </View>
    )
}

LoggedMine.propTypes = {
    avatar: PropTypes.string,
    nickName: PropTypes.string,
    username: PropTypes.string,
}
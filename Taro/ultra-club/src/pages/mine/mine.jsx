import Taro from '@tarojs/taro'
import React from 'react'
import { View, Image } from '@tarojs/components'

import './mine.scss'
import avatar from '../../images/avatar.png'

export default function Mine() {
    return (
        <View className='mine'>
            <View>
                <Image src={avatar} className='mine-avatar' />
                <View className='mine-nickName'>图雀酱</View>
                <View className='mine-username'>tutre</View>
            </View>
            <View className='mine-footer'>From 图雀社区 with Love</View>
        </View>
    )
}
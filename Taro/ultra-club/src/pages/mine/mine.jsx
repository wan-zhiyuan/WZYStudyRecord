import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'

import { Header, Footer } from '../../components'
import './mine.scss'
import { SET_LOGIN_INFO } from '../../constants'

export default function Mine() {
    const dispatch = useDispatch()
    const nickName = useSelector(state => state.user.nickName)

    const isLogged = !!nickName

    useEffect(()=>{
        // 第一次启动 store中没有数据，会执行getStorage，Storage中没有数据，执行到err
        // 登录成功后返回，store中有数据，不执行getStorage，直接从store中获取avatar和nickName
        // 登录成功后，刷新mine页面，store中没有数据，执行getStorage，Storage中有数据，从sotrage中获取avatar和nickName
        async function getStorage() {
            try {
                const { data } = await Taro.getStorage({key: 'userInfo'})
                const { nickName, avatar, _id } = data
                
                // 更新store中的数据
                // dispatch({ type: SET_LOGIN_INFO, payload:{nickName, avatar}})
                dispatch({
                    type: SET_LOGIN_INFO,
                    payload: { nickName, avatar, userId: _id }
                })
            } catch (err) {
                console.log('getStorage ERR: ', err)
            }
        }
        if (!isLogged) {
            getStorage() 
        }
    })

    return (
        <View className='mine'>
            <Header />
            <Footer />
        </View>
    )
}

Mine.config = {
    navigationBarTitleText: '我的'
}
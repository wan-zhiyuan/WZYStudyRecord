import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useDispatch } from '@tarojs/redux'

import { Header, Footer } from '../../components'
import './mine.scss'
import { SET_LOGIN_INFO } from '../../constants'

export default function Mine() {
    const dispatch = useDispatch()

    useEffect(()=>{
        // 目前 每次useState数据有变化的时候触发useEffect()，具体再学习Hooks的使用
        console.log('useEffect()')
        // 第一次启动从storage中的数据判断是否登录
        async function getStorage() {
            try {
                const { data } = await Taro.getStorage({key: 'userInfo'})
                const { nickName, avatar } = data
                // setAvatar(avatar)
                // setNickName(nickName)
                dispatch({ type: SET_LOGIN_INFO, payload:{nickName, avatar}})
            } catch (err) {
                console.log('getStorage ERR: ', err)
            }
        }

        getStorage() 
    })

    // 微信or支付宝登录授权，存储用户信息
    async function setLoginInfo(avatar, nickName) {
        setAvatar(avatar)
        setNickName(nickName)

        try {
            await Taro.setStorage({
                key: 'userInfo',
                data: { avatar, nickName },
            })
        } catch (err) {
            console.log('setStorage ERR: ', err)
        }
    }
    
    // 登出，移除用户信息
    async function handleLogout() {
        setIsLogout(true) // 正在登出

        try {
            await Taro.removeStorage({ key: 'userInfo'})

            setAvatar('')
            setNickName('')
        } catch (err) {
            console.log('removeStorage ERR: ', err)
        }

        setIsLogout(false) // 登出结束
    }

    // 关闭表单时触发 Footer使用 
    function handleSetIsOpened(isOpened) {
        setIsOpened(isOpened)
    }

    // 普通登录点击
    function handleClick() {
        handleSetIsOpened(true)
    }

    // 普通登录表单填写完成后提交 Footer使用 
    async function handleSubmit(userInfo) {
        // 缓存在storage里面
        await Taro.setStorage({ key: 'userInfo', data: userInfo})

        // 设置本地信息
        setAvatar(userInfo.avatar)
        setNickName(userInfo.nickName)

        // 关闭弹出层
        setIsOpened(false)
    }

    return (
        <View className='mine'>
            <Header 
                // isLogged={isLogged}
                // userInfo={{ avatar, nickName }}
                // handleClick={handleClick}
                // setLoginInfo={setLoginInfo}
            />
            <Footer 
                // isLogged={isLogged}
                // isOpened={isOpened}
                // isLogout={isLogout}
                // handleLogout={handleLogout} // 退出登录的点击事件
                // handleSetIsOpened={handleSetIsOpened}
                // handleSubmit={handleSubmit}
            />
        </View>
    )
}

Mine.config = {
    navigationBarTitleText: '我的'
}
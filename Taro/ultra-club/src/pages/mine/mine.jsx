import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import { Header, Footer } from '../../components'
import './mine.scss'

export default function Mine() {
    const [nickName, setNickName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [isOpened, setIsOpened] = useState(false) // 控制表单的显示与隐藏
    const [isLogout, setIsLogout] = useState(false) // 是否正在登出，控制‘退出登录’按钮是否显示loading

    // 双取反来构造字符串对应的布尔值，用于标志此时是否用户已经登录
    // 如果nickName有值，第一次取反获得false，第二次true，表明用户已登录 隐藏登录按钮
    // 如果nickName无值，第一次取反获得true，第二次false，表明用户未登录 显示登录按钮
    // isLogged用于控制登录按钮的显示
    const isLogged = !!nickName


    useEffect(()=>{
        // 目前 每次useState数据有变化的时候触发useEffect()，具体再学习Hooks的使用
        console.log('useEffect()')
        // console.log(nickName)
        // console.log(avatar)
        // console.log(isOpened)
        // console.log(isLogout)
        async function getStorage() {
            try {
                const { data } = await Taro.getStorage({key: 'userInfo'})
                const { nickName, avatar } = data
                setAvatar(avatar)
                setNickName(nickName)
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
            {/* <View>
                <Image src={avatar} className='mine-avatar' />
                <View className='mine-nickName'>图雀酱</View>
                <View className='mine-username'>tutre</View>
            </View>
            <View className='mine-footer'>From 图雀社区 with Love</View> */}
            <Header 
                isLogged={isLogged}
                userInfo={{ avatar, nickName }}
                handleClick={handleClick}
                setLoginInfo={setLoginInfo}
            />
            <Footer 
                isLogged={isLogged}
                isOpened={isOpened}
                isLogout={isLogout}
                handleLogout={handleLogout} // 退出登录的点击事件
                handleSetIsOpened={handleSetIsOpened}
                handleSubmit={handleSubmit}
            />
        </View>
    )
}

Mine.config = {
    navigationBarTitleText: '我的'
}
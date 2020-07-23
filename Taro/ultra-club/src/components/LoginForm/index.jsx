import Taro, { useState } from '@tarojs/taro'
import { View, Form } from '@tarojs/components'
import { AtButton, AtImagePicker } from 'taro-ui'
import { useDispatch } from '@tarojs/redux'

import { SET_LOGIN_INFO, SET_IS_OPENED } from '../../constants'
import './index.scss'

// 普通登录 弹出的表单
export default function LoginForm() {
    // Login Form 登录数据
    const [showAddBtn, setShowAddBtn] = useState(true) // 是否显示添加按钮
    const [files, setFiles] = useState([])      // 头像文件
    const [formNickName, setFormNickName] = useState('')    // 昵称

    const dispatch = useDispatch()

    // 头像图片变化时
    function onChange(files) {
        if (files.length > 0) {
            setShowAddBtn(false)
        } else {
            setShowAddBtn(true)
        }
        setFiles(files)
    }

    // 头像点击时预览功能
    function onImageClick() {
        Taro.previewImage({
            urls: [files[0].url]
        })
    }

    // 点击‘提交’时触发 
    async function handleSubmit(e) {
        e.preventDefault()

        // 鉴权数据
        if (!formNickName || !files.length) {
            Taro.atMessage({
                type: 'error',
                message: '您还有内容没有填写！',
            })
            return
        }

        setShowAddBtn(true)

        // 提示登录成功
        Taro.atMessage({
            type: 'success',
            message: '恭喜您，登录成功！',
        })

        // 1、缓存在storage里面
        // 2、清空表单状态
        // 3、修改store中的用户信息
        // 4、关闭弹出层
        const userInfo = { avatar: files[0].url, nickName: formNickName}
        setFiles([])
        setFormNickName('')

        await Taro.setStorage({ key: 'userInfo', data: userInfo})

        dispatch({ type: SET_LOGIN_INFO, payload: userInfo})

        dispatch({ type: SET_IS_OPENED, payload: { isOpened: false}})
    }

    return (
        <View className='post-form'>
            <Form onSubmit={handleSubmit}>
                {/* 登录模块 */}
                <View className='login-box'>
                    <View className='avatar-selector'>
                        <AtImagePicker
                            length={1}          // 单行的图片数量
                            mode='scaleToFill'  // 图片预览模式
                            count={1}           // 可选图片张数
                            files={files} // 图片文件
                            showAddBtn={showAddBtn} // 是否显示图片添加按钮
                            onImageClick={onImageClick} // 点击图片时触发的回调
                            onChange={onChange} // 图片文件发升变化时触发的回调
                        />
                    </View>
                    <Input
                        className='input-nickName'
                        type='text'
                        placeholder='点击输入昵称'
                        value={formNickName}
                        onInput={e => setFormNickName(e.target.value)}
                    />
                    <AtButton formType='submit' type='primary'>
                        登录
                    </AtButton>
                </View>
            </Form>
        </View>
    )
}
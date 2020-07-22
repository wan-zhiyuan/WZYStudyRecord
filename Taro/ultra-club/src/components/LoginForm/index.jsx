import Taro, { useState } from '@tarojs/taro'
import { View, Form } from '@tarojs/components'
import { AtButton, AtImagePicker } from 'taro-ui'

import './index.scss'

// 普通登录 弹出的表单
export default function LoginForm(props) {
    const [showAddBtn, setShowAddBtn] = useState(true) // 显示添加按钮

    function onChange(files) {
        if (files.length > 0) {
            setShowAddBtn(false)
        }

        props.handleFilesSelect(files)
    }

    function onImageClick() {
        Taro.previewImage({
            urls: [props.files[0].url]
        })
    }

    return (
        <View className='post-form'>
            <Form onSubmit={props.handleSubmit}>
                {/* 登录模块 */}
                <View className='login-box'>
                    <View className='avatar-selector'>
                        <AtImagePicker
                            length={1}          // 单行的图片数量
                            mode='scaleToFill'  // 图片预览模式
                            count={1}           // 可选图片张数
                            files={props.files} // 图片文件
                            showAddBtn={showAddBtn} // 是否显示图片添加按钮
                            onImageClick={onImageClick} // 点击图片时触发的回调
                            onChange={onChange} // 图片文件发升变化时触发的回调
                        />
                    </View>
                    <Input 
                        className='input-nickName'
                        type='text'
                        placeholder='点击输入昵称'
                        value={props.formNickName}
                        onInput={props.handleNickNameInput}
                    />
                    <AtButton formType='submit' type='primary'>
                        登录
                    </AtButton>
                </View>
            </Form>
        </View>
    )
}
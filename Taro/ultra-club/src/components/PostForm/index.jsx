import Taro, { useState } from '@tarojs/taro'
import { View, Form, Input, Textarea } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'

import './index.scss'
import { SET_POSTS, SET_POST_FORM_IS_OPENED, CREATE_POST } from '../../constants'

// 无状态组件：只处理父组件传值过来的props
// 创建新帖子组件
export default function PostForm() {
    // 五个props参数
    // 1、formTitle 当前编辑中帖子的标题
    // 2、formContent   当前编辑中帖子的内容
    // 3、handleSubmit  处理提交表单的回调函数
    // 4、handleTitleInput  处理标题接收到用户输入时的回到函数
    // 5、handleContentInput    处理内容接收到用户输入时的回调函数

    // 只和此组件有关的使用useState管理
    const [formTitle, setFormTitle] = useState('')
    const [formContent, setFormContent] = useState('')

    const userId = useSelector(state => state.user.userId)

    // const nickName = useSelector(state => state.user.nickName)
    // const avatar = useSelector(state => state.user.avatar)

    const dispatch = useDispatch()

    // 提交 
    async function handleSubmit(e) {
        e.preventDefault() // 禁止浏览器默认行为

        if (!formTitle || !formContent) {
            Taro.atMessage({
                message: '您还有内容没有填写完哦',
                type: 'warning',
            })
            return
        }

        // 老
        // 添加新post
        // dispatch({
        //     type: SET_POSTS,
        //     payload: {
        //         post: {
        //             title: formTitle,
        //             content: formContent,
        //             user: { nickName, avatar },
        //         },
        //     },
        // })

        // 新
        dispatch({
            type: CREATE_POST,
            payload: {
                postData: {
                    title: formTitle,
                    content: formContent,
                },

            }
        })

        setFormTitle('')
        setFormContent('')

        // // 关闭FloatLayout表单 更新isOpened属性
        // dispatch({
        //     type: SET_POST_FORM_IS_OPENED,
        //     payload: { isOpened: false },
        // })

        // Taro.atMessage({
        //     message: '发表文章成功',
        //     type: 'success',
        // })
    }

    return (
        <View className='post-form'>
            {/* <View>添加新的帖子</View> */}
            <Form onSubmit={handleSubmit}>
                <View>
                    <View className='form-hint'>标题</View>
                    <Input
                        className='input-title'
                        type='text'
                        placeholder='点击输入标题'
                        value={formTitle}
                        onInput={e => setFormTitle(e.target.value)} // 键盘输入是触发onInput事件
                    />
                    <View className='form-hint'>正文</View>
                    <Textarea
                        className='input-content'
                        placeholder='点击输入正文'
                        value={formContent}
                        onInput={e => setFormContent(e.target.value)}
                    />
                    {/* formType会触发Form的onSubmit事件 */}
                    {/* <Button className='form-button' formType='submit' type='primary'> 
                        提交
                    </Button> */}
                    <AtButton type='primary' formType='submit' >提交</AtButton>

                </View>
            </Form>
        </View>
    )
}
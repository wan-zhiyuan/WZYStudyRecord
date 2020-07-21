import { View, Form, Input, Textarea } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'
// 无状态组件：只处理父组件传值过来的props
// 创建新帖子组件
export default function PostForm(props) {
    // 五个props参数
    // 1、formTitle 当前编辑中帖子的标题
    // 2、formContent   当前编辑中帖子的内容
    // 3、handleSubmit  处理提交表单的回调函数
    // 4、handleTitleInput  处理标题接收到用户输入时的回到函数
    // 5、handleContentInput    处理内容接收到用户输入时的回调函数
    return (
        <View className='post-form'>
            {/* <View>添加新的帖子</View> */}
            <Form onSubmit={props.handleSubmit}>
                <View>
                    <View className='form-hint'>标题</View>
                    <Input
                        className='input-title'
                        type='text'
                        placeholder='点击输入标题'
                        value={props.formTitle}
                        onInput={props.handleTitleInput} // 键盘输入是触发onInput事件
                    />
                    <View className='form-hint'>正文</View>
                    <Textarea
                        className='input-content'
                        placeholder='点击输入正文'
                        value={props.formContent}
                        onInput={props.handleContentInput}
                    />
                    {/* formType会触发Form的onSubmit事件 */}
                    {/* <Button className='form-button' formType='submit' type='primary'> 
                        提交
                    </Button> */}
                    <View className='form-button'>
                        <AtButton type='primary' formType='submit' >提交</AtButton>
                    </View>


                </View>

            </Form>
        </View>
    )
}
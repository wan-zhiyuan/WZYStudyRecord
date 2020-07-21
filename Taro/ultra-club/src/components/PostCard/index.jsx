import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import './index.scss'

// 展示一篇帖子
export default function PostCard(props) {
    const handleClick = () => {
        // 如果当前处于列表页面，响应点击事件，跳转到帖子详情页
        if (props.isList) {
            const { title, content } = props
            Taro.navigateTo({
                url: `/pages/post/post?title=${title}&content=${content}`,
            })
        }
    }
    return (
        // 当isList存在时，存在postcard_isList样式
        <View
            className={classNames('postcard',{postcard__isList: props.isList})}
            onClick={handleClick}>
            <View className='post-title'>{props.title}</View>
            <View className='post-content'>{props.content}</View>
        </View>
    )
}

PostCard.defaultProps = {
    isList: '',
}
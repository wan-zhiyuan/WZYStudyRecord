import Taro , {useRouter }from '@tarojs/taro' // useRouter 是 Taro 专有的 Hook，等同于页面为类时的 getCurrentInstance().router
import { View } from '@tarojs/components'
import { PostCard } from '../../components'

import './post.scss'

export default function Post() {
    const router = useRouter()
    const { params } = router
    console.log(params)
    return (
        <View className='post'>
            <PostCard title={params.title} content={params.content} />
        </View>
    )
}

Post.config = {
    navigationBarTitleText: '帖子详情'
}
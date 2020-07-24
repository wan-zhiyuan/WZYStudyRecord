import Taro, { useRouter } from '@tarojs/taro' // useRouter 是 Taro 专有的 Hook，等同于页面为类时的 getCurrentInstance().router
import { View } from '@tarojs/components'
import { PostCard } from '../../components'
import { useSelector } from '@tarojs/redux'

import './post.scss'

export default function Post() {
    const router = useRouter()
    const { params } = router
    const { postId } = router.params
    console.log(params)

    const posts = useSelector(state => state.post.posts)
    const post = posts[postId]

    console.log('post', posts, postId)

    return (
        <View className='post'>
            {/* <PostCard title={params.title} content={params.content} /> */}
            <PostCard post={post} />
        </View>
    )
}

Post.config = {
    navigationBarTitleText: '帖子详情'
}
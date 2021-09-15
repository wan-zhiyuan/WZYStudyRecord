import Taro, { useRouter, useEffect } from '@tarojs/taro' // useRouter 是 Taro 专有的 Hook，等同于页面为类时的 getCurrentInstance().router
import { View } from '@tarojs/components'
import { PostCard } from '../../components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { GET_POST, SET_POST } from '../../constants'

import './post.scss'

export default function Post() {
    const router = useRouter()
    const { postId } = router.params

    const dispatch = useDispatch()
    const post = useSelector(state => state.post.post)

    useEffect(() => {
        // 获取云端的port数据
        dispatch({
            type: GET_POST,
            payload: {
                postId,
            }
        })

        return () => {
            // 组件销毁时 store存储当前port数据
            dispatch({ type: SET_POST, payload: { post: {} } })
        }
    }, [])

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
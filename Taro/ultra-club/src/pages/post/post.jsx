import Taro, { useRouter, useEffect } from '@tarojs/taro' // useRouter 是 Taro 专有的 Hook，等同于页面为类时的 getCurrentInstance().router
import { View } from '@tarojs/components'
import { PostCard } from '../../components'
import { useSelector } from '@tarojs/redux'
import { GET_POST, SET_POST } from '../../constants'

import './post.scss'

export default function Post() {
    const router = useRouter()
    const { postId } = router.params

    const dispatch = useDispatch()
    const post = useSelector(state => state.post.post)

    useEffect(() => {
        dispatch({
            type: GET_POST,
            payload: {
                postId,
            }
        })

        return () => {
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
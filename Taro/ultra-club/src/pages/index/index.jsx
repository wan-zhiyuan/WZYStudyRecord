import Taro, { useEffect } from '@tarojs/taro' // useState目前不能从@tarojs/taro中获取
import { View, Text } from '@tarojs/components'
import { AtFab, AtFloatLayout, AtMessage } from 'taro-ui'
import { useSelector, useDispatch } from '@tarojs/redux'

import { PostCard, PostForm } from '../../components'
import './index.scss'
import { SET_POST_FORM_IS_OPENED, SET_LOGIN_INFO, GET_POSTS } from '../../constants'


// Hooks方式写法
export default function Index() {
  const posts = useSelector(state => state.post.posts) || []
  const isOpened = useSelector(state => state.post.isOpened)
  const nickName = useSelector(state => state.user.nickName)

  const isLogged = !!nickName

  const dispatch = useDispatch()

  useEffect(() => {
    const WeappEnv = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
    if (WeappEnv) {
      // 初始化小程序云环境
      Taro.cloud.init()
    }

    async function getStorage() {
      try {
        const { data } = await Taro.getStorage({ key: 'userInfo' })

        const { nickName, avatar, _id } = data
        console.log(data)
        console.log('nickName:' + nickName)
        console.log('avatar:' + avatar)

        // 更新 Redux Store 数据
        dispatch({ type: SET_LOGIN_INFO, payload: { nickName, avatar, userId: _id } })
      } catch (err) {
        console.log('getStorage ERR: ', err)
      }
    }
    if (!isLogged) {
      getStorage()
    }

    async function getPosts() {
      try {
        dispatch({
          type: GET_POSTS,
        })
      } catch (err) {
        console.log('getPosrs ERR:', err);
      }
    }

    // 本地store中posts数据为空的时候，请求云端数据
    if (!posts.length) {
      getPosts()
    }
  },[])

  function setIsOpened(isOpened) {
    dispatch({ type: SET_POST_FORM_IS_OPENED, payload: { isOpened } })
  }

  function handleClickEdit() {
    if (!isLogged) {
      Taro.atMessage({
        type: 'warning',
        message: '您还未登录哦！',
      })
    } else {
      setIsOpened(true)
    }
  }

  return (
    <View className='index'>
      <AtMessage />
      {posts.map((post, index) => {
        return (
          // 暂时使用
          // <PostCard key={'_id' + index}  title={item.title} content={item.content} isList/>
          <PostCard key={post._id} postId={post._id} post={post} isList />
        )
      })}
      <AtFloatLayout
        isOpened={isOpened}
        title="发表新文章"
        onClose={() => setIsOpened(false)}
      >
        <PostForm
        // formTitle={formTitle}
        // formContent={formContent}
        // handleSubmit={e => handleSubmit(e)}
        // handleTitleInput={e => setFormTitle(e.target.value)}
        // handleContentInput={e => setFormContent(e.target.value)}
        />
      </AtFloatLayout>
      <View className="post-button">
        <AtFab onClick={handleClickEdit}>
          <Text className='at-fab__icon at-icon at-icon-edit'></Text>
        </AtFab>
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页'
}


// export default class Index extends Component {

//   state = {
//     posts: [
//       {
//         title: '泰罗奥特曼',
//         content: '泰罗是奥特之父和奥特之母唯一的亲生儿子。'
//       }
//     ],
//     formTitle: '',
//     formContent: '',
//   }

//   // 点击‘提交’按钮
//   handleSubmit(e) {
//     e.preventDefault() // 取消事件的默认动作，未理解。这里应该是阻止点击事件提交表单
//     const { formTitle: title, formContent: content } = this.state
//     const newPosts = this.state.posts.concat({ title, content }) // 数组添加新内容

//     this.setState({
//       posts: newPosts,
//       formTitle: '',
//       formContent: '',
//     })
//   }

//   handleTitleInput(e) {
//     this.setState({
//       formTitle: e.target.value,
//     })
//   }

//   handleContentInput(e) {
//     this.setState({
//       formContent: e.target.value,
//     })
//   }

//   componentWillMount() { }

//   componentDidMount() { }

//   componentWillUnmount() { }

//   componentDidShow() { }

//   componentDidHide() { }

//   render() {
//     return (
//       <View className='index'>
//         {this.state.posts.map((item, index) => {
//           return (
//             <PostCard key={index} title={item.title} content={item.content} />
//           )
//         })}
//         <PostForm
//           formTitle={this.state.formTitle}
//           formContent={this.state.formContent}
//           handleSubmit={e => this.handleSubmit(e)}
//           handleTitleInput={e => this.handleTitleInput(e)}
//           handleContentInput={e => this.handleContentInput(e)}
//         />
//       </View>
//     )
//   }
// }


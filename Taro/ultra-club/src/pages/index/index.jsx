import React, { Component, useState, } from 'react' // useState目前不能从@tarojs/taro中获取
import { View, Text } from '@tarojs/components'
import { PostCard, PostForm } from '../../components'
import './index.scss'

// Hooks方式写法
export default function Index() {
  const [posts, setPosts] = useState([
    {
      title: '泰罗奥特曼',
      content: '泰罗是奥特之父和奥特之母唯一的亲生儿子。'
    },
  ])
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    const newPosts = posts.concat({ title: formTitle, content: formContent })
    setPosts(newPosts)
    setFormTitle('')
    setFormContent('')
  }

  return (
    <View className='index'>
      {posts.map((item, index) => {
        return (
          <PostCard key={index} isList title={item.title} content={item.content} />
        )
      })}
      <PostForm
        formTitle={formTitle}
        formContent={formContent}
        handleSubmit={e => handleSubmit(e)}
        handleTitleInput={e => setFormTitle(e.target.value)}
        handleContentInput={e => setFormContent(e.target.value)}
      />
    </View>
  )
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

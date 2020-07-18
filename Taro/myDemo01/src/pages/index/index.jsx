import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'
import Child from './child.jsx'

function Index() {
  const [userName, setUserName] = useState('JSPang')
  const [blogTitle, setBlogTitle] = useState('')
  const [introduce, setIntroduce] = useState('')

  useEffect(()=>{
    console.log(getCurrentInstance().router.params)
    setBlogTitle(getCurrentInstance().router.params.blogTitle) 
    setIntroduce(getCurrentInstance().router.params.introduce)
    // 3.0.0之前的版本 this.$router.param取url参数已经无法使用
  },[])

  return (
    <View>
      <Text>{userName}</Text>
      <Child userName={userName}></Child>
      <View>{blogTitle}</View>
      <View>{introduce}</View>
    </View>
  )
}

export default Index;

// export default class Index extends Component {

//   componentWillMount () { }

//   componentDidMount () { }

//   componentWillUnmount () { }

//   componentDidShow () { }

//   componentDidHide () { }

//   render () {
//     return (
//       <View className='index'>
//         <Text>Hello world!</Text>
//       </View>
//     )
//   }
// }

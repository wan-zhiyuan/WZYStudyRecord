import Taro, { requirePlugin } from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from '@tarojs/components'
import { xiedajiao, liuying } from '../../tools'
import test001 from './../../static/test001.png'
function Blog() {

    const girls = [
        { id: 1, name: '谢大脚' },
        { id: 2, name: '刘颖' },
        { id: 3, name: '王小蒙' },
        { id: 4, name: '万志远' },
    ]

    const [blogTitle, setBlogTitle] = useState('BlogTitle')
    const [introduce, setIntroduce] = useState('123456')
    const [articleList, setArticleList] = useState([])
    // useEffect(()=>{
    //     xiedajiao() 
    //     liuying()
    // },[]) // 空数组，只有第一次进入这个组件才执行useEffect里面的方法
    const gotoIndex = () => {
        Taro.navigateTo({ url: '/pages/index/index?blogTitle=' + blogTitle + '&introduce=' + introduce })
    }

    let zhujue = 1;

    const testHandler = () => {
        Taro.request({
            url: 'https://apiblog.jspang.com/default/getArticleList',
        }).then(res => {
            console.log(res)
            setArticleList(res.data.list)
        })
    }

    return (
        <View>
            <Text>Blog Page</Text>
            <Button onClick={gotoIndex}>我要去Index页面</Button>
            {/* 两种图片引入方式 目前require方式图片不限时，未解决 */}
            <View><Image src={test001} /></View>
            {/* <View><Image src={require('../../static/test001.png')}/></View> */}
            {
                girls.map((item, index) => {
                    return (
                        <View key={index}>{item.id}:{item.name}</View>
                    )
                })
            }
            <View>
                男主角是：{zhujue === 1 ? '玉田' : '刘能'}
            </View>
            <Button onClick={testHandler}>测试axios</Button>
            {
                articleList.map((item, index) => {
                    return (
                        <View key={index}>{item.title}</View>
                    )
                })
            }
        </View>

    )
}

export default Blog;
// 路由跳转
// navigateTo redirectTo switchTab navigateBack relaunch getCurrentPages
import { Avatar, Divider } from 'antd'
import {  } from '@ant-design/icons';
import '../static/style/components/advert.css'

// 广告模块组件
const Advert = ()=>{
    return (
        <div className='ad_div comm_box'>
            <div><img src='http://blogimages.jspang.com/flutter_ad2.jpg' width='100%' /></div>
            <div><img src='http://blogimages.jspang.com/Vue_koa_ad1.jpg' width='100%' /></div>
            <div><img src='http://blogimages.jspang.com/WechatIMG12.jpeg' width='100%' /></div>
            <div><img src='https://newimg.jspang.com/kaikeba_banner.jpg' width='100%' /></div>
        </div>
    )
}

export default Advert
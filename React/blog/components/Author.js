import { Avatar, Divider } from 'antd'
import { UserOutlined, GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';
import '../static/style/components/author.css'

// 博主介绍组件
const Author =()=>{

    return (
        <div className='author_div comm_box'>
            <div>
                <Avatar size={100} icon={<UserOutlined />}/>
            </div>
            <div className='author_introduction'>
                老腊肉程序员，主攻WEB和移动端开发。想要成为前端大牛。
                <Divider>社交帐号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className='account' />
                <Avatar size={28} icon={<QqOutlined />} className='account' />
                <Avatar size={28} icon={<WechatOutlined />} className='account' />
            </div>
        </div>
    )
}

export default Author

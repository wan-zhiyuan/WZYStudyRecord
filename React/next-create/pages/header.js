import Head from 'next/head' // 友好的SEO操作
import MyHeader from '../components/myHeader'
import { Button } from 'antd'
import '../styles/test.css'

function Header() {
    return (
        <>
            <MyHeader />
            <div className='test'>www.93999.com.cn</div>
            <div><Button>我是按钮</Button></div>
        </>

    )
}
export default Header
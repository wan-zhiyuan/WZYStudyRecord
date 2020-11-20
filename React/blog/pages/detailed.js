import React from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons';
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

const article = 
`# Markdown-Navbar Demo

## p01.Chicken Chicken

Chicken Chicken Chicken Chicken Chicken.

* Chicken Chicken Chicken Chicken Chicken.
* Chicken Chicken Chicken Chicken Chicken.
* Chicken Chicken Chicken Chicken Chicken.

### Chicken Chicken Chicken

Chicken Chicken Chicken Chicken Chicken.

#### Chicken Chicken Chicken Chicken

Chicken Chicken Chicken Chicken Chicken Chicken.

## p02.Chicken Chicken

Chicken Chicken Chicken Chicken Chicken.

* Chicken Chicken Chicken Chicken Chicken.
* Chicken Chicken Chicken Chicken Chicken.
* Chicken Chicken Chicken Chicken Chicken.

### Chicken Chicken Chicken

Chicken Chicken Chicken Chicken Chicken.

#### Chicken Chicken Chicken Chicken

Chicken Chicken Chicken Chicken Chicken Chicken.

## p03.Chicken Chicken

Chicken Chicken Chicken Chicken Chicken.

* Chicken Chicken Chicken Chicken Chicken.
* Chicken Chicken Chicken Chicken Chicken.
* Chicken Chicken Chicken Chicken Chicken.

### Chicken Chicken Chicken

Chicken Chicken Chicken Chicken Chicken.

#### Chicken Chicken Chicken Chicken

Chicken Chicken Chicken Chicken Chicken Chicken.
`
;

let markdown =
  '' +
  '# p01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
  '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n' +
  '\`console.log(111)\` \n\n' +
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n' +
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n' +
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n' +
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n' +
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n' +
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n' +
  '``` var a=11; ```'

const Detailed = () => (
  <>
    <Head>
      <title>Detailed</title>
    </Head>
    <Header />
    <Row className="comm_main" type="flex" justify="center">
      <Col className="comm_left" xs={24} sm={24} md={16} lg={18} xl={14}  >
        <div>
          <div className="bread_div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频列表</Breadcrumb.Item>
              <Breadcrumb.Item>xxxx</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className='detailed_title'>
              React+Next.js实战（持续更新中）
            </div>
            <div className='list_icon center'>
              <span><CalendarOutlined /> 2020-11-20</span>
              <span><FolderOutlined /> 视频教程</span>
              <span><FireOutlined /> 3144人</span>
            </div>
            <div className='detailed_content'>
              <ReactMarkdown
                children={article}
                allowDangerousHtml={false} />
            </div>
          </div>
        </div>
      </Col>

      <Col className="comm_right" xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author />
        <Advert />
        <Affix offsetTop={5}>
          <div className='detail_nav comm_box'>
            <div className='nav_title'>文章目录</div>
            <MarkNav
              className='article_menu'
              source={article}
              ordered={false} // 是否带编号
            />
          </div>
        </Affix>

      </Col>

    </Row>
    <Footer />

  </>
)

export default Detailed
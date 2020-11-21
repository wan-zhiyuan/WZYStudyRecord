import React, { useState } from 'react'
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
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

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



const Detailed = (props) => {
  console.log('======>', props)

  const renderer = new marked.Renderer()

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic:false, // 容错机制  false表示可容错
    sanitize: false, // 原始输出是否忽略html标签 false表示不忽略
    tables: true, // 是否允许输出github样式的表格 必须gfm设置未true才能生效
    breaks: false, // 是否支持github样式的换行符 必须gfm设置为true才能生效
    smartLists: true,
    smartypants: false,
    highlight:function(code){
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(props.article_content)


  return (
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
              <div className='detailed_content'
              dangerouslySetInnerHTML={{__html:html}}
              >
                {/* <ReactMarkdown
                  children={markdown}
                  allowDangerousHtml={false} /> */}
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
                source={html}
                ordered={false} // 是否带编号
              />
            </div>
          </Affix>

        </Col>

      </Row>
      <Footer />
    </>
  )
}
// 需要接收上个页面的参数，使用上下文context
Detailed.getInitialProps = async (context) => {
  console.log(context.query.id)

  let id = context.query.id
  const res = await axios('http://127.0.0.1:7001/default/getArticleById/' + id)
  console.log('------>', res)
  return res.data.data[0]
}

export default Detailed
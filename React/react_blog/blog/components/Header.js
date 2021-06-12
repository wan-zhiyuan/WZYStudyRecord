import React, { Component } from 'react';
import '../static/style/components/header.css'

import { Row, Col, Menu, Icon } from 'antd'
import {
    HomeOutlined,
    YoutubeOutlined,
    SmileOutlined,
  } from '@ant-design/icons';
const Header = () => (
    <div className='header'>
        <Row type='flex' justify='center' align='top'>
            {/* 当屏幕尺寸过小时，右侧menu为0，不显示 */}
            {/* 当响应尺寸为xl最大时 两列加起来不满24 居中*/}
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className='header-logo'>技术万小远</span>
                <span className='header-txt'>专注前端开发，努力奋斗100年</span>
            </Col>
            <Col className='menu-div' xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode='horizontal'>
                    <Menu.Item key='home'>
                    <HomeOutlined />
                        首页
                    </Menu.Item>
                    <Menu.Item key='video'>
                        {/* <Icon type='youtube'/> */}
                        <YoutubeOutlined />
                        视频
                    </Menu.Item>
                    <Menu.Item key='life'>
                        {/* <Icon type='smile'/> */}
                        <SmileOutlined />
                        生活
                    </Menu.Item>
                </Menu>
            </Col>

        </Row>

    </div>
)

export default Header
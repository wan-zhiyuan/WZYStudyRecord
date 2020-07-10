import React, { Component } from 'react';
import { Link, Redirect, } from 'react-router-dom';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                { cid: 123, title: '爱杯吧开张-1' },
                { cid: 456, title: '爱杯吧开张-2' },
                { cid: 789, title: '爱杯吧开张-3' },
            ]
        }
        // 重定向 编程式导航
        this.props.history.push("/home/")
    }
    render() {
        return (
            <div>
                {/* 重定向 标签 */}
                {/* <Redirect to="/home/" /> */}
                <h2>ibarrel</h2>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={'/list/' + item.cid}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );

    }
}

export default Index;
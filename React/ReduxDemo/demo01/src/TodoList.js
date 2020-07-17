import React, { Component } from 'react';
import 'antd/dist/antd.css'
import {Input , Button, List} from 'antd'
import store from './store'
import {changeInputAction, addItemAction, deleteItemAction,} from './store/actionCreators'

class TodoList extends Component {

    constructor(props){
        super(props)
        this.state = store.getState()   //获取store中的所有state
        this.changeInputValue = this.changeInputValue.bind(this)
        this.storeChange = this.storeChange.bind(this)
        this.clickBtn = this.clickBtn.bind(this)    // 绑定的目的主要是改变this的指向
        //this.deleteItem = this.deleteItem.bind(this)
        store.subscribe(this.storeChange)   // 订阅 此页面使用store的值变化了，页面使用的地方同步变化
    }

    render() { 
        return ( 
            <div> 
                <div style={{margin:'10px'}}>
                    <Input 
                        placeholder={this.state.inputValue}
                        style={{ width:'250px',marginRight:'10px' }} 
                        onChange={this.changeInputValue}
                        value={this.state.inputValue}
                    />
                    <Button 
                        type="primary"
                        onClick={this.clickBtn}
                    >增加</Button>
                </div>
                <div style={{margin:'10px',width:'300px'}}>
                    <List
                        bordered
                        dataSource={this.state.list}
                        renderItem={(item,index)=>(<List.Item onClick={this.deleteItem.bind(this,index)}>{item}</List.Item>)}
                    />
                </div>
            </div>
         );
    }

    changeInputValue(e){
        const action = changeInputAction(e.target.value)
        store.dispatch(action)
    }

    storeChange(){
        this.setState(store.getState())
    }

    clickBtn(){
        const action = addItemAction()
        store.dispatch(action)  // 将action注入到store中，产生联系
    }

    deleteItem(index){
        const action = deleteItemAction(index)
        store.dispatch(action)
    }
}
 
export default TodoList;
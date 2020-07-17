import {CHANGE_INPUT, ADD_ITEM, DELETE_ITEM,} from './actionTypes'

const defaultState = {
    inputValue : 'Write Something',
    list:[
        '早8点开晨会，分配今天的代码任务',
        '早9点和项目经理开需求沟通会',
        '晚5点组织人员进行Review代码'
    ]
}
export default (state = defaultState,action)=>{

    console.log(state,action)
    //Reducer里只能接收state，不能直接改变state
    if(action.type===CHANGE_INPUT){
        let newState = JSON.parse(JSON.stringify(state))    // 深度拷贝state
        newState.inputValue = action.value
        return newState
    }

    if(action.type === ADD_ITEM){
        let newState = JSON.parse(JSON.stringify(state))
        // 数组的添加操作使用push
        newState.list.push(newState.inputValue) // push输入框中的内容到列表中
        newState.inputValue = ''    // 添加完列表，将输入框置为空
        return newState
    }

    if(action.type === DELETE_ITEM){
        let newState = JSON.parse(JSON.stringify(state))
        // 数组的删除操作使用splice
        newState.list.splice(action.index,1)    // 从index开始删除1项 参数一：删除的位置 参数二：删除的个数
        return newState
    }

    return state
}
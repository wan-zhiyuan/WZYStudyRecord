import { combineReducers } from 'redux'

import user from './user'
import post from './post'

// 组合所有reducer
// 分发Action，dispatch一个Action时，combineReducers会遍历所有的Reducer
export default combineReducers({
    user,
    post,
})
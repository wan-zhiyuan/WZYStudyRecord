import { SET_IS_OPENED, SET_LOGIN_INFO } from '../constants'

// 初始默认值
const INITIAL_STATE = {
    avatar: '',
    nickName: '',
    isOpened: false,    // 控制登录表单的显示和隐藏
}

export default function yser(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_IS_OPENED:
            // 更新isOpened
            const { isOpened } = action.payload
            return {...state, isOpened }
        case SET_LOGIN_INFO:
            // 修改 avatar 和 nickName 属性
            const { avatar, nickName } = action.payload
            return { ...state, nickName, avatar }
        default:
            return state
    }
    return
}
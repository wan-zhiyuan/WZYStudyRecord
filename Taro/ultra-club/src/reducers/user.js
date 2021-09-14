import {
    SET_IS_OPENED,
    SET_LOGIN_INFO,
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGIN_NORMAL,
} from '../constants'

// 初始默认值
const INITIAL_STATE = {
    userId: '',
    avatar: '',
    nickName: '',
    isOpened: false,    // 控制登录表单的显示和隐藏
    isLogin: false, // 是否正在执行登录逻辑
    loginStatus: LOGIN_NORMAL, // 标识登录过程中的状态
}

export default function yser(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_IS_OPENED:
            // 更新isOpened
            const { isOpened } = action.payload
            return { ...state, isOpened }
        case SET_LOGIN_INFO:
            // 修改 avatar 和 nickName 属性
            const { avatar, nickName, userId } = action.payload
            return { ...state, nickName, avatar, userId }
        case LOGIN:
            return { ...state, loginStatus: LOGIN, isLogin: true }
        case LOGIN_SUCCESS:
            return { ...state, loginStatus: LOGIN_SUCCESS, isLogin: false }
        case LOGIN_ERROR:
            return { ...state, loginStatus: LOGIN_ERROR, isLogin: false }
        default:
            return state
    }
}
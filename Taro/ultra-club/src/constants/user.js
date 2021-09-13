// 修改isOpened的值
export const SET_IS_OPENED = 'MODIFY_IS_OPENED' // 点击普通登录：true,主动关闭表单、或着登录成功false
// 设置登录的用户信息
export const SET_LOGIN_INFO = 'SET_LOGIN_INFO'
// 向小程序云发起登录请求
export const LOGIN = 'LOGIN' // 监听登录动作
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' // 更新登录成功信息
export const LOGIN_ERROR = 'LOGIN_ERROR' // 更新登录失败信息
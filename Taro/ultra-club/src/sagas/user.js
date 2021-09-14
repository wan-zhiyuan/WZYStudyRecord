import Taro from '@tarojs/taro'
import { call, put, take, fork } from 'redux-saga/effects'

import { userApi } from '../api'
import {
  SET_LOGIN_INFO,
  LOGIN_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  SET_IS_OPENED,
} from '../constants'

// handlerSage => login
// watcherSage => watchLogin

/***************登录逻辑开始****************/

function* login(userInfo) { // 这种写法，定义一个生成器函数
    try {
        const user = yield call(userApi.login, userInfo)

        // 用户信息缓存本地
        yield Taro.setStorage({ key: 'userInfo', data: user })

        // 登录成功，发起成功的action
        yield put({ type: LOGIN_SUCCESS })

        // 关闭登录框弹出层
        yield put({ type: SET_IS_OPENED, payload: { isOpened: false } })

        // 更新store中的数据
        const { nickName, avatar, _id } = user
        yield put({
            type: SET_LOGIN_INFO,
            payload: { nickName, avatar, userId: _id }
        })

        // 提示登录成功
        Taro.atMessage({ type: 'success', message: '恭喜您！登陆成功啦！' })

    } catch (err) {
        console.log('login ERR:'.err);

        // 登录失败，发起失败的action
        yield put({ type: LOGIN_ERROR })

        // 提示登录失败
        Taro.atMessage({ type: 'error', message: '很遗憾！登录失败！' })
    }
}

function* watchLogin() { // 监听为LOGIN的action
    while (true) {
        const { payload } = yield take(LOGIN) // 获取LOGIN action传递的参数payload

        console.log('#####################');
        console.log('payload', payload);

        yield fork(login, payload.userInfo)
    }
}

/***************登录逻辑结束****************/

export { watchLogin }
import Taro from '@tarojs/taro'
import { call, put, take, fork } from 'redux-saga/effects'

import { postApi } from '../api'
import {
    GET_POSTS,
    CREATE_POST,
    POST_SUCCESS,
    POST_ERROR,
    SET_POSTS,
    SET_POST_FORM_IS_OPENED,
} from '../constants'

function* createPost(postData, userId) {
    try {
        const post = yield call(postApi.createPost, postData, userId)

        // 发帖成功 action
        yield put({ type: POST_SUCCESS })

        // 关闭发帖框弹出层
        yield put({ type: SET_POST_FORM_IS_OPENED, payload: { isOpened: false } })

        // 更新store数据
        yield put({
            type: SET_POSTS,
            payload: {
                posts: [post]
            }
        })

        // 提示发帖成功
        Taro.atMessage({
            message: '发表文章成功',
            type: 'success',
        })

    } catch (err) {
        console.log('createPost ERR:', err);

        // 发帖失败
        yield put({ type: POST_ERROR })

        // 提示发帖失败
        Taro.atMessage({
            message: '发表文章失败',
            type: 'error',
        })
    }
}

function* watchCreatePost() { // 监听CREATE_POST
    while (true) {
        const { payload } = yield take(CREATE_POST)

        console.log('payload', payload);

        yield fork(createPost, payload.postData, payload.userId)
    }
}

export { watchCreatePost }

function* getPosts() {
    try {
        const posts = yield call(postApi.getPosts)

        // 获取帖子成功
        yield put({ type: POST_SUCCESS })

        // 更新store数据
        yield put({
            type: SET_POSTS,
            payload: {
                posts,
            }
        })

    } catch (err) {
        console.log('getPosts ERR:', err);

        // 获取帖子失败
        yield put({ type: POST_ERROR })
    }
}

function* watchGetPosts() {
    while (true) {
        yield take(GET_POSTS)

        yield fork(getPosts)
    }
}

export { watchGetPosts }

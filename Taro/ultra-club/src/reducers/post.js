import {
    SET_POSTS,
    SET_POST_FORM_IS_OPENED,
    SET_POST,
    POST_ERROR,
    CREATE_POST,
    POST_SUCCESS,
    POST_NORMAL,
} from '../constants'

import avatar from '../images/avatar.png'

const INITIAL_STATE = {
    // posts: [
    //     {
    //         title: '泰罗奥特曼',
    //         content: '泰罗是奥特之父和奥特之母唯一的亲生儿子。',
    //         user: {
    //             nickName: '图雀酱',
    //             avatar,
    //         }
    //     }
    // ],
    posts: [], // 帖子列表数据
    post: {}, // 单个帖子数据
    isOpened: false,
    isPost: false, // 是否正在执行创贴逻辑
    postStatus: POST_NORMAL,
}

export default function post(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_POST:
            const { post } = action.payload
            return { ...state, post }
        case SET_POSTS:
            const { post } = action.payload
            return { ...state, posts: state.posts.concat(post) }
        case SET_POST_FORM_IS_OPENED:
            const { isOpened } = action.payload
            return { ...state, isOpened }
        case CREATE_POST:
            return { ...state, postStatus: CREATE_POST, isPost: true }
        case POST_SUCCESS:
            return { ...state, postStatus: POST_SUCCESS, isPost: false }
        case POST_ERROR:
            return { ...state, postStatus: POST_ERROR, isPost: false }
        default:
            return state
    }
}
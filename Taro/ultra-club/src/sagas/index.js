import { fork, all } from 'redux-saga/effects'

import { watchLogin } from './user'
import { watchCreatePost, watchGetPosts } from './post'

export default function* rootSage() {
    yield all([
        fork(watchLogin),
        fork(watchCreatePost),
        fork(watchGetPosts),
    ])
}
import { fork, all } from 'redux-saga/effects'

import { watchLogin } from './user'

export default function* rootSage() {
    yield all([
        fork(watchLogin)
    ])
}
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { useDispatch } from '@tarojs/redux'

import { SET_IS_OPENED } from '../../constants'

export default function LoginButton() {
    const dispatch = useDispatch()

    return (
        <AtButton
            type="primary"
            // onClick={props.handleClick}
            onClick={() =>{
                dispatch({type: SET_IS_OPENED, payload: { isOpened: true}})
            }}
        >
            普通登录
        </AtButton>
    )
}
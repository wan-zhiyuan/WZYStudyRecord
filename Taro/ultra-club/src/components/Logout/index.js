import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'

// 退出登录按钮
export default function LogoutButton(props) {
    return (
        <AtButton
            type='secondary'
            full
            loading={props.loading}
            onClick={props.handleLogout}
        >
            退出登录
        </AtButton>
    )
}
import {createStore} from  'redux' // 引入createStore方法
import reducer from "./reducer"
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
export default store    // 暴露出去
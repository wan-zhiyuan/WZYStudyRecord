import React, { createContext, useReducer, } from 'react';

export const ColorContext = createContext({})

export const UPDATE_COLOR = "UPDATE_COLOR" // action 更新颜色

const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_COLOR:
            return action.color
        default:
            return state
    }
}

export const Color = props => {

const [ color,dispatch] = useReducer(reducer,'blue')

    return (
        // 将color和dispatch都共享出去，包裹的组件中可以直接使用
        <ColorContext.Provider value={{ color,dispatch}}>
            {props.children}
        </ColorContext.Provider>
    )
}
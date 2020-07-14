import React, { useState } from 'react';
import ShowArea from './showArea';
import Buttons from './Buttons';
import { Color } from './color'

// 使用useContext、useReducer实现redux功能的实例
function Example6() {
    return (
        <div>
            <Color>
                <ShowArea />
                <Buttons />
            </Color>
        </div>
    )
}

export default Example6;
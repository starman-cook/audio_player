import React, {useRef} from 'react';
import './InputRange.css';

const InputRange = (props) => {
    return (
        <input
            className={'InputRange'}
            type="range"
            step={1}
            min={0}
            onChange={props.change}
            max={props.max}
            value={props.value}
        />
    )
}


export default InputRange;
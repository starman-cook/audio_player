import React from 'react';
import './PlayListItem.css'


const PlayListItem = (props) => {
    return (
        <p
           onClick={props.click}
           className={`PlayListItem ${props.class}`}>
            {props.name}
        </p>
    )
}


export default PlayListItem;
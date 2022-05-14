import React from 'react';
import './PlayList.css'
import PlayListItem from "./PlayListItem/PlayListItem";


const PlayList = (props) => {
    /** Rendering the playlist, map function doesn't work with files array */
    const renderPlaylist = () => {
        let arr = []
        for (let i = 0; i < props.files.length; i++) {
            arr.push(<PlayListItem
                key={props.files[i].name}
                click={() => props.click(i)}
                class={i === props.currentSong ? 'PlayListItem__active' : ''}
                name={props.files[i].name}
            />)
        }
        return arr.length ? arr : <p className={'PlayList__no-files'}>No files chosen</p>;
    }

    return (
        <div className={'PlayList'}>
            {renderPlaylist()}
        </div>
    )
}


export default PlayList;
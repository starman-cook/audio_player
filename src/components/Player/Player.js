import React, {useState, useRef} from 'react';
import './Player.css';
import PlayList from "../PlayList/PlayList";
import FileInput from "../UI/FileInput/FileInput";
import Button from "../UI/Button/Button";
import InputRange from "../UI/InputRange/InputRange";

const blob = window.URL || window.webkitURL;

const Player = () => {
    /** Refs */
    const audioRef = useRef(null);

    /** Local States*/
    const [currentSong, setCurrentSong] = useState(0);
    const [songDuration, setSongDuration] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [files, setFiles] = useState([]);

    /** Counting how long is the song */
    const countDuration = () => {
        setSongDuration(audioRef.current.duration);
    }

    /** Changing position in input range when song is playing */
    const changeCurrentPosition = () => {
        setCurrentPosition(audioRef.current.currentTime);
    }

    /** Changing position when click on input range */
    const jumpToPosition = (e) => {
        setCurrentPosition(e.target.value);
        audioRef.current.currentTime = e.target.value;
    }

    /** start playing file */
    const play = () => {
        audioRef.current.play();
    }

    /** play next file */
    const next = () => {
        const nextSongIndex = files[currentSong + 1] ? currentSong + 1 : 0;
        setCurrentSong(nextSongIndex);
        audioRef.current.src = blob.createObjectURL(files[nextSongIndex]);
        audioRef.current.play();
    }

    /** play previous file */
    const prev = () => {
        const prevSongIndex = files[currentSong - 1] ? currentSong - 1 : files.length - 1;
        setCurrentSong(prevSongIndex);
        audioRef.current.src = blob.createObjectURL(files[prevSongIndex]);
        audioRef.current.play();
    }

    /** pause song */
    const pause = () => {
        audioRef.current.pause();
    }

    /** stop song, places current position to zero */
    const stop = () => {
        audioRef.current.pause();
        setTimeout(() => {
            setCurrentPosition(0);
        }, 10)
    }

    /** what happens when song is over, it starts next song */
    const ended = () => {
        next();
    }

    /** downloading multiple files, saves files to local state, plus immediately places first song into src of audio tag */
    const fileInput = (e) => {
        setFiles(e.target.files);
        setCurrentSong(0);
        const firstFile = e.target.files[0];
        audioRef.current.src = blob.createObjectURL(firstFile);
    }

    /** catches the click in playlist to start a chosen song */
    const currentSongHandler = (number) => {
        setCurrentSong(number);
        audioRef.current.src = blob.createObjectURL(files[number]);
        audioRef.current.play();
    }

    return (
        <div className="Player">
            <audio
                className={'Player__audio'}
                ref={audioRef}
                onTimeUpdate={changeCurrentPosition}
                onLoadedMetadata={countDuration}
                onEnded={ended}
            />
            <InputRange
                change={jumpToPosition}
                max={songDuration}
                value={currentPosition}
            />
            <div className={'Player__buttons-block'}>
                <Button click={play} name={'Play'}/>
                <Button click={pause} name={'Pause'}/>
                <Button click={stop} name={'Stop'}/>
                <Button click={prev} name={'Prev'}/>
                <Button click={next} name={'Next'}/>
            </div>


            <FileInput
                fileInput={fileInput}
            />
            <PlayList
                files={files}
                click={currentSongHandler}
                currentSong={currentSong}
            />



        </div>
    );
}

export default Player;

import React, {useRef} from 'react';
import './FileInput.css';

const FileInput = (props) => {
    /** Refs */
    const fileInputRef = useRef(null);

    /** As file input is hidden this function activates it */
    const activateFileInput = () => {
        fileInputRef.current.click();
    }
    return (
        <div className={'FileInput'}>
            <input
                className={'FileInput__input'}
                ref={fileInputRef}
                type="file"
                multiple={true}
                onChange={props.fileInput}
            />
            <div className={'FileInput__button'} onClick={activateFileInput}>
                Choose audio files
            </div>
        </div>
    )
}

export default FileInput
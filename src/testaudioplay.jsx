import React, { useState } from 'react';

const SongPlayer = ({ audioUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.createRef();

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
    console.log(audioUrl);
    if (!audioUrl) {
        return <div>No audio URL provided</div>;
    }
    return (
        <div>
            <audio ref={audioRef} src="./tior.mp3" controls/>
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    );
};

export default SongPlayer;

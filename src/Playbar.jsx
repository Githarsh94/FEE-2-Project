import React, { useEffect, useState } from 'react';

const Playbar = ({ playlists, index, changeSongToPlay, TogglePlaying, isPlaying }) => {
    const audioRef = React.createRef();

    // Check if playlists[index] exists before accessing its properties
    const imageUrl = playlists[index] ? playlists[index].imageUrl : '';
    const title = playlists[index] ? playlists[index].title : '';
    const description = playlists[index] ? playlists[index].description : '';
    const audioUrl = playlists[index] ? playlists[index].audio : '';
    const [fl, setFl] = useState(true);

    const togglePlay = () => {
        if (index === -1) {
            alert("Please select a song to play");
        } else {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            TogglePlaying();
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (index === -1) {
                alert("Please select a song to play");
            }
            else if (event.code === 'Space') {
                event.preventDefault(); // Prevent the default action (scrolling)
                TogglePlaying();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPlaying, index]);

    useEffect(() => {
        if (fl) {
            audioRef.current.pause();
            setFl(false);
        } else {
            audioRef.current.play();
            setFl(true);
        }
    }, [isPlaying]);

    const gotoPrev = () => {
        const newIndex = index !== 0 ? index - 1 : playlists.length - 1;
        changeSongToPlay(newIndex);
    };

    const gotoNext = () => {
        const newIndex = index !== playlists.length - 1 ? index + 1 : 0;
        changeSongToPlay(newIndex);
    };

    return (
        <div className="playbar">
            {(index >= 0) && <div className="playbar-left">
                <div className="playing-icon" style={{ backgroundImage: `url(${imageUrl})` }}></div>
                <div className="playbar-left-text">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>}
            <div className="playbar-middle">
                <div className="playbar-middle-top">
                    <span className="material-symbols-outlined">shuffle</span>
                    <span className="material-symbols-outlined" onClick={gotoPrev}>skip_previous</span>
                    {isPlaying
                        ? <span className="material-symbols-outlined" onClick={togglePlay}>pause_circle</span>
                        : <span className="material-symbols-outlined" onClick={togglePlay}>play_circle</span>
                    }
                    <span className="material-symbols-outlined" onClick={gotoNext}>skip_next</span>
                    <span className="material-symbols-outlined">repeat</span>
                </div>
                <div className="playbar-middle-bottom">
                    <audio ref={audioRef} src={audioUrl} autoPlay controls />
                </div>
            </div>
        </div>
    );
};

export default Playbar;

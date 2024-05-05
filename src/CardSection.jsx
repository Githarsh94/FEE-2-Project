import React, { useEffect } from 'react';

const CardSection = ({ keyName, playlist, TogglePlaying, changeSongToPlay, changePlaylist, searchTerm, songtoPlay }) => {


    useEffect(() => {
        setTimeout(() => {
            const setLiBackgroundColor = (parentSelector, liSelector) => {
                const parentElement = document.querySelector(parentSelector);
                if (!parentElement) {
                    console.error('Parent element not found');
                    return;
                }
                const parentBGColor = getComputedStyle(parentElement).backgroundColor;
                const rgbValues = parentBGColor.match(/\d+/g);
                const r = parseInt(rgbValues[0]);
                const g = parseInt(rgbValues[1]);
                const b = parseInt(rgbValues[2]);
                const newR = r + 20 > 255 ? 255 : r + 20;
                const newG = g + 20 > 255 ? 255 : g + 20;
                const newB = b + 20 > 255 ? 255 : b + 20;
                const liElements = document.querySelectorAll(liSelector);
                liElements.forEach((li) => {
                    li.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
                });
            };

            setLiBackgroundColor('main', '.filter-icons li');
            setLiBackgroundColor('main', '.header-wrap');
            setLiBackgroundColor('main', '.playlist-card');
            setLiBackgroundColor('main', '.playlist-card-text div span');
        }, 200);
    }, []);

    useEffect(() => {
        const playbar = document.querySelector('.playbar');
        const handleMouseOver = () => {
            document.querySelector('*').style.overflowY = 'hidden';
        };
        const handleMouseOut = () => {
            document.querySelector('*').style.overflowY = 'auto';
        };
        if (playbar) {
            playbar.addEventListener('mouseover', handleMouseOver);
            playbar.addEventListener('mouseout', handleMouseOut);
            return () => {
                playbar.removeEventListener('mouseover', handleMouseOver);
                playbar.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, []);

    const playSong = (index) => {
        changeSongToPlay(index);
        changePlaylist(playlist);
        if (index === songtoPlay) TogglePlaying();
        else TogglePlaying(true);
    }

    const addToFavorite = (index, keyName, event) => {
        const updatedPlaylists = [...playlist];
        updatedPlaylists[index].isFav = !updatedPlaylists[index].isFav;
        changePlaylist(updatedPlaylists);
        const storedData = JSON.parse(localStorage.getItem('songsData'));
        storedData[keyName] = updatedPlaylists;
        localStorage.setItem('songsData', JSON.stringify(storedData));
    }

    return (
        <>
            <h2 className="card-title">Made For S.Harsh</h2>
            <div className="card-container">
                {playlist.filter(song =>
                    searchTerm === '' ||
                    (song.title && song.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (song.description && song.description.toLowerCase().includes(searchTerm.toLowerCase()))
                ).map((song, index) => (
                    <div className="playlist-card" key={index} onClick={() => playSong(index)}>
                        <div className="playlist-card-image" style={{ backgroundImage: `url('${song.imageUrl}')` }}></div>
                        <div className="playlist-card-text">
                            <div>
                                <h3>{song.title}</h3>
                                <span className="material-symbols-outlined" onClick={(event) => addToFavorite(index, keyName, event)}>{playlist[index].isFav ? 'heart_check' : 'favorite'}</span>

                            </div>
                            <p>{song.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Repeat this structure for other card sections */}
        </>
    );
}

export default CardSection;

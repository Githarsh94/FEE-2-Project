import React, { useEffect, useState } from "react";
const FavoriteSongs = ({ songs1, songs2, songs3 }) => {
    const allsongs = [...songs1, ...songs2, ...songs3];
    const [favSongs, setfavSongs] = useState([]);
    useEffect(() => {
        var songs_cloned = [...allsongs];
        songs_cloned = songs_cloned.filter((song) => song.isFav === true);
        setfavSongs(songs_cloned);
    }, [songs1, songs2, songs3]);
    return (
        <>
            <h2>Favourites</h2>
            <div className="favsongs-slider">
                {favSongs.map((fav) => (
                    <div key={fav.title} className="song-item">
                        <div className="playing-icon" style={{ backgroundImage: `url(${fav.imageUrl})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>
                        <div>
                            <h3>{fav.title}</h3>
                            <p>{fav.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default FavoriteSongs;
import React, { useState, useEffect } from 'react';
import Header from './Header';
import CardSection from './CardSection';
import Footer from './Footer';
import './App.css';
import Playbar from './Playbar';
import FavoriteSongs from './favSongsSlider';

function Musioca() {
  const [songtoPlay, setsongtoPlay] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songsData, setSongsData] = useState({});
  const [currPlaylist, setCurrPlaylist] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isvisibleFavs, setisvisibleFavs] = useState(false);

  function changeSongToPlay(index) {
    setsongtoPlay(index);
  }

  function TogglePlaying(val = !isPlaying) {
    setIsPlaying(val);
  }

  function changePlaylist(playlist) {
    setCurrPlaylist(playlist);
  }

  const getData = () => {
    // Check if data exists in localStorage
    const storedData = localStorage.getItem('songsData');
    if (storedData) {
      // If data exists, parse and set the state
      const parsedData = JSON.parse(storedData);
      setSongsData(parsedData);
    } else {
      // If data doesn't exist, fetch from the API
      console.log("empty");
      fetch('https://musioca-api.onrender.com/api/songs', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          // Set state with fetched data
          delete myJson[0]._id;
          setSongsData(myJson[0]);
          console.log(myJson[0]);
          // Store fetched data in localStorage
          localStorage.setItem('songsData', JSON.stringify(myJson[0]));
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isvisibleFavs) {
      setisvisibleFavs(false);
      setTimeout(() => {
        setisvisibleFavs(true);
      }, 1);
    }
  }, [localStorage.getItem('songsData')]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const showFavs = () => {
    setisvisibleFavs(!isvisibleFavs);
  };

  return (
    <main>
      <Header showFavs={showFavs} />
      {isvisibleFavs && <FavoriteSongs {...songsData} />}
      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
      {Object.entries(songsData).map(([key, playlist]) => (
        <CardSection
          key={key}
          keyName={key}
          playlist={playlist}
          TogglePlaying={TogglePlaying}
          changeSongToPlay={changeSongToPlay}
          changePlaylist={changePlaylist}
          searchTerm={searchTerm}
          songtoPlay={songtoPlay}
        />
      ))}
      <Footer />
      <Playbar playlists={currPlaylist} isPlaying={isPlaying} TogglePlaying={TogglePlaying} index={songtoPlay} changeSongToPlay={changeSongToPlay} />
    </main>
  );
}

export default Musioca;

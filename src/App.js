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
  const [Songs1, setSongs1] = useState([{}]);
  const [Songs2, setSongs2] = useState([{}]);
  const [Songs3, setSongs3] = useState([{}]);
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
      setSongs1(parsedData.songs1);
      setSongs2(parsedData.songs2);
      setSongs3(parsedData.songs3);
    } else {
      // If data doesn't exist, fetch from cards.json
      console.log("empty");
      fetch('cards.json', {
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
          setSongs1(myJson.songs1);
          setSongs2(myJson.songs2);
          setSongs3(myJson.songs3);
          // Store fetched data in localStorage
          localStorage.setItem('songsData', JSON.stringify(myJson));
        });
    }
  };
  useEffect(() => {
    getData()
  }, [])

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
  }
  const showFavs = () => {
    setisvisibleFavs(!isvisibleFavs);
  }
  return (
    <main>
      <Header showFavs={showFavs} />
      {isvisibleFavs && <FavoriteSongs songs1={Songs1} songs2={Songs2} songs3={Songs3} />}
      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
      <CardSection keyName="songs1" playlist={Songs1} TogglePlaying={TogglePlaying} changeSongToPlay={changeSongToPlay} changePlaylist={changePlaylist} searchTerm={searchTerm} songtoPlay={songtoPlay} />
      <CardSection keyName="songs2" playlist={Songs2} TogglePlaying={TogglePlaying} changeSongToPlay={changeSongToPlay} changePlaylist={changePlaylist} searchTerm={searchTerm} songtoPlay={songtoPlay} />
      <CardSection keyName="songs3" playlist={Songs3} TogglePlaying={TogglePlaying} changeSongToPlay={changeSongToPlay} changePlaylist={changePlaylist} searchTerm={searchTerm} songtoPlay={songtoPlay} />
      <Footer />
      <Playbar playlists={currPlaylist} isPlaying={isPlaying} TogglePlaying={TogglePlaying} index={songtoPlay} changeSongToPlay={changeSongToPlay} />
    </main>
  );
}

export default Musioca;

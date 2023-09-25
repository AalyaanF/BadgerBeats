import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import Song from "./Song";

const AllSongs = (props) => {
  const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("https://cs571.org/s23/hw5/api/songs", {
      headers: {
        "X-CS571-ID": "bid_5304ea9b5dbe89c3c090",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
      });
  }, []);

  const isFav = (song) => {
    for (let i = 0; i < favorites.length; ++i) {
      if (favorites[i].title === song.title) {
        return true;
      }
    }
    return false;
  };

  const toggleFav = (song) => {
    if (isFav(song)) {
      const newFavorites = favorites.filter(
        (favorite) => favorite.title !== song.title
      );
      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, song]);
    }
  };

  const { genres } = songs.reduce(
    (acc, currSong) => {
      const key = currSong.genre.toLowerCase();
      if (!acc.genres[key]) {
        acc.genres[key] = { name: currSong.genre, count: 0 };
      } else {
        acc.genres[key].count += 1;
      }
      return acc;
    },
    { genres: {} }
  );

  const { totalTime } = songs.reduce(
    (acc, currSong) => {
      const time = currSong.length
        .split(":")
        .reduce((acc, curVal) => 60 * parseInt(acc) + parseInt(curVal));
      acc.totalTime += time;
      return acc;
    },
    { totalTime: 0 }
  );

  return (
    <div>
      <h1>Songs</h1>
      <p>
        We have {songs.length} song{"(s)"} in {Object.keys(genres).length} genre
        {"(s)"} for a total of {totalTime} seconds of music
      </p>
      <Container fluid>
        <Row>
          {songs.map((song) => (
            <Col xs={12} sm={6} md={4} lg={3} xl={2} key={song.id}>
              <Song {...song} toggleFav={toggleFav} isFav={isFav(song)} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AllSongs;

import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import Song from "./Song";

const FavoriteSongs = (props) => {
  const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

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

  const { genres } = favorites.reduce(
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

  const { totalTime } = favorites.reduce(
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
      <h1>Favorites</h1>
      <p>
        You have favorited {favorites.length} song{"(s)"} in{" "}
        {Object.keys(genres).length} genre{"(s)"} for a total of {totalTime}{" "}
        seconds of music
      </p>
      <Container fluid>
        <Row>
          {favorites.map((song) => (
            <Col xs={12} sm={6} md={4} lg={3} xl={2} key={song.id}>
              <Song {...song} toggleFav={toggleFav} isFav={isFav(song)} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FavoriteSongs;

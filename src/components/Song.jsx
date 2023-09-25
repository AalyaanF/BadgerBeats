import { Button, Card } from "react-bootstrap";

const Song = (props) => {
  const addToFav = () => {
    props.toggleFav(props);
  };

  return (
    <Card>
      <img src={props.img} alt="Song cover"></img>
      <h5>{props.title}</h5>
      <h6>by {props.artist}</h6>
      <p>
        {props.genre} | {props.year} | {props.length}
      </p>
      <Button onClick={addToFav} variant={props.isFav ? "danger" : "primary"}>
        {props.isFav ? "Remove From Favorites" : "Add To Favorites"}
      </Button>
    </Card>
  );
};

export default Song;

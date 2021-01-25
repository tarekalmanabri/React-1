import { useState, useEffect } from "react";

const Url = "https://official-joke-api.appspot.com/random_joke";
export default function RandomJoke() {
  const [joke, setJoke] = useState({});
  const [hasError, setError] = useState(false);

  useEffect(() => {
    fetch(Url)
      .then((res) => res.json())
      .then((data) => {
        setJoke(data);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  return !hasError && <Joke joke={joke} />;
}

function Joke(props) {
  return (
    <div>
      <p>{props.joke.setup}</p>
      <p>{props.joke.punchline}</p>
    </div>
  );
}

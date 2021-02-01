import { useState } from "react";

const url = "https://dog.ceo/api/breeds/image/random";

export default function DogGallery() {
  const [dogPhotos, setDogPhotos] = useState([]);
  const [hasError, setError] = useState(false);

  const getDogPhoto = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.code !== 200) {
          setError("City not found");
          return;
        }
        setError(null);
        setDogPhotos([...dogPhotos, data.message]);
      })
      .catch((err) => {
        setError(true);
      });
  };
  return (
    <div>
      {!dogPhotos.length && <p>Get your first dog by clicking the button!</p>}
      <Button onClick={getDogPhoto} text="Get a dog!" />
      {!hasError &&
        dogPhotos.map((dogPhoto, index) => {
          return <DogPhoto key={"dogphoto" + index} dogPhoto={dogPhoto} />;
        })}
      {hasError && <p>something went wrong</p>}
    </div>
  );
}

function Button(props) {
  return (
    <button onClick={props.onClick} className="btn">
      {props.text}
    </button>
  );
}

function DogPhoto(props) {
  return (
    <div>
      <img src={props.dogPhoto} alt="dog" className="img" />
    </div>
  );
}

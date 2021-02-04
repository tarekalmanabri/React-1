import { useState } from "react";

const url = "https://www.randomuser.me/api?results=1";

export default function Friend() {
  const [friend, setFriend] = useState();
  const [error, setError] = useState(false);

  function getFriends() {
    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          setError(res.statusText);
          throw new Error(res.statusText);
        }

        return res.json();
      })
      .then((data) => {
        setError(null);
        setFriend(data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Button onClick={getFriends} text="Get a friend!" />
      {!error && friend && <FriendProfile friend={friend} />}
      {error && <p>Error: {error}</p>}
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

function FriendProfile(props) {
  return (
    <ul>
      <li className="list-item">First name: {props.friend.name.first}</li>
      <li className="list-item">Last name: {props.friend.name.last}</li>
      <li className="list-item">
        Address:{" "}
        {props.friend.location.postcode + " " + props.friend.location.state}
      </li>
      <li className="list-item">Country: {props.friend.location.country}</li>
      <li className="list-item">E-mail: {props.friend.email}</li>
      <li className="list-item">Phone number: {props.friend.phone}</li>
    </ul>
  );
}

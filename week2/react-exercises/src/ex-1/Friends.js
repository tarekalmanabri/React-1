import { useState } from "react";

const url = "https://www.randomuser.me/api?results=1";

export default function Friend() {
  const [friends, setFriends] = useState([]);
  const [hasError, setError] = useState(false);

  function getFriends() {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => setFriends(data.results))
      .catch((err) => {
        setError(true);
      });
  }

  return (
    <div>
      <Button onClick={getFriends} text="Get a friend!" />
      {!hasError &&
        friends.map((friend, index) => {
          return <FriendProfile key={"friend" + index} friend={friend} />;
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

import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .get("/api/friends")
      .then((res) => {
        setFriends(res.data);

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => console.error("SR: err: ", err.message));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <>
      <h2>FriendList</h2>
      <button onClick={handleLogout}>Logout</button>
      <button
        onClick={() => {
          history.push("/add-friend");
        }}
      >
        Add Friend
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {friends.map((friend) => (
            <div key={friend.id}>
              <p>Name: {friend.name}</p>
              <p>Age: {friend.age}</p>
              <p>Email: {friend.email}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FriendList;

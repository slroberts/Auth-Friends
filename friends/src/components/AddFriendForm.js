import React, {useState} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import {useHistory} from "react-router-dom";

const AddFriendForm = () => {
  const [addFriend, setAddFriend] = useState({
    id: Date.now(),
    name: "",
    age: "",
    email: "",
  });
  const history = useHistory();

  const handleChange = (e) => {
    setAddFriend({
      ...addFriend,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/friends", addFriend)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});

    setAddFriend({
      ...addFriend,
    });
    history.push("./friends");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Friend</h3>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={addFriend.name}
        onChange={handleChange}
      />

      <label htmlFor="age">Age</label>
      <input
        type="number"
        name="age"
        value={addFriend.age}
        onChange={handleChange}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={addFriend.email}
        onChange={handleChange}
      />
      <button>Add Friend</button>
    </form>
  );
};

export default AddFriendForm;

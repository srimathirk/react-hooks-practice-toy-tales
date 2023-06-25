import React from "react";

function ToyCard({toy , onDelete , onUpdate}) {
  const {name , image, likes} = toy

  function handleDeleteClick() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDelete(toy));
  }
  function handleUpdateClick(){
    fetch(`http://localhost:3001/toys/${toy.id}`, {
    method: "PATCH",
    headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(
        {likes: likes +1}
      )
  })
    .then((r) => r.json())
    .then(() => onUpdate(toy.id));
}

  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleUpdateClick}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDeleteClick}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;

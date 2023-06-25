import React, { useState } from "react";

function ToyForm({onAdd}) {
  const[formData,setFormData]=useState({
    name:"",
    image:"",
    likes:""
  });
  function handleChange(e){
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  function handleSubmit(e){
    e.preventDefault();
    const newToyData = {name:formData.name,image:formData.image,likes:formData.likes};
      fetch(`http://localhost:3001/toys`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newToyData),
      })
        .then((r) => r.json())
        .then((newToy) => onAdd(newToy));
    }
  return (
    <div className="container">
      <form className="add-toy-form"  onSubmit={handleSubmit} >
        <h1>Create a toy!</h1>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <button
          type="submit"
          className="submit"
          >Create New Toy</button>
      </form>
    </div>
  );
}

export default ToyForm;

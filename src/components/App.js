import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
   const [toys, setToys]= useState([])
   useEffect(()=>{
    fetch(`http://localhost:3001/toys`)
    .then((r)=>r.json())
    .then((toys)=>{
      setToys(toys)
    })
   },[])
   function handleAddCard(newToy){
    setToys([...toys,newToy])
   }
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
  function handleDeleteCard(deletedCard) {
    const updatedCard = toys.filter(
      (toy) => toy.id !== deletedCard.id
    );
    setToys(updatedCard);
  }

  function handleUpdateLikes(toyId){
    const updatedCard = toys.map((toy)=>{
      if(toy.id === toyId){
        return { ...toy, likes: toy.likes + 1}
      }
      return toy
    })
    setToys(updatedCard)
  }
  return (
    <>
      <Header />
      {showForm ? <ToyForm onAdd={handleAddCard}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDelete={handleDeleteCard} onUpdate={handleUpdateLikes}/>
    </>
  );
}

export default App;

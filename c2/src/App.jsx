
import './App.css';
import { useEffect, useState } from 'react';
import './food.css'

function App() {

 const [form , setForm] = useState(null);
 const [item , setItem] = useState([]);
 const [show , setShow] = useState(null);
 

 useEffect(() => {
  getFood()
 } , []);

 const getFood = async () => {

  let res = await fetch("http://localhost:3001/food");
  let data = await res.json();
  console.log(data);
  setItem(data);

 }

  const handleChange = (e) => {
   
    let {name , value } = e.target;
    setForm({
      ...form , 
      [name] : value,
    })

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

  fetch('http://localhost:3001/food' , {
    method:"POST",
    body:JSON.stringify(form),
    headers:{
      "content-type":"application/json"
    }

  }).then(() => {
    getFood();
  })

  }

  const handleShow = (e) => {
  setShow(e);
  console.log(show)

  }
  const getBytime = async () => {

  let res = await fetch("http://localhost:3001/food?_sort=time&_order=desc");
  let data = await res.json();
  console.log(data);
  setItem(data);

  }
 
  
  return (
    <div>
    <div style={{display:"flex"}}>
     

     <div className="form"style={{border:"1px solid black" , marginLeft:"100px"}}>
       <h2>Recipe</h2>
   <form   onSubmit={handleSubmit}>
<label>
 <i>Title</i>  <input type="text" name="title" onChange={handleChange} />  <br/>
</label>

<label>
<i>Ingredients</i>
            <input 
            type="text" name="ingredients" onChange={handleChange} /> <br/>
</label>

<label>
<i>Time</i> 
         <input type="number" name="time" onChange={handleChange} /> <br/>
</label>

<label>
 <i>Instructions</i>
         <input type="text" name="instructions" onChange={handleChange}/> <br/>
</label>

<label>
<i>Image</i>
         <input type="text" name="image" onChange={handleChange}/> <br/>
</label>
    
<input type="submit"/>

   </form>
   </div>
   
<div className='scrolll'>

<h3>Recipe cards</h3>

{item.map((e , i) => (
  <div className="all" key={i}>
      <p style={{ textDecoration:"underline",cursor:"pointer"}}  onClick={() => handleShow(e)}>{e.title}</p>

    <p><i>Time : </i>{e.time}min</p>
 
  </div>
))}
</div>

    </div>

    <button onClick={getBytime} className='sort'>Sort by time</button>

<h2 style={{marginLeft:"100px"}}>Details</h2>

{show? <div style={{marginLeft:"100px"}}>
  <i> Title: {show.title}</i> <br/>
  <i> Instructions: {show.instructions}</i><br/>
  <i> Time: {show.time}min</i><br/>
  <i> Ingredients: {show.ingredients}</i><br/>
  <img src={show.image} />
          
</div> : null}
    </div>
    
  );
}

export default App;

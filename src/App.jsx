import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [users,setUser] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => setUser(data))
  },[])

  const handleAddUser = event =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name,email};
    console.log(user);

    fetch('http://localhost:3000/users',{
      method: "POST",
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const newUsers = [...users,data];
      setUser(newUsers);
      event.target.reset();
    })
  }

  return (
    <>
      <h1>User Management System</h1>
      <h3>Number of users : {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" required/><br/>
        <input type="email" name="email" required/><br/>
        <input type="submit" value="Add user" /><br/>
      </form>

      <div>
        {users.map(user => <p key={user.id}>id-{user.id} name-{user.name} email- {user.email}</p>)}
      </div>
    </>
  )
}

export default App

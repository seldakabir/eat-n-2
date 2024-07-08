import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  
  const [friends,setFriends]=useState(initialFriends)
  const [shownAddList, setShownAddList] = useState(false)
   const [selectedFriend,setSelectedFriend]=useState(null)

  function AddNewFriend(friend) {
    setFriends(friends => [...friends, friend])
    setShownAddList(false)
    
  }
 
  function changeShowAddList() {
    setShownAddList(shownAddList=>!shownAddList)
  }
  function handleSelection(friend) {
    setSelectedFriend(friend)
    
  }
  return <div className="app">
     <div className="sidebar">
      <FriendList friends={friends} onSelecetFriend={handleSelection} />
      {shownAddList && <AddFriend onAddFriend={AddNewFriend } />}
      <Button onClick={changeShowAddList}>{shownAddList?'Close':'Add Friend' }</Button>
   
    </div>
       {selectedFriend && <SplitBill/>}
  </div>
}

function FriendList({friends,onSelecetFriend}) {
  return <ul>
    {friends.map(friend =>
      <Friend friend={friend } onSelecetFriend={onSelecetFriend} />)}
  </ul>
  
}
function Friend({ friend,onSelecetFriend }) {
 
  return <li>
    <img src={friend.image} alt={friend.image}></img>
    <h3>{friend.name }</h3>
    <p className={friend.balance > 0 ? 'green' :
      friend.balance < 0 ? 'red' :
    ''}>{friend.balance > 0 ? `${friend.name}owns you ${friend.balance}` :
    friend.balance<0? `you own ${friend.name} ${friend.balance}`:
    `you and ${friend.name} are even`}</p>
    <Button onClick={()=>onSelecetFriend(friend)} >Select</Button>
  </li>
}

function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children }</button>
  
}

function AddFriend({onAddFriend}) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48?u')
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id=crypto.randomUUID()
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance:0
      
    }
    onAddFriend(newFriend)
    setName('')
    setImage('https://i.pravatar.cc/48?u')
  }
  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>👫 Friend name</label>
    <input type="text" value={name} onChange={e=>setName(e.target.value)}></input>
     <label>🌄 Image URL</label>
    <input type="text" value={image} onchange={e=>setImage(e.target.value)}></input>
    <Button>Add</Button>
  </form>
}

function SplitBill() {
  return <form className="form-split-bill" >
    <h2>Split a bill with X</h2>
<label>💰 Bill value</label>
    <input type="text"></input>
    <label>🧍‍♀️ Your expense</label>
    <input type="text"></input>
    <label>👭 X's expense</label>
    <input type="text" disabled></input>
   <lable>🤑Who is paying the bill?</lable>
    <select>
      <option>You</option>
      <option>X</option>
    </select>

  </form>
}
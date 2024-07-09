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
       setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShownAddList(false);
    
  }
  function handleSplitBill(value) {
    setFriends(friends.map(friend =>
      friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + value } :
        friend
      
       
   
  ))
  
    
  }
  return <div className="app">
     <div className="sidebar">
      <FriendList friends={friends} onSelecetFriend={handleSelection} selectedFriend={ selectedFriend} />
      {shownAddList && <AddFriend onAddFriend={AddNewFriend } />}
      <Button onClick={changeShowAddList}>{shownAddList?'Close':'Add Friend' }</Button>
   
    </div>
    {selectedFriend && <SplitBill selectedFriend={ selectedFriend} onSplitBill={handleSplitBill} />}
  </div>
}

function FriendList({friends,onSelecetFriend,selectedFriend}) {
  return <ul>
    {friends.map(friend =>
      <Friend friend={friend } onSelecetFriend={onSelecetFriend} selectedFriend={selectedFriend} />)}
  </ul>
  
}
function Friend({ friend,onSelecetFriend,selectedFriend }) {
 const isSelected =selectedFriend?.id===friend.id
  return <li className={isSelected?'selected':''}>
    <img src={friend.image} alt={friend.image}></img>
    <h3>{friend.name }</h3>
    <p className={friend.balance > 0 ? 'green' :
      friend.balance < 0 ? 'red' :
    ''}>{friend.balance > 0 ? `${friend.name} owns you ${friend.balance}` :
    friend.balance<0? `you own ${friend.name} ${friend.balance}`:
    `you and ${friend.name} are even`}</p>
    <Button onClick={() => onSelecetFriend(friend)} >{isSelected?'close':'Select' }</Button>
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
    <input type="text" value={image} onChange={e=>setImage(e.target.value)}></input>
    <Button>Add</Button>
  </form>
}

function SplitBill({ selectedFriend,onSplitBill }) {
  const [bill, setBill] = useState('')
  const [userPaid, setUserPaid] = useState('')
  const friendPaid = bill ? bill - userPaid:''
  const [whoPaid, setWhoPaid] = useState('user')
  function formSubmit(e) {
     e.preventDefault();
    if (!bill || !userPaid) return;
onSplitBill(whoPaid==='user' ? friendPaid : -userPaid)

  }
  return (
  <form className="form-split-bill" onSubmit={formSubmit}>
    <h2>Split a bill with {selectedFriend.name} </h2>
<label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))} />
    <label>🧍‍♀️ Your expense</label>
      <input type="text"
        value={userPaid}
        onChange={(e) => setUserPaid(Number(e.target.value)<=bill?Number(e.target.value):userPaid)} />
    <label>👭 {selectedFriend.name}'s expense</label>
    <input type="text" disabled value={friendPaid}/>
   <lable>🤑Who is paying the bill?</lable>
    <select value={whoPaid} onChange={e=>setWhoPaid(e.target.value)}>
      <option value='user'>You</option>
      <option value='friend'>{ selectedFriend.name}</option>
    </select>
<Button>Split bill</Button>
    </form>
    )
}
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
  const data = initialFriends
  const [shownAddList, setShownAddList] = useState(false)
  function changeShowAddList() {
    setShownAddList(shownAddList=>!shownAddList)
  }
  return <div className="app">
     <div className="sidebar">
      <FriendList data={data} />
      {shownAddList && <AddFriend/>}
      <Button onChangeShowAddList={changeShowAddList}>{shownAddList?'Close':'Add Friend' }</Button>
   
    </div>
       <SplitBill/>
  </div>
}

function FriendList({data}) {
  return <ul>
    {data.map(friend =>
      <Friend friend={friend } />)}
  </ul>
  
}
function Friend({friend}) {
  return <li>
    <img src={friend.image} alt={friend.image}></img>
    <h3>{friend.name }</h3>
    <p className={friend.balance > 0 ? 'green' :
      friend.balance < 0 ? 'red' :
    ''}>{friend.balance > 0 ? `${friend.name}owns you ${friend.balance}` :
    friend.balance<0? `you own ${friend.name}${friend.balance}`:
    `you and${friend.name}are even`}</p>
    <Button >Select</Button>
  </li>
}

function Button({ children,onChangeShowAddList }) {
  return <button className="button" onClick={onChangeShowAddList}>{children }</button>
  
}

function AddFriend() {
  return <form className="form-add-friend">
    <label>👫 Friend name</label>
    <input type="text"></input>
     <label>🌄 Image URL</label>
    <input type="text"></input>
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
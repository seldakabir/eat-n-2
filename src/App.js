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
  const data=initialFriends
  return <div >
     <div className="sidebar">
      <FriendList data={data} />
      <Button>Add Friend</Button>
      </div>
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

function Button({ children }) {
  return <button className="button">{children }</button>
  
}



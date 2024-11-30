import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login_Register from "./Components/Login_Register/Login_Register"
import HomePage from "./Components/HomePage/HomePage"
import Userprofile from "./Components/Userprofile/Userprofile"
import Cart from "./Components/Cart/Cart"
import Saved from "./Components/Saved/Saved"
import Messages from "./Components/Messages/Messages"
import Logout from "./Components/Logout/Logout"
import MyOrders from "./Components/MyOrders/MyOrders"
import MyAnnouncements from "./Components/MyAnnouncements/MyAnnouncements"
import Announcement from "./Components/Announcement/Announcement"
import UserSettings from "./Components/Userprofile/UserSettings/UserSettings"
import Explore from "./Components/HomePage/Explore/Explore"
import { useEffect, useState } from "react"

function App() {
  const [user, setUser] = useState({
      id: '',
      name: '',     
      lastName: '',  
      email: '',     
      phone: '', 
      address: '',
      postCode: '',
      location: '',    
      role: '',
      createdAt: '' 
  });

  useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
          setUser(JSON.parse(storedUser));
      }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage user={user} setUser={setUser}/>}></Route>
          <Route path="/explore" element={<Explore user={user} setUser={setUser}/>}></Route>
          <Route path="/authorization" element={<Login_Register user={user} setUser={setUser}/>}></Route>
          <Route path="/announcement" element={<Announcement user={user} setUser={setUser}/>}></Route>
          <Route path="/profile" element={<Userprofile user={user} setUser={setUser}/>}></Route>
          <Route path="/profile/settings" element={<UserSettings user={user} setUser={setUser}/>}></Route>
          <Route path="/saved" element={<Saved user={user} setUser={setUser}/>}></Route>
          <Route path="/shopping-cart" element={<Cart user={user} setUser={setUser}/>}></Route>
          <Route path="/messages" element={<Messages user={user} setUser={setUser}/>}></Route>
          <Route path="/my-orders" element={<MyOrders user={user} setUser={setUser}/>}></Route>
          <Route path="/my-announcements" element={<MyAnnouncements user={user} setUser={setUser}/>}></Route>
          <Route path="/logout" element={<Logout user={user} setUser={setUser}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

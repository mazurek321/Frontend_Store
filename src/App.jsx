import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login_Register from "./Components/Login_Register/Login_Register"
import HomePage from "./Components/HomePage/HomePage"
import Userprofile from "./Components/Userprofile/Userprofile"
import Cart from "./Components/Cart/Cart"
import Order from "./Components/Order/Order"
import Saved from "./Components/Saved/Saved"
import Messages from "./Components/Messages/Messages"
import Logout from "./Components/Logout/Logout"
import MyOrders from "./Components/MyOrders/MyOrders"
import MyAnnouncements from "./Components/MyAnnouncements/MyAnnouncements"
import Announcement from "./Components/Announcement/Announcement"
import UserSettings from "./Components/Userprofile/UserSettings/UserSettings"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}></Route>
          <Route path="/authorization" element={<Login_Register/>}></Route>
          <Route path="/announcement" element={<Announcement/>}></Route>
          <Route path="/profile" element={<Userprofile/>}></Route>
          <Route path="/profile/settings" element={<UserSettings/>}></Route>
          <Route path="/saved" element={<Saved/>}></Route>
          <Route path="/shopping-cart" element={<Cart/>}></Route>
          <Route path="/order" element={<Order/>}></Route>
          <Route path="/messages" element={<Messages/>}></Route>
          <Route path="/my-orders" element={<MyOrders/>}></Route>
          <Route path="/my-announcements" element={<MyAnnouncements/>}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

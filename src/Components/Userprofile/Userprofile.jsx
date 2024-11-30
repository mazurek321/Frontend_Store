import React, { useEffect, useState } from 'react'
import "./Userprofile.css"
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import axios from 'axios'

const Userprofile = ({user}) => {
//   const [info, setInfo] = useState(null)

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const id = queryParams.get('userId');
//     if (id) {
//         axios.get(`http://localhost:5050/Users/user?userId=${user.id}`)
//             .then(response => {
//                 setInfo(response.data);
//             })
//             .catch(error => console.error(error));
//     }
// }, [location.search]);


  return (
    <div className='userprofile'>
        <Navbar active={"profile"} user={user}/>
        <div className="container">
          <Header text="User profile"/>
          <div className="user-profile-info">
          <fieldset>
              <legend>User information</legend>
              <table>
                <tr>
                  <th>Name</th>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <th>Lastname</th>
                  <td>{user.lastName}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Post code</th>
                  <td>{user.postCode}</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>{user.address}</td>
                </tr>
                <tr>
                  <th>Location</th>
                  <td>{user.location}</td>
                </tr>
                <tr>
                  <th>Phone number</th>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <th>Created at</th>
                  <td>{user.createdAt}</td>
                </tr>
              </table>
            </fieldset>
          </div>
        </div>
    </div>
  )
}

export default Userprofile
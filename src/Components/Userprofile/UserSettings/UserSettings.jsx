import React from 'react'
import Header from '../../Header/Header'
import "./userSettings.css"
import Navbar from '../../Navbar/Navbar'

const UserSettings = () => {
  return (
    <div className='userSettings'>
        <Navbar/>
        <div className="container">
          <Header text="Settings"/>

          <div className="user-info">
            <fieldset>
              <legend>User information</legend>
              <table>
                <tr>
                  <th>Name</th>
                  <td>Magda</td>
                </tr>
                <tr>
                  <th>Lastname</th>
                  <td>Gessler</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>gesslerowa@gmail.com</td>
                </tr>
                <tr>
                  <th>Post code</th>
                  <td>21-370</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>Watykan City</td>
                </tr>
                <tr>
                  <th>Location</th>
                  <td>City smth.</td>
                </tr>
                <tr>
                  <th>Phone number</th>
                  <td>213721370</td>
                </tr>
              </table>
            </fieldset>
            <div className="buttons flex">
              <button className='styledButton'>Edit</button>
            </div>
          </div>


          <div className="user-password">
            <fieldset>
              <legend>Change password</legend>

              <div className="old-password">
                <input type="password"/>
                <label htmlFor="oldPassword">Old password</label>
              </div>
              <div className="new-password">
                <input type="password" />
                <label htmlFor="newPassword">New password</label>
              </div>
              <div className="new-password">
                <input type="password" />
                <label htmlFor="confirmNewPassword">Confirm password</label>
              </div>

            </fieldset>
            <div className="buttons flex">
              <button className='styledButton'>Confirm</button>
            </div>
          </div>


        </div>
    </div>
  )
}

export default UserSettings
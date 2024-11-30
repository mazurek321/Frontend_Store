import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import "./userSettings.css";
import Navbar from '../../Navbar/Navbar';
import axios from 'axios';
import MessageBox from '../../MessageBox/MessageBox';

const UserSettings = ({ user, setUser }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [visible, setVisible] = useState(false)
  const[status, setStatus] = useState("")
  let timer;

  const [editMode, setEditMode] = useState(false);
  const [values, setValues] = useState({
    name: '',
    lastName: '',
    postCode: '',
    address: '',
    location: '',
    phone: ''
  });

  useEffect(() => {
    if (editMode) {
      setValues({
        name: user.name || '',
        lastName: user.lastName || '',
        postCode: user.postCode || '',
        address: user.address || '',
        location: user.location || '',
        phone: user.phone || ''
      });
    }
  }, [editMode, user]);

  useEffect(()=>{
    timer = setTimeout(()=>{
        setVisible(false)
    }, 6000)
    return ()=>{clearTimeout(timer)}
  }, [visible])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setEditMode(false);
   
    try{
      const response = await axios.put('http://localhost:5050/Users/changeInformation', {
        name: values.name,
        lastName: values.lastName,
        address: values.address,
        location: values.location,
        postCode: values.postCode,
        phone: values.phone
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const userResponse = await axios.get('http://localhost:5050/Users/me', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    var data = userResponse.data

    const userData = {
        id: data.id.value,
        name: data.name.value,
        lastName: data.lastName.value,
        email: data.email.value,
        phone: data.phone?.value || '',
        address: data.address?.value || '',
        postCode: data.postCode?.value || '',
        location: data.location?.value || '',
        role: data.role.value,
        createdAt: data.createdAt
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setStatus('success')
    setVisible(true)

    }catch(error){
        console.log("error")
        setStatus('error')
        setVisible(true)
        throw error;
    }

  };

  const handleCancel = () => {
    setEditMode(false);
    setValues({
      name: user.name,
      lastName: user.lastName,
      postCode: user.postCode,
      address: user.address,
      location: user.location,
      phone: user.phone
    });
  };

  const handlePasswordChange = async () => {
    try{
      const response = await axios.put('http://localhost:5050/Users/changePassword', {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log("ok")
      setVisible(true)
      setStatus('success')
    }catch(error)
    {
      setVisible(true)
      setStatus('error')
      throw error.response;
    }
    setOldPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
  }

  return (
    <div className='userSettings'>
      <Navbar user={user} />
      {(visible&&status==='error') && <MessageBox action={"cancel"} message={"Error while changing."}/>}
      {(visible&&status==='success') && <MessageBox action={"success"} message={"Changed."}/>}
      <div className="container">
        <Header text="Settings" />

        <div className="user-info">
          <fieldset>
            <legend>User information</legend>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  {editMode ? <td><input type="text" name="name" value={values.name} onChange={handleChange} /></td> : <td>{user.name}</td>}
                </tr>
                <tr>
                  <th>Lastname</th>
                  {editMode ? <td><input type="text" name="lastName" value={values.lastName} onChange={handleChange} /></td> : <td>{user.lastName}</td>}
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Post code</th>
                  {editMode ? <td><input type="text" name="postCode" value={values.postCode} onChange={handleChange} /></td> : <td>{user.postCode}</td>}
                </tr>
                <tr>
                  <th>City</th>
                  {editMode ? <td><input type="text" name="address" value={values.address} onChange={handleChange} /></td> : <td>{user.address}</td>}
                </tr>
                <tr>
                  <th>Location</th>
                  {editMode ? <td><input type="text" name="location" value={values.location} onChange={handleChange} /></td> : <td>{user.location}</td>}
                </tr>
                <tr>
                  <th>Phone number</th>
                  {editMode ? <td><input type="text" name="phone" value={values.phone} onChange={handleChange} /></td> : <td>{user.phone}</td>}
                </tr>
                <tr>
                  <th>Created at</th>
                  <td>{user.createdAt}</td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          <div className="buttons flex">
            {editMode ? 
              <>
                <button className='styledButton submit' onClick={handleSubmit}>Submit</button>
                <button className='styledButton cancel' onClick={handleCancel}>Cancel</button>
              </>
              : 
              <button className='styledButton' onClick={() => setEditMode(true)}>Edit</button>}
          </div>
        </div>

        <div className="user-password">
          <fieldset>
            <legend>Change password</legend>
            <div className="old-password">
              <input type="password" 
                placeholder="Old password" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)} />
            </div>
            <div className="new-password">
              <input type="password" 
                placeholder="New password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}  />
            </div>
            <div className="new-password">
              <input type="password" 
                placeholder="Confirm new password" 
                value={confirmNewPassword} 
                onChange={(e) => setConfirmNewPassword(e.target.value)} />
            </div>
          </fieldset>
          <div className="buttons flex">
            <button className='styledButton' onClick={()=>handlePasswordChange()}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;

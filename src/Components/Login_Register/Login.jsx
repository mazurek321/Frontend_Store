import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Login = ({setClicked, exiting, setVisible, setMessage, user, setUser,}) => {

    const [checkedButton, isCheckedButton] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const logged = localStorage.getItem('token')

    const rememberMeHandler = () => {
        isCheckedButton(!checkedButton)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try{

            if(logged){
                navigate("/");
                return;
            }

            const response = await axios.post('http://localhost:5050/Users/login', {
                email,
                password
            })

            var token = response.data
            localStorage.setItem("token", token)
            localStorage.setItem("logged", true)

            const userResponse = await axios.get('http://localhost:5050/Users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
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
            
            navigate("/")

        }catch(err){
            console.log("ERROR WHILE LOGGING.")
            setMessage("Wrong email or password.")
            setVisible(true)
        }
    }

    useEffect(()=>{
        if(logged){
            navigate("/");
            return;
        }
    }, [])

  return (
        <div className={`login_main main ${exiting && 'exiting'}`}>
            <Link to="/">
                <p className=' goBack flex'><span className="material-symbols-outlined">arrow_back_ios</span> Go Back</p>
            </Link>
            <div className="header">
                <h3>Login</h3>
                <h4>Don't have an account ? <span onClick={()=>{setClicked(true)}}>Create your account</span></h4>
            </div>
            <div className="login_form">
                <form onSubmit={handleLogin}>
                    <label htmlFor="login">
                        <input 
                            type="text" 
                            placeholder='Email'  
                            onChange={(e)=>setEmail(e.target.value)} 
                            required
                        />
                    </label>

                    <label htmlFor="password">
                        <input 
                            type="password" 
                            placeholder='Password'
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />
                        <span className="material-symbols-outlined visibility">visibility</span>
                    </label>

                    <div className="bottom_section">
                        <div className="remember_me" onClick={()=>{rememberMeHandler()}}>
                            <label htmlFor="styledRadioButton">
                                <input type="radio" checked={checkedButton} onChange={rememberMeHandler}/>
                                <span className='radioButton'></span>
                            </label>
                            <span className='rememberMeText'>Remember me</span>
                        </div>
                        <span className='forgot_password'>Forgot password ?</span>
                    </div>
                    <button className='styledButton'>Login</button>
                </form>
            </div>
        </div>
  )
}

export default Login
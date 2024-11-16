import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Register = ({setClicked, exiting}) => {

    const logged = localStorage.getItem('logged')

    const [data, setData] = useState({
        email: "",
        name: "",
        lastname: "",
        password: "",
        confirmPassword: "",
        address: "",
        location: "",
        postCode: "",
        phone: ""
    })

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try{

            if(logged){
                navigate("/");
                return;
            }

            const response = await axios.post('http://localhost:5050/Users/register', {
                email,
                name,
                lastname,
                password,
                confirmPassword,
                address,
                location,
                postCode,
                phone
            });

        }catch(err){
            console.log("ERROR WHILE REGISTERRING.")
        }
    }

    useEffect(()=>{
        if(logged){
            navigate("/");
            return;
        }
    }, [])

  return (
        <div className={`register_main main ${exiting && 'exiting'}`}>
            <Link to="/">
                <p className=' goBack flex register'><span className="material-symbols-outlined">arrow_back_ios</span> Go Back</p>
            </Link>
            <div className="header">
                <h3>Register</h3>
                <h4>Already have an account ? <span onClick={()=>{setClicked(false)}}>Login</span></h4>
            </div>
            <div className="register_form">
                <form onSubmit={handleRegister}>
                    <label htmlFor="name">
                        <input type="text" placeholder='Name'/>
                    </label>

                    <label htmlFor="lastname">
                        <input type="text" placeholder='Lastname'/>
                    </label>

                    <label htmlFor="login">
                        <input type="text" placeholder='Email'/>
                    </label>

                    <label htmlFor="password">
                        <input type="password" placeholder='Password'/>
                        <span className="material-symbols-outlined visibility">visibility</span>
                    </label>

                    <label htmlFor="confirmPassword">
                        <input type="password" placeholder='Confirm Password'/>
                        <span className="material-symbols-outlined visibility">visibility</span>
                    </label>

                    <button className='styledButton'>Register</button>
                </form>
            </div>
        </div>
  )
}

export default Register
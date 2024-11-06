import React from 'react'
import { Link } from 'react-router-dom'

const Register = ({setClicked, exiting}) => {

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
                <form>
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
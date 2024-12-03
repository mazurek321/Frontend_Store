import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setClicked, exiting, setVisible, setMessage, setAction}) => {
    const navigate = useNavigate();
    const logged = localStorage.getItem('logged');
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        name: "",
        lastname: "",
        password: "",
        confirmPassword: "",
        address: null,
        location: null,
        postCode: null,
        phone: null
    });

    const handleRegister = async (e) => {
        e.preventDefault();

        if (logged) {
            navigate("/");
            return;
        }

        if (data.password !== data.confirmPassword) {
            setMessage("Passwords do not match.");
            setVisible(true);
            return;
        }

        if (!data.email || !data.name || !data.lastname || !data.password) {
            setMessage("All fields are required.");
            setVisible(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5050/Users/register', 
                data
            );
            if (response.status === 200) {
                setMessage("Registration successful!");
                setAction("success")
                setVisible(true);
                window.location.reload();
            }
        } catch (err) {
            console.log("ERROR WHILE REGISTERING.");
            setMessage("Something went wrong.");
            setAction("cancel")
            setVisible(true);
            console.log(err.response)
        }
    };

    useEffect(() => {
        if (logged) {
            navigate("/");
        }
    }, [logged, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    return (
        <div className={`register_main main ${exiting && 'exiting'}`}>
            <Link to="/">
                <p className=' goBack flex register'><span className="material-symbols-outlined">arrow_back_ios</span> Go Back</p>
            </Link>
            <div className="header">
                <h3>Register</h3>
                <h4>Already have an account? <span onClick={() => { setClicked(false) }}>Login</span></h4>
            </div>
            <div className="register_form">
                <form onSubmit={handleRegister}>
                    <label htmlFor="name">
                        <input
                            type="text"
                            name="name"
                            placeholder='Name'
                            value={data.name}
                            onChange={handleChange}
                        />
                    </label>

                    <label htmlFor="lastname">
                        <input
                            type="text"
                            name="lastname"
                            placeholder='Lastname'
                            value={data.lastname}
                            onChange={handleChange}
                        />
                    </label>

                    <label htmlFor="email">
                        <input
                            type="text"
                            name="email"
                            placeholder='Email'
                            value={data.email}
                            onChange={handleChange}
                        />
                    </label>

                    <label htmlFor="password">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder='Password'
                            value={data.password}
                            onChange={handleChange}
                        />
                        <span className="material-symbols-outlined visibility" onClick={() => setShowPassword(!showPassword)}>visibility</span>
                    </label>

                    <label htmlFor="confirmPassword">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder='Confirm Password'
                            value={data.confirmPassword}
                            onChange={handleChange}
                        />
                        <span className="material-symbols-outlined visibility" onClick={() => setShowPassword(!showPassword)}>visibility</span>
                    </label>

                    <button className='styledButton'>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;

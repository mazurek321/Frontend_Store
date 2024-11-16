import axios from 'axios'


const handleLogin = async (email, password, navigate) => {
    console.log(email)
    console.log(password)
    try{

        if(logged){
            navigate("/");
            return;
        }

        const response = await axios.post('http://localhost:5050/Users/login', {
            email,
            password
        });

        localStorage.setItem("token", response.data)
        localStorage.setItem("logged", true)
        navigate("/")

        console.log(email)
        console.log(password)

    }catch(err){
        console.log("ERROR WHILE LOGGING.")
    }
}

export default handleLogin;

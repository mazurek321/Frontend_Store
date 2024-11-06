import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(()=>{

        localStorage.removeItem('token')
        localStorage.removeItem('logged')
        navigate("/")

    }, [navigate])


    return null;
}

export default Logout
import React, { useEffect, useState } from 'react'
import "./MessageBox.css"

const MessageBox = ({action, message}) => {
  const [visible, setVisible] = useState(true)

  const displayIcon = (action) => {
        const icons = {
            cancel: <span className={`material-symbols-outlined cancel`}>cancel</span>,
            info: <span className={`material-symbols-outlined info`}>info</span>,
            success: <span className={`material-symbols-outlined success`}>check_circle</span>,
        };

        return icons[action] || null;
    };

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setVisible(false)
        }, 5000);

        return ()=>clearTimeout(timer);
    }, [])
        
  return (
    <div className={`MessageBox ${action} ${!visible&&'invisible'}`}>
        <div className={`message flex ${action}`}>
            {displayIcon(action)}
            <p>{message}</p>
            <span className={`material-symbols-outlined close`} onClick={()=>{setVisible(false)}}>close</span>
        </div>
        <div className={`timing ${action}`}></div>
    </div>
  )
}

export default MessageBox




// const [visible, setVisible] = useState(false)
//   let timer;

// useEffect(()=>{
//     timer = setTimeout(()=>{
//         setVisible(false)
//     }, 6000)
//     return ()=>{clearTimeout(timer)}
//   }, [visible])

// {visible && <MessageBox action={"info"} message={"You cannot contact us."}/>}
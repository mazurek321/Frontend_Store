import React from 'react'

const Side_Login = ({exiting}) => {
  return (
    <div className={`side_login ${exiting && 'exiting'}`}>
        <h3>Welcome back !</h3>
        <h4>We are glad that you are here. Still alive. Please bring food.</h4>
    </div>
  )
}

export default Side_Login
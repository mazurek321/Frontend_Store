import React from 'react'

const Side_Register = ({exiting}) => {
  return (
    <div className={`side_register ${exiting && 'exiting'}`}>
        <h3>Welcome !</h3>
        <h4>We are glad that you have joined our website ans store. Please bring food. And some luck. And money.</h4>
    </div>
  )
}

export default Side_Register
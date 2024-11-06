import React, { useState } from 'react'
import "./Userinfo.css"

const Userinfo = () => {
    const [disabled, setDisabled] = useState(true)

    const handleButton = () => {
        setDisabled(!disabled)
    }

  return (
    <div className='userinfo'>
        <h3>User information</h3>
        <form>
            <table>
                <tr>
                    <th>Name</th>
                    <td><input type="text" defaultValue={"Magda"} disabled={disabled}/></td>
                </tr>
                <tr>
                    <th>Lastname</th>
                    <td><input type="text" defaultValue={"Gessler"} disabled={disabled}/></td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td><input type="text" defaultValue={"gessler@wp.pl"} disabled={disabled}/></td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td><input type="text" defaultValue={"Warszawa"} disabled={disabled}/></td>
                </tr>
                <tr>
                    <th>Location</th>
                    <td><input type="text" defaultValue={"Dupa"} disabled={disabled}/></td>
                </tr>
                <tr>
                    <th>Post code</th>
                    <td><input type="text" defaultValue={"21-370"} disabled={disabled}/></td>
                </tr>
                <tr>
                    <th>Phone number</th>
                    <td><input type="text" defaultValue={"666666666"} disabled={disabled}/></td>
                </tr>
            </table>
        </form>
        <div className="buttons flex">
            {disabled ?
                 <button className='edit' onClick={handleButton}>Edit</button>
                :
                <>
                    <button className='submit' onClick={handleButton}>Submit</button>
                    <button className='cancel' onClick={handleButton}>Cancel</button>
                </>
            }
        </div>
    </div>
  )
}

export default Userinfo
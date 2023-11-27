import React, {useState, useSelector} from 'react'
import { redirect, useNavigate } from 'react-router-dom';


  
const FormAddUser = () => {
    const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  

  const saveUser = async (e) => {
    e.preventDefault();
    
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.uuid);
        myHeaders.append("Content-Type", "application/json"); // Set Content-Type header

        var raw = JSON.stringify({
            name: name,
            password: password,
            confPassword: confPassword,
            role: role
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:5000/users", requestOptions);

        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const result = await response.text();
        console.log(result);
        navigate('/users');
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
console.log(role)

  return (
    <div>
        <h1 className='title'>Users</h1>
        <h2 className='subtitle'>Add User</h2>
        <div className='card is-shadowless'>
            <div className='card-content'>
                <div className='content'>
                <form onSubmit={saveUser}>
                    <p className='has text-centered'>{msg}</p>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input type="text" className="input" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input type="password" className="input" placeholder='*****'value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control">
                            <input type="password" className="input" placeholder='*****' value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Role</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">-----</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                
                            </div>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <div className="control">
                            <button type='submit' className='button is-success' >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddUser
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const FormEditUser = () => {
    const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  

  return (
    <div>
        <h1 className='title'>Users</h1>
        <h2 className='subtitle'>Edit User</h2>
        <div className='card is-shadowless'>
            <div className='card-content'>
                <div className='content'>
                <form>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input type="text" className="input" placeholder='name'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input type="password" className="input" placeholder='*****'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control">
                            <input type="password" className="input" placeholder='*****'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Role</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <div className="control">
                            <button className='button is-success'>
                                Update
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

export default FormEditUser
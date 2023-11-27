import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link, NavLink } from 'react-router-dom';

const Userlist = () => {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState();
    const user = JSON.parse(localStorage.getItem("user"));
    const cookies = new Cookies();

    // Get a specific cookie by name (e.g., 'cookieName')
    const cookieValue = cookies.get('connect.sid');

    console.log(cookieValue)

    useEffect(() => {
        if (!user || !user.uuid) {
            console.error("User or user.uuid is undefined.");
            return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.uuid);

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("http://localhost:5000/users", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((result) => {
                setUsers(result);
                console.log(result);
            })
            .catch((error) => {
                console.error("Error fetching data:", error.message);
                console.error("Error object:", error);
            });

    }, [user]);

    
    const deleteUser = async (userUuid) => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + user.uuid);
            myHeaders.append("Content-Type", "application/json"); // Set Content-Type header
    
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            const response = await fetch(`http://localhost:5000/users/${userUuid}`, requestOptions);
    
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
    
            const result = await response.text();
            console.log(result);
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    // Usage example
    const handleDeleteClick = () => {
        deleteUser(user.uuid);
    };
    


    return (
        <div>
            <h1 className='title'>Users</h1>
            <h2 className='subtitle'>List of Users</h2>
            <Link to={"/users/add"} className='button is-primary mb-2'>
                Add Users
            </Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map((item, index) => (
                            <tr key={item.uuid}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button onClick={() =>deleteUser(item.uuid)}
                                        className='button is-small is-danger'>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Userlist
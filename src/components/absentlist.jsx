import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';


const Absentlist = () => {
  const [absent, setAbsent] = useState([]);
  const [data, setData] = useState();
  const user = JSON.parse(localStorage.getItem("user"));



  const cookies = new Cookies();

  // Get a specific cookie by name (e.g., 'cookieName')
  const cookieValue = cookies.get('connect.sid');

  console.log(cookieValue)
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.uuid);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5000/absent", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAbsent(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  

  return (
    <div className='mt-5'>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Date</th>
            <th>Name</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {absent &&
            absent.map((item, index) => (
              <tr key={item.uuid}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.user?.name}</td>
                <td>{item.absent}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Absentlist;
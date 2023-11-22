import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Absentlist = () => {
  const [absent, setAbsent] = useState([]);
  const [data, setData] = useState();
  const user = JSON.parse(localStorage.getItem("user"));





  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3AFI82Utv2Qcx71g-7V1UTyNdzluwSm53j.aXRIcDWxC7K%2B6j%2BZ%2FjlaB2bNRVgAsxSM4%2BwDX%2BB7Iek");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// Make the API request to fetch absent data
fetch("http://localhost:5000/absent", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }, [])
  

  return (
    <div>
      <h1 className='title'>Absent</h1>
      <h2 className='subtitle'>Absent List</h2>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {absent.map((item, index) => (
            <tr key={item.uuid}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.absent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Absentlist;
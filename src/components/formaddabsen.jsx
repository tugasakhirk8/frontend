import React, {useState, useSelector} from 'react'
import { redirect, useNavigate } from 'react-router-dom';


  
const FormAddAbsent = () => {
    const [date, setDate] = useState("");
  const [absent, setAbsent] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  

  const saveAbsent = async (e) => {
    e.preventDefault();
    
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.uuid);
        myHeaders.append("Content-Type", "application/json"); // Set Content-Type header

        var raw = JSON.stringify({
            date: date,
            absent: absent,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:5000/absent", requestOptions);

        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const result = await response.text();
        console.log(result);
        navigate('/dashboard');
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
console.log(date)

  return (
    <div>
        <h1 className='title'>Absent</h1>
        <h2 className='subtitle'>Add Absent</h2>
        <div className='card is-shadowless'>
            <div className='card-content'>
                <div className='content'>
                <form onSubmit={saveAbsent}>
                    <div className="field">
                        <label className="label">Tanggal</label>
                        <div className="control">
                            <input type="date" className="input" placeholder='name' value={date} onChange={(e) => setDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Absent</label>
                        <div className="control">
                        <div className="select is-fullwidth">
                                <select value={absent} onChange={(e) => setAbsent(e.target.value)}>
                                    <option value={""}>-------</option>
                                    <option value="Hadir">Hadir</option>
                                    <option value="Sakit">Sakit</option>
                                    <option value="Izin">Izin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <div className="control">
                            <button className='button is-success' type='submit'>
                                Submit
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

export default FormAddAbsent
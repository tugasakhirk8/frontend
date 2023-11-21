import React from 'react'

const FormAddAbsent = () => {
  return (
    <div>
        <h1 className='title'>Users</h1>
        <h2 className='subtitle'>Add User</h2>
        <div className='card is-shadowless'>
            <div className='card-content'>
                <div className='content'>
                <form>
                    <div className="field">
                        <label className="label">Tanggal</label>
                        <div className="control">
                            <input type="date" className="input" placeholder='name'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Absent</label>
                        <div className="control">
                        <div className="select is-fullwidth">
                                <select>
                                    <option value="Hadir">Hadir</option>
                                    <option value="Sakit">Sakit</option>
                                    <option value="Izin">Izin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <div className="control">
                            <button className='button is-success'>
                                Send
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
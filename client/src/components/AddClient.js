import axios from 'axios';
import React, { useState } from 'react';

const AddClient = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [modalVisible, setModalVisible] = useState(true);

    const closeModal = () => {
    setModalVisible(false);
    };
  
    const submitClient = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post("http://localhost:5000/Api/v1/newclient", {
            name,
            email,
            password,
            phone,
            address
          });
      
          if (response.data.message === "Client successfully created") {
            alert('Congrats');
            closeModal(); // Hide the modal
            window.location.reload(); // Refresh the page
          }
          else if(response.data.message === "User already exist")
          { 
            alert("user already exist")
          }
        } catch (error) {
          alert('Failed to create user');
        }
      };
      
  
  return (
    <>
    {modalVisible && (
    <div className="modal fade" id="addClientModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header bg-secondary">
                <h5 className="modal-title text-light text-uppercase" id="exampleModalLabel">Add new user</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            
            <div className="modal-body">
            <input type="text" className='form-control mt-5' placeholder='Name' required
            onChange={(e) => setName(e.target.value)} value={name} />

          <input type="email" className='form-control mt-2' placeholder='Email' required
            onChange={(e) => setEmail(e.target.value)} value={email} />

          <input type="password" className='form-control mt-2' placeholder='Password' required
            onChange={(e) => setPassword(e.target.value)} value={password} />

          <input type="number" className='form-control mt-2' placeholder='Phone' required
            onChange={(e) => setPhone(e.target.value)} value={phone} />

            <textarea name="" id="" cols="47" rows="3" placeholder='Address...' className='form-control mt-3'
            onChange={(e)=>setAddress(e.target.value)} value={address} required></textarea>
            </div>
            <div className="modal-footer">
            <div className="container-fluid">
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className="btn bg-button text-white w-100"
                  data-bs-dismiss="modal"

                  onClick={submitClient}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
            </div>
            </div>
        </div>

    </div>
    )}
    </>
  )
}

export default AddClient
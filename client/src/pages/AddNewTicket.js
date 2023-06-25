import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const AddNewTicket = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [userMessage, setuserMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {

    const auth = localStorage.getItem("user");
    const user = JSON.parse(auth);
    const name = user.name;
    const email = user.email;
    setUserName(name);
    setUserEmail(email);
  }, []);


  const ticketSubmit = async (e)=>{
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/Api/v1/newTicket', {
              username: userName,
              useremail: userEmail,
              subject:subject,
              message:userMessage
            });

            if(response.data.Message === "Ticket successfully created")
            {
              toast.success("Ticket successfully created");
              navigate('/tickets')
            }
            else
            {
              toast.error("Ticket creating failed");
            }

    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 border py-3 shadow-lg">
            <h2 className="text-center my-4 fw-bold text-uppercase">Add New Ticket</h2>
            <hr />

            <input
              type="text"
              className="form-control mt-2"
              placeholder="User name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              readOnly
            />

            <input
              type="email"
              className="form-control mt-2"
              placeholder="User email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              readOnly
            />

            <input
              type="text"
              className="form-control mt-2"
              placeholder="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <textarea
              name=""
              id=""
              cols="47"
              rows="3"
              placeholder="Message..."
              className="form-control mt-3"
              required
              value={userMessage}
              onChange={(e) => setuserMessage(e.target.value)}
            ></textarea>

            <div className="d-grid">
              <button className="btn mt-4 bg-button text-white mt-3 mb-2" type="button" onClick={ticketSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default AddNewTicket;

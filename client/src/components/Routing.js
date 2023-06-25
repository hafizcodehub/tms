import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Dashboard from '../pages/Dashboard'
import Clients from '../pages/Clients'
import Tickets from '../pages/Tickets'
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import AddNewClient from '../pages/AddNewClient'
import AssignedTicket from '../pages/AssignedTicket'
import AddNewTicket from '../pages/AddNewTicket'
import Protected from '../components/Protected'
import Pending from '../pages/Pending'
import Room from './Room'

const Routing = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route element={<Protected />}>
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/tickets' element={<Tickets />} />
          <Route path='/AddNewClient' element={<AddNewClient />} />
          <Route path='/AddNewTicket' element={<AddNewTicket />} />
          <Route path='/AssignedTicket' element={<AssignedTicket />} />
          <Route path='/pending' element={<Pending />} />
          <Route path='/room' element={<Room />} />
        </Route>
      </Routes>
    </>
  )
}

export default Routing

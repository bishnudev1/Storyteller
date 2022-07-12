import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Components/Home';
import Footer from './Components/Footer';
import Stories from './Components/Stories';
import Contact from './Components/Contact';
import Register from './Components/Register';
import Login from './Components/Login';
import Logout from './Components/Logout';
import PostStory from './Components/PostStory';
import StoryUpdate from './Components/StoryData/StoryUpdate';
import ErrorPage from './Components/ErrorPage';
import './App.css';

const App = () => {

  return (
    <>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/Stories' element={<Stories />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Logout' element={<Logout />} />
          <Route path='/Post-A-Story' element={<PostStory />} />
          <Route path='/Update-Your-Story' element={<StoryUpdate />} />
          <Route path='*' element={<ErrorPage/>}></Route>
        </Routes>
        <Footer />
    </>
  )
}

export default App
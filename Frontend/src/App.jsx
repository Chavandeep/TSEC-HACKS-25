import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom'
import React from 'react';

//===================================================







//===================================================







//===================================================








function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

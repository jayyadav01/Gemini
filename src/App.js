import React from 'react'
import './App.css'
import Sidebar from './component/Sidebar/Sidebar.tsx'
import Main from './component/Main/Main.tsx'

const App = () => {
  return (
    <>
        <div className='parent'>
            <Sidebar/>
            <Main/>
        </div>
    </>
  )
}

export default App

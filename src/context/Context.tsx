import React, { createContext, useState } from 'react'
import runChat from '../config/Config.tsx';

export const ThemeContext = createContext({});

const Context = (props) => {

    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("")
    const [previousPrompt, setPreviousPrompt] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")
    const [userData, setUserData] = useState([])

    const onSent = async(prompt:any) => {
      // console.log("context :", prompt);
      setInput("")
      setRecentPrompt(prompt)
      setPreviousPrompt((previousValue):any => ([...previousValue,prompt]))
      setShowResult(true)
      setLoading(true)
      const response = await runChat(prompt)
      let newResponse:any = response.replace(/\*/g, '').replace(/\n/g, '<br/>')  
      setResultData(newResponse)
      setUserData(prevdata => ([...prevdata,{[prompt] : newResponse}]))
      setLoading(false)
      setInput("")
    }

    const contextValue = {
      input, setInput, userData, setUserData,
      recentPrompt, setRecentPrompt, previousPrompt, setPreviousPrompt,
      showResult, setShowResult, loading, resultData, setResultData, onSent
    }

  return (
    <>
        <ThemeContext.Provider value={contextValue}>
            {props.children}
        </ThemeContext.Provider>
    </>
  )
}

export default Context

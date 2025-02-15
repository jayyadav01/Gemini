import React, { useContext, useEffect, useRef } from "react";
import "../../App.css";
import assets from "../../assets/assets";
import { ThemeContext } from "../../context/Context.tsx";

interface UserDataType {
  [key: string]: string;
}

const Main = () => {
  const {
    input,
    setInput,
    showResult,
    setShowResult,
    loading,
    userData,
    setUserData,
    onSent,
  }: any = useContext(ThemeContext);

  const textareaRef:any = useRef(null);
  const lastElementRef:any = useRef(null)

  useEffect(() => {
    if (lastElementRef.current) {
      lastElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userData]);

  const handleClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if(input === '')
    {
      return;
    }
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      onSent(input);
    }
  };

  function handleBlank() {
    setUserData([]);
    setShowResult(false);
    setInput('')
  }

  function handleDivClick(text:string)
  {
    setInput(text)
    if(textareaRef.current)
    {
      textareaRef.current.focus()
    }
  }

  return (
    <>
      <div className="main">
        <div className="header">
          <p onClick={handleBlank}>Gemini</p>
          <img src={assets.user_icon} alt="profile" />
        </div>

        <div className="middle">
          {!showResult ? (
            <>
              <h1 className="hello">Hello.</h1>
              <h1 className="question">How can I help you today?</h1>

              <div className="card">
                <div className="card-item"
                  onClick={() => handleDivClick("Give me ways to add certain foods to my diet")}>
                  <p>Give me ways to add certain foods to my diet</p>
                  <div className="icon-cover">
                    <img src={assets.bulb_icon} alt="card-item" />
                  </div>
                </div>
                <div className="card-item" 
                  onClick={() => handleDivClick("Flights to Tokyo and Seoul, and things to do")}>
                  <p>Flights to Tokyo and Seoul, and things to do</p>
                  <div className="icon-cover">
                    <img src={assets.gallery_icon} alt="card-item" />
                  </div>
                </div>
                <div className="card-item" 
                  onClick={() => handleDivClick("Write a thank you note to my colleague")}>
                  <p>Write a thank you note to my colleague</p>
                  <div className="icon-cover">
                    <img src={assets.compass_icon} alt="card-item" />
                  </div>
                </div>
                <div className="card-item" 
                  onClick={() => handleDivClick("Improve the readability of the following code")}>
                  <p>Improve the readability of the following code</p>
                  <div className="icon-cover">
                    <img src={assets.code_icon} alt="card-item" />
                  </div>
                </div>
              </div>
            </>
          ) : loading ? (
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
          ) : (
            userData.map((item: UserDataType, index: number) => (
              <div key={index} className="result">
                <div className="result-title" ref={lastElementRef}>
                  <img src={assets.user_icon} alt="user-profile" />
                  <p>{Object.keys(item)[0]}</p>
                </div>

                <div className="result-data">
                  <img src={assets.gemini_icon} alt="gemini" />
                  <p
                    key={index}
                    dangerouslySetInnerHTML={{ __html: Object.values(item)[0]}}
                  ></p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bottom">
          <div className="search" onClick={handleClick}>
            {
              input.length > 95 ?
                <textarea
                value={input}
                className="textarea-active"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a prompt here"
                ref={textareaRef}
                onKeyDown={handleKeyPress}
                autoFocus
              />
            :
                <textarea
                value={input}
                className="textarea"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a prompt here"
                ref={textareaRef}
                onKeyDown={handleKeyPress}
                autoFocus
              />
            }
            {/* <span className="icon icon-left">
              <img src={assets.gallery_icon} alt="icon" />
            </span>
            <span className="icon icon-middle">
              <img src={assets.mic_icon} alt="icon" />
            </span> */}
            <span className="icon icon-right" onClick={() => onSent(input)}>
              <img src={assets.send_icon} alt="icon" />
            </span>
          </div>
          <p>
            Gemini may display inaccurate info, including about people, so
            double-check its responses. 
            <a href='https://support.google.com/gemini/answer/13594961?authuser=1&authuser=1&visit_id=638578758619352575-2815243213&p=privacy_notice&rd=1#privacy_notice'>
            Your privacy and Gemini Apps</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Main;

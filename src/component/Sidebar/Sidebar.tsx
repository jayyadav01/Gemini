import React, { useContext, useRef, useState } from "react";
import asset from "../../assets/assets";
import "../../App.css";
import { ThemeContext } from "../../context/Context.tsx";

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const { previousPrompt, setUserData, setShowResult, onSent }: any = useContext(ThemeContext);
  const menuRef:any = useRef(null);

  function loadPrompt(prompt: string) {
    onSent(prompt);
  }

  function handleBlank() {
    setUserData([]);
    setShowResult(false);
  }

  function handleMenu() {
    if (menuRef.current) {
      menuRef.current.focus();
      handleActive();
    }
  }

  function handleActive() {
    setExtended((prevState: boolean) => !prevState);
  }

  return (
    <>
      <div className={`sidebar ${extended === true ? "active" : ""}`}>
        <div className="top">
          <button className="menu" onClick={handleMenu}>
            <img src={asset.menu_icon} alt="menu" ref={menuRef} />
            {extended ? (
              <p className="menu-tooltip">Collapse menu</p>
            ) : (
              <p className="menu-tooltip">Expand menu</p>
            )}
          </button>
          <button className="new-chat" onClick={handleBlank}>
            <img src={asset.plus_icon} alt="plus" />
            {extended ? <p className="text">New Chat</p> : null}
            <p className="chat-tooltip">New Chat</p>
          </button>
          {extended ? (
            <div className="recent">
              <p className="recent-title">Recent</p>

              {previousPrompt.map((item: any, index: number) => {
                return (
                  <button
                    key={index}
                    onClick={() => loadPrompt(item)}
                    className="recent-entry"
                  >
                    <img src={asset.message_icon} alt="message" />
                    <p>{item.slice(0, 20) + "..."}</p>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={asset.question_icon} alt="help" />
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={asset.history_icon} alt="activity" />
            {extended ? <p>Activity</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={asset.setting_icon} alt="setting" />
            {extended ? <p>Settings</p> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

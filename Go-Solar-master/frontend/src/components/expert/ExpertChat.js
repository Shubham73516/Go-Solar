import React, { useRef } from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import app_config from "../../config";

const ExpertChat = () => {
  const url = app_config.apiUrl;

  const [curentExpert, setCurentExpert] = useState(
    JSON.parse(sessionStorage.getItem("expert"))
  );

  const [msgList, setMsgList] = useState([]);

  //   intialize socket.io-client
  const [socket, setSocket] = useState(io(url, { autoConnect: false }));

  const [text, setText] = useState("");

  const online = () => {
    socket.emit("addexpert", curentExpert._id);
  };

  useEffect(() => {
    //   connect with the backend
    socket.connect();
    online();
  }, []);

  socket.on("recmsg", (data) => {
    // console.log(data);

    // to add newly recieved message on screen
    console.log(data);
    const newList = [...msgList, data];
    setMsgList(newList);
  });

  const sendMessage = () => {
    if(!text) return;
    let obj = {
      message: text,
      sent: true,
      name: curentExpert.name,
      time: new Date(),
    };

    // for sending the event on backend
    socket.emit("sendstudent", obj);

    // to add newly sent message on screen
    const newList = [...msgList, obj];
    setMsgList(newList);

    setText("");
  };

  const displayMessages = () => {
    return msgList.map((msgobj) => (
      <div
        className={
          msgobj.sent ? "sent-msg message-body" : "rec-msg message-body"
        }
      >
        <p>{msgobj.message}</p>
      </div>
    ));
  };

  const showMessages = () => {
    return msgList.map((msg) => (
      <div className="mt-4">
        <div
          className={`d-flex ${
            msg.sent ? "justify-content-end" : "justify-content-start"
          }`}
        >
          <p className="small mb-1">{msg.name}</p>
          <p className="small mb-1 ms-2 ps-2 text-muted boder border-start border-dark">
            {new Date(msg.time).toLocaleDateString()}{" "}
            {new Date(msg.time).toLocaleTimeString()}
          </p>
        </div>
        <div
          className={`d-flex flex-row ${
            msg.sent ? "justify-content-end" : "justify-content-start"
          } mt-2`}
        >
          {msg.sent ? (
            <div></div>
          ) : (
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
              alt="avatar 1"
              style={{ width: 45, height: "100%" }}
            />
          )}
          <div>
            <p
              className="small p-2 ms-3 mb-3 rounded-3"
              style={{ backgroundColor: "#f5f6f7" }}
            >
              {msg.message}
            </p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 ">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4" style={{ width: "80%" }}>
            <div className="card">
              <div
                className="card-header d-flex justify-content-between align-items-center p-3"
                style={{ borderTop: "4px solid #ffa900" }}
              >
                <h5 className="mb-0">Chat messages</h5>
                <div className="d-flex flex-row align-items-center">
                  <span className="badge bg-warning me-3">20</span>
                  <i className="fas fa-minus me-3 text-muted fa-xs" />
                  <i className="fas fa-comments me-3 text-muted fa-xs" />
                  <i className="fas fa-times text-muted fa-xs" />
                </div>
              </div>
              <div
                className="card-body"
                
                data-mdb-perfect-scrollbar="true"
                style={{ position: "relative", height: "75vh", overflow: 'auto' }}
              >
                {showMessages()}
              </div>
              <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                <div className="input-group mb-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type message"
                    aria-label="Recipient's username"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    aria-describedby="button-addon2"
                  />

                  <button
                    className="btn btn-warning"
                    type="button"
                    id="button-addon2"
                    style={{ paddingTop: ".55rem" }}
                    onClick={sendMessage}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertChat;

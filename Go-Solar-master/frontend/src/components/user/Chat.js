import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import app_config from "../../config";
import "./chat.css";

const UserChat = () => {

    const expertid = '645f21a2177be363a25206f2'
    // backend url
    const url = app_config.apiUrl;
    // const { expertid } = useParams();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    const [expertOnline, setExpertOnline] = useState(false);
    const [expertSocketId, setExpertSocketId] = useState("");
    const [expert, setExpert] = useState({});

    const [msgList, setMsgList] = useState([]);

    //   intialize socket.io-client
    const [socket, setSocket] = useState(io(url, { autoConnect: false }));

    const [text, setText] = useState("");

    const checkExpertisOnline = () => {
        socket.emit("checkexpert", expertid);
    };

    const fetchExpertData = () => {
        fetch(url + "/expert/getbyid/" + expertid).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setExpert(data);
                    console.log(data);
                });
            }
        });
    };

    useEffect(() => {
        //   connect with the backend
        fetchExpertData();
        socket.connect();
        checkExpertisOnline();
    }, []);

    socket.on("recmsg", (data) => {
        // console.log(data);

        // to add newly recieved message on screen
        const newList = [...msgList, data];
        setMsgList(newList);
    });

    socket.on("checkexpertfromserver", (data) => {
        console.log(data);
        setExpertOnline(data.status);
        setExpertSocketId(data.socketId);
    });

    const sendMessage = () => {
        console.log(expertSocketId);
        let obj = { message: text, sent: true, socketId: expertSocketId, time: new Date(), name: currentUser.name };
        // console.log(obj);
        // for sending the event on backend
        socket.emit("sendmsg", obj);

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

    return (
        <div>
            <div className="container">
                <Typography variant="h3">Chat with your expert</Typography>
                <hr />
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <Typography variant="h4">
                                    Expert Name : {expert.name}
                                </Typography>
                            </div>
                            <div className="col-6">
                                <Typography variant="h4">
                                    Status : {expertOnline ? "Online" : "Offline"}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="msg-area">{displayMessages()}</div>
                        <div className="input-group">
                            <input
                                className="form-control"
                                placeholder="Type Your Message Here...."
                                onChange={(e) => setText(e.target.value)}
                                value={text}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-success" onClick={sendMessage}>
                                    <i class="fa fa-paper-plane" aria-hidden="true"></i>{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserChat;
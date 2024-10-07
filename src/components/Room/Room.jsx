import React, { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { APP_ID, SECRET } from "../../config";
import "./Room.css";

function Room() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const zpRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [joined, setJoined] = useState(false);
  const [callType, setCallType] = useState(""); 

  const myMeeting = (type) => {
    const appID = APP_ID;
    const serverSecret = SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "You Name"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    zp.joinRoom({
      container: videoContainerRef.current,
      sharedLinks: [
        {
          name: "Video Call Link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?type=" + encodeURIComponent(type),
        },
      ],
      scenario: {
        mode:
          type === "one-on-one"
            ? ZegoUIKitPrebuilt.OneONoneCall
            : ZegoUIKitPrebuilt.GroupCall,
      },
      maxUsers: type === "one-on-one" ? 2 : 10,
      onJoinRoom: () => {
        setJoined(true);
      },
      onLeaveRoom: () => {
        navigate("/");
      },
    });
  };

  const handleExit = () => {
    if (zpRef.current) {
      zpRef.current.destroy();
    }
    navigate("/");
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get("type");

    setCallType(type);
  }, [location.search]);


  useEffect(() => {
    if (callType) {
      myMeeting(callType);
    }


    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, [callType, roomId, navigate]);

  return (
    <div className="room-container">
      {!joined && (
        <>
          <header className="room-header">
            {callType === "one-on-one"
              ? "One-on-One Video Call"
              : "Group Video Call"}
          </header>
          <button className="exit-button" onClick={handleExit}>
            Exit
          </button>
        </>
      )}
      <div ref={videoContainerRef} className="video-container" />
    </div>
  );
}

export default Room;


//BUGGY CODE (For BackUp)

// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import React, { useEffect, useRef } from 'react'
// import { useParams } from 'react-router-dom'
// import { APP_ID, SECRET } from '../../config';
// import HomePage from '../HomePage/HomePage'


// const Room = () => {

//   const { roomId } = useParams();
//   const videoContainerRef = useRef(null);

//   const myMeeting = () => {
//     const appID = APP_ID;
//     const serverSecret = SECRET;
//     const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "Your Name");

//     const zp = ZegoUIKitPrebuilt.create(kitToken) 
//     zp.joinRoom({
//       container: videoContainerRef.current,
//       sharedLinks: [
//         {
//           name: 'Video link',
//           url:
//            window.location.protocol + '//' + 
//            window.location.host + window.location.pathname
//         },
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.OneONoneCall, 
//       },
//     });
//   };

//   useEffect(() => {
//     myMeeting();
//   }, [])

//   return (
//     <div ref={videoContainerRef}></div>
//   )
// }

// export default Room
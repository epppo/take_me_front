import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TimerFunction from "../public/Timer"
import ProgressBar from "../public/ProgressBar"

import styled from "styled-components";
import { chattingVote, deleteChattingRoom } from "../../store/modules/community"
import { Timer, ChattingEnd } from "../../assets/icons"
import Loading from "../public/Loading";


const ChattingInfo = (props) => {


  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [ready, setReady] = useState(true);
  const [vote, setVote] = useState(props.prosCons);
  const [timeOutLimit , setTimeOutLimit] = useState(true);
  const [currentTime, setCurrentTime] =useState()

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    getTime();
    setTimeout(() => {
      setReady(false)
    }, 100)

    if(!timeOutLimit){
      dispatch(deleteChattingRoom(props.roomId));
      setTimeout(() => {
         window.location.href="/chattingList";
      }, 2000)
    }

  }, [timeOutLimit])
  

  const userInfo = useSelector((state) => state.community.myInfo)




  const chageVote = () => {
    let sendData = {}
    if (vote) {
      setVote(false)
      sendData = {
        roomId: props.roomId,
        prosCons: false
      }
      dispatch(chattingVote(sendData))

    } else if (!vote) {
      setVote(true)
      sendData = {
        roomId: props.roomId,
        prosCons: true
      }
      dispatch(chattingVote(sendData))
    }
  }

  const getChttingData = (index) => {
    const sendData = {
      roomId: props.roomId,
      sender: userInfo.nickname,
      profileImg: userInfo.profileImg,
      authorNickname: props.authorNickname,
      authorProfileImg: props.authorProfileImg,
      userCount: props.userCount,
      comment: props.comment,
      createdAt: props.createdAt,
      timeLimit: props.timeLimit,
      minutes: minutes,
      seconds : seconds

    }
    navigate(`/chat/roomdetail/${sendData.roomId}`, { state: sendData });
  }


  const getTime = () => {
    const min = (Math.floor(props.leftTiime/60))
    const sec = (Math.floor(props.leftTiime%60))
   setMinutes(min);
   setSeconds(sec);

  }


  return ready ? <Loading /> : (
    <>
      {props.currentState === "Live" ?

        <ChattingList>
          <div className="chatInfoArea"
            onClick={() => {
              getChttingData();
            }}>
            <div className="imgBox">
              Live
              <img src={props.authorProfileImg} />
            </div>

            <div className="contentsBox">
              <span>
                <span className="innerSpan">
                  {props.authorNickname}</span> {props.comment}</span>
              <div className="timerArea">
                <Timer />
                <TimerFunction
                  min={minutes}
                  sec={seconds}
                  setTimeOutLimit={setTimeOutLimit}
                  station = "chattingInfo"
                  roomId={props.roomId}/>
              </div>
            </div>
          </div>


          <div className="bottomArea">
            {vote ?
              <button style={{
                background: "#26DFA6",
                color: "white"
              }}
                disabled
              >???????</button>
              :
              <button
                onClick={() => { chageVote() }}>???????</button>

            }


            {vote ?
              <button
                onClick={() => { chageVote() }}>???????</button>

              :
              <button style={{
                background: "#26DFA6",
                color: "white"
              }}
                disabled
              >???????</button>

            }

          </div>

        </ChattingList>

        :
        ""
      }

    </>
  )

}


const ChattingList = styled.div`
max-width: 355px;
min-height: 108px;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
border: none;
box-shadow: 0px 4px 11px 0px rgb(0 0 0 / 15%);
/* padding: 1rem;
margin-bottom: 1rem; */


.chatInfoArea{
  display: flex;
  flex-direction: row;

  .imgBox{
    padding: 1rem 1rem 0 1rem;
  
  img{
    width: 54px;
    height: 54px;
    border-radius:50%;
  }

  }
}

.contentsBox{
  padding-top: 1rem;
  width: 100%;
  max-height: 60px;
  display: flex;

  span{
    width: 80%;
    display: flex;


    .innerSpan{
      display: flex;
      width: 25%;
      font-weight: 600;
      font-size: 1rem;
      margin-right: 15px;
    }
  }
  .timerArea{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }

}


.bottomArea{
display: flex;
justify-content: space-evenly;
align-items: center;
padding: 0.3rem 0 0.3rem 0;

  span{
    font-size: 1.2rem;
  }

  button{
  width: 42%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 30px;
  border: 1px solid #26DFA6;
  color: #26DFA6;

  }



}
`;

export default ChattingInfo;
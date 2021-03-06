import React from "react";
import styled from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import M_guide_1 from "../../assets/guide/M_guide_1.png" 
import M_guide_2 from "../../assets/guide/M_guide_2.png" 
import M_guide_3 from "../../assets/guide/M_guide_3.png" 
import M_guide_4 from "../../assets/guide/M_guide_4.png" 
import { useNavigate } from "react-router-dom";

const Guide = (props) => {


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  return(
    <>
    {/* {props.showModal ? */}
    <Divvv>
    <StyledSlider {...settings}>
      <Div>
      <GoalImage src={M_guide_1}></GoalImage>
      </Div>
      <Div>
      <GoalImage src={M_guide_2}></GoalImage>
      </Div>
      <Div>
      <GoalImage src={M_guide_3}></GoalImage>
      </Div>
      <Div>
      <GoalImage src={M_guide_4} className="lastPage"></GoalImage>
      <CloseBtn onClick={props.close}>마침</CloseBtn>
      </Div>
    </ StyledSlider>
   </Divvv> {/* }: null } */}
   </>
  )
}


const Divvv = styled.div`
width:"390";
 height:"844px";
  border:"1px solid red";
   display:"flex";
   justify-content: center;
   align-items: center;
   background-color: #111;
   position: absolute;
   z-index: 99;
   top: 0;
`;

const Div = styled.div`
background-color: black;

`;

const StyledSlider = styled(Slider)`
    .slick-list {
        width: 390px;
        height: 844px;
        /* margin-left: 14vw; */
        margin-top: 0;
        /* height: 100%; */
        /* display: flex; */
    }
    .slick-dots {
        bottom: 5px;
    }
    .slick-dots li.slick-active button:before {
        color: #26DFA6;
    }
    .slick-dots li button:before {
        color: #999;
        opacity: 1;
    }
   
    .slick-next.slick-disabled:before{
      /* content: '마침?'; */
      display: none;
      top: 100px
    }
    .slick-next:before {
    content: '다음 >';
}
 
.slick-prev:before {
    content: '< 이전';
}

.slick-prev:before, .slick-next:before {
    font-size: 20px;
    line-height: 1;
    /* opacity: .75; */
    color: #26dfa6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    position: absolute;
    z-index: 10;
}
.slick-next {
    right: 20px;
}
.slick-prev {
    left: 20px;
}
  .slick-prev, .slick-next {
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 90%;
    display: block;
    width: 70px;
    height: 50p7x;
    padding: 0;
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: none;
    background: transparent;
}
`;

const GoalImage = styled.img`
width: 100%;
`;

const CloseBtn = styled.div`
width: 65px;
height: 30px;
color: #26dfa6;
right: 30px;
position: absolute;
top: 90%;
font-size: 23px;
z-index: 99;
font-weight: 100;
position: fixed;
`;

export default Guide;
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ReactComponent as Close } from "../../assets/icons/Close.svg";

// import NavToggle from "./NavToggle";
const slider = keyframes`
  from {
    transform: translateX(0px);
    right: -60%
  }
  to {
    transform: translateX(0px);
    right: 0%
  }
`;



function Header({ title, tColor }) {
  const navigate = useNavigate();
  const [navToggles, setNavToggles] = useState(false);
  console.log(tColor)

  const [, , removeCookie] = useCookies(['refreshToken']);

  // 로그아웃
  const logout = (e) => {
    localStorage.clear();
    removeCookie('refreshToken', { path: '/' });
    window.location.href = '/login';
  }

  const onNav = (e) => {
    setNavToggles(true)
  }
  const closeNav = (e) => {
    setNavToggles(false)
  }

  return (
    <HeaderWrap>
      <LeftArea>
        <h1 onClick={() => {
          navigate(-1);
        }}>티끌</h1>
      </LeftArea>
      <Title style={{ color: `${tColor}` }}>{title}</Title>
      <HamArea onClick={onNav}>
        <NavBtn>
          <div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </NavBtn>
      </HamArea>
      {navToggles ?
        <>
          <Popup>
            <NavWrap>
              <CloseBtn onClick={closeNav}>
                <Close />
              </CloseBtn>
              <Menu>
                <li onClick={() => {
                  if (!localStorage.getItem("accessToken")) {
                    alert("로그인 후 이용이 가능해요.")
                  } else { navigate("/save"); }
                }}>데일리 티끌</li>
                <li onClick={() => {
                  if (!localStorage.getItem("accessToken")) {
                    alert("로그인 후 이용이 가능해요.")
                  } else { navigate("/community"); }
                }}>커뮤니티</li>
                <li onClick={() => {
                  if (!localStorage.getItem("accessToken")) {
                    alert("로그인 후 이용이 가능해요.")
                  } else { navigate("/ranking"); }
                }}>랭킹</li>
                <li onClick={() => {
                  if (!localStorage.getItem("accessToken")) {
                    alert("로그인 후 이용이 가능해요.")
                  } else { navigate("/mypage"); }
                }}>MY</li>
                <li onClick={() => {
                  navigate("/main");
                }}>About</li>
              </Menu>

              <Footer>
                {localStorage.getItem('accessToken') ?
                  <p onClick={logout}>로그아웃</p>
                  :
                  <div>
                    <p onClick={() => {
                      navigate("/signup");
                    }}>회원가입</p>
                    <p onClick={() => {
                      navigate("/login");
                    }}>로그인</p>
                  </div>
                }
                <Copyright>ⓒ 항해 7기 나를가조</Copyright>
              </Footer>
            </NavWrap>
          </Popup>
        </>
        : null
      }
    </HeaderWrap>
  );
}

export default Header;

const HeaderWrap = styled.div`
position: sticky;
top: 0;
max-width:390px;
width: 100%;
height: 44px;
background: rgba(0, 0, 0, 0);
z-index:888;
`;

const LeftArea = styled.div`
h1 {
  position: absolute;
  left: 25px;
  font-family: 'SEBANG_Gothic_Bold';
  line-height: 44px;
  color: #26DFA6;
  font-size: 1.25rem;
}
`;

const Title = styled.h1`
position:absolute;
left: 50%;
transform: translateX(-50%);
line-height: 44px;
font-family: 'SEBANG_Gothic_Bold';
font-size: 1.5rem;
`;

const HamArea = styled.div`
position:absolute;
top: 50%; right: 25px;
transform: translateY(-50%);
`;


const CloseBtn = styled.div`
width:1rem; //180px
height: 1rem;
margin-top: 10px;
position:absolute;
top: 0; right: 10px;

span {
  display:block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width:100%;
  height:2px;
  background-color: #999999;
}
span:first-child{
  transform: rotate(45deg) translateX(0%);
  }
span:last-child{
  transform: rotate(135deg) translateX(0%);
  }
`;

const Menu = styled.ul`
padding-top : 80px;
z-index: 100;
text-align: center;
li {
  font-size: 1.5rem;
  padding-bottom: 1.87rem;
  font-family: 'SEBANG_Gothic_Bold';
  cursor: pointer;
}
li:first-child{
  color: #26DFB3;
}
`

const NavWrap = styled.div`
width:70%; //180px
height: 100%;
background-color: #fff;
position: absolute;
top: 0; right: 0;

animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-name: ${slider};
  animation-fill-mode: forwards;

button{

}
`;

const NavBtn = styled.div`

div {
  width:1rem;
  height: 12px;
  position: relative;
  cursor:pointer;
  }
  span {
    display:block;
    width:100%;
    height:1px;
    margin-bottom: 3px;
    /* background-color: white; */
    background-color: #000;
    transition:all .5s;
  }
  span:last-child{
    margin-bottom: 0;
  }

`;

const Footer = styled.div`
position: absolute;
bottom: 10%;
left: 50%;
transform : translateX(-50%);
width: 55%;
text-align: center;
div{
  display: flex;
  justify-content: space-around;
}

p{
  font-size: 1.125rem;
  font-weight: 700;
  color: #999;
  letter-spacing: -0.5px;
  border-bottom : 1px solid #999;
  line-height: 1.23rem;
  display: inline-block;
  padding-bottom:2px;
  cursor: pointer;
}
p:nth-child(2) {
  color: #26DFA6;
  border-bottom : 1px solid #26DFA6;
}
`;

const Popup = styled.div`
flex-direction: column;
position: absolute;
background-color: rgba(0,0,0,0.7);
width: 100%;
height: 100vh;
max-height: 844px;
`;

const Copyright = styled.div`
margin-top: 17px;
font-weight: 400;
font-size: 0.875rem;
line-height: 1.125rem;
color: #CCCCCC;
`;

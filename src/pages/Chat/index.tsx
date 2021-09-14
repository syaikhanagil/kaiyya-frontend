import React from 'react';
import styled from 'styled-components';
import Main from '../../layouts/Main';
import { Button } from '../../components/Styled';
import chatImg from '../../assets/img/cha-illustration.png';

const ChatWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    min-height: 100vh;
    background: var(--color-white);
    align-items: center;
    padding: 0 1rem;
    div {
        text-align: center;

        img {
            margin: 0 auto 10px;
        }
        p {
            font-weight: 700;
            margin: 0 0 10px;
        }
        span {
            display: block;
            margin: 0 0 20px;
        }
        button {
            font-weight: 600;
        }
    }
`;

const Chat = () => {
    return (
        <Main useHeader backBtn activeMenu="chat" title="Chat" paddingTop={false} useNavigation paddingBottom={false}>
            <ChatWrapper>
                <div>
                    <img src={chatImg} alt="kaiyya-chat" />
                    <p>Chat dengan Customer Service</p>
                    <span>Jika kamu punya pertanyaan, kamu bisa chat dengan CS kaiyya dengan klik tombol dibawah.</span>
                    <Button block fullWidth primary onClick={() => { window.location.href = 'https://api.whatsapp.com/send?phone=628118085127'; }} style={{ marginBottom: 10 }}>Admin Retail</Button>
                    <Button block fullWidth primary onClick={() => { window.location.href = 'https://api.whatsapp.com/send?phone=628118085128'; }}>Admin Mitra</Button>
                </div>
            </ChatWrapper>
        </Main>
    );
};

export default Chat;

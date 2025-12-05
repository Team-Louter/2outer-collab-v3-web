import styles from './chatting.module.css';
import Header from '../../components/Header';
import ProjectSideBar from '../../components/ProjectSideBar';
import MemberSideBar from '../../components/MemberSideBar';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default function Chatting() {
  const { teamId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(null);
  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null);
  const currentUserId = localStorage.getItem('userId');
  const currentUserName = localStorage.getItem('userName');

  // 팀 정보 가져오기 및 채팅방 ID 설정
  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const response = await axiosInstance.get(`/teams/${teamId}`);
        const teamData = response.data;
        
        if (teamData.chatRoomIds && teamData.chatRoomIds.length > 0) {
          setChatRoomId(teamData.chatRoomIds[0]);
        }
      } catch (error) {
        console.error('팀 정보 가져오기 실패:', error);
      }
    };

    if (teamId) {
      fetchTeamInfo();
    }
  }, [teamId]);

  // STOMP 웹소켓 연결 (chat.html과 동일한 방식)
  useEffect(() => {
    if (!teamId || !chatRoomId) return;

    // 직접 서버 URL 사용 + 쿠키 전송 활성화
    const socket = new SockJS('https://api.teamcollab.site/ws-stomp', null, {
      withCredentials: true
    });
    const client = Stomp.over(socket);

    // 디버그 로그 활성화
    client.debug = (str) => console.log('STOMP:', str);

    // chat.html과 동일한 연결 방식 (빈 헤더)
    client.connect({}, function(frame) {
      console.log('Connected: ' + frame);
      setIsConnected(true);
      stompClientRef.current = client;
      console.log('stompClientRef 설정됨:', stompClientRef.current);

      // 이전 메시지 불러오기
      loadPreviousMessages();

      // 채팅방 구독 (chat.html과 동일한 경로)
      client.subscribe('/sub/teams/' + teamId + '/chat/' + chatRoomId, function(message) {
        const newMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, newMessage]);
      });
    }, function(error) {
      console.error('Connection error: ' + error);
      setIsConnected(false);
    });

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
      }
    };
  }, [teamId, chatRoomId]);

  // 이전 메시지 불러오기
  const loadPreviousMessages = async () => {
    try {
      const response = await axiosInstance.get(
        `/teams/${teamId}/chat/${chatRoomId}/messages`
      );
      
      if (Array.isArray(response.data)) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('이전 메시지 불러오기 실패:', error);
    }
  };

  // 메시지 전송
  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    if (!isConnected || !stompClientRef.current) {
      alert('채팅 서버에 연결되지 않았습니다');
      return;
    }

    const chatMessage = {
      message: inputMessage,
      fileUrls: []
    };

    console.log('메시지 전송 시도:', chatMessage);
    console.log('stompClientRef.current:', stompClientRef.current);
    console.log('isConnected:', isConnected);

    // chat.html과 동일한 전송 방식
    stompClientRef.current.send('/pub/teams/' + teamId + '/chat/' + chatRoomId + '/send', {}, JSON.stringify(chatMessage));
    console.log('메시지 전송 완료');
    
    setInputMessage('');
  };

  // 엔터키로 전송
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Header />
      <ProjectSideBar />
      <div className={styles.chattingContainer}>
        {/* 채팅 메시지 영역 */}
        <div className={styles.messagesArea}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
              메시지가 없습니다
            </div>
          )}
          {messages.map((msg, index) => {
            const isMyMessage = msg.senderId === parseInt(currentUserId);
            return (
              <div 
                key={index} 
                className={`${styles.messageItem} ${isMyMessage ? styles.myMessage : styles.otherMessage}`}
              >
                {!isMyMessage && (
                  <div className={styles.userAvatar}>
                    {/* 프로필 이미지 */}
                  </div>
                )}
                <div className={styles.messageContent}>
                  {!isMyMessage && (
                    <div className={styles.userName}>{msg.senderName}</div>
                  )}
                  <div className={styles.messageText}>{msg.message}</div>
                  {msg.fileUrls && msg.fileUrls.length > 0 && (
                    <div className={styles.messageFiles}>
                      {msg.fileUrls.map((url, i) => (
                        <img key={i} src={url} alt="attachment" style={{ maxWidth: '200px', marginTop: '5px' }} />
                      ))}
                    </div>
                  )}
                </div>
                {isMyMessage && (
                  <div className={styles.userAvatar}>
                    {/* 프로필 이미지 */}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* 메시지 입력 영역 */}
        <div className={styles.inputArea}>
          <button className={styles.addBtn}>
            <span>+</span>
          </button>
          <input 
            type="text" 
            placeholder="메시지를 작성해주세요" 
            className={styles.messageInput}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className={styles.sendBtn}
            onClick={sendMessage}
            disabled={!isConnected}
          >
            보내기
          </button>
        </div>
      </div>
      <MemberSideBar />
    </>
  );
}
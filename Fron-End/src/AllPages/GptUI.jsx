import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";

const GptUI = () => {
    const [messages, setMessages] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [recentChats, setRecentChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [socket, setSocket] = useState(null);
    const [isChatting, setIsChatting] = useState(false);

    // NEW: Loading state for AI
    const [isTyping, setIsTyping] = useState(false);

    const scrollRef = useRef(null);

    // Auto-scroll logic
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatLog, isTyping]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const res = await axios.get('https://chat-gpt-project-4iip.onrender.com/api/chat', { withCredentials: true });
                setRecentChats(res.data.chats || []);
            } catch (err) {
                console.error("Error fetching sidebar:", err);
            }
        };
        fetchInitialData();

        const newSocket = io('https://chat-gpt-project-4iip.onrender.com', { withCredentials: true });
        setSocket(newSocket);

        // FIX: Event name matches your backend "ai-generated-response"
        newSocket.on('ai-generated-response', (data) => {
            setIsTyping(false); // Stop loading
            setChatLog((prev) => [...prev, { role: 'model', content: data.content }]);
        });

        return () => newSocket.close();
    }, []);

    const loadChatMessages = async (chatId) => {
        try {
            setActiveChatId(chatId);
            setIsChatting(true);
            const res = await axios.get(`https://chat-gpt-project-4iip.onrender.com/api/chat/messages/${chatId}`, { withCredentials: true });
            setChatLog(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Error loading messages:", err);
        }
    };

    const handleNewChat = async () => {
        const title = window.prompt("New Chat Name:");
        if (!title) return;
        try {
            const res = await axios.post('https://chat-gpt-project-4iip.onrender.com/api/chat', { title }, { withCredentials: true });
            const newChat = res.data.chat || res.data;
            setRecentChats(prev => [newChat, ...prev]);
            setActiveChatId(newChat._id);
            setChatLog([]);
            setIsChatting(true);
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    };

    const inputDataHandler = async (e) => {
        e.preventDefault();
        if (!socket || !messages.trim() || !activeChatId) return;

        const content = messages;
        setMessages("");

        // 1. Add user message
        setChatLog(prev => [...prev, { role: 'user', content }]);

        // 2. Start Loading State
        setIsTyping(true);

        // 3. Emit to server
        socket.emit('ai-message', {
            chat: activeChatId,
            content: content
        });
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row', // Mobile Responsive stack
            height: '100vh',
            backgroundColor: '#212121',
            color: 'white',
            fontFamily: 'sans-serif'
        }}>

            {/* SIDEBAR (Top on Mobile, Left on Desktop) */}
            <div style={{
                width: window.innerWidth < 768 ? '100%' : '260px',
                height: window.innerWidth < 768 ? 'auto' : '100%',
                backgroundColor: '#171717',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid #333',
                boxSizing: 'border-box'
            }}>
                <button onClick={handleNewChat} style={{ padding: '10px', cursor: 'pointer', borderRadius: '8px', border: '1px solid #4d4d4d', backgroundColor: '#212121', color: 'white', marginBottom: '10px' }}>
                    + New Chat
                </button>

                <div style={{
                    display: 'flex',
                    flexDirection: window.innerWidth < 768 ? 'row' : 'column',
                    overflowX: 'auto',
                    gap: '10px'
                }}>
                    {recentChats.map((chat) => (
                        <div key={chat._id} onClick={() => loadChatMessages(chat._id)} style={{
                            padding: '8px 12px', cursor: 'pointer', borderRadius: '6px',
                            backgroundColor: activeChatId === chat._id ? '#2f2f2f' : 'transparent',
                            fontSize: '13px', whiteSpace: 'nowrap', border: '1px solid #333'
                        }}>
                            {chat.title || "Chat"}
                        </div>
                    ))}
                </div>
            </div>

            {/* MAIN CHAT AREA */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                    {!isChatting ? (
                        <div style={{ textAlign: 'center', marginTop: '30%' }}>
                            <h2>How can I help?</h2>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {chatLog.map((msg, index) => {
                                const isUser = msg.role === 'user';
                                return (
                                    <div key={index} style={{ alignSelf: isUser ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                                        <div style={{ fontSize: '10px', color: isUser ? '#888' : '#10a37f', marginBottom: '4px', textAlign: isUser ? 'right' : 'left' }}>
                                            {isUser ? 'YOU' : 'GPT'}
                                        </div>
                                        <div style={{
                                            padding: '12px 16px', borderRadius: '15px',
                                            backgroundColor: isUser ? '#3b3b3b' : '#2f2f2f',
                                            borderBottomRightRadius: isUser ? '2px' : '15px',
                                            borderBottomLeftRadius: isUser ? '15px' : '2px',
                                            fontSize: '14px', lineHeight: '1.4'
                                        }}>
                                            {msg.content}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* LOADING MESSAGE */}
                            {isTyping && (
                                <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
                                    <div style={{ fontSize: '10px', color: '#10a37f', marginBottom: '4px' }}>GPT</div>
                                    <div style={{ padding: '12px 16px', borderRadius: '15px', backgroundColor: '#2f2f2f', color: '#888', fontStyle: 'italic', fontSize: '14px' }}>
                                        GPT is thinking...
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* INPUT */}
                <div style={{ padding: '15px', backgroundColor: '#212121' }}>
                    <form onSubmit={inputDataHandler} style={{ display: 'flex', gap: '10px' }}>
                        <input
                            disabled={!activeChatId || isTyping}
                            value={messages}
                            onChange={(e) => setMessages(e.target.value)}
                            placeholder={isTyping ? "Waiting for response..." : "Ask anything..."}
                            style={{
                                flex: 1, padding: '14px', borderRadius: '25px',
                                backgroundColor: '#2f2f2f', border: '1px solid #4d4d4d',
                                color: 'white', outline: 'none'
                            }}
                        />
                        <button type="submit" disabled={!messages.trim() || isTyping} style={{ backgroundColor: '#10a37f', border: 'none', borderRadius: '50%', width: '45px', height: '45px', color: 'white', cursor: 'pointer' }}>
                            ↑
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GptUI;
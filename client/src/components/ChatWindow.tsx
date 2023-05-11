import { Avatar, Box, Button, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { useSocket } from '../context/SocketContext';

function ChatWindow() {
  const [message, setMessage] = useState('');
  const [showImage, setShowImage] = useState(true);

  const {
    sendMessage,
    messages,
    isTyping,
    setIsTyping,
    typing,
    username,
    room,
    typingUserState,
  } = useSocket();
  let prevTypingValue = false;

  const timerRef = useRef<number>();

  function handleTyping(e: any) {
    setMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      typing(room, username, true);
    } else if (message.length < 1) {
      clearTimeout(timerRef.current);
      typing(room, username, false);
      setIsTyping(false);
    } else {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsTyping(false);
        typing(room, username, false);
      }, 5000);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
    setShowImage(false);
    if (isTyping) {
      clearTimeout(timerRef.current);
      typing(room, username, false);
      setIsTyping(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        height: '82vh',
      }}
    >
      {room === '' ? (
        <img
          src="/src/assets/yellowmailboxroom.png"
          alt="No active chat"
          style={{
            width: '80%',
            height: '80%',
            objectFit: 'contain',
            display: 'block',
            margin: 'auto',
          }}
        />
      ) : (
        <>
          {showImage && (
            <img
              src="/src/assets/NoMessages.png"
              alt="No messages"
              style={{
                width: '80%',
                height: '80%',
                objectFit: 'contain',
                display: 'block',
                margin: 'auto',
              }}
            />
          )}
          <ul
            style={{
              margin: 0,
              marginTop: '0.5rem',
              padding: 0,
              overflowY: 'scroll',
            }}
          >
            {messages.map((message, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent:
                    username === message.username ? 'flex-end' : 'flex-start',
                  marginRight: '2rem',
                }}
              >
                <li
                  style={{
                    display: 'flex',
                    color: 'black',
                    listStyle: 'none',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          username === message.username
                            ? 'flex-end'
                            : 'flex-start',
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="./lilafigur.png/"
                        sx={{ marginRight: '0.9rem', marginBottom: '0.5rem' }}
                      />
                      <p
                        style={{
                          color: 'black',
                          margin: 0,
                          marginBottom: '0.3rem',
                          fontSize: '0.95rem',
                          textAlign: 'left',
                        }}
                      >
                        {message.username}
                      </p>
                    </div>
                    <div style={{ marginLeft: '3.1rem' }}>
                      <div
                        style={{
                          backgroundColor:
                            username === message.username
                              ? '#FFEAFA'
                              : '#CDDDF4',
                          borderRadius: '2rem',
                          padding: '0.7rem',
                          marginBottom: '0.8rem',
                          height: 'auto',
                          maxWidth: '20rem',
                        }}
                      >
                        {message.message}
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </ul>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              flex: 1,
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flex: 1,
                marginBottom: '0.5rem',
                marginTop: '1rem',
                position: 'relative',
              }}
            >
              <TextField
                id="outlined-messages-input"
                name="messages"
                autoComplete="off"
                placeholder="Write here..."
                value={message}
                onChange={handleTyping}
                sx={{
                  flex: 1,
                  marginRight: '1rem',
                  '& .MuiInputBase-input': {
                    bgcolor: '#ECECEC',
                    borderRadius: '20rem',
                    height: '0.5rem',
                    color: (theme) => theme.palette.text.secondary,
                    fontFamily: (theme) => theme.typography.body1,
                  },
                  '& .MuiOutlinedInput-root': {
                    height: '2.5rem',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(218, 215, 215)',
                  },
                }}
              />
              <Button variant="contained" type="submit">
                Send
              </Button>
              <span
                style={{
                  position: 'absolute',
                  bottom: '2.6rem',
                  left: "0.4rem",
                  color: 'black',
                }}
              >
                {typingUserState.length > 0 ? (
                  typingUserState.toString() + ' is typing...'
                ) : (
                  <span></span>
                )}
              </span>
            </form>
          </Box>
        </>
      )}
    </Box>
  );
}

export default ChatWindow;

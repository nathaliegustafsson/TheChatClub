import { Box, Button, Container, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { useSocket } from '../context/SocketContext';

function ChatWindow() {
  const [message, setMessage] = useState('');
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

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
    if (isTyping) {
      clearTimeout(timerRef.current);
      typing(room, username, false);
      setIsTyping(false);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '83vh',
      }}
    >
      <h1>The Chat</h1>
      <ul>
        {messages.map((message, i) => (
          <li key={i} style={{ color: 'black' }}>
            {message.username}: {message.message}
          </li>
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
          onSubmit={handlesubmit}
          style={{ display: 'flex', flex: 1, position: 'relative' }}
        >
          <TextField
            id="outlined-messages-input"
            name="messages"
            autoComplete="off"
            placeholder="Write here..."
            value={message}
            onChange={handleTyping}
            // onBlur={handleBlur}
            // error={Boolean(formik.touched.username && formik.errors.username)}
            // helperText={formik.touched.username && formik.errors.username}
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
              bottom: '2rem',
              left: '40%',
              color: 'black',
            }}
          >
            {typingUserState.toString()}
          </span>
        </form>
      </Box>
    </Container>
  );
}

export default ChatWindow;

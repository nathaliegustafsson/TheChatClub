import { Box, Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { useSocket } from '../context/SocketContext';

function ChatWindow() {
  const [message, setMessage] = useState('');
  const { sendMessage, messages } = useSocket();

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
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
        <form onSubmit={handlesubmit}>
          <TextField
            id="outlined-messages-input"
            name="messages"
            autoComplete="off"
            placeholder="Write here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
          <Button onClick={() => console.log(messages)}>
            GE MIG MEDDELANDEN
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default ChatWindow;

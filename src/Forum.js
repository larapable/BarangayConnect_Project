import './Forum.css';
import { Grid, Button,TextField,Paper } from '@mui/material';
import React, { useState } from 'react';



function Forum() {
  const [inputValue, setInputValue] = useState('');
  const [postedContent, setPostedContent] = useState('');

  const handleClear = () => {
    setInputValue('');
  };
  
  const handlePost = () => {
    setPostedContent(inputValue);
  };
  return (
    <div>
      <div className="gd"></div>
  
      <div className="con">
        <div className='title'>
          <p>WHAT'S NEW ?</p>
        </div>
        <div className='para'>
          <p>Our forum is a space for open and 
             meaningful discussions where community 
             members can connect, share knowledge, 
             and voice their thoughts. It's a place to ask 
             questions, offer insights, and engage with others 
             who share your interests.</p>
          </div>
        <div >
        <TextField
              label="What's on your mind?"
              variant="outlined"
              multiline
              rows={15}
              fullWidth
              margin="normal"
              InputProps={{ style: { border: 'none' } }}

              style={{backgroundColor:'#fff'}}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
        </div>

        <Grid container spacing={2} style={{ maxWidth: '450px' }}>
          <Grid item>
            <Button
              variant='contained'
              style={{
                backgroundColor: '#fff',
                color: '#213555',
                height: '50px',
                width: '100px',
                fontWeight: 'bold',
                fontSize: '1em'
              }}
              onClick={handleClear}
            >
              CLEAR
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              style={{
                backgroundColor: '#829CA6',
                color: '#fff',
                height: '50px',
                width: '100px',
                fontWeight: 'bold',
                fontSize: '1em'
              }}
            >
              POST
            </Button>
          </Grid>
        </Grid>
       
      </div>
    </div>
  );
}

export default Forum;

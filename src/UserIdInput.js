import React, { useState } from 'react';

const UserIdInput = ({ onFetch }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFetch(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <button type="submit">Fetch User Info</button>
    </form>
  );
};

export default UserIdInput;

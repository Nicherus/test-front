import { createContext, useState } from 'react';

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState('');

  function clearData () {
    setUserId(null);
    setToken('');
  }

  return (
    <UserContext.Provider value={{ userId, setUserId, token, setToken, clearData }}>
      {children}
    </UserContext.Provider>
  );
}

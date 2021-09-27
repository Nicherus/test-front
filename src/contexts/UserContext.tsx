import React, { createContext, useState } from 'react';

interface ContextProps {
  userId: string | null,
  setUserId: React.Dispatch<React.SetStateAction<null>>,
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>,
  clearData(): void
}

const UserContext = createContext<ContextProps>(null!);
export default UserContext;

export function UserProvider({ children }: any) {
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

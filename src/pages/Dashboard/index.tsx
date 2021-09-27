import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import BracketsTester from '../../components/BracketsTester';
import { Button, Column, Container, Header } from './styles';
import LoginRegisterForm from '../../components/LoginRegisterForm';

export default function Dashboard () {
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [showBracketsTester, setShowBracketsTester] = useState(false);

  function handleShowLoginRegister () {
    if(token) history.push("/contacts")

    setShowLoginRegister(!showLoginRegister);
    if(!showLoginRegister) setShowBracketsTester(false);
  }

  function handleShowBracketsTester () {
    setShowBracketsTester(!showBracketsTester);
    if(!showBracketsTester) setShowLoginRegister(false);
  }

  return (
    <>
      <Header>Bravi Dashboard</Header>
      <Container>
        {showLoginRegister ? <LoginRegisterForm/> : null}
        <Column>  
          <Button onClick={() => handleShowLoginRegister()} borderWidth={showLoginRegister ? '5px' : '0'} opacity={showLoginRegister ? '0.6' : '1'}>Contacts List</Button>
          <Button onClick={() => handleShowBracketsTester()} borderWidth={showBracketsTester ? '5px' : '0'} opacity={showBracketsTester ? '0.6' : '1'}>Brackets Tester</Button>
        </Column>
        {showBracketsTester ? <BracketsTester/> : null}
      </Container>
    </>
  );
}
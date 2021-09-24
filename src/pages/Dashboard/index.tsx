import { useState } from 'react';

import BracketsTester from '../../components/BracketsTester';
import { Button, Container, Navbar } from './styles';
import LoginRegisterForm from '../../components/LoginRegisterForm';

export default function Dashboard () {

  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [showBracketsTester, setShowBracketsTester] = useState(false);

  function handleShowLoginRegister () {
    // DUE check if it's logged, if logged go to contacts list page, else show login/register component
    setShowLoginRegister(!showLoginRegister);
    if(!showLoginRegister) setShowBracketsTester(false);
  }

  function handleShowBracketsTester () {
    setShowBracketsTester(!showBracketsTester);
    if(!showBracketsTester) setShowLoginRegister(false);
  }

  return (
    <>
      <Navbar>Bravi Dashboard</Navbar>
      <Container>
        {showLoginRegister ? <LoginRegisterForm/> : null}
        <Button onClick={() => handleShowLoginRegister()}>Contacts List</Button>
        <Button onClick={() => handleShowBracketsTester()}>Brackets Tester</Button>
        {showBracketsTester ? <BracketsTester/> : null}
      </Container>
    </>
  );
}
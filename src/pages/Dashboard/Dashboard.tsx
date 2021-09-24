import { useState } from 'react';

import BracketsTester from '../../components/BracketsTester';
import { Button, Container, Navbar } from './styles';
import LoginRegisterForm from '../../components/LoginRegisterForm';

export default function Dashboard () {

  const [showContactList, setShowContactList] = useState(false);
  const [showBracketsTester, setShowBracketsTester] = useState(false);

  function handleShowContactList () {
    setShowContactList(!showContactList);
    if(!showContactList) setShowBracketsTester(false);
  }

  function handleShowBracketsTester () {
    setShowBracketsTester(!showBracketsTester);
    if(!showBracketsTester) setShowContactList(false);
  }

  return (
    <>
      <Navbar>Bravi Dashboard</Navbar>
      <Container>
        {showContactList ? <LoginRegisterForm/> : null}
        <Button onClick={() => handleShowContactList()}>Contacts List</Button>
        <Button onClick={() => handleShowBracketsTester()}>Brackets Tester</Button>
        {showBracketsTester ? <BracketsTester/> : null}
      </Container>
    </>
  );
}
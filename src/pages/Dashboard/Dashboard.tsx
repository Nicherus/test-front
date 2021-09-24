import { useState } from 'react';

import BracketsTester from '../../components/BracketsTester';
import { Button, ContactList, Container, Navbar } from './styles';
// import ContactList from '../components/ContactList';

export default function Dashboard () {

  const [showContactList, setShowContactList] = useState(false);
  const [showBracketsTester, setShowBracketsTester] = useState(false);

  return (
    <>
      <Navbar>Bravi Dashboard</Navbar>
      <Container>
        <Button onClick={() => setShowContactList(!showContactList)}>Contacts List</Button>
        <Button onClick={() => setShowBracketsTester(!showBracketsTester)}>Brackets Tester</Button>
        {showContactList ? <ContactList>zap</ContactList> : null}
        {showBracketsTester ? <BracketsTester/> : null}
      </Container>
    </>
  );
}



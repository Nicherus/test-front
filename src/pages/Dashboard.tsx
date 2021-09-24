import { useState } from 'react';
import styled from 'styled-components';

import BracketsTester from '../components/BracketsTester';
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

const ContactList = styled.div`
  width: 250px;
  color: white;
`;

const Navbar = styled.nav`
  background-color: rgba(20, 20, 20, 0.8);
  height: 100px;
  font-size: 3rem;
  color: white;
  background-color: #000000;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 100px);

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #000000;
`;

const Button = styled.button`
  background-color: #2AD0D2;
  font-size: 2.8rem;
  padding: 75px;
  border-radius: 50px;
  color: black;
  margin: 10%;
  cursor: pointer;
  border: 0;
  height: 56px;
  transition: all 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    filter: brightness(0.6);
  }
`;


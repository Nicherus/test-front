import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";
import ContactCard from '../../components/ContactCard';

import { Button, Container, Form, Row } from './styles';

export default function ContactsList () {
    const history = useHistory();

    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const [contactsArray, setContactsArray] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get(`http://localhost:3001/contacts/${id}`, { headers: { 'X-Access-Token': token }})
        .then(({data}) => {
            setLoading(false);
            setContactsArray(() => data);

            console.log(data);
        }).catch((error) => {
            setLoading(false);
            console.log(error);
        });
    }, [id, token]);


    function handleAddNewContact () {
        // do stuff
    }

    return (
        <Container>
            <Form>
                <Row>
                    <Button type="button" onClick={() => history.push("/")} disabled={loading}>
                        go back
                    </Button>
                    <Button type="button" onClick={() => history.push("/profile")} disabled={loading}>
                        profile
                    </Button>
                </Row>
                {
                    contactsArray.length > 0 ? 
                        contactsArray.map((contact: any) => <ContactCard key={contact.id} data={contact}/>)
                    : null
                }
                <Button type="button" onClick={() => handleAddNewContact()} disabled={loading}>
                    add new contact
                </Button>
            </Form>
        </Container>
    );
}
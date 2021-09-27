import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";
import ContactCard from '../../components/ContactCard';

import { Button, ContactsCardsContainer, Container, Form, InnerContainer, Row, Text } from './styles';

export default function ContactsList () {
    const history = useHistory();

    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const [contactsArray, setContactsArray] = useState([]);
    const [showContactForm, setShowContactForm] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [loading, setLoading] = useState(false);

    const validationSchemaCreateContact = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email().required('Email is required'),
        phone: Yup.number().required('Phone is required').typeError('Only numbers allowed for the phone')
    });

    useEffect(() => {
        setLoading(true);

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/contacts/${id}`, { headers: { 'X-Access-Token': token }})
        .then(({data}) => {
            setLoading(false);
            setContactsArray(() => data);
        }).catch((error) => {
            setLoading(false);
            alert(error.response.data);
        });
    }, [id, token]);


    function handleAddNewContact () {
        setLoading(true);

        try {
            validationSchemaCreateContact.validateSync({
                name,
                email,
                phone
            }, { abortEarly: false })

            axios.post(`${process.env.REACT_APP_API_BASE_URL}/contacts/${id}`, {
                name,
                email,
                phone
            }, { headers: { 'X-Access-Token': token }})
            .then(({ data }) => {
                setLoading(false);

                alert('contact created');

                window.location.reload();
            }).catch((error) => {
                alert(error.response.data);
                setLoading(false);
            });
        } catch (err: any){
            setLoading(false);
            alert(err.inner[0].message);
        }
    }

    return (
        <Container>
            <InnerContainer>
                <Row>
                    <Button type="button" onClick={() => history.push("/")} disabled={loading}>
                        go back
                    </Button>
                    <Button type="button" onClick={() => history.push("/profile")} disabled={loading}>
                        profile
                    </Button>
                </Row>
                <ContactsCardsContainer>
                    {
                        showContactForm ? 
                            <Form>
                                <input
                                    placeholder="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    placeholder="e-mail"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    placeholder="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </Form>
                        :
                        contactsArray.length > 0 ? 
                            contactsArray.map((contact: any) => <ContactCard key={contact.id} data={contact}/>)
                        : <Text>no contacts available<br/>create a new one using the button below</Text>
                    }
                </ContactsCardsContainer>
                <Button type="button" onClick={() => !showContactForm ? setShowContactForm(true) : handleAddNewContact()} width="100%" disabled={loading}>
                    {!showContactForm ? 'add new contact' : 'create'}
                </Button>
            </InnerContainer>
        </Container>
    );
}
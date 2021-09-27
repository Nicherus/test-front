/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";

import { Button, Container, Form } from './styles';

export default function EditContact (props: any) {
    const history = useHistory();

    const token = localStorage.getItem("token");

    const [contactId] = useState(props.history.location.state.contactId);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [loading, setLoading] = useState(false);

    const validationSchemaEditContact = Yup.object({
        name: Yup.string().required('name is required'),
        email: Yup.string().email().required('email is required'),
        phone: Yup.number().required('phone is required').typeError('only numbers allowed for the phone')
    });

    useEffect(() => {
        setLoading(true);

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/contacts/data/${contactId}`, { headers: { 'X-Access-Token': token }})
        .then(({data}) => {
            setLoading(false);

            setName(data.name);
            setEmail(data.email);
            setPhone(data.phone);
        }).catch((error) => {
            setLoading(false);
            console.log(error);
        });
    }, [contactId]);

    function handleEditContact () {
        setLoading(true);

        try {
            validationSchemaEditContact.validateSync({
                name,
                email,
                phone
            }, { abortEarly: false })

            axios.put(`${process.env.REACT_APP_API_BASE_URL}/contacts/${contactId}`, {
                name,
                email,
                phone
            }, { headers: { 'X-Access-Token': token }})
            .then(({ data }) => {
                setLoading(false);

                alert('contact edited!');

                history.push("/contacts")
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });
        } catch (err: any){
            setLoading(false);
            alert(err.inner[0].message);
        }
    }

    return (
        <Container>
            <Form>
                <Button type="button" onClick={() => history.push("/contacts")} disabled={loading}>
                    go back
                </Button>
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
                <Button type="button" onClick={() => handleEditContact()} disabled={loading}>
                    edit
                </Button>
            </Form>
        </Container>
    );
}
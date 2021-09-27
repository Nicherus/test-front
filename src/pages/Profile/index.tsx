/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";

import UserContext from '../../contexts/UserContext';
import { Button, Container, Form, Text, Row } from './styles';

export default function Profile () {
    const history = useHistory();
    const { clearData } = useContext(UserContext);

    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [loading, setLoading] = useState(false);

    const validationSchemaEditProfile = Yup.object({
        email: Yup.string().email().required('Email is required'),
        phone: Yup.number().required('Phone is required').typeError('Only numbers allowed for the phone')
    });

    useEffect(() => {
        setLoading(true);

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/${id}`)
        .then(({data}) => {
            setLoading(false);

            setUsername(data.username);
            setEmail(data.email);
            setPhone(data.phone);
        }).catch((error) => {
            history.push('/')
            alert(error.response.data);
        });
    }, [id]);

    function handleEditProfile () {
        setLoading(true);

        try {
            validationSchemaEditProfile.validateSync({
                email,
                phone
            }, { abortEarly: false })

            axios.put(`${process.env.REACT_APP_API_BASE_URL}/user/${id}`, {
                email,
                phone
            }, { headers: { 'X-Access-Token': token }})
            .then(({ data }) => {
                setLoading(false);

                alert('Your profile has been edited successfully');

                setEmail(data.email);
                setPhone(data.phone);
            }).catch((error) => {
                alert(error.response.data);
                setLoading(false);
            });
        } catch (err: any){
            setLoading(false);
            alert(err.inner[0].message);
        }
    }

    function handleDeleteUser () {
        setLoading(true);
        
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/user/${id}`, { headers: { 'X-Access-Token': token }}).then(({ data }) => {
            setLoading(false);

            handleLogout();
            alert("user deleted!");

            history.push("/")
        }).catch((error) => {
            alert(error.response.data);
            setLoading(false);
        });
    }

    function handleChangePassword () {
        history.push("/password");
    }

    function handleLogout () {
        localStorage.clear();
        clearData();

        history.push("/");
    }

    return (
        <Container>
            <Form>
                <Row>
                    <Button type="button" onClick={() => history.push("/contacts")} disabled={loading}>
                        go back
                    </Button>
                    <Button type="button" onClick={() => handleLogout()} disabled={loading}>
                        logout
                    </Button>
                </Row>
                <input
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled
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
                <Button type="button" onClick={() => handleChangePassword()} width="100%" disabled={loading}>
                    change password
                </Button>
                <Button type="button" onClick={() => handleEditProfile()} width="100%" disabled={loading}>
                    edit profile
                </Button>
                <Text>
                    Do you want to delete your account? (irreversible)
                </Text>
                <Button type="button" onClick={() => handleDeleteUser()} disabled={loading}>
                    delete account
                </Button>
            </Form>
        </Container>
    );
}
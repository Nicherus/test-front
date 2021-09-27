import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";

import UserContext from '../../contexts/UserContext';
import { Button, Container, Form, Text } from './styles';

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
        email: Yup.string().email().required('email is required'),
        phone: Yup.number().required('phone is required').typeError('only numbers allowed for the phone')
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
            console.log(error);
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

                alert('ok!')
                setEmail(data.email);
                setPhone(data.phone);
            }).catch((err) => {
                console.log(err);
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
        }).catch((err) => {
            console.log(err);
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
                <Button type="button" onClick={() => history.push("/contacts")} disabled={loading}>
                    go back
                </Button>
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
                <Button type="button" onClick={() => handleEditProfile()} disabled={loading}>
                    edit
                </Button>
                <Button type="button" onClick={() => handleLogout()} disabled={loading}>
                    logout
                </Button>
                <Button type="button" onClick={() => handleChangePassword()} disabled={loading}>
                    change password
                </Button>
                <Text>
                    Do you want to delete your account?
                </Text>
                <Button type="button" onClick={() => handleDeleteUser()} disabled={loading}>
                    delete
                </Button>
            </Form>
        </Container>
    );
}
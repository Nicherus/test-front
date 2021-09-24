import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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

    useEffect(() => {
        setLoading(true);

        axios.get(`http://localhost:3001/user/${id}`)
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

        axios.put(`http://localhost:3001/user/${id}`, {
            email,
            phone
        }, { headers: { 'X-Access-Token': token }})
        .then(({ data }) => {
            setLoading(false);

            setEmail(data.email);
            setPhone(data.phone);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }

    function handleDeleteUser () {
        setLoading(true);
        
        axios.delete(`http://localhost:3001/user/${id}`, { headers: { 'X-Access-Token': token }}).then(({ data }) => {
            setLoading(false);

            localStorage.clear();
            clearData();
            alert("user deleted!");

            history.push("/")
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }

    return (
        <Container>
            <Form>
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
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <Button type="button" onClick={() => handleEditProfile()} disabled={loading}>
                    edit
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
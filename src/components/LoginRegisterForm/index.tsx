import axios from 'axios';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import { Button, Form, Text } from './styles';

export default function LoginRegisterForm () {
    const history = useHistory();
    const { setUserId, setToken } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [loading, setLoading] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    function handleLogin () {
        setLoading(true);

        axios.post(`http://localhost:3001/user/login`, {
            username,
            password,
        }).then(({ data }) => {
            setLoading(false);

            localStorage.setItem('userId', data.id);
            localStorage.setItem('token', data.token);
            setUserId(data.id);
            setToken(data.token);

            history.push('/profile');
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }

    function handleRegisterUser () {
        setLoading(true);

        axios.post(`http://localhost:3001/user/register`, {
            username,
            password,
            email,
            phone,
        }).then(({ data }) => {
            setLoading(false);
            console.log(data);
            handleLogin();
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }

    return (
        <Form>
            <input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                placeholder="password"
                type="password"
                value={password}
                onChange={ (e) => setPassword(e.target.value)}
                required
            />
            {
                showRegister ? 
                    <>
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
                    </>
                : null
            }
            <Button type="button" onClick={() => !showRegister ? handleLogin() : handleRegisterUser()} disabled={loading}>
                {!showRegister ? 'login' : 'create'}
            </Button>
            <Text onClick={() => setShowRegister(!showRegister)}>
                {!showRegister ? "Don't have an account yet?" : "login instead"}
            </Text>
        </Form>
    );
}
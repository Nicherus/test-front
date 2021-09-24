// import axios from 'axios';
import { useState } from 'react';
import { Button, Form, Text } from './styles';

export default function LoginRegisterForm () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [loading, setLoading] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    function handleLogin () {
        // do something
        // after login redirect logged to other page
    }

    function handleRegisterUser () {
        // do something
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
                            type="number"
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
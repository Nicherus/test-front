import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Form, Text } from './styles';

export default function Profile () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [loading, setLoading] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    function handleEditProfile () {
        // do something
    }

    function handleDeleteUser () {
        // do something
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
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                    required
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
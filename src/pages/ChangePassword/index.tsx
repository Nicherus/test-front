import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";

import { Button, Container, Form} from './styles';

export default function ChangePassword () {
    const history = useHistory();

    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

    const [loading, setLoading] = useState(false);

    const validationSchemaEditProfile = Yup.object({
        oldPassword: Yup.string().min(6).required('old password is required'),
        newPassword: Yup.string().min(6).required('new password is required'),
        newPasswordConfirmation: Yup.string().min(6).required('password is required')
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });

    function handleChangePassword () {
        setLoading(true);

        try {
            validationSchemaEditProfile.validateSync({
                oldPassword,
                newPassword,
                newPasswordConfirmation
            }, { abortEarly: false })

            axios.put(`${process.env.REACT_APP_API_BASE_URL}/user/password/${id}`, {
                oldPassword,
                newPassword,
            }, { headers: { 'X-Access-Token': token }})
            .then(() => {
                setLoading(false);

                alert('ok!');
                history.push("/profile");
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
                <Button type="button" onClick={() => history.push("/profile")} disabled={loading}>
                    go back
                </Button>
                <input
                    placeholder="old password"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    placeholder="new password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    placeholder="confirm password"
                    type="password"
                    value={newPasswordConfirmation}
                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                    required
                />
                <Button type="button" onClick={() => handleChangePassword()} disabled={loading}>
                    confirm
                </Button>
            </Form>
        </Container>
    );
}
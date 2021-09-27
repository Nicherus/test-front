import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Button, 
    ContainerCard, 
    Text, 
    Column,
    Row
} from './styles';

export default function ContactCard ({data}: any) {
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    function handleDeleteContact () {
        setLoading(true);

        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/contacts/${data.id}`, { headers: { 'X-Access-Token': token }}).then(({ data }) => {
            setLoading(false);

            alert("contact deleted!");

            window.location.reload();
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }

    function editContact() {
        history.push({
            pathname: '/contacts/edit',
            state: {
                contactId: data.id
            }
        })
    }

    return (
        <ContainerCard>
            <Column>    
                <Text>Name: {data.name}</Text>
                <Text>Email: {data.email}</Text>
                <Text>Phone: {data.phone}</Text>
            </Column>
            <Row>
                <Button type="button" onClick={() => editContact()} disabled={loading}>
                    edit
                </Button>
                <Button type="button" onClick={() => handleDeleteContact()} disabled={loading}>
                    delete
                </Button>
            </Row>
        </ContainerCard>
    );
}
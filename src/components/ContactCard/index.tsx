import axios from 'axios';
import { useState } from 'react';
import { 
    Button, 
    ContainerCard, 
    Text, 
    Column,
    Row
} from './styles';

export default function ContactCard ({data}: any) {
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    function handleDeleteContact () {
        setLoading(true);

        axios.delete(`http://localhost:3001/contacts/${data.id}`, { headers: { 'X-Access-Token': token }}).then(({ data }) => {
            setLoading(false);

            alert("contact deleted!");

            window.location.reload();
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }

    function editContact() {
        // do something
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
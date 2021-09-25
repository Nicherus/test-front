// import axios from 'axios';
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

    function deleteContact() {
        // do something
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
                <Button type="button" onClick={() => deleteContact()} disabled={loading}>
                    delete
                </Button>
            </Row>
        </ContainerCard>
    );
}
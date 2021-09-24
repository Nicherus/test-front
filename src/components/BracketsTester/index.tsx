import axios from 'axios';
import { useState } from 'react';
import { Button, Form, ResultDiv } from './styles';

export default function BracketsTester () {
    const [inputBrackets, setInputBrackets] = useState('');
    const [isBracketsValid, setIsBracketsValid] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    function sendData() {
        setLoading(true);
        
        axios.post(`http://localhost:3001/services/brackets`, {
            "inputBrackets": inputBrackets
        }).then(({ data }) => {
            setLoading(false);
            setShowResult(true);
            setIsBracketsValid(data);
            
            console.log(data);
            
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }

    return (
        <Form>
            <input
                placeholder="enter here your brackets sequence"
                type="text"
                value={inputBrackets}
                onChange={(e) => setInputBrackets(e.target.value)}
                required
            />
            <ResultDiv>Brackets are valid? {showResult ? isBracketsValid ? "yes!" : "no.." : null}</ResultDiv>
            <Button type="button" onClick={() => sendData()} disabled={loading}>
                submit
            </Button>
        </Form>
    );
}
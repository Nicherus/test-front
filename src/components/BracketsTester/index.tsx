import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

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

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    margin: 10rem 10rem;

    input {
        border-style: none;
        width: 18rem;
        height: 3rem;
        margin: 0.5rem 0;
        border-radius: 0.5rem;
        padding: 1rem;
        font-size: 1.1rem;
        font-family: Roboto;
        font-weight: bold;
        outline: none;
    }
`;

const Button = styled.button`
    background-color: #2AD0D2;
    font-size: 2.8rem;
    padding: 25px;
    border-radius: 50px;
    color: black;
    cursor: pointer;
    border: 0;
    height: 56px;
    transition: all 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
    filter: brightness(0.6);
    }
`;

const ResultDiv = styled.div`
    margin: 1rem;
    color: white;
`;
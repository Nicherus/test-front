import axios from 'axios';
import { useState } from 'react';
import { Button, Form, ResultDiv } from './styles';
import * as Yup from "yup";

export default function BracketsTester () {
    const [inputBrackets, setInputBrackets] = useState('');
    const [isBracketsValid, setIsBracketsValid] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const validationSchemaBrackets = Yup.object({
        inputBrackets: Yup.string().required('Text is required')
    });

    function sendData() {
        setLoading(true);

        try {
            validationSchemaBrackets.validateSync({
                inputBrackets
            }, { abortEarly: false })

            axios.post(`${process.env.REACT_APP_API_BASE_URL}/services/brackets`, {
                inputBrackets
            }).then(({ data }) => {
                setLoading(false);

                setShowResult(true);
                setIsBracketsValid(data);
            }).catch((error) => {
                alert(error.inner[0].message);
                setLoading(false);
            });
        } catch (err: any){
            setLoading(false);
            alert(err.inner[0].message);
        }
    }

    return (
        <Form>
            <ResultDiv>Is the brackets sequence valid? {showResult ? isBracketsValid ? "yes!" : "no.." : null}</ResultDiv>
            <input
                placeholder="enter here your brackets sequence"
                type="text"
                value={inputBrackets}
                onChange={(e) => setInputBrackets(e.target.value)}
                required
            />
            <Button type="button" onClick={() => sendData()} disabled={loading}>
                send
            </Button>
        </Form>
    );
}
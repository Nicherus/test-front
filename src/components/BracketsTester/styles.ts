import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    margin-right: 5rem;

    input {
        border-style: none;
        width: 30rem;
        height: 3rem;
        margin: 1rem 0;
        border-radius: 0.5rem;
        padding: 1rem;
        font-size: 1.1rem;
        font-family: Roboto;
        font-weight: bold;
        outline: none;
    }
`;

export const Button = styled.button`
    background-color: #2AD0D2;
    font-size: 2.8rem;
    padding: 25px;
    border-radius: 20px;
    color: black;
    cursor: pointer;
    border: 0;
    height: 56px;
    width: 100%;
    transition: all 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        filter: brightness(0.6);
    }
`;

export const ResultDiv = styled.div`
    text-align: center;
    font-size: 1.6rem;
    color: white;
`;
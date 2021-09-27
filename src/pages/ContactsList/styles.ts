import styled from "styled-components";


export const InnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`;

export const ContactsCardsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    min-height: 20vh;
    min-width: 30vw;
`;

export const Form = styled.form`
    margin: 1rem 0 4rem 0;

    input {
        border-style: none;
        width: 100%;
        height: 3rem;
        margin: 0.5rem 0;
        border-radius: 0.5rem;
        padding: 1rem;
        font-size: 1.1rem;
        font-family: Roboto;
        font-weight: bold;
        outline: none;
        
        :disabled {
            background-color: white;
        }
    }
`;

export const Button = styled.button<any>`
    background-color: #2AD0D2;
    font-size: 2rem;
    padding: 25px;
    margin: 10px 0;
    border-radius: 20px;
    color: black;
    cursor: pointer;
    border: 0;
    height: 56px;
    width: ${(props) => props.width || 'auto'};

    transition: all 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        filter: brightness(0.6);
    }
`;

export const Text = styled.div`
    text-align: center;
    color: white;
    font-size: 1.2rem;
    line-height: 2rem;

    margin: 10rem 0;
`;

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background-color: #000000;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: Row;
    justify-content: space-between;

    width: 100%;
`;
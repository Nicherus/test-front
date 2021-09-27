import styled from "styled-components";

export const Header = styled.div`
    background-color: rgba(20, 20, 20, 0.8);
    height: 100px;
    font-size: 3rem;
    color: white;
    background-color: #000000;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.div`
    height: calc(100vh - 100px);

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #000000;
`;

export const Button = styled.button<any>`
    background-color: #2AD0D2;
    font-size: 2.8rem;
    padding: 75px;
    border-radius: 20px;
    color: black;
    margin: 10%;
    cursor: pointer;
    border-style: solid;
    border-color: white;
    border-width: ${(props) => props.borderWidth || '0'};
    height: 56px;
    opacity: ${(props) => props.opacity || '1'};

    transition: all 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        filter: brightness(0.6);
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;
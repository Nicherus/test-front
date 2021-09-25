import styled from "styled-components";

export const ContainerCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    width: 25vw;

    background-color: azure;

    margin: 5px;
    padding: 0.5rem;
`;

export const Button = styled.button`
    background-color: #2AD0D2;
    font-size: 1rem;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    color: black;
    cursor: pointer;
    border: 0;
    transition: all 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        filter: brightness(0.6);
    }
`;

export const Text = styled.div`
    color: black;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: Row;
`;
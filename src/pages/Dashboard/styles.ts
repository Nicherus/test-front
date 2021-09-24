import styled from "styled-components";

export const Navbar = styled.nav`
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
    width: 100%;
    height: calc(100vh - 100px);

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #000000;
`;

export const Button = styled.button`
    background-color: #2AD0D2;
    font-size: 2.8rem;
    padding: 75px;
    border-radius: 50px;
    color: black;
    margin: 10%;
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
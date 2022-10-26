import Modal from "react-modal";
import styled from "styled-components"

export const Back = styled.div`
    display: flex;
    justify-content: end;
    opacity: .5;

    transition: all .2s;
    position: absolute;
    width: 100%;
    padding: 1rem .5rem;
    background-image: linear-gradient(180deg, rgba(0,0,0,.8) 20%, rgba(1,1,1,0.0) 100%);

    &:hover {
        opacity: .7;
    }

    button {
        display: block;
        background: transparent;
        border: 0;
        margin-left: 1rem;
    }
`;

export const CustomModal = styled(Modal)`
    display: grid;
    grid-template-columns: 220px 1fr;

    max-width: 700px;
    width: 95%;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;

    background-color: var(--medium-blue);

    img {
        max-width: 220px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
    }

`;

export const Info = styled.div`
    width: 100%;
    padding: 1rem;
`;

export const Status = styled.div<{ isDead: boolean }>`
    display: flex;
    align-items: center;
    
    span {
        display: inline-block;
        padding: .4rem;
        border-radius: 100%;
        margin-right: 5px;
        background-color: ${({ isDead }) => isDead ? "red" : "green"};
    }

    p {
        display: inline-block;
        font-size: 1.125rem;
        color: var(--text-body);
    }
`;

export const Name = styled.h1`
    color: #FFFFFF;
    font-weight: 700;
    font-size: 2rem;
`;

export const Block = styled.div`
    margin-top: 1rem;
    
    span {
        color: #FFFFFF;
        font-weight: 600;
        display: block;
        font-size: 1.125rem;
        margin-bottom: .5rem;
    }

    p {
        font-size: 1rem;
        color: var(--text-body);
    }
`;

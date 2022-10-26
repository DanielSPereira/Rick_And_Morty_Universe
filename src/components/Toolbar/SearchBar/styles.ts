import styled from "styled-components"

export const Search = styled.label`
    width: 96%;
    max-width: 400px;
    height: 40px;
    display: grid;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 4px;
    border: 1px solid var(--green);
    padding-left: .5rem;
    grid-template-columns: 30px 1fr;

    input {
        height: 100%;
        border-radius: 8px;
        border: 0;
        padding: 0 1rem;
        font-size: 1rem;

        &::placeholder {
            color: var(--medium-blue);
        }
    }
`;

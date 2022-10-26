import styled from "styled-components";

export const CardsWrapper = styled.div`
    gap: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media screen and (max-width: 720px) {
        & {
            grid-template-columns: 1fr;
        }
    }
`;

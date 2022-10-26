import styled from "styled-components";

export const CustomToolbar = styled.div`
    width: 100%;
    z-index: 10;
    background-image: radial-gradient(circle, var(--dark-blue) 0%, var(--dark-blue) 100%);
    background-size:100% 0%, cover;
    background-position:0 0, center;
    background-repeat: no-repeat;
    -webkit-transition: .2s;
    -moz-transition: .2s;
    -o-transition: .2s;
    -ms-transition: .2s;
    transition: .2s;

    &.sticky {
        background-image: radial-gradient(circle, var(--light-blue) 0%, var(--dark-blue) 100%);
        top: -1px;
        position: fixed !important;
        transition: .2s;
        background-size: 100% 100%, cover;
    }
`;

export const Container = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    padding: 2rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: end;

    @media screen and (max-width: 720px) {
        & {
            flex-direction: column-reverse;
            align-items: center;
            gap: 2rem;
        }
    }
`;

export const Marker = styled.div`
    &.sticky {
        height: 170px;
    }
`;

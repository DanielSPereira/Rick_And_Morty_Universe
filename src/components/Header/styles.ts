import styled from "styled-components";

export const CustomHeader = styled.header`
    width: 100%;
    background: radial-gradient(circle, var(--light-blue) 0%, var(--dark-blue) 100%);
`;

export const Container = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    width: 100%;
    padding: 0 1.5rem;
    display: grid;
    grid-template-rows: 100px 1fr;
    
    ul.menu {
        display: flex;
        justify-content: end;
        align-items: center;
        list-style-type: none;
    }

    li {
        
        & a {
            transition: all .2s;
            color: #FFFFFF;
            font-weight: bold;
            text-decoration: none;
        }
        
        &:first-of-type {
            margin-right: 1.25rem;
        }
        
        &.repository a:hover {
            filter: brightness(.7);
        }
        
        &.reference a {
            border: 2px solid rgb(5, 150, 105);
            padding: .5rem 1rem;
            border-radius: 0.5rem;
            
            &:hover {
                background-color: rgb(5, 150, 105);
            }
        }
    }
    

    h1.site-title {
        color: #FFFFFF;
        font-weight: bold;
        margin: 0 auto;
        text-align: center;
        padding-top: 1.5rem;
        padding-bottom: 2.5rem;
        line-height: 1;
        font-size: 4.5rem;

        @media screen and (max-width: 720px) {
            font-size: 4rem;
        }
    }
`;







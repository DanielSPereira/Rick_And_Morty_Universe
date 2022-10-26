import styled from "styled-components"

export const Card = styled.div`
    width: 100%;
    display: grid;
    margin: 0 auto;
    background-color: #FFFFFF;
    border-radius: 1rem;
    overflow: hidden;
    background: linear-gradient(80deg, var(--medium-blue) 0%, var(--medium-blue) 100%);
    grid-template-columns: .5fr 1fr;
    min-height: 220px;

    img {
        max-width: 220px;
        min-width: 92px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    span.status-circle {
        display: inline-block;
        width: .8rem;
        height: .8rem;
        border-radius: 100%;

        &.alive {
            background-color: var(--green);
        }
        &.dead {
            background-color: var(--red);
        }
    }

    p.status-specie {
        display: inline-block;
        margin-left: 1.125rem;
        color: var(--text-body);
    }

    span.sub-title {
        font-weight: bold;
        color: var(--text-title);
    }
  
    p.answer {
        color: var(--text-body);
    }
`;

export const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    h1.character-name {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700;
        color: var(--text-title);
    }

    button.star-btn {
        transition: all .2s;
        background-color: transparent;
        border: none;
        color: var(--text-body);

        &:hover {
            filter: brightness(.7);
        }
    }
`;

export const Info = styled.div`
    display: block;
    margin-top: .2rem;
`;

export const FirstSeenIn = styled.div`
    margin-top: 1rem;
    
    span {
        display: block;
        margin-bottom: .5rem;
    }
`;

export const CardContainer = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    padding: 0 1rem;
    margin: 1rem 0;
`;

export const DetailsButton = styled.button`
    margin: 1rem auto 0;
    display: block;
    width: 100%;
    border-radius: .5rem;
    padding: .5rem 0;
    font-size: 1rem;
    text-align: center;
    transition-duration: .2s;
    border: 0;
    background-color: var(--green-dark);
    color: #FFFFFF;
    
    &:hover {
        filter: brightness(1.2);
    }
`;
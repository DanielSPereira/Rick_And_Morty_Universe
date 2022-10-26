import styled from "styled-components";

export const CustomButton = styled.button<{ selected: boolean }>`
    margin: .5rem 0 0;
    border-radius: 1rem;
    border: 1px solid var(--green-dark);
    text-align: center;
    font-size: 1.125rem;
    box-shadow: 2px 2px 12px #111111;
    white-space: nowrap;
    font-weight: 400;
    padding: .25rem 1rem;
    
    color: ${({ selected }) => selected ? "#FFFFFF" : "var(--text-body)"};
    background-color: ${({ selected }) => selected ? "var(--green-dark)" : "transparent"};
`;

export const List = styled.div`
    padding: .25rem 0 0;
    display: flex;
    column-gap: 1.125rem;
    row-gap: .125rem;
    flex-wrap: wrap;
`;

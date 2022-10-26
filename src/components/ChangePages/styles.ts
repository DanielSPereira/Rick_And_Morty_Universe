import styled, { css } from "styled-components";


const buttonStyle = {
    disabled: css`
        filter: brightness(.7);
    `,
    enabled: css`
        filter: brightness(1.2);

        &:hover {
            filter: brightness(1.8);
        }
    `,
}

type ButtonProps = {
    variant: keyof typeof buttonStyle;
};

export const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
`;

export const Button = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    gap: .5rem;
    transition: all .2s;
    background-color: transparent;
    border: none;
    
    ${({ variant }) => buttonStyle[variant]}
    
    .arrow-icon {
        color: var(--light-blue);
    }

    h1 {
        font-size: 1.125rem;
        font-weight: 600;
        transition: .2s;
        color: var(--text-body);
    }
`;

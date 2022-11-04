import React from "react";
import styled from "styled-components";

// ----------------------------------------------------------------------

interface IBaseProps<DataType> { 
    noDataText?: string; 
    isLoading: boolean; 
    data: DataType; 
};
type IClassProps<WP, DataType> = Partial<IBaseProps<DataType[]>> & WP; 
type WrappedComponentType<P> = (props: P) => JSX.Element;
type LoaderComponentType = () => JSX.Element;


// ----------------------------------------------------------------------

const NotFindText = styled.h1`
    color: var(--text-body);
    font-size: 1.5rem;
    text-align: center;
`;

// ----------------------------------------------------------------------

export const withLoader = <DataType, WP extends JSX.IntrinsicAttributes>(WrappedComponent: WrappedComponentType<WP>, Loader: LoaderComponentType) => {
    return class WithLoader extends React.Component<IClassProps<WP, DataType>> {
        render() {
            const { isLoading, data, noDataText } = this.props;
            if (isLoading) {
                return <Loader />;
            }
            
            if (data?.length === 0 && noDataText) {
                return <NotFindText>{noDataText}</NotFindText>
            }
        
            return <WrappedComponent {...this.props} />;
        }
    }
};

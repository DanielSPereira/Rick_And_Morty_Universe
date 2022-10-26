import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CardsWrapper } from "./styles";

export function CardSkeletonLoad() {
    return (
        <CardsWrapper>
            <SkeletonTheme baseColor="#112945" highlightColor="#133962">
                <Skeleton style={{ borderRadius: "8px" }} height="220px" width="520"/>        
                <Skeleton style={{ borderRadius: "8px" }} height="220px" width="520"/>        
                <Skeleton style={{ borderRadius: "8px" }} height="220px" width="520"/>        
                <Skeleton style={{ borderRadius: "8px" }} height="220px" width="520"/>        
                <Skeleton style={{ borderRadius: "8px" }} height="220px" width="520"/>        
                <Skeleton style={{ borderRadius: "8px" }} height="220px" width="520"/>        
            </SkeletonTheme>
        </CardsWrapper>
    )
}
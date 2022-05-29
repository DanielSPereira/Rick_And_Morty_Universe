import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function FilterSkeletonLoad() {
    return (
        <SkeletonTheme baseColor="#112945" highlightColor="#133962">
            <Skeleton style={{ borderRadius: "1rem", marginRight: "15px" }} height="32px" width="96px"/>        
            <Skeleton style={{ borderRadius: "1rem", marginRight: "15px" }} height="32px" width="96px"/>        
            <Skeleton style={{ borderRadius: "1rem" }} height="32px" width="96px"/>        
        </SkeletonTheme>
    )
}
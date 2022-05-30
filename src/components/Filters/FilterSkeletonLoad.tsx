import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function FilterSkeletonLoad() {
    return (
        <SkeletonTheme baseColor="#112945" highlightColor="#133962">
            <Skeleton className="filter-skeleton" height="32px" width="96px"/>        
            <Skeleton className="filter-skeleton" height="32px" width="96px"/>        
            <Skeleton className="filter-skeleton" height="32px" width="96px"/>        
        </SkeletonTheme>
    )
}
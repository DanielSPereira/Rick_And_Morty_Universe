import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { SkeletonFilters } from './styles'

function FilterSkeletonLoad() {
    return (
        <SkeletonFilters>
            <SkeletonTheme baseColor="#112945" highlightColor="#133962">
                <Skeleton height="32px" width="96px"/>        
                <Skeleton height="32px" width="96px"/>        
                <Skeleton height="32px" width="96px"/>        
            </SkeletonTheme>
        </SkeletonFilters>
    )
}

export type FilterSkeletonLoadType = typeof FilterSkeletonLoad;
export default FilterSkeletonLoad;

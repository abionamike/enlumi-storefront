import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ProductCardSkeleton = () => {
    return (
        <div>
            <Skeleton containerClassName="flex-1" className="h-56 md:h-48" />
            <div className="flex-1 md:h-full mt-4">
                <div className="flex justify-between items-center md:mb-3">
                    <Skeleton height={16} width={110} />
                    <Skeleton height={16} width={80} />
                </div>
                <Skeleton height={16} width={60} className="md:mb-1" />
                <Skeleton height={16} width={150} />
                <div className="flex justify-end mt-3">
                    <Skeleton height={40} width={100} />
                </div>
            </div>
        </div>
    )
}

export default ProductCardSkeleton
"use client";
import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "../utils/axiosConfig";
import { IPrdoucts, IProduct } from "@/interface";
import { ToastMessage } from "@/utils/toast";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hook/useRedux";
import { addToCart, setItemQty } from "@/redux/slices/cart";

const Home = () => {
    const dispatch = useAppDispatch();
    const { cartItems } = useAppSelector(state => state.Cart);

    const { data } = useQuery({
		queryKey: ["products"],
		queryFn: () => publicAxios.get<IPrdoucts>("/product"),
	});

    const handleAddToCart = (product: IProduct) => {
        const productItem = cartItems.find(item => item.id === product.id);
        const productQtyLessThanStockQty = cartItems.find(item => (item.id === product.id && item.qty < product.store_product_properties[0].stock_quantity));

        if(productItem) {
            if(productQtyLessThanStockQty) {
                dispatch(setItemQty({ ...product, qty: productItem.qty + 1 }));
                ToastMessage("Product added to cart!");
            }
        } else {
            dispatch(addToCart(product));
            ToastMessage("Product added to cart!");
        }
    }

    return (
        <div>
            <div className="container w-11/12 mx-auto flex items-center justify-between py-6 mt-6 md:mt-8">
                <h1 className="text-2xl md:text-4xl font-bold">Enlumi Store Front</h1>
                <Link href={"/cart"} className="flex items-center md:mr-[250px] cursor-pointer hover:underline">
                    <p className="mr-1 text-sm md:text-lg">Cart</p>
                    &rarr;
                </Link>
            </div>
            <hr />
            <div className="container w-11/12 mx-auto mt-8 md:mt-14 mb-28">
                <p className="text-lg md:text-xl font-semibold mb-5">All Products</p>
                <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {data && data.data.data.map((product) => {
                        if(product.store_product_properties[0] && product.store_product_properties[0].stock_quantity > 0 && !product.is_service && product.variants.length === 0) {
                            return (
                                <div key={product.id} className="w-full">
                                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                        <img className="h-56 md:h-48 w-full object-cover object-center" src={"https://fakeimg.pl/400/"} alt="" />
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h1 className="title-font text-lg font-medium text-gray-900">{product.name}</h1>
                                                <p className="font-medium">₦{product.store_product_properties[0].selling_price.toLocaleString()}</p>
                                            </div>
                                            <h2 className="text-sm title-font font-medium text-gray-500 mb-1">Qty: {product.store_product_properties[0].stock_quantity.toLocaleString()}</h2>
                                            <p className="text-sm">Exp: {product.store_product_properties[0].expiry_date || '-'}</p>
                                            <div className="flex justify-end mt-3">
                                                <span 
                                                    className="text-xs bg-green-900 px-3 py-2 text-white cursor-pointer"
                                                    onClick={() => handleAddToCart(product)}
                                                >
                                                    Add to cart
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        } 
                        return null
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home
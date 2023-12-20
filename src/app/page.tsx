"use client";
import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "../utils/axiosConfig";
import { IPrdoucts } from "@/interface";
import { ToastMessage } from "@/utils/toast";
import Link from "next/link";
import { useAppDispatch } from "@/hook/useRedux";
import { addToCart } from "@/redux/slices/cart";

const Home = () => {
    const dispatch = useAppDispatch();

    const { data } = useQuery({
		queryKey: ["products"],
		queryFn: () => publicAxios.get<IPrdoucts>("/product"),
	});

    return (
        <div>
            <div className="container w-11/12 mx-auto flex items-center justify-between py-6 mt-8">
                <h1 className="text-4xl font-bold">Enlumi Store Front</h1>
                <Link href={"/cart"} className="flex items-center mr-[250px] cursor-pointer hover:underline">
                    <p className="mr-1 text-lg">Shopping Cart</p>
                    &rarr;
                </Link>
            </div>
            <hr />
            <div className="container w-11/12 mx-auto mt-14">
                <p className="text-xl font-semibold mb-5">All Products</p>
                <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {data && data.data.data.map((product) => {
                        if(product.store_product_properties[0] && !product.is_service && product.variants.length === 0) {
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
                                                    onClick={() => {
                                                        dispatch(addToCart(product))
                                                        ToastMessage("Product added to cart!");
                                                    }}
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
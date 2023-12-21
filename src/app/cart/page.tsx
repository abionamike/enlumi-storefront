"use client";
import DeleteIcon from "@/components/DeleteIcon";
import { useAppDispatch, useAppSelector } from "@/hook/useRedux";
import { removeFromCart, setItemQty } from "@/redux/slices/cart";

const deliveryFee = 0;

const ShoppingCart = () => {
    const dispatch = useAppDispatch();
    const { cartItems } = useAppSelector(state => state.Cart);

    return (
        <div>
            <div className="container w-11/12 mx-auto flex items-center justify-between py-6 mt-8">
                <h1 className="text-2xl md:text-4xl font-bold">Shopping Cart</h1>
            </div>
            <hr />
            <div className="container w-11/12 mx-auto grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-4 mt-8 md:mt-14 mb-28">
                <div className="md:col-span-3">
                    {cartItems.length === 0 ? (
                        <p>You have no item in your shopping cart</p>
                    ) : (
                        <div>
                            <div className="grid grid-cols-6 text-sm md:text-xl mb-4">
                                <div className="font-semibold">ID</div>
                                <div className="-ml-5 md:ml-0 font-semibold">Item</div>
                                <div className="font-semibold">Qty</div>
                                <div className="font-semibold">Price</div>
                                <div className="font-semibold">Total</div>
                                <div className="font-semibold"></div>
                            </div>
                            <hr />
                            <div className="mt-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="grid grid-cols-6 mb-6 text-xs md:text-base">
                                        <div className="flex items-center">
                                            {item.id}
                                        </div>
                                        <div className="-ml-5 md:ml-0 flex items-center">
                                            {item.name}
                                        </div>
                                        <div className="flex items-center">
                                            <select 
                                                className="border rounded border-gray-400 outline-none md:px-3 py-1 md:py-2"
                                                value={item.qty} 
                                                onChange={(e) => dispatch(setItemQty({ ...item, qty: Number(e.target.value) }))}
                                            >
                                                {new Array(item.stock_quantity).fill("-").map((_, index) => (
                                                    <option key={index} value={`${index + 1}`}>
                                                        {index + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex items-center">
                                            ₦{item.store_product_properties[0].selling_price.toLocaleString()}
                                        </div>
                                        <div className="flex items-center">
                                            ₦{(item.store_product_properties[0].selling_price * item.qty).toLocaleString()}
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <div 
                                                className="cursor-pointer"
                                                onClick={() => dispatch(removeFromCart(item))}
                                            >
                                                <DeleteIcon />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="md:px-4">
                        <h1 className="text-xl md:text-3xl font-semibold mb-5">Summary</h1>
                        <div>
                            <div className="flex items-center justify-between text-gray-600 text-base md:text-lg mb-6">
                                <div>Subtotal</div>
                                <div>₦{cartItems.reduce((sum, product) => sum + (product.store_product_properties[0].selling_price * product.qty), 0).toLocaleString()}</div>
                            </div>
                            <div className="flex items-center justify-between text-gray-600 text-base md:text-lg mb-6">
                                <div>Delivery Fee</div>
                                <div>₦{deliveryFee}</div>
                            </div>
                            <hr />
                            <div className="flex items-center justify-between text-lg md:text-xl my-6">
                                <div>Total:</div>
                                <div>₦{(cartItems.reduce((sum, product) => sum + (product.store_product_properties[0].selling_price * product.qty), 0) + deliveryFee).toLocaleString()}</div>
                            </div>
                            <hr />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShoppingCart
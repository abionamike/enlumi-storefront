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
                <h1 className="text-4xl font-bold">Shopping Cart</h1>
            </div>
            <hr />
            <div className="container w-11/12 mx-auto flex items-center mt-14">
                <div className="flex-[3] h-[500px]">
                    {cartItems.length === 0 ? (
                        <p>You have no item in your shopping cart</p>
                    ) : (
                        <div>
                            <div className="grid grid-cols-6 text-xl mb-7">
                                <div className="col-span-2 font-semibold">Item</div>
                                <div className="font-semibold">Quantity</div>
                                <div className="font-semibold">Price</div>
                                <div className="font-semibold">Total</div>
                                <div className="font-semibold"></div>
                            </div>
                            {cartItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-6 mb-5">
                                    <div className="col-span-2 font-semibold flex items-center">
                                        <img className="object-cover w-10 h-10 rounded sm:w-12 sm:h-12" src={"https://fakeimg.pl/400/"} alt="product" />
                                        <h3 className="text-sm md:text-base ml-2">{item.name}</h3>
                                    </div>
                                    <div className="font-semibold flex items-center">
                                        <select 
                                            className="border rounded border-gray-400 outline-none px-3 py-2"
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
                                    <div className="font-semibold flex items-center">₦{item.store_product_properties[0].selling_price.toLocaleString()}</div>
                                    <div className="font-semibold flex items-center">₦{(item.store_product_properties[0].selling_price * item.qty).toLocaleString()}</div>
                                    <div className="font-semibold flex items-center">
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
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="flex-[1] h-[500px] px-4">
                        <h1 className="text-3xl font-semibold mb-5">Summary</h1>
                        <div>
                            <div className="flex items-center justify-between text-gray-600 text-lg mb-6">
                                <div>Subtotal</div>
                                <div>₦{cartItems.reduce((sum, product) => sum + (product.store_product_properties[0].selling_price * product.qty), 0).toLocaleString()}</div>
                            </div>
                            <div className="flex items-center justify-between text-gray-600 text-lg mb-6">
                                <div>Delivery Fee</div>
                                <div>₦{deliveryFee}</div>
                            </div>
                            <hr />
                            <div className="flex items-center justify-between text-xl my-6">
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
import { IProduct } from '@/interface/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IinitialStateInterface {
    cartItems: (IProduct & { qty: number })[]
}

const initialState: IinitialStateInterface = {
    cartItems: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const product = state.cartItems.find(item => item.id === action.payload.id);

            if(product) {
                state.cartItems.unshift({ ...product, qty: product.qty + 1 });
            } else {
                state.cartItems.unshift({ ...action.payload, qty: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<IProduct>) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
        },
        setItemQty: (state, action: PayloadAction<(IProduct & { qty: number })>) => {
            const indexOfProduct = state.cartItems.findIndex(item => item.id === action.payload.id);

            if (indexOfProduct !== -1) {
                state.cartItems[indexOfProduct] = action.payload;
            }
        }
    }
});

export const { addToCart, removeFromCart, setItemQty } = cartSlice.actions;

export default cartSlice.reducer;

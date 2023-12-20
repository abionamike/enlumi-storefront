import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IinitialStateInterface {

}

const initialState: IinitialStateInterface = {

};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        
    }
});

export const { } = productSlice.actions;

export default productSlice.reducer;

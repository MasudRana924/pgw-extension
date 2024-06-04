import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateGet } from '../../utilities/apiCaller';
export const fetchtransactions = createAsyncThunk(
    'fetchtransactions',
    async ({ userToken }, { rejectWithValue }) => {
        try {
            const response = await privateGet('/my/transactions', userToken);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const mytransactionsSlice = createSlice({
    name: 'mytransactions',
    initialState: {
        mytransactions: [],
        lastTransaction: null,
        isLoading: false,
    },
    reducers: {
        clearLastTransaction: (state) => {
            state.lastTransaction = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchtransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchtransactions.fulfilled, (state, action) => {
                console.log('fetchtransactions fulfilled payload:', action.payload);
                const transactions = action.payload.transactions;
                state.mytransactions = [...state.mytransactions, ...transactions];
                state.lastTransaction = transactions.length > 0 ? transactions[0] : null;
                state.isLoading = false;
            })
            .addCase(fetchtransactions.rejected, (state) => {
                state.isLoading = false;
                state.mytransactions = [];
                state.lastTransaction = null;
            })
    }
});
export const { clearLastTransaction } = mytransactionsSlice.actions;
export default mytransactionsSlice.reducer;

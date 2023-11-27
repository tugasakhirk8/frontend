import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Cookie': 'connect.sid=s%3AFI82Utv2Qcx71g-7V1UTyNdzluwSm53j.aXRIcDWxC7K%2B6j%2BZ%2FjlaB2bNRVgAsxSM4%2BwDX%2BB7Iek',
            },
            body: JSON.stringify({
                name: user.name,
                password: user.password,
            }),
            redirect: 'follow',
        };

        const response = await fetch("http://localhost:5000/login", requestOptions);

        if (!response.ok) {
            // Handle non-successful responses
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const result = await response.json();
        //Set response
        localStorage.setItem('user', JSON.stringify(result));

        return result;
    } catch (error) {
        // Handle synchronous errors
        console.error('error', error);
        return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
});

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.uuid);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:5000/me", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const LogOut = createAsyncThunk("user/LogOut", async (_, thunkAPI) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.uuid);

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:5000/me", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
    localStorage.removeItem('user');
});
    // Remove an item from local storage
    


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        //get me
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer
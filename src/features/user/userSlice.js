import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAddress} from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Using async thunk for async logics
export const fetchAddress = createAsyncThunk('user/fetchAddress', async function() {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };
  
    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
  
    // 3) Then we return an object with the data that we are interested in

    //Payload of the fulfilled state
    return { position, address };
})
//* Initial state:
const initialState = {
  username: "",
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

//* the createSlice will automatically generates action creators and action types
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase(fetchAddress.pending, (state, action) => { 
    (state.status = 'loading')
  }).addCase(fetchAddress.fulfilled, (state, action) => {
    state.position = action.payload.position;
    state.address = action.payload.address;
    state.status = 'idle';
  }).addCase(fetchAddress.rejected, (state, action) => {
    state.status = 'error';
    state.error = "Issue getting the address..."
  })
});

//* Triggers staet updates
export const { updateName } = userSlice.actions;

//* Will define how the state should change in response to the actions
export default userSlice.reducer;

//* Function to get the username info:
export const getUserName = (state) => state.user.username;

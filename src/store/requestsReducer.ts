import { createSlice } from "@reduxjs/toolkit";

export type TRequest = {
  id: number,
  orderDate: string,
  clientCompanyName: string,
  driverInitials: string,
  driverPhone: string,
  comments?: string,
  atiCode: string
}

export type InitialState = {
  admin: boolean,
  loading: boolean,
  error: null | string,
  items: Array<TRequest>
}

const initialState: InitialState = {
  admin: false,
  loading: true,
  error: null,
  items: []
};

export const fetchRequests = () => async (dispatch: any, getState: any) => {
  fetchStart(initialState);
  try {
    const response = await fetch("http://localhost:7777/requests");
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(put(data));
    dispatch(fetchSuccess(data));
  } catch (e) {
    dispatch(fetchError("Something went wrong"));
  }
};

export const addNewRequest = (data: object) => async (dispatch: any, getState: any) => {
  try {
    fetch("http://localhost:7777/requests", {
      method: "POST",
      body: JSON.stringify(data),
    })
  } catch (e) {
    throw new Error("Something went wrong");
  }
}

export const editFormRequest = (data: TRequest) => async (dispatch: any, getState: any) => {
  try {
    fetch(`http://localhost:7777/requests/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  })
  .then(() => dispatch(editRequest(data)));
  } catch (e) {
    throw new Error("Something went wrong");
  }  
}

export const deleteRequest = (id: number) => async (dispatch: any, getState: any) => {
  try {
    fetch(`http://localhost:7777/requests/${id}`, {method: "DELETE"})
    .then(() => dispatch(removeRequest(id))
    )
  } catch (e) {
    throw new Error("Something went wrong");
  }
}

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    activeAdmin(state, action) {
      state.admin = action.payload;
    },
    put(state, action) {
      state.items = action.payload;
    },
    editRequest(state, action) {
      const {id, orderDate, clientCompanyName, driverInitials, driverPhone, comments, atiCode} = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      const editedUser = {
        id: id,
        orderDate: orderDate,
        clientCompanyName: clientCompanyName,
        driverInitials: driverInitials,
        driverPhone: driverPhone,
        comments: comments,
        atiCode: atiCode
      }
      state.items.push(editedUser);
    },
    removeRequest(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    sortById(state, action) {
      state.items = [...action.payload].sort((a: TRequest, b: TRequest) => a.id > b.id ? 1 : -1);
    },
    sortByСlientCompanyName(state, action) {
      state.items = [...action.payload].sort((a: TRequest, b: TRequest) => a.clientCompanyName > b.clientCompanyName ? 1 : -1);
    },
    fetchStart(state, action) {
      return { ...state}
    },
    fetchSuccess(state, action) {
      return { ...state, loading: false, error: null}
    },
    fetchError(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
  },
})

export const {activeAdmin, put, removeRequest, editRequest, sortById, sortByСlientCompanyName, fetchStart, fetchSuccess, fetchError} = requestsSlice.actions;
export default requestsSlice.reducer;
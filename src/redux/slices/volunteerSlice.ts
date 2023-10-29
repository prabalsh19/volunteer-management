import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Volunteer, VolunteerState } from "../../utils/types";

const initialState: VolunteerState = {
  volunteers: [],
  status: "idle",
  error: null,
  formData: {
    name: "",
    phone: 0,
    email: "",
    skills: "",
    availability: 0,
    interest: "",
    associatedEvent: "",
  },
};

export const fetchVolunteers = createAsyncThunk(
  "volunteers/fetch",
  async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(baseUrl + "volunteer");
    return response.data;
  }
);

export const addVolunteer = createAsyncThunk(
  "volunteer/add",
  async (volunteerData: Volunteer) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(baseUrl + "volunteer", volunteerData);
    return response.data;
  }
);

export const editVolunteer = createAsyncThunk(
  "volunteer/edit",
  async ({
    id,
    updatedVolunteer,
  }: {
    id: string;
    updatedVolunteer: Volunteer;
  }) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.put(
      baseUrl + "volunteer/" + id,
      updatedVolunteer
    );
    return response.data;
  }
);

export const deleteVolunteer = createAsyncThunk(
  "volunteer/delete",
  async (id: string) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.delete(baseUrl + "volunteer/" + id);
    return response.data;
  }
);

export const VolunteerSlice = createSlice({
  name: "Volunteer",
  initialState,
  reducers: {
    handleFormChange: (state, action) => {
      //@ts-ignore
      state.formData[action.payload.name] = action.payload.value;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVolunteers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVolunteers.fulfilled, (state, action) => {
        state.status = "success";
        state.volunteers = action.payload.volunteers;
        state.error = null;
      })
      .addCase(fetchVolunteers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })

      .addCase(addVolunteer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addVolunteer.fulfilled,
        (state, action: { payload: { volunteer: Volunteer } }) => {
          state.status = "success";
          state.volunteers.push(action.payload.volunteer);
          state.error = null;
        }
      )
      .addCase(addVolunteer.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(editVolunteer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        editVolunteer.fulfilled,
        (state, action: { payload: { volunteer: Volunteer } }) => {
          state.status = "success";
          const index = state.volunteers.findIndex(
            (v) => v._id === action.payload.volunteer._id
          );
          index !== -1 && (state.volunteers[index] = action.payload.volunteer);
          state.error = null;
        }
      )
      .addCase(editVolunteer.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(deleteVolunteer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteVolunteer.fulfilled,
        (state, action: { payload: { volunteer: Volunteer } }) => {
          state.status = "success";
          state.volunteers = state.volunteers.filter(
            (volunteer) => volunteer._id !== action.payload.volunteer._id
          );
          state.error = null;
        }
      )
      .addCase(deleteVolunteer.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      });
  },
});

export const { handleFormChange, resetForm } = VolunteerSlice.actions;

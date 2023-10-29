import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Event, EventState } from "../../utils/types";

const initialState: EventState = {
  events: [],
  status: "idle",
  error: null,
  formData: {
    eventName: "",
    date: "",
    location: "",
    description: "",
    volunteersRequired: 0,
  },
};

export const fetchEvents = createAsyncThunk("events/fetch", async () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.get(baseUrl + "event");
  return response.data;
});

export const addEvent = createAsyncThunk(
  "event/add",
  async (eventData: Event) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(baseUrl + "event", eventData);
    return response.data;
  }
);

export const editEvent = createAsyncThunk(
  "event/edit",
  async ({ id, updatedEvent }: { id: string; updatedEvent: Event }) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.put(baseUrl + "event/" + id, updatedEvent);
    return response.data;
  }
);

export const deleteEvent = createAsyncThunk(
  "event/delete",
  async (id: string) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.delete(baseUrl + "event/" + id);
    return response.data;
  }
);

export const EventSlice = createSlice({
  name: "Event",
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
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "success";
        state.events = action.payload.events;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })

      .addCase(addEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addEvent.fulfilled,
        (state, action: { payload: { event: Event } }) => {
          state.status = "success";
          state.events.push(action.payload.event);
          state.error = null;
        }
      )
      .addCase(addEvent.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(editEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        editEvent.fulfilled,
        (state, action: { payload: { event: Event } }) => {
          state.status = "success";
          const index = state.events.findIndex(
            (v) => v._id === action.payload.event._id
          );
          index !== -1 && (state.events[index] = action.payload.event);
          state.error = null;
        }
      )
      .addCase(editEvent.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteEvent.fulfilled,
        (state, action: { payload: { event: Event } }) => {
          state.status = "success";
          state.events = state.events.filter(
            (event) => event._id !== action.payload.event._id
          );
          state.error = null;
        }
      )
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      });
  },
});

export const { handleFormChange, resetForm } = EventSlice.actions;

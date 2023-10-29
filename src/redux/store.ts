import { configureStore } from "@reduxjs/toolkit";
import { VolunteerSlice } from "./slices/volunteerSlice";
import { EventSlice } from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    volunteers: VolunteerSlice.reducer,
    events: EventSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Volunteer from "./pages/Volunteer.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import VolunteerForm from "./pages/VolunteerForm.tsx";
import VolunteerDetails from "./pages/VolunteerDetails.tsx";
import Event from "./pages/Event.tsx";
import EventForm from "./pages/EventForm.tsx";
import EventDetails from "./pages/EventDetails.tsx";
import Summary from "./pages/Summary.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Volunteer /> },
      { path: "/volunteer/add", element: <VolunteerForm /> },
      { path: "/volunteer/edit", element: <VolunteerForm /> },
      { path: "/volunteer/:id", element: <VolunteerDetails /> },
      { path: "/event", element: <Event /> },
      { path: "/event/add", element: <EventForm /> },
      { path: "/event/edit", element: <EventForm /> },
      { path: "/event/:id", element: <EventDetails /> },
      { path: "/summary", element: <Summary /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

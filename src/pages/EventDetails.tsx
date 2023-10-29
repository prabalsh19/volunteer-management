import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEvents } from "../redux/slices/eventSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Event } from "../utils/types";

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.events.status);
  const events = useSelector((state: RootState) => state.events.events);
  const volunteers = useSelector(
    (state: RootState) => state.volunteers.volunteers
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, []);

  const event = events.find((event: Event) => event._id == id)!;
  const registeredVolunteers = volunteers.reduce(
    (registeredVol, vol) =>
      vol.associatedEvent.includes(event.eventName)
        ? [...registeredVol, vol.name]
        : registeredVol,
    [] as string[]
  );
  return (
    <div className="eventDetails">
      {event?.eventName && (
        <>
          <h1>{event.eventName}</h1>
          <b>Description: {event.description}</b> <br /> <br />
          <b>Date: {event.date}</b> <br /> <br />
          <b>Location: {event.location}</b> <br /> <br />
          <b>Volunteers Required: {event.volunteersRequired}</b> <br /> <br />
          <b>
            Registered Volunteer: {registeredVolunteers.join(", ")}
          </b> <br /> <br />
        </>
      )}
    </div>
  );
};

export default EventDetails;

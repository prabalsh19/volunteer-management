import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchEvents } from "../redux/slices/eventSlice";
import { fetchVolunteers } from "../redux/slices/volunteerSlice";
import { Event } from "../utils/types";

const Summary = () => {
  const events = useSelector((state: RootState) => state.events.events);
  const eventStatus = useSelector((state: RootState) => state.events.status);
  const volunteerStatus = useSelector(
    (state: RootState) => state.volunteers.status
  );
  const volunteers = useSelector(
    (state: RootState) => state.volunteers.volunteers
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (eventStatus === "idle") {
      dispatch(fetchEvents());
    }
    if (volunteerStatus === "idle") {
      dispatch(fetchVolunteers());
    }
  }, []);
  const getRegisteredVolunteers = (event: Event) =>
    volunteers.reduce(
      (registeredVol, vol) =>
        vol.associatedEvent.includes(event.eventName)
          ? [...registeredVol, vol.name]
          : registeredVol,
      [] as string[]
    );
  return (
    <div className="summary">
      <h1>Events Summary</h1>
      <div className="summary__container">
        {events?.map((event) => (
          <div className="summary__container__item">
            <b>Event: {event.eventName}</b>
            <br />
            <small>Description: {event.description}</small>
            <br /> <br />
            <b>Volunteers</b>
            <ul style={{ marginTop: "0" }}>
              {getRegisteredVolunteers(event).map((volunteer) => (
                <li>{volunteer}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h1>Volunteers Summary</h1>
      <div className="summary__container">
        {volunteers?.map((volunteer) => (
          <div className="summary__container__item">
            <b>Volunteer: {volunteer.name}</b>
            <br />
            <small>Contact: {volunteer.phone}</small>
            <small>Email: {volunteer.email}</small>
            <br /> <br />
            <b>Participated in Events</b>
            <ul style={{ marginTop: "0" }}>
              {volunteer.associatedEvent.map((event) => (
                <li>{event}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;

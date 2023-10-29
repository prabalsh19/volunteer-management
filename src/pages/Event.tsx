import { useEffect } from "react";
import "./styles.scss";
import { deleteEvent, fetchEvents } from "../redux/slices/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Event } from "../utils/types";
import { useNavigate } from "react-router-dom";

const Event = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.events.status);
  const navigate = useNavigate();

  const events = useSelector((state: RootState) => state.events.events);

  useEffect(() => {
    status === "idle" && dispatch(fetchEvents());
  }, []);

  const handleEventDelete = async (id: string) => {
    const res = await dispatch(deleteEvent(id));
    if (res.payload.success) {
      alert("Event deleted");
    }
  };

  return (
    <div className="event">
      <button className="btn" onClick={() => navigate("/event/add")}>
        Add Event
      </button>
      {events.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Skill</th>
              <th>Interest</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event: Event) => (
              <tr>
                <td>{event.eventName}</td>
                <td>{new Date(event.date).toDateString()}</td>
                <td>{event.location}</td>
                <td className="btns">
                  <button
                    className="btn"
                    onClick={() => navigate("/event/" + event._id)}
                  >
                    View
                  </button>
                  <button
                    className="btn"
                    onClick={() => navigate("/event/edit", { state: event })}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleEventDelete(event._id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <p>No Events Found</p>
      )}
    </div>
  );
};

export default Event;

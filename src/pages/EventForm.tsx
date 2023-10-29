import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import {
  addEvent,
  editEvent,
  handleFormChange,
  resetForm,
} from "../redux/slices/eventSlice";
import { useEffect } from "react";

const EventForm = () => {
  const event = useLocation().state;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.events.formData);
  const { date, description, eventName, location, volunteersRequired } =
    formData;

  const handleInputChange = (name: string, value: string | number) => {
    dispatch(handleFormChange({ name, value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (event) {
      const response = await dispatch(
        editEvent({
          id: event._id,
          updatedEvent: {
            date,
            description,
            eventName,
            location,
            volunteersRequired,
          },
        })
      );
      if (response.payload.success) {
        alert("Event updated");
        dispatch(resetForm());
        navigate("/event");
      }
    } else {
      const response = await dispatch(
        addEvent({
          date,
          description,
          eventName,
          location,
          volunteersRequired,
        })
      );
      if (response.payload.success) {
        alert("Event added");
        dispatch(resetForm());
        navigate("/event");
      }
    }
  };

  useEffect(() => {
    if (event) {
      const keys = Object.keys(formData);
      keys.forEach((key) => {
        dispatch(handleFormChange({ name: key, value: event[key] }));
      });
    }
  }, []);

  return (
    <div className="eventForm">
      <h1>{!event ? "Add Event" : "Edit Event"}</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Event Name <br />
          <input
            type="text"
            name="eventName"
            value={eventName}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </label>
        <label>
          Event Description <br />
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </label>
        <label>
          Location <br />
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </label>
        <label>
          Date <br />
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </label>

        <label>
          Volunteers Required <br />
          <input
            type="number"
            name="volunteersRequired"
            value={volunteersRequired}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default EventForm;

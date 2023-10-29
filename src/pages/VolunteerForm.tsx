import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import {
  addVolunteer,
  editVolunteer,
  handleFormChange,
  resetForm,
} from "../redux/slices/volunteerSlice";
import { useEffect, useState } from "react";
import { fetchEvents } from "../redux/slices/eventSlice";

const VolunteerForm = () => {
  const volunteer = useLocation().state;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [addedEvents, setAddedEvents] = useState(
    volunteer?.associatedEvent || []
  );
  const events = useSelector((state: RootState) => state.events.events);
  const eventStatus = useSelector((state: RootState) => state.events.status);
  const formData = useSelector((state: RootState) => state.volunteers.formData);
  const {
    name,
    phone,
    email,
    skills,
    availability,
    interest,
    associatedEvent,
  } = formData;

  const handleInputChange = (name: string, value: string | number) => {
    dispatch(handleFormChange({ name, value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (volunteer) {
      const resposne = await dispatch(
        editVolunteer({
          id: volunteer._id,
          updatedVolunteer: {
            name,
            phone: Number(phone),
            email,
            skills,
            availability: Number(availability),
            interest,
            //@ts-ignore
            associatedEvent: addedEvents,
          },
        })
      );
      if (resposne.payload.success) {
        alert("Volunteer updated");
        dispatch(resetForm());
        navigate("/");
      }
    } else {
      const resposne = await dispatch(
        addVolunteer({
          name,
          phone: Number(phone),
          email,
          skills,
          availability: Number(availability),
          interest,
          //@ts-ignore
          associatedEvent: addedEvents,
        })
      );
      if (resposne.payload.success) {
        alert("Volunteer added");
        dispatch(resetForm());
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (volunteer) {
      const keys = Object.keys(formData);
      keys.forEach((key) => {
        dispatch(handleFormChange({ name: key, value: volunteer[key] }));
      });
    }
    if (eventStatus === "idle") {
      dispatch(fetchEvents());
    }
  }, []);

  const handleAddEvent = () => {
    setAddedEvents((prev: string[]) => [...prev, associatedEvent]);
    handleInputChange("associatedEvent", "");
  };

  return (
    <div className="volunteerForm">
      <h1>{!volunteer ? "Add Volunteer" : "Edit Volunteer"}</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name <br />
          <input
            required
            type="text"
            name="name"
            value={name}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </label>
        <label>
          Phone <br />
          <input
            required
            type="tel"
            name="phone"
            value={phone}
            placeholder="Enter phone number"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </label>
        <label>
          Email <br />
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </label>
        <label>
          Skills <br />
          <input
            required
            type="text"
            value={skills}
            name="skills"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </label>
        <label>
          Availability (days) <br />
          <input
            required
            type="text"
            name="availability"
            value={availability}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </label>

        {addedEvents.length > 0 && (
          <div style={{ width: "20vw" }}>
            <b>Events Added</b> <br />
            {addedEvents.map((e: string) => (
              <small>{e}, </small>
            ))}
          </div>
        )}

        <label>
          Associated Event <br />
          <select
            name="associatedEvent"
            value={associatedEvent}
            onChange={(e) => {
              handleInputChange(e.target.name, e.target.value);
            }}
          >
            <option value="" disabled>
              Select Event
            </option>
            {events
              ?.filter((e) => !addedEvents.includes(e.eventName))
              .map((event) => (
                <option value={event.eventName}>{event.eventName}</option>
              ))}
          </select>
        </label>
        <button
          className="btn"
          type="button"
          onClick={handleAddEvent}
          disabled={events.length === addedEvents.length}
          style={{
            width: "fit-content",
            padding: "5px 20px",
            alignSelf: "start",
          }}
        >
          Add
        </button>
        <label>
          Interest <br />
          <input
            required
            type="text"
            name="interest"
            value={interest}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </label>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default VolunteerForm;

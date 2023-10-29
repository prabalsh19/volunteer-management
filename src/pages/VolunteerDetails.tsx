import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVolunteers } from "../redux/slices/volunteerSlice";
import { AppDispatch, RootState } from "../redux/store";

const VolunteerDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.volunteers.status);
  const volunteers = useSelector(
    (state: RootState) => state.volunteers.volunteers
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVolunteers());
    }
  }, []);

  const volunteer = volunteers.find((volunteer) => volunteer._id == id);

  return (
    <div className="volunteerDetails">
      {volunteer?.name && (
        <>
          <h1>{volunteer.name}</h1>
          <b>Phone: {volunteer.phone}</b> <br /> <br />
          <b>Email: {volunteer.email}</b> <br /> <br />
          <b>Skills: {volunteer.skills}</b> <br /> <br />
          <b>Availability: {volunteer.availability} days</b> <br /> <br />
          <b>Interests: {volunteer.interest}</b> <br /> <br />
          <b>
            Associated Event: {volunteer.associatedEvent.join(", ")}
          </b> <br /> <br />
        </>
      )}
    </div>
  );
};

export default VolunteerDetails;

import { useEffect } from "react";
import "./styles.scss";
import {
  deleteVolunteer,
  fetchVolunteers,
} from "../redux/slices/volunteerSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Volunteer } from "../utils/types";
import { useNavigate } from "react-router-dom";

const Volunteer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.volunteers.status);
  const navigate = useNavigate();

  const volunteers = useSelector(
    (state: RootState) => state.volunteers.volunteers
  );

  useEffect(() => {
    status === "idle" && dispatch(fetchVolunteers());
  }, []);

  const handleVolunteerDelete = async (id: string) => {
    const res = await dispatch(deleteVolunteer(id));
    if (res.payload.success) {
      alert("Volunteer deleted");
    }
  };

  return (
    <div className="volunteer">
      <button className="btn" onClick={() => navigate("/volunteer/add")}>
        Add Volunteer
      </button>
      {volunteers.length > 0 ? (
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
            {volunteers.map((volunteer: Volunteer) => (
              <tr>
                <td>{volunteer.name}</td>
                <td>{volunteer.skills}</td>
                <td>{volunteer.interest}</td>
                <td className="btns">
                  <button
                    className="btn"
                    onClick={() => navigate("/volunteer/" + volunteer._id)}
                  >
                    View
                  </button>
                  <button
                    className="btn"
                    onClick={() =>
                      navigate("/volunteer/edit", { state: volunteer })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleVolunteerDelete(volunteer._id!)}
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
        <p>No Volunteers Found</p>
      )}
    </div>
  );
};

export default Volunteer;

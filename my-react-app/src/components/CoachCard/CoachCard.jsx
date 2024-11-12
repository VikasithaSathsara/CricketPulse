import React, { useContext } from "react";
import "./CoachCardStyles.scss";
import { MdAssignmentAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../StoreContext/StoreContext";

const CoachCard = ({ coach }) => {
    const navigate = useNavigate();
    const { updateSelectedCoach } = useContext(StoreContext);

    const handleNavigate = () => {
        updateSelectedCoach(coach);
        navigate("/book-coach");
    };
    return (
        <div className="coach-card">
            <img src={coach.coach_img} alt={coach.name} className="coach-img" />
            <h3 className="coach-name">{coach.name}</h3>
            <p className="coach-specialize">{coach.specialize}</p>
            <button className="appointment-button" onClick={handleNavigate}>
                <MdAssignmentAdd className="appointment-icon" />{" "}
                {/* Add the icon here */}
                Make an Appointment
            </button>
        </div>
    );
};

export default CoachCard;

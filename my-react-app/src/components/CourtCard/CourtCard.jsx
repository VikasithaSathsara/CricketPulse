import React, { useContext } from "react";
import "./CourtCardStyles.scss";
import { MdAssignmentAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../StoreContext/StoreContext";

const CourtCard = ({ court }) => {
    const navigate = useNavigate();
    const { updateSelectedCourt } = useContext(StoreContext);

    const handleNavigate = () => {
        updateSelectedCourt(court);
        navigate("/book-court");
    };

    return (
        <div className="court-card">
            <img
                src={court.court_img}
                alt={court.court_img}
                className="court-img"
            />
            <p className="court-id">{court.court_id}</p>
            <h3 className="court-name">{court.court_name}</h3>
            <button className="appointment-button" onClick={handleNavigate}>
                <MdAssignmentAdd className="appointment-icon" /> Make an
                Appointment
            </button>
        </div>
    );
};

export default CourtCard;

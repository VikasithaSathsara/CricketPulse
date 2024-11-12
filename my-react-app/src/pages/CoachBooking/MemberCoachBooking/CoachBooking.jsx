import React from "react";
import "./CoachBookingStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import CoachCard from "../../../components/CoachCard/CoachCard";
import coach_list from "../../../assets/tempData/coach_list";

function CoachBooking() {
    return (
        <div className="coach-booking-container">
            <SectionContainer title="Book a Coach">
                <div className="coach-list">
                    {coach_list.map((coaching) => (
                        <CoachCard key={coaching.coach_id} coach={coaching} />
                    ))}
                </div>
            </SectionContainer>
        </div>
    );
}

export default CoachBooking;

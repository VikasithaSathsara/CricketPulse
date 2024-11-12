import React, { useState, useEffect } from "react";
import "./CourtBookingStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import CourtCard from "../../../components/CourtCard/CourtCard";
import court_list from "../../../assets/tempData/court_list";

const CourtBooking = () => {
    return (
        <div className="court-booking-container">
            <SectionContainer title="Book a Court">
                <div className="court-list">
                    {court_list.map((court) => (
                        <CourtCard key={court.court_id} court={court} />
                    ))}
                </div>
            </SectionContainer>
        </div>
    );
};

export default CourtBooking;

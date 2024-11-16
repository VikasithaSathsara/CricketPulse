import React, { useState, useEffect } from "react";
import "./CourtBookingStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import CourtCard from "../../../components/CourtCard/CourtCard";
import court_list from "../../../assets/tempData/court_list";

const CourtBooking = () => {

    const [courts, setCourts] = useState([]);

    useEffect(() => {
        const fetchCourts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/court-bookings/courts");
                const data = await response.json();
                setCourts(data);
            } catch (error) {
                console.error("Error fetching courts:", error);
            }
        };

        fetchCourts();
    }, []);
    return (
        <div className="court-booking-container">
            <SectionContainer title="Book a Court">
                <div className="court-list">
                    {courts.map((court) => (
                        <CourtCard key={court.id} court={court} />
                    ))}
                </div>
            </SectionContainer>
        </div>
    );
};

export default CourtBooking;

import React, { useState, useEffect, useContext } from "react";
import "./CoachSessionStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Table from "../../../components/Table/Table";
import { StoreContext } from "../../../StoreContext/StoreContext";

const CoachSession = () => {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const { userId } = useContext(StoreContext);

    const isToday = (date) => {
        const today = new Date();
        const sessionDate = new Date(date);
        return (
            sessionDate.getDate() === today.getDate() &&
            sessionDate.getMonth() === today.getMonth() &&
            sessionDate.getFullYear() === today.getFullYear()
        );
    };

    const todaySessions = bookings.filter((booking) => isToday(booking.date));
    const otherSessions = bookings.filter((booking) => !isToday(booking.date));

    const getStatus = (date) => {
        const today = new Date();
        const sessionDate = new Date(date);

        if (sessionDate < today) {
            return "COMPLETED";
        } else {
            return "UPCOMING";
        }
    };

    const filteredBookings = bookings.filter((booking) => {
        const status = getStatus(booking.date);
        if (filter === "ALL") return true;
        return status === filter;
    });

    const tableHeaders = ["Session ID", "Coach", "Date", "Time", "Status"];
    const tableBody = filteredBookings.map((booking) => ({
        id: booking.id,
        coach: `${booking.coach.firstName} ${booking.coach.lastName}`,
        date: new Date(booking.date).toLocaleDateString(),
        time: `${booking.startTime} - ${booking.endTime}`,
        status: getStatus(booking.date),
    }));

    return (
        <>
            <div className="coach-sessions-container">
                <SectionContainer title="All Sessions">
                    <div className="filter-options">
                        <button onClick={() => setFilter("ALL")}>ALL</button>
                        <button onClick={() => setFilter("UPCOMING")}>
                            UPCOMING
                        </button>
                        <button onClick={() => setFilter("COMPLETED")}>
                            COMPLETED
                        </button>
                    </div>
                    {filteredBookings.length === 0 ? (
                        <p>No sessions available.</p>
                    ) : (
                        <Table headers={tableHeaders} body={tableBody} />
                    )}
                </SectionContainer>
            </div>
        </>
    );
};

export default CoachSession;

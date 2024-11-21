import React, { useState, useEffect } from "react";
import "./MemberCoachBookingDetailsStyles.scss";
import CoachBookingCard from "../../../components/BookingCard/CoachBookingCard/CoachBookingCard";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Table from "../../../components/Table/Table";
import axios from "axios";

const MemberCoachBookingDetails = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/coach-bookings/get_all_coach_bookings")
      .then((response) => {
        setBookings(response.data);
        console.log("Booking Data :", response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
  const otherSessions = bookings;

  const getStatus = (date) => {
    const today = new Date();
    const sessionDate = new Date(date);

    if (sessionDate < today) {
      return "Completed";
    } else if (isToday(date)) {
      return "Today";
    } else {
      return "Upcoming";
    }
  };

  const tableHeaders = ["Session ID", "Coach", "Date", "Time", "Status"];
  const tableBody = otherSessions.map((booking) => ({
    id: booking.id,
    coach: `${booking.coach.firstName} ${booking.coach.lastName}`,
    date: new Date(booking.date).toLocaleDateString(),
    time: `${booking.startTime} - ${booking.endTime}`,
    status: getStatus(booking.date),
  }));

  return (
    <div className="member-coach-booking-details">
      <SectionContainer title="Today's Sessions">
        {todaySessions.length === 0 ? (
          <p>No sessions for today.</p>
        ) : (
          todaySessions.map((booking) => (
            <CoachBookingCard key={booking.id} coach_booking={booking} />
          ))
        )}
      </SectionContainer>
      <SectionContainer title="All Sessions">
        {otherSessions.length === 0 ? (
          <p>No other sessions available.</p>
        ) : (
          <Table headers={tableHeaders} body={tableBody} />
        )}
      </SectionContainer>
    </div>
  );
};

export default MemberCoachBookingDetails;
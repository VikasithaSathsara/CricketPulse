import React, { useState, useEffect, useContext } from "react";
import "./CoachSessionStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Table from "../../../components/Table/Table";
import { StoreContext } from "../../../StoreContext/StoreContext";
import axios from "axios";

const CoachSession = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const { userId } = useContext(StoreContext);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/coach-bookings/get_coach_bookings_by_coach/${userId}`
      )
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
  const otherSessions = bookings.filter((booking) => !isToday(booking.date));

  const getStatus = (date) => {
    const today = new Date();
    const sessionDate = new Date(date);

    if (sessionDate < today) {
      if(    sessionDate.getDate() === today.getDate() &&
      sessionDate.getMonth() === today.getMonth() &&
      sessionDate.getFullYear() === today.getFullYear()){
        return "TODAY";
      }else{
        return "COMPLETED";
      }
    } else {
      return "UPCOMING";
    }
  };


  const filteredBookings = bookings.filter((booking) => {
    const status = getStatus(booking.date);
    if (filter === "ALL") return true;
    return status === filter;
  });

  const tableHeaders = ["Session ID", "Member", "Date", "Time", "Status"];
  const tableBody = filteredBookings.map((booking) => ({
    id: booking.id,
    coach: `${booking.member.firstName} ${booking.member.lastName}`,
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
            <button onClick={() => setFilter("UPCOMING")}>UPCOMING</button>
            <button onClick={() => setFilter("COMPLETED")}>COMPLETED</button>
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

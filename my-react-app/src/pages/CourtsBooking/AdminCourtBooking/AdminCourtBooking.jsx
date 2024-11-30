import React, { useState, useEffect, useContext } from "react";
import CoachBookingCard from "../../../components/BookingCard/CoachBookingCard/CoachBookingCard";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Table from "../../../components/Table/Table";
import axios from "axios";
import { StoreContext } from "../../../StoreContext/StoreContext";
import "./AdminCourtBookingStyles.scss";

const AdminCourtBooking = () => {
  return (
    <>
      <div className="admin-court-booking-container">
        <SectionContainer title="All Court Bookings">
          <div className="filter-options">
            <button onClick={() => setFilter("ALL")}>ALL</button>
            <button onClick={() => setFilter("UPCOMING")}>UPCOMING</button>
            <button onClick={() => setFilter("COMPLETED")}>COMPLETED</button>
          </div>
          {filteredBookings.length === 0 ? (
            <p>No court bookings available.</p>
          ) : (
            <Table headers={tableHeaders} body={tableBody} />
          )}
        </SectionContainer>
      </div>
    </>
  );
};

export default AdminCourtBooking;

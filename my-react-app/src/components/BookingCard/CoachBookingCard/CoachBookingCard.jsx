// src/components/Recentcoach_bookings.jsx
import React, { useState, useEffect } from "react";
import "./CoachBookingCardStyles.scss";
import { useNavigate } from "react-router-dom";
const CoachBookingCard = ({ coach_booking }) => {

  // useEffect(() => {
  //   console.log('coach booking:',coach_booking);
  // }, [coach_booking]);
  return (
    <div className="coach-booking-card-container">
      <div className="client_coach_booking_card" key={coach_booking.id}>
        <div className="profile-img">
          {console.log('coach booking:',coach_booking.id)}
          {coach_booking.coach.profilePic && (
            <img
              src={coach_booking.coach.profilePic }
              alt={`${coach_booking.coach.profilePic}`}
            />
          )}
          {/* <img
            src={coach_booking.coach.user.profilePic}
            alt={coach_booking.coach.user.profilePic}
          /> */}
        </div>
        <div className="details">
          <h4 className="coach-name">Coach : {coach_booking.coach.firstName} {coach_booking.coach.lastName}</h4>
          <p className="coach_booking-date">Date : {coach_booking.date}</p>
          <p className="coach_booking-time">Time : {coach_booking.startTime} : {coach_booking.endTime}</p>

        </div>
      </div>
    </div>
  );
};

export default CoachBookingCard;
import { useEffect, useState, useContext } from "react";
import DatePicker from "../../components/DatePicker/DatePicker";
import BillingPopup_coach from "../../components/BillingPopups/BillingPopup_coach";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { StoreContext } from "../../StoreContext/StoreContext";
import timeSlots from "../../assets/timeSlots";
import "./BookingPagesStyles.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const BookingPage_coach = () => {
  const {
    selectedCoach,
    userId,
    updateSelectedCoach,
    selectedSlots,
    addSlot,
    setSelectedSlots,
  } = useContext(StoreContext);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [menuOpen, setMenuOpen] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedSlots([]);
  }, []);

  const formatTimeSlot = (slot) => {
    return `${slot.start.time} - ${slot.end.time}`;
  };

  const tags_ = timeSlots.map(formatTimeSlot);

  const filteredTags = tags_.filter(
    (item) =>
      item.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()) &&
      !selected.includes(item)
  );

  const getFirstDayOfCurrentMonth = () => {
    const now = new Date();
    return new Date();
  };

  const [selectedDate, setSelectedDate] = useState(getFirstDayOfCurrentMonth());

  useEffect(() => {
    setSelected([]);
  }, [selectedDate]);

  const [showPopup, setShowPopup] = useState(false);
  const appointmentDetails = {
    date: selectedDate.toLocaleDateString(),
    coach: selectedCoach,
    selectedSlots: selected,
  };

  const handleCheckout = () => {
    if (selected.length === 0) {
      toast.error("Please select a time slot.");
      return;
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handlePaymentCompletion = async (orderId) => {
    console.log("Payment completed. OrderID:" + orderId);
    console.log("Selected Slots:", selectedSlots);
    console.log("Selected Coach:", selectedCoach);
    if (orderId) {
      try {
        if (!selectedCoach || !selectedCoach.id) {
          throw new Error("Selected coach is not defined");
        }
        if (!userId) {
          throw new Error("User ID is not defined");
        }
        if (!selectedDate) {
          throw new Error("Selected date is not defined");
        }
        if (!selectedSlots || selectedSlots.length === 0) {
          throw new Error("Selected slots are not defined");
        }

        const response = await axios.post(
          "http://localhost:8080/api/coach-bookings/create",
          {
            coachId: selectedCoach.id,
            memberId: userId,
            date: selectedDate.toISOString().split("T")[0],
            slotCount: selectedSlots.length,
            timeSlots: selectedSlots.map((slot) => ({
              startTime: slot.startTime,
              endTime: slot.endTime,
              description: slot.description,
            })),
          }
        );

        console.log("Booking response:", response.data);
        updateSelectedCoach(null);
        setShowPopup(false);
        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 1000);
        setSelectedSlots([]);
      } catch (error) {
        console.error("Error creating booking:", error);
      }
    }
  };

  window.payhere.onCompleted = function onCompleted(orderId) {
    handlePaymentCompletion(orderId);
  };
  window.payhere.onDismissed = function onDismissed() {
    console.log("Payment dismissed");
  };

  window.payhere.onError = function onError(error) {
    console.log("Error: " + error);
  };

  const location = useLocation();
  const { coach } = location.state || {};

  useEffect(() => {
    if (!selectedCoach) {
      navigate("/coach-bookings");
    }
  }, [selectedCoach, navigate]);

  return (
    <div className="booking-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {selectedCoach && (
        <div className="coach-container">
          <div className="coach-container-left">
            <img
              src={selectedCoach.profilePic}
              alt={selectedCoach.name}
              className="coach-img"
            />
          </div>
          <div className="coach-container-right">
            <h3 className="coach-name">{selectedCoach.name}</h3>
            <p className="coach-specialize">{selectedCoach.specialize}</p>
            <p className="coach-specialize">
              Email: {selectedCoach.user.username}
            </p>
            <p className="coach-specialize">
              Mobile: {selectedCoach.phoneNumber}
            </p>
            <p className="coach-specialize">City: Colombo</p>
          </div>
        </div>
      )}

      <div className="slot-selection">
        <div className="selector-section">
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="availability-info">
          <p>Available Time Slots On:</p>
          <label>{selectedDate.toLocaleDateString()}</label>
        </div>

        {selected.length ? (
          <div className="selected-slots">
            <div className="slot-label">Selected Slots :</div>

            <div className="slot-chips">
              {selected.map((tag, index) => (
                <div key={`${tag}-${index}`} className="slot-item">
                  {tag}
                  <div onMouseDown={(e) => e.preventDefault()}>
                    <IoMdCloseCircle
                      onClick={() => {
                        setSelected(selected.filter((i) => i !== tag));
                        setSelectedSlots(
                          selectedSlots.filter(
                            (slot) =>
                              `${slot.startTime} - ${slot.endTime}` !== tag
                          )
                        );
                      }}
                      size="20px"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="clear-all"
              onClick={() => {
                setSelected([]);
                setSelectedSlots([]);
              }}
            >
              Clear all
            </div>
          </div>
        ) : null}
        <p>Select Your Slots:</p>
        {menuOpen && (
          <div className="slot-menu">
            <ul>
              {filteredTags.length ? (
                filteredTags.map((tag, index) => (
                  <li
                    key={`${tag}-${index}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setMenuOpen(true);
                      setSelected((prev) => [...prev, tag]);
                      const [startTime, endTime] = tag.split(" - ");
                      addSlot(startTime, endTime, "Session");
                      setQuery("");
                    }}
                  >
                    {tag}
                  </li>
                ))
              ) : (
                <li>No Slots available</li>
              )}
            </ul>
          </div>
        )}
        <div className="checkout-button">
          <button onClick={handleCheckout}>Proceed To Checkout</button>
          {showPopup && (
            <BillingPopup_coach
              appointmentDetails={appointmentDetails}
              onClose={closePopup}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage_coach;

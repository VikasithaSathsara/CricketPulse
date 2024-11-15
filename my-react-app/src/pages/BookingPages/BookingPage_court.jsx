import { useEffect, useRef, useState, useContext } from "react";
import DatePicker from "../../components/DatePicker/DatePicker";
import BillingPopup_court from "../../components/BillingPopups/BillingPopup_court";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { StoreContext } from "../../StoreContext/StoreContext";
import timeSlots from "../../assets/timeSlots";
import "./BookingPagesStyles.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingPage_court = () => {
    const { selectedCourt } = useContext(StoreContext);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState([]);
    const [menuOpen, setMenuOpen] = useState(true);
    const { updateSelectedCourt } = useContext(StoreContext);

    const navigate = useNavigate();
    const navigateToCourts = useNavigate();

    const formatTimeSlot = (slot) => {
        return `${slot.start.time} ${slot.start.period} - ${slot.end.time} ${slot.end.period}`;
    };

    const tags_ = timeSlots.map(formatTimeSlot);

    const filteredTags = tags_.filter(
        (item) =>
            item
                .toLocaleLowerCase()
                .includes(query.toLocaleLowerCase().trim()) &&
            !selected.includes(item)
    );

    const getFirstDayOfCurrentMonth = () => {
        const now = new Date();
        return new Date();
    };

    const [selectedDate, setSelectedDate] = useState(
        getFirstDayOfCurrentMonth()
    );

    useEffect(() => {
        setSelected([]);
    }, [selectedDate]);

    const [showPopup, setShowPopup] = useState(false);
    const appointmentDetails = {
        date: selectedDate.toLocaleDateString(),
        court: selectedCourt ? selectedCourt.name : "",
        selectedSlots: selected,
    };

    const handleCheckout = () => {
        if (selected.length === 0) {
            toast.error("Please select a time slot");
            return;
        }
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        window.payhere.onCompleted = function onCompleted(orderId) {
            console.log("Payment completed. OrderID:" + orderId);

            if (orderId) {
                updateSelectedCourt(null);
            }
            setShowPopup(false);
            setTimeout(function () {
                window.location.replace("/dashboard");
            }, 1000);
        };

        window.payhere.onDismissed = function onDismissed() {
            console.log("Payment dismissed");
        };

        window.payhere.onError = function onError(error) {
            console.log("Error: " + error);
        };
    }, []);

    const location = useLocation();
    const { coach } = location.state || {};

    return (
        <div className="book-container">
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
            {selectedCourt ? (
                <div className="booking-container">
                    <div className="booking-container-left">
                        <img
                            src={selectedCourt.court_img}
                            alt={selectedCourt.name}
                            className="booking-img"
                        />
                    </div>
                    <div className="booking-container-right">
                        <h3 className="booking-name">
                            {selectedCourt.court_name}
                        </h3>
                        <p className="booking-specialize">
                            Court {selectedCourt.court_id}
                        </p>
                        <p className="booking-specialize">
                            Email: alicehs@gmail.com
                        </p>
                        <p className="booking-specialize">
                            Mobile: 076 0570 695
                        </p>
                        <p className="booking-specialize">Country: Sri Lanka</p>
                        <p className="booking-specialize">City: Colombo</p>
                    </div>
                </div>
            ) : (
                navigateToCourts("/court-bookings")
            )}

            <div className="slot-selection">
                <div className="selector-section">
                    <DatePicker
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                </div>
                <div className="availability-info">
                    <p>Available Slots On:</p>
                    <label>{selectedDate.toLocaleDateString()}</label>
                </div>

                {selected.length ? (
                    <div className="selected-slots">
                        <div className="slot-label">Selected Slots :</div>

                        <div className="slot-chips">
                            {selected.map((tag) => (
                                <div key={tag} className="slot-item">
                                    {tag}
                                    <div
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        <IoMdCloseCircle
                                            onClick={() =>
                                                setSelected(
                                                    selected.filter(
                                                        (i) => i !== tag
                                                    )
                                                )
                                            }
                                            size="20px"
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            className="clear-all"
                            onClick={() => setSelected([])}
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
                                filteredTags.map((tag) => (
                                    <li
                                        key={tag}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            setMenuOpen(true);
                                            setSelected((prev) => [
                                                ...prev,
                                                tag,
                                            ]);
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
                    <button onClick={handleCheckout}>
                        Proceed To Checkout
                    </button>
                    {showPopup && (
                        <BillingPopup_court
                            appointmentDetails={appointmentDetails}
                            onClose={closePopup}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingPage_court;

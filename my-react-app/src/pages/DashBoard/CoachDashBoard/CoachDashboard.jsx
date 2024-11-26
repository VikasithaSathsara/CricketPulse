import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from "chart.js";
import "./CoachDashboardStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";

// Register necessary Chart.js components
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const CoachDashboard = () => {
    const playerPerformanceData = {
        labels: ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"],
        datasets: [
            {
                label: "Runs Scored",
                data: [50, 75, 100, 125, 150],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
                label: "Wickets Taken",
                data: [2, 3, 5, 1, 4],
                backgroundColor: "rgba(153, 102, 255, 0.6)",
            },
        ],
    };

    const trainingSessionsData = {
        labels: [
            "Session 1",
            "Session 2",
            "Session 3",
            "Session 4",
            "Session 5",
        ],
        datasets: [
            {
                label: "Attendance",
                data: [20, 18, 22, 19, 21],
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 159, 64, 0.6)",
                tension: 0.4, // Smooth curve
            },
        ],
    };

    const performanceAnalysisData = {
        labels: ["Batting", "Bowling", "Fielding", "Fitness"],
        datasets: [
            {
                label: "Performance",
                data: [80, 70, 90, 85],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                ],
                borderColor: "rgba(0, 0, 0, 0.1)", // Optional border color
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="coach-dashboard-container">
            <SectionContainer title="Coach Dashboard">
                <div className="dashboard-container">
                    <div className="dashboard-content">
                        <section className="dashboard-section">
                            <h2>Training Sessions</h2>
                            <Line data={trainingSessionsData} />
                        </section>
                        <section className="dashboard-section">
                            <h2>Player Performance</h2>
                            <Bar data={playerPerformanceData} />
                        </section>
                        {/* <section className="dashboard-section">
                            <h2>Performance Analysis</h2>
                            <Pie data={performanceAnalysisData} />
                        </section> */}
                    </div>
                </div>
            </SectionContainer>
            <SectionContainer title="Today's Sessions">
                <div className="today-sesstions">No sessions</div>
            </SectionContainer>
        </div>
    );
};

export default CoachDashboard;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './officerprof.css'; 
import Chart from 'chart.js/auto';

const OfficerProf = () => {
    const [loggedIn, setLoggedIn] = useState(true); // Define the loggedIn state
    const navigate = useNavigate(); // For navigation after logout

    useEffect(() => {
        const ctx = document.getElementById('myPieChart').getContext('2d');
        
        // Create a new chart instance
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [
                    'Loan Applications', 
                    'Credit Supervisor and Analyst', 
                    'Credit Investigation', 
                    'Send Contract', 
                    'Deposit funds', 
                    'Overdue', 
                    'Due date', 
                    'Active Loans'
                ],
                datasets: [{
                    label: 'Statistics',
                    data: [12, 19, 3, 5, 2, 3, 7, 10],
                    backgroundColor: [
                        '#a020f0', 
                        '#f08080', 
                        '#ffd700', 
                        '#000080', 
                        '#20b2aa', 
                        '#800000', 
                        '#dda0dd', 
                        '#32cd32'
                    ],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false // Custom legend handling
                    }
                }
            }
        });

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            myChart.destroy();
        };
    }, []);

    const handleLogout = () => {
        // Remove token and other user info from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        setLoggedIn(false); // Update loggedIn state to false
        navigate('/login'); // Redirect to home page after logout
    };

    return (
        <div className="container">
            <header className="header">
                <img src="logo.png" alt="MSU-IIT NMPC Logo" className="logol"/>
                <h2 className="landingh2">MSU-IIT National Multi-Purpose Cooperative</h2>
            </header>

            <div className="sidebar">
                <div className="profile">
                    <img src="prof.png" alt="Profile" className="profile-pic"/>
                    <div className="profile-info">
                        <h3 className="username">Nicholas Patrick</h3>
                        <div className="username-divider"></div>
                        <p className="role">Loan Clerk</p>
                    </div>
                </div>
                <nav className="nav-menu">
                    <Link to="/officerdashboard1">Dashboard</Link>
                    <Link to="/OfficerDashboard2">Loan Applications</Link>
                    <Link to="/OfficerDashboard3">Borrower List</Link>
                    <Link to="/payment">Payment</Link>
                    <Link to="/Officerprof">Profile</Link>
                </nav>

                <div className="Log" onClick={handleLogout}>
                    <img src="Sign_out_squre.png" alt="Logout" className="outpic" />
                    <div className="logoutcont">
                        <Link to="/login" className="logout">Logout</Link>
                    </div>
                </div>
            </div>

            <main1 className="dashboard">
                <div>
                    <div className="cover">
                        <img src="cover.png" alt="MSU-IIT NMPC Logo" className="bannero"/>
                    </div>
                    <div className="content">
                        <aside>
                            <div className="profile-section">
                                <div className="profile-info">
                                    <img src="prof.png" alt="Profile" className="profile-photo" />
                                    <button className="edit">Edit Profile</button>
                                    <h2 className="name2">Nicholas Patrick</h2>
                                    <h4 className="work">Business Owner</h4>
                                </div>

                                <div className="about-info">
                                    <h4>About</h4>
                                    <p><i className="fas fa-male" style={{ marginRight: '8px' }}></i><strong>Male</strong></p><hr />
                                    <p><i className="fas fa-birthday-cake" style={{ marginRight: '8px' }}></i>Born June 26, 1980</p><hr />
                                    <p><i className="fas fa-map-marker-alt" style={{ marginRight: '8px' }}></i>2nd Floor, Robinsons Mall, Macapagal Ave, Iligan City</p><hr />
                                    <p><i className="fas fa-envelope" style={{ marginRight: '8px' }}></i>charles5182@ummoh.com</p><hr />
                                    <p><i className="fas fa-phone" style={{ marginRight: '8px' }}></i>33757005467</p> <hr />
                                </div>
                            </div>
                        </aside>

                        <div className="dashboard-welcome">
                            <div className="welcome-text">
                                <h3>Welcome back Mr. Del Valle!<br/>Check dashboard</h3>
                                <p>You have earned 54% more than last month which is a great thing.</p>
                            </div>
                            <div className="welcome-image">
                                <img src="bg.png" alt="Welcome Dashboard" />
                            </div>
                        </div>
                    </div>
                </div>
            </main1>
            <main2>
                <div className="statistics-section">
                    <div className="statistics-container">
                        <div className="legend">
                            <h2>Statistics</h2>
                            <ul>
                                <li><span className="color-box" style={{ backgroundColor: '#a020f0' }}></span> Step 1 - Loan Applications</li>
                                <li><span className="color-box" style={{ backgroundColor: '#f08080' }}></span> Step 2 - Credit Supervisor and Analyst</li>
                                <li><span className="color-box" style={{ backgroundColor: '#ffd700' }}></span> Step 3 - Credit Investigation</li>
                                <li><span className="color-box" style={{ backgroundColor: '#000080' }}></span> Step 4 - Send Contract</li>
                                <li><span className="color-box" style={{ backgroundColor: '#20b2aa' }}></span> Step 5 - Deposit funds</li>
                                <li><span className="color-box" style={{ backgroundColor: '#800000' }}></span> Overdue</li>
                                <li><span className="color-box" style={{ backgroundColor: '#dda0dd' }}></span> Due date</li>
                                <li><span className="color-box" style={{ backgroundColor: '#32cd32' }}></span> Active Loans</li>
                            </ul>
                        </div>
                        <div className="chart-container">
                            <canvas id="myPieChart"></canvas>
                        </div>
                    </div>
                </div>

            <section className="card-sectiono">
                <div className="card-containero">
                    <div className="approvalscard">
                        <h3>Loan Approvals</h3>
                        <p>Check the status of loan approvals for this month.</p>
                    </div>
                    <div className="activecard">
                        <h3>Active Borrowers</h3>
                        <p>Track and manage all active borrowers.</p>
                    </div>
                    <div className="overduecard">
                        <h3>Overdue Payments</h3>
                        <p>View overdue payments and take necessary actions.</p>
                    </div>
                </div>
            </section>
            </main2>
            <div>          
                <section className="graph-sectiono">
                <h3>Graph</h3>
                    <div className="graph-containero">
                    
                        <div className="graph">
                            <h3>Graphs</h3>
                            <p>Check the status of loan approvals for this month.</p>
                        </div>
                    </div>
                </section>
            </div>
            
            
        </div>
    );
}

export default OfficerProf;

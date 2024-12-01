import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Component Imports
import Login from './components/login';  // Ensure `login.js` exports `default Login`
import Register from './components/signup'; // Ensure `signup.js` exports `default Register`
import Landing from './components/landing'; // Ensure correct file case
// import Officer from './components/officerdash'; // Uncomment only if `officerdash.js` is correct
import Borrower from './components/borrowerdash'; // Ensure `borrowerdash.js` exports `default Borrower`
import LoanStatus from './components/loanstatus'; // Ensure `loanstatus.js` exports `default LoanStatus`
import TransactionHistory from './components/transac'; // Ensure file name matches case
import OfficerDashboard2 from './components/officerdashboard2'; // Ensure `officerdashboard2.js` exports correctly
import OfficerDashboard3 from './components/officerdashboard3'; // Ensure `officerdashboard3.js` exports correctly
import Payment from './components/payment'; // Ensure `payment.js` exports correctly
import OfficerProfile from './components/officerprof'; // Ensure correct file case
import OfficerDashboard1 from './components/officerdashboard1'; // Ensure correct file case
import ApplicationForm from './components/appform'; // Ensure correct file case
import CashFlow from './components/cashflow'; // Ensure `cashflow.js` exports correctly
import CoMaker from './components/comaker';
import Generate from './components/Generate';
// import Sidebar from './components/Sidebar'; // Uncomment only if `Sidebar.js` is correct

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Landing />} /> 
          
          {/* Authentication */}
          <Route path="/signup" element={<Register />} /> 
          <Route path="/login" element={<Login />} />
          
          {/* Borrower Section */}
          <Route path="/borrowerdash" element={<Borrower />} />
          <Route path="/loanstatus" element={<LoanStatus />} />
          <Route path="/transac" element={<TransactionHistory />} />
          <Route path="/comaker" element={<CoMaker />} />
          
          {/* Officer Dashboards */}
          <Route path="/officerdashboard1" element={<OfficerDashboard1 />} />
          <Route path="/officerdashboard2" element={<OfficerDashboard2 />} />  
          <Route path="/officerdashboard3" element={<OfficerDashboard3 />} />
          <Route path="/generate" element={<Generate />} /> 
          
          {/* Other Features */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/officerprof" element={<OfficerProfile />} />
          <Route path="/appform" element={<ApplicationForm />} />
          <Route path="/cashflow" element={<CashFlow />} />
          
          {/* Uncomment if Sidebar or Officer Dash components are added */}
          {/* <Route path="/sidebar" element={<Sidebar />} /> 
              <Route path="/officerdash" element={<Officer />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect, useRef } from 'react';
import CircularProgressBar from '../components/Chart/Circular/CircularProgressBar';
import Area from '../components/Chart/Area/Area';
import StackedBarChart from '../components/Chart/Stacked/StackedBarChart';
import LinearProgressBar from '../components/Chart/Linear/LinearProgressBar';
import VennDiagram from '../components/Chart/Venn/VennDiagram';
import Map from '../components/Map/Map';
import './Dashboard.css'
import '../App.css'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const boardRef = useRef(null);

  const scrollLeft = () => {
    boardRef.current.scrollBy({ left: 250, behavior: 'smooth' });
  };

  const scrollRight = () => {
    boardRef.current.scrollBy({ left: 220, behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const boardMembers = [
    { name: "Thien, Nguyen Ngoc", role: "Leader/Back-end Dev", studentId: "28219448044", image: `${process.env.PUBLIC_URL}/icons/ngocthien.jpg` },
    { name: "Thanh, Tran Nguyen Duy", role: "Front-end Dev", studentId: "28214634771", image: `${process.env.PUBLIC_URL}/icons/duythanh.jpg` },
    { name: "Thuyen, Tran An", role: "Back-end Dev", studentId: "28211351997", image: `${process.env.PUBLIC_URL}/icons/anthuyen.jpg` },
    { name: "Tuan, Le Minh", role: "Front-end Dev", studentId: "28212223967", image: `${process.env.PUBLIC_URL}/icons/minhtuan.jpg`},
  ];

  return (
    <div className="dashboard-content">
      {isLoading ? (
        <div>
          <div className="loader1"></div>
          <div className="loader1-title">
            Please wait while we load the content...
          </div>
        </div>
      ) : (
        <>
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="parent">
            <div className="div1">
              <div className="progress-circles-container">
                <CircularProgressBar
                  label="New Employee"
                  value="345"
                  percentage={40}
                  colors={['#483D8B', '#E6E6FA']}
                />
              </div>
            </div>
            <div className="div2">
              <div className="progress-circles-container">
                <CircularProgressBar
                  label="Number of Leave"
                  value="127"
                  percentage={20}
                  colors={['#FF0000', '#fae6e6']}
                />
              </div>
            </div>
            <div className="div3">
              <div className="progress-circles-container">
                <CircularProgressBar
                  label="Total Employee"
                  value="1,345"
                  percentage={67}
                  colors={['#228B22', '#e7fae6']}
                />
              </div>
            </div>
            <div className="div4">
              <div className="progress-circles-container">
                <CircularProgressBar
                  label="Average Salary"
                  value="$1,200"
                  percentage={90}
                  colors={['#FFD700', '#fafae6']}
                />
              </div>
            </div>
            <div className="div5">
                <Area />
            </div>
            <div className="div6">
              <div className="venn-diagram-container">
                <VennDiagram />
              </div>
            </div>
            <div className="div7">
              <div className="linear-progress-bar-container">
                <StackedBarChart />
              </div>
            </div>
            <div className="div8">
              <div className="stacked-bar-stackedbar-container">
                <LinearProgressBar />
              </div>
            </div>
            <div className="div9">
              <div className="">
                <Map />
              </div>
            </div>
            <div className="div10">
              <h2 className="board-members-title">Board Members</h2>
              <p className="board-members-subtitle">
                We are on a mission to simplify and streamline human resource and payroll management through a secure, intuitive, and scalable platform.
              </p>
              <div className="board-members-slider">
                <button
                  src={`${process.env.PUBLIC_URL}/icons/left-bold.png`}
                  className="slide-btn left"
                  onClick={scrollLeft}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/left-bold.png`}
                      alt="Slide Left"
                      className="slide-arrow"
                    />
                </button>
                <div className="board-members-container" ref={boardRef}>
                  {boardMembers.map((member, index) => (
                    <div key={index} className="board-member-card">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="board-member-image"
                      />
                      <div className="board-member-info">
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                        <p>Student ID: {member.studentId}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  src={`${process.env.PUBLIC_URL}/icons/right-bold.png`}
                  className="slide-btn right"
                  onClick={scrollRight}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/right-bold.png`}
                      alt="Slide Right"
                      className="slide-arrow"
                    />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <footer>
            <div className="footer-content">
              <h3 >
                <img
                  src={`${process.env.PUBLIC_URL}/Logopage.png`}
                  alt="Company Logo"
                  className="logo-footer"
                />
              </h3>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{textAlign: 'left'}}>Our Mission</h3>
                <p style={{ margin: '10px 0', textAlign: 'justify'}}>
                  Empowering businesses to manage their people smarter.
                </p>
                <p style={{ margin: '10px 0', textAlign: 'justify'}}>
                  We are on a mission to simplify and streamline human resource and payroll management through a secure, intuitive, and scalable platform.
                </p>
                <p style={{ margin: '10px 0', textAlign: 'justify'}}>
                  Our goal is to help organizations of all sizes save time, reduce errors, and make data-driven decisions by automating core HR processes and ensuring accurate, timely payroll.
                </p>
                <p style={{ margin: '10px 0', textAlign: 'justify'}}>
                  By focusing on user experience and compliance, we empower HR teams to focus on what matters most — people.
                </p>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <h4>Develop by</h4>
                <div style={{ textAlign: 'justify', display: 'inline-block' }}>
                  <p>● CMU-CS 445 HIS TEAM, Software Engineering</p>
                  <p>● Mentor: Huy, Nguyen Dang Quang - Email: huyndq@dtu.edu.vn</p>
                  <p>Duy Tan University Campus: 120 Hoang Minh Thao St, Hoa Khanh Nam Ward, Lien Chieu District, Danang City, Viet Nam</p>
                  <p style={{ margin: '10px 0' }}>Follow us:</p>
                </div>
                <h5 className="follow-icon">
                  <a href="https://github.com/DTU-DevTeam/HR-PRD-445?tab=readme-ov-file#contact" target="_blank" rel="noopener noreferrer">
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/github.png`}
                      alt="GitHub Icon"
                    />
                  </a>
                  <a href="https://www.facebook.com/McreditVietNam" target="_blank" rel="noopener noreferrer">
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/facebook.png`}
                      alt="Facebook Icon"
                    />
                  </a>
                  <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/linkedin.png`}
                      alt="Linkedin Icon"
                    />
                  </a>
                </h5>
              </div>
            </div>
            <div className="copyright" style={{ marginBottom: '20px'}}>
                <p>Copyright © 2025 CMU-CS 445 HIS Team. All Rights Reserved.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Dashboard;
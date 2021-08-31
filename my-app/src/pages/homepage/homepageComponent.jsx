import React from "react";
import "./homepage.styles.css";

import SelectionBox from "../../components/selectionBox/selectionBox.component";
import TopicBox from "../../components/topicBox/topicBox.component";

function Homepage() {
  return (
    <div className="homepage page">
      <div className="header">
        <h1>Welcome to</h1>
        <div className="logo"></div>
      </div>
      <div className="homepage-inner">
        <div className="homepage-boxes">
          <SelectionBox title="General Knowledge" buttonName="Begin" link="quizpage/general" />

          {/* OR */}
          <div className="or-box box">
            <div className="box-title">or</div>
          </div>

          <TopicBox />
        </div>
      </div>
    </div>
  );
}

export default Homepage;

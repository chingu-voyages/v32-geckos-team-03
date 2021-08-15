import React from "react";
import "./homepage.styles.css";

import { Link } from "react-router-dom";

import SelectionBox from "../../components/selectionBox/selectionBox.component";
import TopicBox from "../../components/topicBox/topicBox.component";

function Homepage() {
  return (
    <div className="homepage">
      <div className="homepage-inner">
        <div className="homepage-boxes">
          <SelectionBox title="General Knowledge Quiz" buttonName="BEGIN" link="quizpage/general" />

          <TopicBox />
        </div>
      </div>
    </div>
  );
}

export default Homepage;

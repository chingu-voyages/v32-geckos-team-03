import React from "react";
import "./homepage.styles.css";

import { Link } from "react-router-dom";

import Header from "../../components/header/header.component";
import SelectionBox from "../../components/selectionBox/selectionBox.component";

function Homepage() {
  return (
    <div className="homepage">
      <Header />
      <div className="homepage-inner">
        <div>
          <Link to="/homepage">Home</Link>
        </div>
        <div>Topics</div>
        <div>Something</div>
        <div className="homepage-boxes">
          <SelectionBox
            title="General Knowledge Quiz"
            buttonName="BEGIN"
            link="quizpage/general"
          />

          <SelectionBox title="Select a Topic" buttonName="SELECT" />
        </div>
      </div>
    </div>
  );
}

export default Homepage;

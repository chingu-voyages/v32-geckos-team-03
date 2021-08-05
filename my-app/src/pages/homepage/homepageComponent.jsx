import React from "react";
import "./homepage.styles.css";

import Header from "../../components/header/header.component";
import SelectionBox from "../../components/selectionBox/selectionBox.component";

function Homepage() {
  return (
    <div className="homepage">
      <div className="homepage-inner">
        <Header />
        <div className="homepage-boxes">
          <SelectionBox title="General Knowledge Quiz" buttonName="BEGIN" />
          <SelectionBox title="Select a Topic" buttonName="SELECT" />
        </div>
      </div>
    </div>
  );
}

export default Homepage;

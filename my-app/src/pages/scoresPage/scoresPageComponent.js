import React, { Component } from "react";
import UserScoresTable from "../../components/userScoresTable/userScoresTable.component";

class ScoresPage extends Component {
  render() {
    return (
      <div className="scores-page page card">
        <div className="header">
          <h1>Previous Scores</h1>
        </div>
        <div className="main">
          <UserScoresTable />
        </div>
      </div>
    );
  }
}

export default ScoresPage;

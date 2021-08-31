import React, { Component } from "react";
import RakingTable from "../../components/rankingTable/rankingTable.component";

class RankingPage extends Component {
  state = {};
  render() {
    return (
      <div className="raking-page card">
        <div className="header">
          <h1>Rankings</h1>
        </div>
        <div className="main">
          <RakingTable />
        </div>
      </div>
    );
  }
}

export default RankingPage;

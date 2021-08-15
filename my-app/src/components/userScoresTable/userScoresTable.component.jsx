import axios from "axios";
import React, { Component } from "react";

class UserScoresTable extends Component {
  state = {
    scores: null,
  };

  componentDidMount() {
    this.loadScores().then((response) => {
      this.setState({ scores: response });
    });
  }

  async loadScores() {
    try {
      let response = await axios.get(process.env.REACT_APP_BACKEND + "/get-scores", { withCredentials: true });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to fetch scores.");
    }
  }

  render() {
    const savedScores = this.state.scores;
    if (!savedScores) {
      return (
        <tr>
          <td colspan="3">No scores to be shown.</td>
        </tr>
      );
    }

    const scoresList = savedScores.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.points}</td>
          <td>{new Date(row.date).toLocaleDateString()}</td>
          <td>{row.topic}</td>
        </tr>
      );
    });

    return (
      <table className="table scores-table">
        <thead>
          <tr>
            <th>Scores</th>
            <th>Date</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>{scoresList}</tbody>
        <tfoot>
          <tr>
            <td colspan="3">End of scores</td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default UserScoresTable;

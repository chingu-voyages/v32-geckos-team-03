import axios from "axios";
import React, { Component } from "react";
import TOPICS from "../../topics.js";

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

  getTopicName(number) {
    let category = TOPICS.find((category) => {
      return category.id === number;
    });
    return category.name;
  }

  render() {
    const savedScores = this.state.scores;
    if (!savedScores) {
      return <p>No scores to be shown.</p>;
    }

    const scoresList = savedScores.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.points}</td>
          <td>{new Date(row.date).toLocaleDateString()}</td>
          <td>{this.getTopicName(row.topic)}</td>
        </tr>
      );
    });

    return (
      <table className="table scores-table">
        <thead>
          <tr>
            <th>Score</th>
            <th>Date</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>{scoresList}</tbody>
        <tfoot>
          <tr>
            <td colSpan="3">End of scores</td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default UserScoresTable;

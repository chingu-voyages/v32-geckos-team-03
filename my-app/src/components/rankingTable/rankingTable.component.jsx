import axios from "axios";
import React, { Component } from "react";
import TOPICS from "../../topics";
import SelectTopic from "../selectTopic/selectTopic.component";

class RankingTable extends Component {
  state = {
    topic: "all",
    scores: null,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadScores().then((response) => {
      this.setState({ scores: response });
    });
  }

  handleChange(e) {
    this.setState({ topic: e.target.value });
  }

  async loadScores() {
    try {
      let response = await axios.get(process.env.REACT_APP_BACKEND + "/get-ranking", { withCredentials: true });
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to fetch scores.");
    }
  }

  getScoresList() {
    const savedScores = this.state.scores;
    if (!savedScores) {
      return <p>Loading...</p>;
    }

    let scoresList = savedScores
      .filter((score) => this.state.topic === "all" || score.topic === Number(this.state.topic))
      .sort((a, b) => b.points - a.points)
      .map((score, index) => {
        return (
          <tr key={index}>
            <td>{score.user.name}</td>
            <td>{score.points}</td>
            <td>{this.getTopicName(score.topic)}</td>
          </tr>
        );
      });

    return scoresList;
  }

  getTopicName(number) {
    let topic = TOPICS.find((topic) => {
      return topic.id === number;
    });
    return topic.name;
  }

  render() {
    const scoresList = this.getScoresList();

    return (
      <>
        <SelectTopic scores={this.state.scores} topic={this.state.topic} changeHandler={this.handleChange} />
        <table className="table ranking-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Score</th>
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
      </>
    );
  }
}

export default RankingTable;

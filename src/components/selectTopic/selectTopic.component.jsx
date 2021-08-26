import React, { Component } from "react";
import TOPICS from "../../topics";

class SelectTopic extends Component {
  state = {
    scores: null,
    topic: "all",
  };

  constructor(props) {
    super(props);
    this.state.scores = this.props.scores;
  }

  render() {
    return (
      <select name="topic" className="select-topic" onChange={this.props.changeHandler} value={this.state.topic}>
        <option value="all">------- ALL --------</option>
        {TOPICS.map((topic) => {
          return (
            <option key={topic.id} value={topic.id} default={topic.name === "General Knowledge"}>
              {topic.name}
            </option>
          );
        })}
      </select>
    );
  }
}

export default SelectTopic;

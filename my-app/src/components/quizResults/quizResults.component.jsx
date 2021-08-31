import React, { Component } from "react";
import { Link } from "react-router-dom";

class QuizResults extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggleQuiz() {
    // this.props.setDone(!this.props.done);
    // console.log(this);
  }
  render() {
    // console.log(this.props);
    return (
      <div className="quiz-results card">
        <div className="header">
          <h1>Quiz Results</h1>
        </div>
        <div className="main">
          <p>Congratulations for finishing your quiz!</p>
          <p>Your score was:</p>
          <h2>{this.props.score}</h2>
          <p>Share it with your friends:</p>
          <a href={this.props.shareLink}>{this.props.shareLink}</a>
        </div>
        <button onClick={() => this.props.setDone(false)}>take again</button>
        <button onClick={() => this.props.setDone(false)}>
          <Link to="/homepage">Home</Link>
        </button>
      </div>
    );
  }
}

export default QuizResults;

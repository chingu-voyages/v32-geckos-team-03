import React, { Component } from "react";

class QuizResults extends Component {
  render() {
    console.log(this.props);
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
      </div>
    );
  }
}

export default QuizResults;

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
      <div className="quiz-results">
        <div className="header">
          <h1>Quiz Results</h1>
        </div>
        <div className="main">
          <div className="text">
            <p>Congratulations for finishing your quiz!</p>
            <p>Your score was:</p>
            <h2>{this.props.score}</h2>
            <p>Share it with your friends:</p>
            <p>
              <a href={this.props.shareLink}>{this.props.shareLink}</a>
            </p>
          </div>
          <div className="buttons">
            <button className="btn red" onClick={() => this.props.setDone(false)}>
              Take again
            </button>
            <Link className="btn green" to="/homepage">
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizResults;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SharePage extends Component {
  state = { score: null, validLink: true };
  componentDidMount() {
    console.log(this.props);
    let scoreId = this.props.match.params.id;
    this.getScore(scoreId)
      .then((score) => {
        this.setState({ score });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ validLink: false });
      });
  }

  async getScore(id) {
    let response = await axios.get(process.env.REACT_APP_BACKEND + "/get-score/" + id);
    return response.data;
  }

  render() {
    let userName = this.state.score?.user.name;
    let userScore = this.state.score?.points;

    return (
      <div className="share-page card">
        <div className="header">
          <h1>Quiz App</h1>
        </div>
        <div className="main">
          {this.state.validLink ? (
            userName &&
            userScore && (
              <>
                <p>
                  <strong>{userName}</strong> reached a score of <strong>{userScore}</strong>
                </p>
              </>
            )
          ) : (
            <p>Could not retrieve user score.</p>
          )}
          <p>Can you go higher?</p>
          <p>
            <Link to="/">Click here to play</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default SharePage;

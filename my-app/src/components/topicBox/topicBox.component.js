import React, { useState } from "react";
import "./topicBox.styles.css";

import { useHistory } from "react-router-dom";

function TopicBox({}) {
  const [topic, setTopic] = useState("");
  let history = useHistory();
  function catigories() {
    let data = [
      {
        id: 9,
        name: "General Knowledge"
      },
      {
        id: 10,
        name: "Entertainment: Books"
      },
      {
        id: 11,
        name: "Entertainment: Film"
      },
      {
        id: 12,
        name: "Entertainment: Music"
      },
      {
        id: 13,
        name: "Entertainment: Musicals & Theatres"
      },
      {
        id: 14,
        name: "Entertainment: Television"
      },
      {
        id: 15,
        name: "Entertainment: Video Games"
      },
      {
        id: 16,
        name: "Entertainment: Board Games"
      },
      {
        id: 17,
        name: "Science & Nature"
      },
      {
        id: 18,
        name: "Science: Computers"
      },
      {
        id: 19,
        name: "Science: Mathematics"
      },
      {
        id: 20,
        name: "Mythology"
      },
      {
        id: 21,
        name: "Sports"
      },
      {
        id: 22,
        name: "Geography"
      },
      {
        id: 23,
        name: "History"
      },
      {
        id: 24,
        name: "Politics"
      },
      {
        id: 25,
        name: "Art"
      },
      {
        id: 26,
        name: "Celebrities"
      },
      {
        id: 27,
        name: "Animals"
      },
      {
        id: 28,
        name: "Vehicles"
      },
      {
        id: 29,
        name: "Entertainment: Comics"
      },
      {
        id: 30,
        name: "Science: Gadgets"
      },
      {
        id: 31,
        name: "Entertainment: Japanese Anime & Manga"
      },
      {
        id: 32,
        name: "Entertainment: Cartoon & Animations"
      }
    ];

    return data;
  }

  function handleChange(e) {
    setTopic(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (topic != "") {
      history.push(`/quizpage/${topic}`);
    }
  }

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <label for="cars">Choose a Topic:</label>
        <select value={topic} onChange={handleChange}>
          {catigories().map(function(data) {
            return (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            );
          })}
        </select>
        <button type="submit" className="topic-btn">
          Begin
        </button>
      </form>
    </div>
  );
}

export default TopicBox;

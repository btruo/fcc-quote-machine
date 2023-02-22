
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const API =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

// main App
function App() {
  return (
    <div className='wrapper' id='quote-box'>
      <h1 className='title'>Random Quote Generator</h1>
      <QuoteGen />
      <div className="footer">
        By Brandon Truong
      </div>
    </div>
  );
};

// Component QuoteGen consisting of constructor, API fetch, RNG generator, and render to the DOM.
class QuoteGen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quotes: [
        {
          quote: "Life isnt about getting and having, its about giving and being.",
          author: "Kevin Kruse"
        }
      ],
      index: 0,
      error: null,
    }
    this.getRandomIndex = this.getRandomIndex.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  // API fetch
  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({
            quotes: res.quotes
          }, this.getRandomIndex);
        });
  }
  // RNG for next quote
  getRandomIndex = () => {
    const { quotes } = this.state;
    const ranIndex = Math.floor(Math.random() * quotes.length)
    this.setState({
      index: ranIndex
    })
  };
  // render to the DOM
  render() {
    const { quotes, index } = this.state;
    const ourQuote = quotes[index];
    const tweetURL = `https://twitter.com/intent/tweet/?text=${ourQuote.quote} - ${ourQuote.author}`;

    return (
      <main className='content'>
        {
          ourQuote && (
            <p id='text'>"{ourQuote.quote}"</p>
          )
        }
        {
          ourQuote && (
            <cite id='author'>- {ourQuote.author}</cite>
          )
        }
        <div className='buttons'>
          <a className="btn btn-primary twitter btn-lg" id='tweet-quote' target="_blank" href={tweetURL}>
            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
          </a>
          <button className="btn btn-primary btn-lg" id="new-quote" onClick={this.getRandomIndex}>New Quote</button>
        </div>
      </main>
    )
  }
}

export default App;
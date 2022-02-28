
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";

const API = 
"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";


function App() {
  return (
    <div className='wrapper'>
      <div id='quote-box' className="d-flex justify-content-center align-items-center">
        <QuoteGen />
      </div>
        <div className="footer">By Brandon Truong</div>
    </div>
  );
};

class QuoteGen extends React.Component {
  constructor(props){
  super (props)
    this.state = {
      quotes:[
        {
        quote:"Life isnt about getting and having, its about giving and being.",
        author:"Kevin Kruse"
        }
    ],
      index: 0,
      error: null,
    }
    this.getRandomIndex = this.getRandomIndex.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
    componentDidMount() {
      fetch (API)
        .then (res => res.json())
        .then(
          (res) => {  
            this.setState({
              quotes: res.quotes
            },this.getRandomIndex);
          });
      }
      getRandomIndex =() => {
        const { quotes } = this.state;
        const ranIndex = Math.floor(Math.random() * quotes.length)
        this.setState({
          index: ranIndex 
        })
      };
  



  render() {
    const { quotes, index } = this.state;
    const ourQuote = quotes[index];
    const tweetURL = `https://twitter.com/intent/tweet/?text=${ourQuote.quote} - ${ourQuote.author}`;

      return (       
      <div className="row gx-2">
    <div className="col box p-5 rounded" id="boxed">
    { 
      ourQuote && (
        <div id='text'>
          <p>"{ourQuote.quote}"</p>
        </div>
      )
    }
    {
      ourQuote && (
        <div id="author">
          <cite>- {ourQuote.author}</cite> 
        </div> 
        )
      }
      <div className="d-flex justify-content-between buttons">

              <a className="btn btn-primary twitter" target="_blank" href={tweetURL}>
              <FontAwesomeIcon icon= {faTwitter}></FontAwesomeIcon> 
              </a>
              <button className = "btn btn-primary" onClick={this.getRandomIndex}>New Quote</button>
            </div>

          </div>
          </div>
      )
      }
  }

export default App;
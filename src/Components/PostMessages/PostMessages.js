import React, {Component} from 'react';
import Messages from "../GetMessages/Messages";
import './PostMessages.css';
import InputBlocks from "../InputBlocks/InputBlocks";
import Button from "../Button/Button";

class PostMessages extends Component {
  state = {
    message: '',
    author: '',
    messages: [],
  };
  valueAuthor = (e) => {
    this.setState({author: e.target.value})
  };
  valueMessages = (e) => {
    this.setState({message: e.target.value})
  };
  async getFirstMessage () {
    const response = await fetch('http://146.185.154.90:8000/messages');
    const messages = await response.json();
    this.setState({messages})
  }

  async componentDidMount() {
    this.getFirstMessage()
  }
  componentDidUpdate() {
    clearInterval(this.interval);
    const latstDateTime = this.state.messages[this.state.messages.length -1].datetime;
    if (latstDateTime)this.interval = setInterval(async () => {
      this.getFirstMessage(latstDateTime)
    }, 2000,latstDateTime);

  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextState.messages.length !== this.state.messages.length || nextState.messages.message !== this.state.message || nextState.messages.author !== this.state.author

  }
  sendMessage = () => {
    const url = 'http://146.185.154.90:8000/messages';
    const data = new URLSearchParams();
    data.set('message', this.state.message);
    data.set('author', this.state.author);
    fetch(url, {
      method: 'post',
      body: data,
    });
  };


  render() {
    return (
      <div className="block">
        <div className="entryField">

          <InputBlocks
              onChangeAuthor={event=> this.valueAuthor(event)}
              onChangeMessage={event=>this.valueMessages(event)}
          />

         <Button onClick={this.sendMessage}/>

        </div>
        {this.state.messages.map((posts, index) => <Messages
            key={index}
            author={posts.author}
            message={posts.message}
            date={posts.datetime}/>).reverse()}
      </div>
    );
  }
}

export default PostMessages;
import React, {Component} from 'react';
import Messages from "../GetMessages/Messages";
import './PostMessages.css';

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

  async componentDidMount() {
    setInterval(async () => {
      const response = await fetch('http://146.185.154.90:8000/messages');
      const blocks = await response.json();
      this.setState({messages: blocks})
    }, 1000);
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

          <input className="author"
                 type="text"
                 placeholder="Имя автора..."
                 onChange={event => this.valueAuthor(event)}/>

          <input className="messages"
                 type="text"
                 placeholder="Введите сообщение..."
                 onChange={event => this.valueMessages(event)}/>

          <button className="btn" onClick={this.sendMessage}>Отправить</button>

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
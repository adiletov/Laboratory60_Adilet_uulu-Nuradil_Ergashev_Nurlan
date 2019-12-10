import React from 'react';
import './Messages.css'

const Messages = (props) => {
    return (
        <div className="postsBlock" >
            <div className="postHeader" >
                <h5>{props.author}</h5>
                <p className='date'>{props.date}</p>
            </div>
            <p className="message">{props.message}</p>
        </div>
    );
};

export default Messages;
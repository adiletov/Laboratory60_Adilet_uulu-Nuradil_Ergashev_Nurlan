import React, {Fragment} from 'react';

const InputBlocks = props => {
    return (
        <Fragment>
            <input className="author"
                   type="text"
                   placeholder="Имя автора..."
                   onChange={props.onChangeAuthor}/>

            <input className="messages"
                   type="text"
                   placeholder="Введите сообщение..."
                   onChange={props.onChangeMessage}/>

        </Fragment>
    );
};

export default InputBlocks;
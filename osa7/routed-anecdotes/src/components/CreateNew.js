/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useField from '../hooks';

function CreateNew(props) {
  const navigate = useNavigate();
  const { reset: resetContent, ...content } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetInfo, ...info } = useField('text');

  const handleSubmit = (e) => {
    navigate('/');
    e.preventDefault();
    const { addNew } = props;
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    const { addNotification } = props;
    addNotification(`a new anecdote ${content.value} created!`);
  };

  const resetFields = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetFields}>reset</button>
      </form>
    </div>
  );
}

export default CreateNew;

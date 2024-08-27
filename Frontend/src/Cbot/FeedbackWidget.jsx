import React, { useState } from 'react';

const FeedbackWidget = ({ actions }) => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    actions.handleFeedback(feedback);
  };

  return (
    <div>
      <textarea
        placeholder="Enter your feedback"
        value={feedback}
        onChange={handleFeedbackChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FeedbackWidget;

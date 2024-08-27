import React from 'react';
import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';  // Importing the CSS for default styling
import config from './config';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';

function Cbot() {
  return (
    <>
      <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
      <div>Chatbot</div>
      <h2> HELEELO</h2>
    </>
  );
}

export default Cbot;

import { createChatBotMessage } from 'react-chatbot-kit';
import OptionsWidget from './OptionsWidget'; // Make sure this import path is correct

const botName = 'OreoBot';

const config = {
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}. How can I assist you today?`, {
      widget: 'optionsWidget', // Display options after greeting
    }),
  ],
  botName: botName,

  widgets: [
    {
      widgetName: 'optionsWidget',
      widgetFunc: (props) => <OptionsWidget {...props} />,
    },
    // Add other widgets here if needed
  ],
  
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;

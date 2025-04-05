import { useEffect } from 'react';

// Define types for the Dialogflow web components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'df-messenger': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'project-id': string;
        'agent-id': string;
        'language-code': string;
        'max-query-length': string;
      };
      'df-messenger-chat-bubble': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'chat-title': string;
      };
    }
  }
}

// Define DF Messenger element for TypeScript
interface DFMessengerElement extends HTMLElement {
  render(): void;
}

// Define custom event types for Dialogflow
interface DFUserInputEvent extends Event {
  detail: {
    input: string;
  };
}

interface DFResponseEvent extends Event {
  detail: {
    response: any;
  };
}

const ChatBot = () => {
  useEffect(() => {
    // Only proceed if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Add the Dialogflow CSS
      if (!document.getElementById('df-messenger-css')) {
        const dfCssLink = document.createElement('link');
        dfCssLink.id = 'df-messenger-css';
        dfCssLink.rel = 'stylesheet';
        dfCssLink.href = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css';
        document.head.appendChild(dfCssLink);
      }

      // Add custom styles for Dialogflow messenger
      if (!document.getElementById('df-messenger-custom-styles')) {
        const customStyles = document.createElement('style');
        customStyles.id = 'df-messenger-custom-styles';
        customStyles.innerHTML = `
          df-messenger {
            z-index: 999;
            position: fixed;
            bottom: 16px;
            right: 16px;
          }
          
          /* Add some additional styling for better UI */
          df-messenger-chat {
            width: 350px !important;
            height: 480px !important;
            border-radius: 12px !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2) !important;
          }
          
          /* Improve message styling while keeping the main theme */
          .df-messenger-message-list {
            background-color: #F9F5FC !important;
          }
          
          /* Ensure better contrast for readability */
          .df-messenger-user-message, .df-messenger-bot-message {
            color: #000 !important;
            font-weight: 500 !important;
          }
          
          /* Better header styling */
          .df-messenger-header {
            background-color: #6A1B9A !important;
          }
          
          .df-messenger-header-title {
            color: white !important;
          }
          
          /* Animations for smooth appearance */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          df-messenger-chat {
            animation: fadeIn 0.3s ease-out !important;
          }
        `;
        document.head.appendChild(customStyles);
      }

      // Load the Dialogflow JS script if it's not already loaded
      if (!document.getElementById('df-messenger-js')) {
        const dfScript = document.createElement('script');
        dfScript.id = 'df-messenger-js';
        dfScript.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
        dfScript.async = true;
        dfScript.onload = () => {
          // Create the messenger element directly
          setTimeout(() => {
            if (!document.querySelector('df-messenger')) {
              const wrapper = document.createElement('div');
              wrapper.id = 'df-messenger-wrapper';
              wrapper.innerHTML = `
                <df-messenger
                  project-id="chronotix-chatbot"
                  agent-id="8372aac1-c108-44e1-b6f9-e0aa42c7ed3e"
                  language-code="en"
                  max-query-length="-1">
                  <df-messenger-chat-bubble
                    chat-title="ChronoTix AI">
                  </df-messenger-chat-bubble>
                </df-messenger>
              `;
              document.body.appendChild(wrapper);

              // Add event listeners for additional customization
              setTimeout(() => {
                const dfMessenger = document.querySelector('df-messenger');
                if (dfMessenger) {
                  dfMessenger.addEventListener('df-messenger-loaded', () => {
                    console.log('DF Messenger loaded successfully');
                  });
                  
                  dfMessenger.addEventListener('df-user-input-entered', (event: Event) => {
                    const customEvent = event as DFUserInputEvent;
                    console.log('User input:', customEvent.detail.input);
                  });
                  
                  dfMessenger.addEventListener('df-response-received', (event: Event) => {
                    const customEvent = event as DFResponseEvent;
                    console.log('Bot response:', customEvent.detail.response);
                  });
                }
              }, 1000);
            }
          }, 500); // Small delay to ensure DOM is ready
        };
        document.body.appendChild(dfScript);
      }
    }

    // Cleanup function
    return () => {
      // Don't remove the script and style to prevent re-initialization issues
      const wrapper = document.getElementById('df-messenger-wrapper');
      if (wrapper) {
        document.body.removeChild(wrapper);
      }
    };
  }, []);

  // The component doesn't render any DOM content directly
  // We're appending elements directly to the document body
  return null;
};

export default ChatBot; 
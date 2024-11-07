import React, { useState } from 'react';

interface VoiceButtonProps {
  onTranscription: (text: string) => void;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ onTranscription }) => {
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);

  const handleVoiceRecording = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscription(transcript);
        onTranscription(transcript); // Send transcription to the parent component
      };

      recognition.onend = () => {
        setRecording(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setRecording(false);
      };

      // Start or stop the recognition based on the current state
      recording ? recognition.stop() : recognition.start();
    } else {
      console.error('Web Speech API is not supported in this browser.');
      alert('Web Speech API is not supported in this browser.');
    }
  };

  return (
    <div>
      <button onClick={handleVoiceRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {transcription && <p>Transcription: {transcription}</p>}
    </div>
  );
};

export default VoiceButton;

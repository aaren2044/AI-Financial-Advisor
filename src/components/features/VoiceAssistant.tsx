import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { features } from '../../services/api';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map(result => result.transcript)
          .join('');
        
        setTranscript(transcript);
      };

      setRecognition(recognition);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="p-4 bg-gray-800/50 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Voice Assistant</h3>
        <button
          onClick={toggleListening}
          className={`p-3 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-purple-600'
          }`}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      </div>
      
      {transcript && (
        <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
          <p className="text-gray-200">{transcript}</p>
        </div>
      )}
    </div>
  );
}

export default VoiceAssistant;
// hooks/useVoiceInput.ts
import SpeechRecognition, {
    useSpeechRecognition,
  } from "react-speech-recognition";
  
  export const useVoiceInput = () => {
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
  
    const startListening = () => {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    };
  
    const stopListening = () => {
      SpeechRecognition.stopListening();
    };
  
    return {
      transcript,
      listening,
      resetTranscript,
      startListening,
      stopListening,
    };
  };
  
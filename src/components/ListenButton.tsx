import { Volume2, VolumeX } from 'lucide-react';
import { useTextToSpeech, VoiceGender } from '@/hooks/useTextToSpeech';

interface ListenButtonProps {
  text: string;
  label?: string;
  voiceGender?: VoiceGender;
}

const ListenButton = ({ text, label = "Listen", voiceGender = 'male' }: ListenButtonProps) => {
  const { speak, stop, isSpeaking } = useTextToSpeech(voiceGender);

  const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full border border-border bg-background hover:bg-secondary/50 transition-colors"
    >
      {isSpeaking ? (
        <>
          <VolumeX className="h-4 w-4" />
          <span>Stop</span>
        </>
      ) : (
        <>
          <Volume2 className="h-4 w-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default ListenButton;

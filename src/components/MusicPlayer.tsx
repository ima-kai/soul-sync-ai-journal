import { useState, useRef } from 'react';
import { Play, Pause, Volume2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Mood, FAKE_API_GET_AI_MUSIC, spotifyPlaylists } from '@/lib/fakeApi';

interface MusicPlayerProps {
  mood: Mood;
}

const MusicPlayer = ({ mood }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const moodEmojis: Record<Mood, string> = {
    happy: '😊',
    calm: '😌', 
    excited: '🤩',
    thoughtful: '🤔',
    sad: '😢',
    anxious: '😰',
    energetic: '⚡'
  };
  
  const handlePlayAIMusic = async () => {
    setIsLoading(true);
    try {
      const url = await FAKE_API_GET_AI_MUSIC(mood);
      setAudioUrl(url);
      
      if (audioRef.current) {
        audioRef.current.src = url;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing AI music:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  
  const openSpotifyPlaylist = () => {
    window.open(spotifyPlaylists[mood], '_blank');
  };
  
  return (
    <div className="bg-card/60 backdrop-blur-lg rounded-2xl p-6 shadow-dreamy border border-border/50">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold gradient-soul bg-clip-text text-transparent mb-2">
          Music for your {mood} mood {moodEmojis[mood]}
        </h3>
        <p className="text-muted-foreground text-sm">
          Let the vibes match your soul ✨
        </p>
      </div>
      
      <div className="space-y-4">
        {/* AI Generated Music */}
        <div className="flex items-center gap-3">
          <Button
            variant="energy"
            size="lg"
            onClick={handlePlayAIMusic}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <div className="typing-dots">Generating</div>
            ) : (
              <>
                🎧 Generate AI Music
              </>
            )}
          </Button>
        </div>
        
        {/* Audio Player */}
        {audioUrl && (
          <div className="bg-background/50 rounded-xl p-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              className="shrink-0"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <div className="flex-1">
              <div className="text-sm font-medium">AI Generated Vibes</div>
              <div className="text-xs text-muted-foreground">Perfect for your {mood} energy</div>
            </div>
            
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            
            <audio
              ref={audioRef}
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
            />
          </div>
        )}
        
        {/* Spotify Playlist */}
        <Button
          variant="dreamy"
          size="lg"
          onClick={openSpotifyPlaylist}
          className="w-full"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          🔗 Open Spotify Playlist
        </Button>
      </div>
    </div>
  );
};

export default MusicPlayer;
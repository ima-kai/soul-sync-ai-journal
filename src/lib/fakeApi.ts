// Fake API functions for SoulSync - to be replaced with real APIs later

export interface UserData {
  goals: string;
  dreams: string;
  challenges: string;
  inspiration: string;
  vision: string;
  avatar?: string;
  name?: string;
}

export type Mood = 'happy' | 'calm' | 'excited' | 'thoughtful' | 'sad' | 'anxious' | 'energetic';

export interface MoodResult {
  mood: Mood;
  confidence: number;
  emoji: string;
}

export interface FutureSelfResponse {
  message: string;
  advice: string;
  encouragement: string;
}

// Fake API: Generate avatar from uploaded image
export const FAKE_API_GENERATE_AVATAR = async (imageFile?: File): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return a cute generated avatar URL (placeholder)
  const avatarStyles = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=soul1&backgroundColor=b6e3f4,c0aede,d1d4f9&clothesColor=25557c,65c9ff,5199e4",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=soul2&backgroundColor=ffd5dc,ffdfba,d1d4f9&clothesColor=ff6b9d,65c9ff,5199e4",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=soul3&backgroundColor=c7ceea,ffd3e4,d1d4f9&clothesColor=662d91,ff6b9d,65c9ff"
  ];
  
  return avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
};

// Fake API: Detect mood from journal text
export const FAKE_API_DETECT_MOOD = async (journal: string): Promise<MoodResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const moodMapping: Record<Mood, { emoji: string; keywords: string[] }> = {
    happy: { emoji: "😊", keywords: ["good", "great", "amazing", "love", "joy", "excited", "wonderful"] },
    calm: { emoji: "😌", keywords: ["peaceful", "calm", "serene", "quiet", "meditate", "relax"] },
    excited: { emoji: "🤩", keywords: ["excited", "can't wait", "thrilled", "pumped", "awesome"] },
    thoughtful: { emoji: "🤔", keywords: ["thinking", "wonder", "curious", "question", "ponder"] },
    sad: { emoji: "😢", keywords: ["sad", "down", "depressed", "hurt", "cry", "upset"] },
    anxious: { emoji: "😰", keywords: ["worried", "anxious", "stress", "nervous", "scared"] },
    energetic: { emoji: "⚡", keywords: ["energy", "motivated", "ready", "go", "action"] }
  };
  
  // Simple keyword detection
  const lowerJournal = journal.toLowerCase();
  let detectedMood: Mood = 'thoughtful';
  let maxMatches = 0;
  
  for (const [mood, { keywords }] of Object.entries(moodMapping)) {
    const matches = keywords.filter(keyword => lowerJournal.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      detectedMood = mood as Mood;
    }
  }
  
  return {
    mood: detectedMood,
    confidence: Math.min(0.6 + maxMatches * 0.15, 0.95),
    emoji: moodMapping[detectedMood].emoji
  };
};

// Fake API: Future Self Response (to be replaced with Gradio)
export const FAKE_API_FUTURE_SELF_RESPONSE = async (
  journal: string, 
  userData: UserData, 
  mood: Mood
): Promise<FutureSelfResponse> => {
  // Simulate API delay for typing effect
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const responses: Record<Mood, FutureSelfResponse[]> = {
    happy: [
      {
        message: "I love seeing you this joyful! 💫 Your happiness today is building the foundation for all our future adventures.",
        advice: "Keep nurturing this positive energy - it's your superpower!",
        encouragement: "You're absolutely glowing today, and I'm so proud of how far we've come! ✨"
      }
    ],
    calm: [
      {
        message: "This peaceful energy you're cultivating is exactly what our future self needed. 🌸",
        advice: "These moments of calm are when our best ideas bloom. Trust the process.",
        encouragement: "Your inner peace today is creating ripples of wisdom for tomorrow. Keep flowing! 🌊"
      }
    ],
    excited: [
      {
        message: "Your excitement is infectious! 🚀 I can feel the momentum building toward something incredible.",
        advice: "Channel this energy into those dreams we talked about - now's the perfect time!",
        encouragement: "This enthusiasm is pure magic - ride this wave as far as it takes you! ⭐"
      }
    ],
    thoughtful: [
      {
        message: "I love how deeply you're reflecting today. 🌙 These thoughts are seeds of wisdom.",
        advice: "Trust your intuition - it's guiding us exactly where we need to go.",
        encouragement: "Your thoughtfulness today is shaping our most beautiful tomorrows. Keep questioning! 💭"
      }
    ],
    sad: [
      {
        message: "I see you, and I feel this with you. 💙 This sadness is temporary, but your strength is eternal.",
        advice: "Let yourself feel this fully - it's part of our journey to joy.",
        encouragement: "You're so much stronger than you know. I'm here, and we'll get through this together. 🫂"
      }
    ],
    anxious: [
      {
        message: "I understand this anxiety, and I want you to know - everything works out beautifully. 🌈",
        advice: "Take three deep breaths with me. Focus on what you can control right now.",
        encouragement: "Your courage in facing these feelings is exactly what makes us unstoppable. You've got this! 💪"
      }
    ],
    energetic: [
      {
        message: "This energy is EVERYTHING! ⚡ I can feel you're ready to conquer the world today.",
        advice: "Use this momentum to tackle one thing that's been on your mind - you're unstoppable right now!",
        encouragement: "Your energy today is literally changing our future timeline. Keep going, superstar! 🌟"
      }
    ]
  };
  
  const moodResponses = responses[mood];
  return moodResponses[Math.floor(Math.random() * moodResponses.length)];
};

// Fake API: Get AI-generated music based on mood
export const FAKE_API_GET_AI_MUSIC = async (mood: Mood): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return placeholder audio URLs (you can replace with actual generated music)
  const musicUrls: Record<Mood, string> = {
    happy: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    calm: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    excited: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    thoughtful: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    sad: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    anxious: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    energetic: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  };
  
  return musicUrls[mood];
};

// Spotify playlist mapping
export const spotifyPlaylists: Record<Mood, string> = {
  happy: "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd",
  calm: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",
  excited: "https://open.spotify.com/playlist/37i9dQZF1DX1lVhptIYRda",
  thoughtful: "https://open.spotify.com/playlist/37i9dQZF1DX4E3UdUs7fUx",
  sad: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1",
  anxious: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",
  energetic: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP"
};
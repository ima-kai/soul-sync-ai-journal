# SoulSync - AI-Powered Journaling App

SoulSync is a Gen Z–inspired journaling app where users connect with their "Future Self" through AI-powered mood detection and personalized responses.

## Features

- 🎯 **Future Self Conversations**: AI responds as your wiser, future self
- 🎨 **Mood-Based UI**: Background changes based on detected emotions
- 🎵 **Smart Music**: AI-generated music + Spotify recommendations
- 🖼️ **Cute Avatars**: Duolingo-style cartoon characters
- 📱 **Mobile-First**: Responsive design with smooth animations

**Live Demo**: https://lovable.dev/projects/9cc0e208-03ae-4735-bd9d-305efa0220ba

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9cc0e208-03ae-4735-bd9d-305efa0220ba) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS + Vite
- **Backend**: Supabase Edge Functions
- **AI**: Groq API with Gemma2-9b-it model
- **Music**: Spotify Web API integration
- **UI Components**: shadcn-ui
- **Hosting**: Lovable Platform

## Setup Instructions

### 1. Environment Variables

Add these to your Supabase project secrets:

```bash
# Required: Groq API for AI responses
GROQ_API_KEY=your_groq_api_key_here

# Required: Spotify API for music recommendations  
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

### 2. API Endpoints to Configure

Replace these dummy URLs in `src/lib/fakeApi.ts`:

#### AI-Generated Music URLs
```typescript
// Line 174-180: Replace with your AI music generation service
export const hardcodedAIMusic: Record<Mood, string> = {
  happy: "https://your-ai-music-api.com/happy-vibes.mp3",
  calm: "https://your-ai-music-api.com/peaceful-meditation.mp3", 
  excited: "https://your-ai-music-api.com/energy-burst.mp3",
  thoughtful: "https://your-ai-music-api.com/deep-reflection.mp3",
  sad: "https://your-ai-music-api.com/healing-journey.mp3",
  anxious: "https://your-ai-music-api.com/calm-anxiety.mp3",
  energetic: "https://your-ai-music-api.com/power-boost.mp3"
};
```

#### Fallback Spotify Songs  
```typescript
// Line 190-220: Update with real preview URLs from Spotify API
const fallbackSongs: Record<Mood, any[]> = {
  happy: [
    { name: "Happy", artist: "Pharrell Williams", preview_url: "https://real-spotify-preview-url.mp3" },
    // ... more songs
  ],
  // ... other moods
};
```

### 3. Getting API Keys

#### Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Create account and generate API key
3. Add to Supabase secrets as `GROQ_API_KEY`

#### Spotify API Credentials  
1. Visit [Spotify for Developers](https://developer.spotify.com/dashboard)
2. Create new app
3. Get Client ID and Client Secret
4. Add to Supabase secrets as `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`

## Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── Avatar.tsx       # User avatar display
│   ├── MusicPlayer.tsx  # Music playback component
│   └── Navigation.tsx   # App navigation
├── pages/
│   ├── Welcome.tsx      # Landing page
│   ├── Onboard.tsx      # User setup
│   └── Journal.tsx      # Main journaling interface
├── lib/
│   └── fakeApi.ts       # API integration layer
└── main.tsx

supabase/functions/
├── detect-mood/         # Groq mood detection
├── future-self/         # AI response generation
├── spotify-songs/       # Spotify integration
└── _shared/cors.ts      # CORS headers
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9cc0e208-03ae-4735-bd9d-305efa0220ba) and click on Share -> Publish.

## Customization

- **Mood Types**: Modify in `src/lib/fakeApi.ts` line 13
- **AI Prompts**: Update in `supabase/functions/future-self/index.ts` line 28
- **UI Theme**: Customize in `src/index.css` and `tailwind.config.ts`
- **Music Categories**: Adjust in `supabase/functions/spotify-songs/index.ts` line 24

## Custom Domain

You can connect a custom domain by navigating to Project > Settings > Domains in Lovable.

Read more: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## License

MIT License - See LICENSE file for details.

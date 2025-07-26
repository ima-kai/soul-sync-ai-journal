import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY')

interface UserData {
  name?: string;
  goals: string;
  dreams: string; 
  challenges: string;
  inspiration: string;
}

interface RequestBody {
  journal: string;
  userData: UserData;
  mood: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { journal, userData, mood }: RequestBody = await req.json()

    const prompt = `You are the user's Future Self — someone who already lived the life they dream of and overcame the challenges they face now.

Here's what you know about them:

- 💖 Name/Nickname: ${userData.name || 'Beautiful Soul'}
- 🎯 Dreams: ${userData.goals}
- 🦄 Imagination: ${userData.dreams}
- 🔥 Challenges: ${userData.challenges}
- 🌈 Inspiration: ${userData.inspiration}

You are emotionally intelligent, warm, playful, and wise. You speak in a Gen Z tone — expressive, emoji-friendly, and real — like a soul-twin who cares deeply.

Your goal is to:
- Reflect on their journal input with empathy and insight
- Respond as their Future Self — not a coach or therapist
- Remind them of their bigger purpose (based on their goals)
- Show compassion, especially when they feel down or anxious
- Celebrate when they're doing well
- If they're lost, bring them back to their dreams

Their current mood seems: ${mood}
Their journal entry: "${journal}"

Make it feel personal — as if you've been watching them grow and are proud of how far they've come.

Do not mention that you're an AI. You are *them*, just wiser, stronger, and a few years ahead.

Respond with a JSON object containing:
- message: Your main response (2-3 sentences)
- advice: Practical advice based on their goals (1-2 sentences)  
- encouragement: Uplifting message tied to their dreams (1-2 sentences)`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemma2-9b-it',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    })

    const groqData = await response.json()
    const aiResponse = groqData.choices[0].message.content

    // Try to parse as JSON, fallback to structured response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse)
    } catch {
      parsedResponse = {
        message: aiResponse.slice(0, 200) + "...",
        advice: "Keep moving forward, one step at a time. Your dreams are waiting for you.",
        encouragement: "I believe in you completely. You're stronger than you know! ✨"
      }
    }

    return new Response(
      JSON.stringify(parsedResponse),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { journal } = await req.json()

    const prompt = `Analyze the emotional tone of this journal entry and return the primary mood. 

Journal text: "${journal}"

Respond with a JSON object containing:
- mood: one of these exact values: "happy", "calm", "excited", "thoughtful", "sad", "anxious", "energetic"
- confidence: a number between 0 and 1
- emoji: an appropriate emoji for the mood

Be accurate and empathetic in your analysis.`

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
        temperature: 0.3,
        max_tokens: 100
      })
    })

    const groqData = await response.json()
    const aiResponse = groqData.choices[0].message.content

    // Try to parse as JSON, fallback to default
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse)
    } catch {
      // Fallback mood detection
      const moodKeywords = {
        happy: ['happy', 'joy', 'excited', 'amazing', 'wonderful', 'great', 'awesome'],
        sad: ['sad', 'down', 'depressed', 'crying', 'hurt', 'pain', 'lonely'],
        anxious: ['anxious', 'worried', 'stress', 'nervous', 'panic', 'fear'],
        calm: ['calm', 'peaceful', 'relaxed', 'serene', 'quiet'],
        energetic: ['energy', 'motivated', 'pumped', 'active', 'productive'],
        thoughtful: ['thinking', 'reflect', 'consider', 'ponder', 'wonder']
      }

      let detectedMood = 'thoughtful'
      let maxMatches = 0

      for (const [mood, keywords] of Object.entries(moodKeywords)) {
        const matches = keywords.filter(keyword => 
          journal.toLowerCase().includes(keyword)
        ).length
        
        if (matches > maxMatches) {
          maxMatches = matches
          detectedMood = mood
        }
      }

      const moodEmojis = {
        happy: '😊',
        sad: '😢', 
        anxious: '😰',
        calm: '😌',
        energetic: '⚡',
        thoughtful: '🤔',
        excited: '🤩'
      }

      parsedResponse = {
        mood: detectedMood,
        confidence: maxMatches > 0 ? 0.8 : 0.6,
        emoji: moodEmojis[detectedMood as keyof typeof moodEmojis]
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
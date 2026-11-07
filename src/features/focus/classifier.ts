const EDUCATIONAL: string[] = [
  // Learning & instruction
  'tutorial', 'how to', 'howto', 'learn', 'learning', 'course', 'lecture',
  'lesson', 'class', 'training', 'masterclass', 'workshop', 'bootcamp',
  'explained', 'explanation', 'understanding', 'introduction', 'beginner',
  'advanced', 'complete guide', 'full course', 'in depth', 'deep dive',
  'step by step', 'crash course', 'overview', 'breakdown',

  // STEM
  'science', 'math', 'mathematics', 'physics', 'chemistry', 'biology',
  'engineering', 'algorithm', 'programming', 'coding', 'code', 'development',
  'software', 'data science', 'machine learning', 'artificial intelligence',
  'ai', 'robotics', 'electronics', 'electrical', 'mechanical', 'civil',
  'statistics', 'calculus', 'algebra', 'geometry', 'proof', 'theorem',
  'experiment', 'research', 'study', 'analysis', 'review',

  // Humanities & knowledge
  'history', 'geography', 'economics', 'psychology', 'philosophy',
  'sociology', 'political', 'law', 'ethics', 'logic', 'linguistics',
  'documentary', 'ted', 'ted talk', 'debate', 'lecture', 'speech',
  'book summary', 'book review', 'reading', 'literature',

  // Career & productivity
  'productivity', 'career', 'professional', 'skill', 'skills', 'strategy',
  'business', 'startup', 'entrepreneur', 'leadership', 'management',
  'finance', 'investing', 'stocks', 'money', 'budgeting', 'accounting',
  'marketing', 'sales', 'design', 'ux', 'ui', 'product', 'interview',
  'resume', 'job', 'freelance', 'remote work',

  // Health & self improvement
  'health', 'nutrition', 'diet', 'fitness', 'exercise', 'workout',
  'mental health', 'meditation', 'mindfulness', 'mindset', 'habits',
  'motivation', 'self improvement', 'self development', 'growth',

  // Tech & tools
  'technology', 'tech', 'review', 'vs', 'comparison', 'benchmark',
  'setup', 'configuration', 'install', 'build', 'architecture', 'system',

  // Education channels signals
  'university', 'professor', 'doctor', 'expert', 'scientist', 'researcher',
  'mit', 'stanford', 'harvard', 'khan', 'coursera', 'udemy',
];

const ENTERTAINMENT: string[] = [
  // Comedy & viral
  'funny', 'fun', 'comedy', 'prank', 'joke', 'humor', 'hilarious',
  'try not to laugh', 'meme', 'memes', 'lol', 'roast', 'funniest',
  'viral', 'trend', 'trending',

  // Gaming
  'gaming', 'gameplay', 'playthrough', 'walkthrough', "let's play",
  'lets play', 'speedrun', 'gamer', 'twitch', 'stream', 'streamer',
  'fortnite', 'minecraft', 'roblox', 'valorant', 'cod', 'warzone',

  // Lifestyle & vlogs
  'vlog', 'day in my life', 'my life', 'storytime', 'story time',
  'grwm', 'get ready with me', 'haul', 'unboxing', 'mukbang',
  'asmr', 'satisfying', 'oddly satisfying', '24 hours', 'overnight',
  'challenge', 'extreme', 'in public',

  // Drama & pop culture
  'drama', 'beef', 'exposed', 'cancelled', 'gossip', 'tea', 'spill',
  'celebrity', 'reaction', 'reacting', 'react', 'face reveal',
  'you won\'t believe', 'gone wrong', 'shocking', 'insane',

  // Entertainment content
  'compilation', 'best moments', 'highlights', 'tiktok', 'shorts compilation',
  'flex', 'rich', 'expensive', 'luxury', 'celebrity', 'famous',
  'subscribers', 'fans', 'meet and greet',
];

export type Classification = 'educational' | 'entertainment' | 'neutral';

export function classifyTitle(title: string): Classification {
  const lower = title.toLowerCase();
  let score = 0;

  for (const kw of EDUCATIONAL) {
    if (lower.includes(kw)) score++;
  }
  for (const kw of ENTERTAINMENT) {
    if (lower.includes(kw)) score--;
  }

  if (score > 0) return 'educational';
  if (score < 0) return 'entertainment';
  return 'neutral';
}

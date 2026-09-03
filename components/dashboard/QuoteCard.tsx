const QUOTES = [
  { text: "Small disciplines repeated with consistency lead to great achievements.", author: "John Maxwell" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "Your habits will determine your future. Make them work for you.", author: "Jack Canfield" },
  { text: "An ounce of practice is generally worth more than a ton of theory.", author: "Ernst F. Schumacher" },
  { text: "First forget inspiration. Habit is more dependable.", author: "Octavia Butler" },
  { text: "Build your future one habit at a time.", author: "Streakly" },
  { text: "Every action you take is a vote for the person you wish to become.", author: "James Clear" },
];

export default function QuoteCard() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const { text, author } = QUOTES[dayOfYear % QUOTES.length];

  return (
    <div className="mx-5 mb-4 rounded-2xl bg-white border border-gray-100 shadow-card p-4 flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-base">🌱</span>
      </div>
      <div>
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">Mindful Thought</p>
        <p className="text-xs text-gray-600 leading-relaxed italic">"{text}"</p>
        {author !== "Streakly" && (
          <p className="text-[10px] text-gray-400 mt-1 font-medium">— {author}</p>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface QuestionInputProps {
  onSubmit: (content: string) => void;
  isLive: boolean;
}

export function QuestionInput({ onSubmit, isLive }: QuestionInputProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="relative">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={isLive ? "Ask a question..." : "Ask a question about this episode..."}
          className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-purple-600 hover:text-purple-700"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
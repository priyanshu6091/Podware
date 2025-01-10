import React from 'react';
import { ArrowUp, MessageSquare } from 'lucide-react';
import type { Question } from '../../types';

interface QuestionListProps {
  questions: Question[];
  onVote: (questionId: string) => void;
  onRespond: (questionId: string) => void;
}

export function QuestionList({ questions, onVote, onRespond }: QuestionListProps) {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-start gap-4">
            <button
              onClick={() => onVote(question.id)}
              className="flex flex-col items-center"
            >
              <ArrowUp className={`h-5 w-5 ${question.votes > 0 ? 'text-purple-600' : 'text-gray-400'}`} />
              <span className="text-sm font-medium">{question.votes}</span>
            </button>
            <div className="flex-1">
              <p className="text-gray-900">{question.content}</p>
              {question.response && (
                <div className="mt-3 pl-4 border-l-2 border-purple-200">
                  <p className="text-gray-600">{question.response.content}</p>
                  {question.response.type === 'audio' && (
                    <audio controls className="mt-2 w-full">
                      <source src={question.response.content} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
              )}
              <div className="mt-2 flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {new Date(question.timestamp).toLocaleString()}
                </span>
                {!question.response && (
                  <button
                    onClick={() => onRespond(question.id)}
                    className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Respond
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
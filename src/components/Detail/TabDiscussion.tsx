import React, { useState } from 'react';
import { type College } from '../../types';
import { useColleges } from '../../context/CollegeContext';
import { HelpCircle, MessageSquare, Send, User } from 'lucide-react';

interface TabDiscussionProps {
  college: College;
}

export const TabDiscussion: React.FC<TabDiscussionProps> = ({ college }) => {
  const { getCollegeQuestions, addQuestion, addAnswer } = useColleges();
  const questions = getCollegeQuestions(college.id);

  // States
  const [newQuestionText, setNewQuestionText] = useState('');
  const [askerName, setAskerName] = useState('');
  const [askError, setAskError] = useState('');

  // Track which question is currently being replied to
  const [activeReplyQuestionId, setActiveReplyQuestionId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replierName, setReplierName] = useState('');
  const [replyError, setReplyError] = useState('');

  const handleAskQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAskError('');

    if (!askerName.trim()) {
      setAskError('Please enter your name.');
      return;
    }
    if (!newQuestionText.trim() || newQuestionText.trim().length < 10) {
      setAskError('Question must be at least 10 characters long.');
      return;
    }

    addQuestion(college.id, newQuestionText, askerName);
    
    // Reset
    setNewQuestionText('');
    setAskerName('');
  };

  const handleAnswerSubmit = (e: React.FormEvent, questionId: string) => {
    e.preventDefault();
    setReplyError('');

    if (!replierName.trim()) {
      setReplyError('Please enter your name.');
      return;
    }
    if (!replyText.trim() || replyText.trim().length < 8) {
      setReplyError('Reply answer must be at least 8 characters long.');
      return;
    }

    addAnswer(questionId, replyText, replierName);

    // Reset
    setReplyText('');
    setReplierName('');
    setActiveReplyQuestionId(null);
  };

  return (
    <div className="discussion-tab-container animate-fade-in">
      <div className="discussion-layout">
        
        {/* Ask Question Form */}
        <div className="ask-question-box glass-panel">
          <div className="box-header">
            <HelpCircle className="header-icon-q" />
            <h3>Ask the Community</h3>
          </div>
          <p className="box-desc">Have a question about admissions, placements, or college life? Ask students & alumni.</p>
          
          <form onSubmit={handleAskQuestionSubmit} className="ask-form">
            {askError && <div className="form-error-msg">{askError}</div>}
            
            <div className="input-group">
              <label className="input-label">Your Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Aman Gupta"
                value={askerName}
                onChange={(e) => setAskerName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Question Details</label>
              <textarea
                rows={3}
                className="form-input textarea-field"
                placeholder="Type your question clearly..."
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-full-width">
              <span>Post Question</span>
              <Send size={14} />
            </button>
          </form>
        </div>

        {/* Question & Answer Threads */}
        <div className="threads-container">
          <h3 className="threads-header-title">Discussion Forum ({questions.length} Threads)</h3>
          
          {questions.length === 0 ? (
            <div className="empty-discussion-state glass-panel">
              <MessageSquare size={36} className="empty-disc-icon" />
              <h4>No Discussions Yet</h4>
              <p>Be the first to start a conversation about {college.shortName}!</p>
            </div>
          ) : (
            <div className="threads-list">
              {questions.map((q) => (
                <div key={q.id} className="thread-item glass-panel">
                  {/* Question Header */}
                  <div className="question-header">
                    <div className="q-badge">Q</div>
                    <div className="q-content">
                      <p className="q-text">{q.questionText}</p>
                      <span className="q-meta">Asked by {q.askedBy} on {q.date}</span>
                    </div>
                  </div>

                  {/* Answers List */}
                  <div className="answers-divider"></div>
                  <div className="answers-list">
                    {q.answers.length === 0 ? (
                      <span className="no-answers-tag">No answers yet. Be the first to answer!</span>
                    ) : (
                      q.answers.map((ans) => (
                        <div key={ans.id} className="answer-item">
                          <div className="answer-line-decoration"></div>
                          <div className="answer-main">
                            <p className="answer-text">{ans.answerText}</p>
                            <div className="answer-meta">
                              <User size={12} />
                              <span>Answered by {ans.answeredBy} on {ans.date}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Reply Action */}
                  <div className="answer-action-row">
                    {activeReplyQuestionId === q.id ? (
                      <form onSubmit={(e) => handleAnswerSubmit(e, q.id)} className="reply-form animate-fade-in">
                        {replyError && <div className="form-error-msg">{replyError}</div>}
                        <div className="reply-fields-grid">
                          <input
                            type="text"
                            className="form-input reply-input-name"
                            placeholder="Your Name"
                            value={replierName}
                            onChange={(e) => setReplierName(e.target.value)}
                          />
                          <input
                            type="text"
                            className="form-input reply-input-text"
                            placeholder="Write your answer..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                        </div>
                        <div className="reply-buttons">
                          <button type="button" className="btn-reply-cancel" onClick={() => setActiveReplyQuestionId(null)}>
                            Cancel
                          </button>
                          <button type="submit" className="btn-reply-submit">
                            Post Answer
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button className="btn-reply-trigger" onClick={() => {
                        setActiveReplyQuestionId(q.id);
                        setReplyError('');
                      }}>
                        Reply to this Question
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <style>{`
        .discussion-tab-container {
          width: 100%;
        }
        .discussion-layout {
          display: grid;
          grid-template-columns: 1fr 1.8fr;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .discussion-layout {
            grid-template-columns: 1fr;
          }
        }
        
        .ask-question-box {
          padding: 1.5rem;
          height: fit-content;
        }
        .box-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .header-icon-q {
          color: var(--color-primary);
        }
        .box-header h3 {
          font-size: 1.1rem;
          font-weight: 700;
        }
        .box-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }
        .ask-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .btn-full-width {
          width: 100%;
        }
        
        .threads-header-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        .empty-discussion-state {
          padding: 3rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .empty-disc-icon {
          color: var(--text-muted);
        }
        .empty-discussion-state h4 {
          font-size: 1.1rem;
          font-weight: 700;
        }
        .empty-discussion-state p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        
        .threads-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .thread-item {
          padding: 1.5rem;
        }
        .question-header {
          display: flex;
          gap: 1rem;
        }
        .q-badge {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(var(--color-primary-rgb), 0.15);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.05rem;
          flex-shrink: 0;
          border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        }
        .q-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .q-text {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.45;
        }
        .q-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        
        .answers-divider {
          height: 1px;
          background: var(--border-light);
          margin: 1.25rem 0;
        }
        
        .answers-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-left: 1rem;
        }
        .no-answers-tag {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-style: italic;
        }
        .answer-item {
          display: flex;
          gap: 0.75rem;
          position: relative;
        }
        .answer-line-decoration {
          width: 2px;
          background: var(--border-light);
          margin-bottom: 0.25rem;
        }
        .answer-main {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .answer-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .answer-meta {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        
        .answer-action-row {
          margin-top: 1.25rem;
          padding-left: 3rem;
        }
        @media (max-width: 480px) {
          .answer-action-row {
            padding-left: 0;
          }
        }
        .btn-reply-trigger {
          background: transparent;
          border: none;
          color: var(--color-primary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .btn-reply-trigger:hover {
          color: var(--color-secondary);
          text-decoration: underline;
        }
        
        .reply-form {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border-light);
          padding: 1rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }
        .reply-fields-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 0.5rem;
        }
        @media (max-width: 480px) {
          .reply-fields-grid {
            grid-template-columns: 1fr;
          }
        }
        .reply-input-name {
          padding: 0.5rem;
          font-size: 0.85rem;
        }
        .reply-input-text {
          padding: 0.5rem;
          font-size: 0.85rem;
        }
        .reply-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
        .btn-reply-cancel {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
        }
        .btn-reply-submit {
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 0.35rem 0.75rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-reply-submit:hover {
          background: var(--color-primary-hover);
        }
      `}</style>
    </div>
  );
};

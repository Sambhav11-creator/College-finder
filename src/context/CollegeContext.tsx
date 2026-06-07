import React, { createContext, useContext, useState, useEffect } from 'react';
import { type College, type Review, type Question, type Answer } from '../types';
import { mockColleges, mockReviews, mockQuestions } from '../utils/mockData';

interface CollegeContextType {
  colleges: College[];
  reviews: Review[];
  questions: Question[];
  loading: boolean;
  addReview: (collegeId: string, userName: string, rating: number, comment: string, category: Review['category']) => void;
  addQuestion: (collegeId: string, questionText: string, askedBy: string) => void;
  addAnswer: (questionId: string, answerText: string, answeredBy: string) => void;
  getCollegeReviews: (collegeId: string) => Review[];
  getCollegeQuestions: (collegeId: string) => Question[];
  triggerSearchApi: (query: string, filters: any, sorting: string) => Promise<College[]>;
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

export const CollegeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colleges] = useState<College[]>(mockColleges);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize from LocalStorage or mock data
  useEffect(() => {
    const storedReviews = localStorage.getItem('cf_reviews');
    const storedQuestions = localStorage.getItem('cf_questions');

    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      setReviews(mockReviews);
      localStorage.setItem('cf_reviews', JSON.stringify(mockReviews));
    }

    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      setQuestions(mockQuestions);
      localStorage.setItem('cf_questions', JSON.stringify(mockQuestions));
    }

    // Emulate network database fetch delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const addReview = (collegeId: string, userName: string, rating: number, comment: string, category: Review['category']) => {
    const newReview: Review = {
      id: `r_${Date.now()}`,
      collegeId,
      userName,
      rating,
      comment,
      category,
      date: new Date().toISOString().split('T')[0]
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('cf_reviews', JSON.stringify(updatedReviews));
  };

  const addQuestion = (collegeId: string, questionText: string, askedBy: string) => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      collegeId,
      questionText,
      askedBy,
      date: new Date().toISOString().split('T')[0],
      answers: []
    };
    const updatedQuestions = [newQuestion, ...questions];
    setQuestions(updatedQuestions);
    localStorage.setItem('cf_questions', JSON.stringify(updatedQuestions));
  };

  const addAnswer = (questionId: string, answerText: string, answeredBy: string) => {
    const newAnswer: Answer = {
      id: `a_${Date.now()}`,
      answerText,
      answeredBy,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: [...q.answers, newAnswer]
        };
      }
      return q;
    });

    setQuestions(updatedQuestions);
    localStorage.setItem('cf_questions', JSON.stringify(updatedQuestions));
  };

  const getCollegeReviews = (collegeId: string) => {
    return reviews.filter((r) => r.collegeId === collegeId);
  };

  const getCollegeQuestions = (collegeId: string) => {
    return questions.filter((q) => q.collegeId === collegeId);
  };

  // Retrieve matching institutions based on filters and search query
  const triggerSearchApi = async (query: string, filters: any, sorting: string): Promise<College[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...colleges];

        // Search query
        if (query.trim()) {
          const q = query.toLowerCase().trim();
          results = results.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.shortName.toLowerCase().includes(q) ||
              c.city.toLowerCase().includes(q) ||
              c.state.toLowerCase().includes(q) ||
              c.stream.toLowerCase().includes(q)
          );
        }

        // Stream Filter
        if (filters.streams && filters.streams.length > 0) {
          results = results.filter((c) => filters.streams.includes(c.stream));
        }

        // Location State Filter
        if (filters.states && filters.states.length > 0) {
          results = results.filter((c) => filters.states.includes(c.state));
        }

        // Fees Filter (c.fees is annual fee)
        if (filters.maxFees) {
          results = results.filter((c) => c.fees <= filters.maxFees);
        }

        // Rating Filter
        if (filters.minRating) {
          results = results.filter((c) => c.rating >= filters.minRating);
        }

        // Ownership Type
        if (filters.ownershipTypes && filters.ownershipTypes.length > 0) {
          results = results.filter((c) => filters.ownershipTypes.includes(c.type));
        }

        // Sorting
        if (sorting === 'rating') {
          results.sort((a, b) => b.rating - a.rating);
        } else if (sorting === 'fees_asc') {
          results.sort((a, b) => a.fees - b.fees);
        } else if (sorting === 'fees_desc') {
          results.sort((a, b) => b.fees - a.fees);
        } else if (sorting === 'package_desc') {
          results.sort((a, b) => b.averagePackage - a.averagePackage);
        }

        resolve(results);
      }, 500); // Network request timeout emulation
    });
  };

  return (
    <CollegeContext.Provider
      value={{
        colleges,
        reviews,
        questions,
        loading,
        addReview,
        addQuestion,
        addAnswer,
        getCollegeReviews,
        getCollegeQuestions,
        triggerSearchApi
      }}
    >
      {children}
    </CollegeContext.Provider>
  );
};

export const useColleges = () => {
  const context = useContext(CollegeContext);
  if (!context) {
    throw new Error('useColleges must be used within a CollegeProvider');
  }
  return context;
};

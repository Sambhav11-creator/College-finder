export interface CourseInfo {
  name: string;
  fees: number;
  duration: string;
  intake: number;
}

export interface RankingInfo {
  body: string;
  rank: number;
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  logo: string; // Background color or initials or icon name
  bannerImage: string;
  location: string;
  city: string;
  state: string;
  fees: number; // Avg annual fees in INR
  rating: number;
  type: 'Government' | 'Private';
  stream: 'Engineering' | 'Medical' | 'Management';
  established: number;
  highestPackage: number; // In LPA
  averagePackage: number; // In LPA
  placementRate: number;  // In %
  facilities: string[];
  topCourses: CourseInfo[];
  rankings: RankingInfo[];
  description: string;
}

export interface Review {
  id: string;
  collegeId: string;
  userName: string;
  rating: number;
  comment: string;
  category: 'Overall' | 'Academics' | 'Placements' | 'Infrastructure' | 'Campus Life';
  date: string;
}

export interface Answer {
  id: string;
  answerText: string;
  answeredBy: string;
  date: string;
}

export interface Question {
  id: string;
  collegeId: string;
  questionText: string;
  askedBy: string;
  date: string;
  answers: Answer[];
}

export interface CutoffData {
  collegeId: string;
  exam: 'JEE Main' | 'NEET' | 'CAT';
  course: string;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  quota: 'Home State' | 'All India';
  openingRank: number;
  closingRank: number;
}

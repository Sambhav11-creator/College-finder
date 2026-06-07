import { type College, type Review, type Question, type CutoffData } from '../types';

export const mockColleges: College[] = [
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology, Bombay',
    shortName: 'IIT Bombay',
    logo: 'IITB',
    bannerImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    location: 'Powai, Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    fees: 220000,
    rating: 4.8,
    type: 'Government',
    stream: 'Engineering',
    established: 1958,
    highestPackage: 150, // in LPA
    averagePackage: 23.5, // in LPA
    placementRate: 96,
    facilities: ['Hostel', 'Gym', 'Library', 'Wi-Fi', 'Cafeteria', 'Sports Complex', 'Hospital'],
    topCourses: [
      { name: 'B.Tech Computer Science & Engineering', fees: 228000, duration: '4 Years', intake: 120 },
      { name: 'B.Tech Electrical Engineering', fees: 228000, duration: '4 Years', intake: 80 },
      { name: 'B.Tech Mechanical Engineering', fees: 228000, duration: '4 Years', intake: 90 },
      { name: 'M.Tech Microelectronics', fees: 60000, duration: '2 Years', intake: 30 }
    ],
    rankings: [
      { body: 'NIRF Engineering 2025', rank: 3 },
      { body: 'QS World University Rankings 2026', rank: 118 },
      { body: 'India Today 2025', rank: 1 }
    ],
    description: 'Indian Institute of Technology Bombay is a premier public research university and engineering institution located in Powai, Mumbai. Established in 1958, it was the second IIT setup with assistance from UNESCO and the Soviet Union. IIT Bombay is highly regarded for its world-class research, stellar placement records, and vibrant campus culture including Mood Indigo, Asia\'s largest college festival.'
  },
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology, Delhi',
    shortName: 'IIT Delhi',
    logo: 'IITD',
    bannerImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    location: 'Hauz Khas, New Delhi, Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    fees: 225000,
    rating: 4.7,
    type: 'Government',
    stream: 'Engineering',
    established: 1961,
    highestPackage: 120,
    averagePackage: 21.9,
    placementRate: 94,
    facilities: ['Hostel', 'Gym', 'Library', 'Wi-Fi', 'Cafeteria', 'Sports Complex', 'Medical Centre'],
    topCourses: [
      { name: 'B.Tech Computer Science & Engineering', fees: 225000, duration: '4 Years', intake: 110 },
      { name: 'B.Tech Mathematics and Computing', fees: 225000, duration: '4 Years', intake: 60 },
      { name: 'B.Tech Chemical Engineering', fees: 225000, duration: '4 Years', intake: 85 }
    ],
    rankings: [
      { body: 'NIRF Engineering 2025', rank: 2 },
      { body: 'QS World University Rankings 2026', rank: 150 }
    ],
    description: 'IIT Delhi is a public technical and research university located in Hauz Khas in South Delhi. It is one of the oldest and most prestigious IITs in India, declared as an Institution of Eminence. The campus is known for its intense academic rigor, startup incubator ecosystem, and leading research in AI and nanotechnology.'
  },
  {
    id: 'bits-pilani',
    name: 'Birla Institute of Technology and Science, Pilani',
    shortName: 'BITS Pilani',
    logo: 'BITS',
    bannerImage: 'https://images.unsplash.com/photo-1607237138185-eedd996e5b09?auto=format&fit=crop&q=80&w=1200',
    location: 'Pilani, Rajasthan',
    city: 'Pilani',
    state: 'Rajasthan',
    fees: 540000,
    rating: 4.6,
    type: 'Private',
    stream: 'Engineering',
    established: 1964,
    highestPackage: 75,
    averagePackage: 18.2,
    placementRate: 92,
    facilities: ['Hostel', 'Gym', 'Library', 'Wi-Fi', 'Cafeteria', 'Sports Complex', 'Auditorium'],
    topCourses: [
      { name: 'B.E. Computer Science', fees: 560000, duration: '4 Years', intake: 150 },
      { name: 'B.E. Electronics & Communication', fees: 560000, duration: '4 Years', intake: 120 },
      { name: 'B.E. Mechanical Engineering', fees: 560000, duration: '4 Years', intake: 100 }
    ],
    rankings: [
      { body: 'NIRF Engineering 2025', rank: 20 },
      { body: 'India Today Private Eng 2025', rank: 1 }
    ],
    description: 'Birla Institute of Technology & Science, Pilani is a premier private deemed university. It has pioneered several initiatives like the practice school (internship) system and has a strict "no reservation" and "flexible curriculum" policy. BITS Pilani is famous for producing unicorn founders and having an extremely active alumni network.'
  },
  {
    id: 'nit-trichy',
    name: 'National Institute of Technology, Tiruchirappalli',
    shortName: 'NIT Trichy',
    logo: 'NITT',
    bannerImage: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1200',
    location: 'Tiruchirappalli, Tamil Nadu',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    fees: 145000,
    rating: 4.5,
    type: 'Government',
    stream: 'Engineering',
    established: 1964,
    highestPackage: 52,
    averagePackage: 15.6,
    placementRate: 90,
    facilities: ['Hostel', 'Gym', 'Library', 'Wi-Fi', 'Cafeteria', 'Sports Complex', 'Hospital'],
    topCourses: [
      { name: 'B.Tech Computer Science & Engineering', fees: 149000, duration: '4 Years', intake: 119 },
      { name: 'B.Tech Electronics & Communication Engineering', fees: 149000, duration: '4 Years', intake: 119 },
      { name: 'B.Tech Civil Engineering', fees: 149000, duration: '4 Years', intake: 110 }
    ],
    rankings: [
      { body: 'NIRF Engineering 2025', rank: 9 },
      { body: 'NIRF Overall 2025', rank: 21 }
    ],
    description: 'National Institute of Technology Tiruchirappalli is a public technical university in Tamil Nadu. It is consistently ranked as the #1 NIT in India. It is highly known for its excellent computing facilities, rich research atmosphere, and cultural festival Pragyan.'
  },
  {
    id: 'aiims-delhi',
    name: 'All India Institute of Medical Sciences, Delhi',
    shortName: 'AIIMS Delhi',
    logo: 'AIIMS',
    bannerImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200',
    location: 'Ansari Nagar, New Delhi, Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    fees: 1628, // Yes AIIMS fees are extremely low
    rating: 4.9,
    type: 'Government',
    stream: 'Medical',
    established: 1956,
    highestPackage: 35,
    averagePackage: 18.0,
    placementRate: 100,
    facilities: ['Hostel', 'Library', 'Hospital', 'Labs', 'Cafeteria', 'Gym', 'Sports Complex'],
    topCourses: [
      { name: 'MBBS (Bachelor of Medicine & Surgery)', fees: 1628, duration: '5.5 Years', intake: 125 },
      { name: 'B.Sc Nursing (Hons)', fees: 2000, duration: '4 Years', intake: 50 },
      { name: 'MD General Medicine', fees: 3000, duration: '3 Years', intake: 25 }
    ],
    rankings: [
      { body: 'NIRF Medical 2025', rank: 1 },
      { body: 'India Today Medical 2025', rank: 1 }
    ],
    description: 'AIIMS New Delhi is the apex medical institute of India. Established in 1956, it operates autonomously under the Ministry of Health and Family Welfare. It is renowned globally for its highly subsidized clinical services, state-of-the-art medical research, and extremely selective MBBS entrance admissions.'
  },
  {
    id: 'cmc-vellore',
    name: 'Christian Medical College, Vellore',
    shortName: 'CMC Vellore',
    logo: 'CMC',
    bannerImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
    location: 'Vellore, Tamil Nadu',
    city: 'Vellore',
    state: 'Tamil Nadu',
    fees: 52000,
    rating: 4.7,
    type: 'Private',
    stream: 'Medical',
    established: 1900,
    highestPackage: 24,
    averagePackage: 10.5,
    placementRate: 98,
    facilities: ['Hostel', 'Library', 'Hospital', 'Labs', 'Cafeteria', 'Wi-Fi', 'Sports Complex'],
    topCourses: [
      { name: 'MBBS', fees: 52000, duration: '5.5 Years', intake: 100 },
      { name: 'B.Sc Nursing', fees: 25000, duration: '4 Years', intake: 100 }
    ],
    rankings: [
      { body: 'NIRF Medical 2025', rank: 3 },
      { body: 'India Today Medical 2025', rank: 3 }
    ],
    description: 'Christian Medical College Vellore is a Christian minority-run private medical school and hospital. CMC Vellore has pioneered many medical achievements in India, including the first reconstructive surgery for leprosy, the first open-heart surgery, and the first kidney transplant.'
  },
  {
    id: 'mamc-delhi',
    name: 'Maulana Azad Medical College, Delhi',
    shortName: 'MAMC Delhi',
    logo: 'MAMC',
    bannerImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200',
    location: 'Bahadur Shah Zafar Marg, New Delhi, Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    fees: 15450,
    rating: 4.6,
    type: 'Government',
    stream: 'Medical',
    established: 1959,
    highestPackage: 30,
    averagePackage: 14.0,
    placementRate: 99,
    facilities: ['Hostel', 'Library', 'Hospital', 'Labs', 'Cafeteria', 'Auditorium'],
    topCourses: [
      { name: 'MBBS', fees: 15450, duration: '5.5 Years', intake: 250 },
      { name: 'MS General Surgery', fees: 20000, duration: '3 Years', intake: 40 }
    ],
    rankings: [
      { body: 'NIRF Medical 2025', rank: 24 },
      { body: 'India Today Medical 2025', rank: 4 }
    ],
    description: 'Maulana Azad Medical College is a government medical college in Delhi affiliated with the University of Delhi. Associated with four major hospitals (including Lok Nayak Hospital), it serves thousands of patients daily, providing its medical students with unparalleled clinical exposure.'
  },
  {
    id: 'iim-ahmedabad',
    name: 'Indian Institute of Management, Ahmedabad',
    shortName: 'IIM Ahmedabad',
    logo: 'IIMA',
    bannerImage: '/iim_ahmedabad.png',
    location: 'Vastrapur, Ahmedabad, Gujarat',
    city: 'Ahmedabad',
    state: 'Gujarat',
    fees: 1250000, // Annual fees (25L total approx)
    rating: 4.9,
    type: 'Government',
    stream: 'Management',
    established: 1961,
    highestPackage: 115,
    averagePackage: 34.3,
    placementRate: 100,
    facilities: ['Hostel', 'Gym', 'Library', 'Wi-Fi', 'Cafeteria', 'Sports Complex', 'Auditorium'],
    topCourses: [
      { name: 'Post Graduate Programme in Management (MBA)', fees: 1250000, duration: '2 Years', intake: 390 },
      { name: 'PGP in Food and Agri-Business Management', fees: 1100000, duration: '2 Years', intake: 50 }
    ],
    rankings: [
      { body: 'NIRF Management 2025', rank: 1 },
      { body: 'Financial Times Global MBA 2025', rank: 41 }
    ],
    description: 'IIM Ahmedabad is India\'s premier business school. Designed by famous architect Louis Kahn, the red-brick campus is renowned for its case-study pedagogy, extremely demanding academic environment, and producing eminent leaders in corporate, consulting, and finance sectors worldwide.'
  },
  {
    id: 'iim-bangalore',
    name: 'Indian Institute of Management, Bangalore',
    shortName: 'IIM Bangalore',
    logo: 'IIMB',
    bannerImage: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&q=80&w=1200',
    location: 'Bannerghatta Road, Bengaluru, Karnataka',
    city: 'Bengaluru',
    state: 'Karnataka',
    fees: 1225000,
    rating: 4.8,
    type: 'Government',
    stream: 'Management',
    established: 1973,
    highestPackage: 95,
    averagePackage: 33.1,
    placementRate: 100,
    facilities: ['Hostel', 'Gym', 'Library', 'Wi-Fi', 'Cafeteria', 'Sports Complex', 'Green Campus'],
    topCourses: [
      { name: 'Post Graduate Programme (MBA)', fees: 1225000, duration: '2 Years', intake: 410 },
      { name: 'Executive Post Graduate Programme (EPGP)', fees: 1500000, duration: '1 Year', intake: 75 }
    ],
    rankings: [
      { body: 'NIRF Management 2025', rank: 2 },
      { body: 'Financial Times Global MBA 2025', rank: 47 }
    ],
    description: 'IIM Bangalore is situated in the tech hub of India. The stone campus is highly renowned for its quantitative focus, management research center, and strong tie-ups with global tech firms, startups, and consulting groups.'
  },
  {
    id: 'xlri-jamshedpur',
    name: 'XLRI – Xavier School of Management',
    shortName: 'XLRI Jamshedpur',
    logo: 'XLRI',
    bannerImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200',
    location: 'Jamshedpur, Jharkhand',
    city: 'Jamshedpur',
    state: 'Jharkhand',
    fees: 1290000,
    rating: 4.7,
    type: 'Private',
    stream: 'Management',
    established: 1949,
    highestPackage: 78,
    averagePackage: 32.7,
    placementRate: 100,
    facilities: ['Hostel', 'Gym', 'Library', 'Wi-Fi', 'Cafeteria', 'Sports Complex', 'Auditorium'],
    topCourses: [
      { name: 'PGDM Business Management (BM)', fees: 1290000, duration: '2 Years', intake: 180 },
      { name: 'PGDM Human Resource Management (HRM)', fees: 1290000, duration: '2 Years', intake: 180 }
    ],
    rankings: [
      { body: 'NIRF Management 2025', rank: 9 },
      { body: 'India Today Private B-School 2025', rank: 1 }
    ],
    description: 'XLRI is the oldest business school in India, founded by Jesuit Fathers in Jamshedpur in 1949. It is widely recognized as the #1 institution in the Asia-Pacific region for Human Resource Management. Its BM and HRM programs are equivalent to MBA and are highly sought after by recruiters.'
  },
  {
    id: 'fms-delhi',
    name: 'Faculty of Management Studies, University of Delhi',
    shortName: 'FMS Delhi',
    logo: 'FMS',
    bannerImage: 'https://images.unsplash.com/photo-1541829019-259276a7f013?auto=format&fit=crop&q=80&w=1200',
    location: 'Malka Ganj, New Delhi, Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    fees: 10000, // Extremely high ROI
    rating: 4.7,
    type: 'Government',
    stream: 'Management',
    established: 1954,
    highestPackage: 58,
    averagePackage: 32.4,
    placementRate: 100,
    facilities: ['Library', 'Cafeteria', 'Wi-Fi', 'Hostel access', 'Seminar Rooms'],
    topCourses: [
      { name: 'MBA Full-Time', fees: 10000, duration: '2 Years', intake: 287 }
    ],
    rankings: [
      { body: 'India Today Government B-School 2025', rank: 2 },
      { body: 'Outlook MBA 2025', rank: 5 }
    ],
    description: 'Faculty of Management Studies is an academic department of the University of Delhi. FMS is affectionately known as the "Red Building of Dreams" and has the reputation of being the highest ROI business school in India, offering placements comparable to the top IIMs at a fraction of the cost.'
  },
  {
    id: 'kgmu-lucknow',
    name: 'King George\'s Medical University',
    shortName: 'KGMU Lucknow',
    logo: 'KGMU',
    bannerImage: 'https://images.unsplash.com/photo-1584515980181-b2586f069f2e?auto=format&fit=crop&q=80&w=1200',
    location: 'Chowk, Lucknow, Uttar Pradesh',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    fees: 54600,
    rating: 4.5,
    type: 'Government',
    stream: 'Medical',
    established: 1911,
    highestPackage: 20,
    averagePackage: 8.5,
    placementRate: 95,
    facilities: ['Hostel', 'Library', 'Hospital', 'Labs', 'Cafeteria', 'Wi-Fi', 'Sports Complex'],
    topCourses: [
      { name: 'MBBS', fees: 54600, duration: '5.5 Years', intake: 250 },
      { name: 'BDS (Bachelor of Dental Surgery)', fees: 50000, duration: '5 Years', intake: 70 }
    ],
    rankings: [
      { body: 'NIRF Medical 2025', rank: 12 },
      { body: 'India Today Medical 2025', rank: 7 }
    ],
    description: 'King George\'s Medical University is a historic state medical university in Lucknow, Uttar Pradesh. It was upgraded from the famous King George\'s Medical College. KGMU has a sprawling campus and a huge clinical intake capacity, providing students with intensive practical clinical learning.'
  },
  {
    id: 'iit-madras',
    name: 'Indian Institute of Technology, Madras',
    shortName: 'IIT Madras',
    logo: 'IITM',
    bannerImage: 'https://images.unsplash.com/photo-1590012314607-cda9d9b6a9a9?auto=format&fit=crop&q=80&w=1200',
    location: 'Adyar, Chennai, Tamil Nadu',
    city: 'Chennai',
    state: 'Tamil Nadu',
    fees: 215000,
    rating: 4.8,
    type: 'Government',
    stream: 'Engineering',
    established: 1959,
    highestPackage: 131,
    averagePackage: 22.4,
    placementRate: 95,
    facilities: ['Hostel', 'Gym', 'Library', 'Wi-Fi', 'Cafeteria', 'Sports Complex', 'Research Park'],
    topCourses: [
      { name: 'B.Tech Computer Science & Engineering', fees: 215000, duration: '4 Years', intake: 90 },
      { name: 'B.Tech Electrical Engineering', fees: 215000, duration: '4 Years', intake: 80 },
      { name: 'B.Tech Aerospace Engineering', fees: 215000, duration: '4 Years', intake: 50 }
    ],
    rankings: [
      { body: 'NIRF Engineering 2025', rank: 1 },
      { body: 'QS World University Rankings 2026', rank: 135 }
    ],
    description: 'IIT Madras is a premier public technical and research university located in Chennai, Tamil Nadu. Established in 1959 with German assistance, it is consistently ranked as the #1 engineering institution in India by the NIRF. The campus is a lush forest housing blackbucks and chital.'
  },
  {
    id: 'iim-calcutta',
    name: 'Indian Institute of Management, Calcutta',
    shortName: 'IIM Calcutta',
    logo: 'IIMC',
    bannerImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    location: 'Joka, Kolkata, West Bengal',
    city: 'Kolkata',
    state: 'West Bengal',
    fees: 1200000,
    rating: 4.8,
    type: 'Government',
    stream: 'Management',
    established: 1961,
    highestPackage: 110,
    averagePackage: 35.1,
    placementRate: 100,
    facilities: ['Hostel', 'Gym', 'Library', 'Wi-Fi', 'Cafeteria', 'Lakes', 'Auditorium'],
    topCourses: [
      { name: 'Post Graduate Programme in Management (MBA)', fees: 1200000, duration: '2 Years', intake: 462 }
    ],
    rankings: [
      { body: 'NIRF Management 2025', rank: 3 },
      { body: 'Financial Times Global MBA 2025', rank: 52 }
    ],
    description: 'IIM Calcutta is a public business school located in Joka, Kolkata. It was the first IIM established in India. It is globally recognized for its finance concentration, quantitative teaching rigor, and its picturesque campus with seven lakes.'
  },
  {
    id: 'jipmer-puducherry',
    name: 'Jawaharlal Institute of Postgraduate Medical Education and Research',
    shortName: 'JIPMER Puducherry',
    logo: 'JIPMER',
    bannerImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200',
    location: 'Gorimedu, Puducherry',
    city: 'Puducherry',
    state: 'Puducherry',
    fees: 12400,
    rating: 4.7,
    type: 'Government',
    stream: 'Medical',
    established: 1823,
    highestPackage: 22,
    averagePackage: 12.0,
    placementRate: 98,
    facilities: ['Hostel', 'Library', 'Hospital', 'Labs', 'Cafeteria', 'Wi-Fi', 'Sports Complex'],
    topCourses: [
      { name: 'MBBS (Bachelor of Medicine & Surgery)', fees: 12400, duration: '5.5 Years', intake: 150 },
      { name: 'MD Pediatrics', fees: 15000, duration: '3 Years', intake: 15 }
    ],
    rankings: [
      { body: 'NIRF Medical 2025', rank: 5 }
    ],
    description: 'JIPMER is one of the oldest medical institutions in India, traceably dating back to 1823. Upgraded to an Institution of National Importance, JIPMER offers premium medical education and highly subsidized clinical services to south India.'
  },
  {
    id: 'mdi-gurgaon',
    name: 'Management Development Institute, Gurgaon',
    shortName: 'MDI Gurgaon',
    logo: 'MDI',
    bannerImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200',
    location: 'Sukhrali, Gurugram, Haryana',
    city: 'Gurugram',
    state: 'Haryana',
    fees: 1170000,
    rating: 4.5,
    type: 'Private',
    stream: 'Management',
    established: 1972,
    highestPackage: 60,
    averagePackage: 27.2,
    placementRate: 100,
    facilities: ['Hostel', 'Gym', 'Library', 'Wi-Fi', 'Cafeteria', 'Sports Complex', 'Auditorium'],
    topCourses: [
      { name: 'Post Graduate Diploma in Management (PGDM)', fees: 1170000, duration: '2 Years', intake: 240 },
      { name: 'PGDM Human Resource Management', fees: 1170000, duration: '2 Years', intake: 60 }
    ],
    rankings: [
      { body: 'NIRF Management 2025', rank: 11 }
    ],
    description: 'MDI Gurgaon is a leading private business school. Established in 1972 in collaboration with UNDP, it is located in Gurgaon, India\'s corporate hub, providing students with exceptional placement opportunities and industrial exposure.'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    collegeId: 'iit-bombay',
    userName: 'Rohan Sharma',
    rating: 5,
    comment: 'The academic environment here is top-notch. Placements are unbelievable, especially in computer science. Campus life at Powai, beside the lake, is unforgettable.',
    category: 'Overall',
    date: '2026-03-12'
  },
  {
    id: 'r2',
    collegeId: 'iit-bombay',
    userName: 'Anjali Gupta',
    rating: 4,
    comment: 'Placements are excellent, almost 100% for CSE. The workload is very high, and competition can get highly stressful, but it\'s worth it.',
    category: 'Placements',
    date: '2026-02-28'
  },
  {
    id: 'r3',
    collegeId: 'bits-pilani',
    userName: 'Varun Verma',
    rating: 5,
    comment: 'The zero attendance policy gives you the freedom to pursue your startups and projects. Practice School 2 is a game changer, got a PPO at Google.',
    category: 'Overall',
    date: '2026-04-01'
  },
  {
    id: 'r4',
    collegeId: 'aiims-delhi',
    userName: 'Dr. Siddharth Sen',
    rating: 5,
    comment: 'Best medical college in the country. Fees are basically free. You get to witness cases you won\'t see anywhere else in India. The infrastructure is world-class.',
    category: 'Academics',
    date: '2026-05-15'
  },
  {
    id: 'r5',
    collegeId: 'iim-ahmedabad',
    userName: 'Meghna Roy',
    rating: 5,
    comment: 'The case-study method really transforms your mindset. Placements are premium—top McKinsey, BCG, Goldman Sachs, and PE firms recruit here. Very stressful but rewarding.',
    category: 'Placements',
    date: '2026-01-20'
  },
  {
    id: 'r6',
    collegeId: 'fms-delhi',
    userName: 'Aditya Raj',
    rating: 5,
    comment: 'Paying 20k for an MBA and getting a 32 LPA package is the definition of high ROI. FMS has an incredible culture, close-knit batch size, and excellent placements.',
    category: 'Infrastructure',
    date: '2026-04-18'
  },
  {
    id: 'r7',
    collegeId: 'iit-madras',
    userName: 'Karthik Raja',
    rating: 5,
    comment: 'IIT Madras provides the best research facilities. The research park is a goldmine for tech startups, and coding culture here is extremely strong.',
    category: 'Overall',
    date: '2026-03-24'
  },
  {
    id: 'r8',
    collegeId: 'iim-calcutta',
    userName: 'Debolina Ghosh',
    rating: 5,
    comment: 'Joka is beautiful with its lakes. The math and stats classes are hard, but the finance placements are absolute elite. Standard Joka spirit is unbeatable.',
    category: 'Academics',
    date: '2026-04-15'
  }
];

export const mockQuestions: Question[] = [
  {
    id: 'q1',
    collegeId: 'iit-bombay',
    questionText: 'What is the safe rank in JEE Advanced to get Computer Science in IIT Bombay?',
    askedBy: 'Sameer Sen',
    date: '2026-05-10',
    answers: [
      {
        id: 'a1',
        answerText: 'For the General Category, you generally need a rank under 60-65 in JEE Advanced to get Computer Science at IIT Bombay. For OBC, it is under 50 category rank.',
        answeredBy: 'Rahul Verma (Alumni)',
        date: '2026-05-12'
      }
    ]
  },
  {
    id: 'q2',
    collegeId: 'bits-pilani',
    questionText: 'How is the hostel facility and mess food at BITS Pilani?',
    askedBy: 'Devanshu M.',
    date: '2026-05-22',
    answers: [
      {
        id: 'a2',
        answerText: 'Hostels are single occupancy for senior years, which is great. Mess food is decent compared to other Indian engineering colleges. Multiple options are available.',
        answeredBy: 'Sneha Rao (3rd Year Student)',
        date: '2026-05-23'
      }
    ]
  },
  {
    id: 'q3',
    collegeId: 'iim-ahmedabad',
    questionText: 'What profile score is needed to get an interview call from IIM Ahmedabad for General Category?',
    askedBy: 'Amit Patel',
    date: '2026-04-02',
    answers: [
      {
        id: 'a3',
        answerText: 'You typically need a 99.6+ percentile in CAT along with stellar academics (90%+ in 10th, 12th, and graduation) to secure an interview. Non-engineers can get calls at slightly lower percentiles like 99.2+.',
        answeredBy: 'Karan Mehra (MBA 2025)',
        date: '2026-04-03'
      }
    ]
  },
  {
    id: 'q4',
    collegeId: 'jipmer-puducherry',
    questionText: 'What is the cutoff rank in NEET for Puducherry residents to get JIPMER?',
    askedBy: 'Sanjay Kumar',
    date: '2026-05-18',
    answers: [
      {
        id: 'a4',
        answerText: 'For Puducherry residents under the state quota, a rank under 5,000 to 8,000 can fetch a seat. For All India quota, you need a rank under 250-300.',
        answeredBy: 'Priya R. (MBBS Intern)',
        date: '2026-05-19'
      }
    ]
  }
];

export const mockCutoffs: CutoffData[] = [
  // --- JEE Main Cutoffs (For Government/Private Engineering Colleges in JEE Main predictor) ---
  // NIT Trichy
  { collegeId: 'nit-trichy', exam: 'JEE Main', course: 'Computer Science & Engineering', category: 'General', quota: 'All India', openingRank: 1, closingRank: 1500 },
  { collegeId: 'nit-trichy', exam: 'JEE Main', course: 'Computer Science & Engineering', category: 'General', quota: 'Home State', openingRank: 100, closingRank: 4200 },
  { collegeId: 'nit-trichy', exam: 'JEE Main', course: 'Computer Science & Engineering', category: 'OBC', quota: 'All India', openingRank: 200, closingRank: 800 },
  { collegeId: 'nit-trichy', exam: 'JEE Main', course: 'Computer Science & Engineering', category: 'SC', quota: 'All India', openingRank: 50, closingRank: 300 },
  { collegeId: 'nit-trichy', exam: 'JEE Main', course: 'Electronics & Communication Engineering', category: 'General', quota: 'All India', openingRank: 1200, closingRank: 3500 },
  { collegeId: 'nit-trichy', exam: 'JEE Main', course: 'Electronics & Communication Engineering', category: 'General', quota: 'Home State', openingRank: 2000, closingRank: 7500 },
  { collegeId: 'nit-trichy', exam: 'JEE Main', course: 'Civil Engineering', category: 'General', quota: 'All India', openingRank: 8000, closingRank: 20000 },
  
  // IIT Delhi (Cutoffs map to JEE Advanced ranks)
  { collegeId: 'iit-delhi', exam: 'JEE Main', course: 'Computer Science & Engineering', category: 'General', quota: 'All India', openingRank: 1, closingRank: 200 },
  { collegeId: 'iit-delhi', exam: 'JEE Main', course: 'Mathematics and Computing', category: 'General', quota: 'All India', openingRank: 100, closingRank: 500 },
  { collegeId: 'iit-delhi', exam: 'JEE Main', course: 'Chemical Engineering', category: 'General', quota: 'All India', openingRank: 1200, closingRank: 3200 },

  // IIT Bombay
  { collegeId: 'iit-bombay', exam: 'JEE Main', course: 'Computer Science & Engineering', category: 'General', quota: 'All India', openingRank: 1, closingRank: 80 },
  { collegeId: 'iit-bombay', exam: 'JEE Main', course: 'Electrical Engineering', category: 'General', quota: 'All India', openingRank: 81, closingRank: 450 },
  { collegeId: 'iit-bombay', exam: 'JEE Main', course: 'Mechanical Engineering', category: 'General', quota: 'All India', openingRank: 400, closingRank: 1500 },

  // BITS Pilani (Uses BITS Score as metric out of 390)
  { collegeId: 'bits-pilani', exam: 'JEE Main', course: 'Computer Science', category: 'General', quota: 'All India', openingRank: 10, closingRank: 1200 },
  { collegeId: 'bits-pilani', exam: 'JEE Main', course: 'Electronics & Communication', category: 'General', quota: 'All India', openingRank: 1000, closingRank: 4000 },
  { collegeId: 'bits-pilani', exam: 'JEE Main', course: 'Mechanical Engineering', category: 'General', quota: 'All India', openingRank: 3500, closingRank: 10000 },

  // --- NEET Cutoffs (For Medical Colleges) ---
  // AIIMS Delhi
  { collegeId: 'aiims-delhi', exam: 'NEET', course: 'MBBS', category: 'General', quota: 'All India', openingRank: 1, closingRank: 60 },
  { collegeId: 'aiims-delhi', exam: 'NEET', course: 'MBBS', category: 'OBC', quota: 'All India', openingRank: 10, closingRank: 250 },
  { collegeId: 'aiims-delhi', exam: 'NEET', course: 'MBBS', category: 'SC', quota: 'All India', openingRank: 5, closingRank: 1200 },
  { collegeId: 'aiims-delhi', exam: 'NEET', course: 'MBBS', category: 'ST', quota: 'All India', openingRank: 20, closingRank: 3000 },
  { collegeId: 'aiims-delhi', exam: 'NEET', course: 'MD General Medicine', category: 'General', quota: 'All India', openingRank: 1, closingRank: 15 },

  // MAMC Delhi
  { collegeId: 'mamc-delhi', exam: 'NEET', course: 'MBBS', category: 'General', quota: 'All India', openingRank: 20, closingRank: 350 },
  { collegeId: 'mamc-delhi', exam: 'NEET', course: 'MBBS', category: 'General', quota: 'Home State', openingRank: 50, closingRank: 1800 },
  { collegeId: 'mamc-delhi', exam: 'NEET', course: 'MBBS', category: 'OBC', quota: 'All India', openingRank: 100, closingRank: 1200 },
  
  // CMC Vellore
  { collegeId: 'cmc-vellore', exam: 'NEET', course: 'MBBS', category: 'General', quota: 'All India', openingRank: 10, closingRank: 800 },
  { collegeId: 'cmc-vellore', exam: 'NEET', course: 'MBBS', category: 'General', quota: 'Home State', openingRank: 100, closingRank: 5000 },

  // KGMU Lucknow
  { collegeId: 'kgmu-lucknow', exam: 'NEET', course: 'MBBS', category: 'General', quota: 'All India', openingRank: 50, closingRank: 1500 },
  { collegeId: 'kgmu-lucknow', exam: 'NEET', course: 'MBBS', category: 'General', quota: 'Home State', openingRank: 200, closingRank: 4200 },
  { collegeId: 'kgmu-lucknow', exam: 'NEET', course: 'BDS', category: 'General', quota: 'All India', openingRank: 1000, closingRank: 18000 },

  // --- CAT Percentile Cutoffs (For Management. Ranks are seeded as percentile scaled equivalent e.g., 99 percentile ~ 1000 rank) ---
  // In our predictor we accept ranks. For MBA: CAT percentiles are entered as rank equivalents:
  // e.g. Rank 990 = 99.0 Percentile, Rank 999 = 99.9 Percentile, Rank 900 = 90.0 Percentile.
  // We will build the UI so they enter Percentile directly (e.g. 99.5) and the predictor maps it.
  { collegeId: 'iim-ahmedabad', exam: 'CAT', course: 'PGP Management (MBA)', category: 'General', quota: 'All India', openingRank: 9960, closingRank: 10000 }, // closing percentile: 99.6
  { collegeId: 'iim-ahmedabad', exam: 'CAT', course: 'PGP Management (MBA)', category: 'OBC', quota: 'All India', openingRank: 9750, closingRank: 10000 }, // 97.5
  { collegeId: 'iim-ahmedabad', exam: 'CAT', course: 'PGP Management (MBA)', category: 'SC', quota: 'All India', openingRank: 9400, closingRank: 10000 }, // 94.0

  { collegeId: 'iim-bangalore', exam: 'CAT', course: 'PGP Management (MBA)', category: 'General', quota: 'All India', openingRank: 9900, closingRank: 10000 }, // 99.0
  { collegeId: 'iim-bangalore', exam: 'CAT', course: 'PGP Management (MBA)', category: 'OBC', quota: 'All India', openingRank: 9650, closingRank: 10000 }, // 96.5

  { collegeId: 'xlri-jamshedpur', exam: 'CAT', course: 'PGDM BM', category: 'General', quota: 'All India', openingRank: 9600, closingRank: 10000 }, // 96.0 (XLRI uses XAT, but CAT mapped for sim)
  { collegeId: 'xlri-jamshedpur', exam: 'CAT', course: 'PGDM HRM', category: 'General', quota: 'All India', openingRank: 9400, closingRank: 10000 }, // 94.0

  { collegeId: 'fms-delhi', exam: 'CAT', course: 'MBA Full-Time', category: 'General', quota: 'All India', openingRank: 9850, closingRank: 10000 }, // 98.5
  { collegeId: 'fms-delhi', exam: 'CAT', course: 'MBA Full-Time', category: 'OBC', quota: 'All India', openingRank: 9500, closingRank: 10000 }, // 95.0

  // IIT Madras (Cutoffs map to JEE Advanced ranks)
  { collegeId: 'iit-madras', exam: 'JEE Main', course: 'Computer Science & Engineering', category: 'General', quota: 'All India', openingRank: 1, closingRank: 140 },
  { collegeId: 'iit-madras', exam: 'JEE Main', course: 'Electrical Engineering', category: 'General', quota: 'All India', openingRank: 150, closingRank: 900 },
  { collegeId: 'iit-madras', exam: 'JEE Main', course: 'Aerospace Engineering', category: 'General', quota: 'All India', openingRank: 800, closingRank: 3500 },

  // JIPMER Puducherry Cutoffs
  { collegeId: 'jipmer-puducherry', exam: 'NEET', course: 'MBBS', category: 'General', quota: 'All India', openingRank: 1, closingRank: 250 },
  { collegeId: 'jipmer-puducherry', exam: 'NEET', course: 'MBBS', category: 'General', quota: 'Home State', openingRank: 50, closingRank: 6500 },

  // IIM Calcutta CAT Cutoffs
  { collegeId: 'iim-calcutta', exam: 'CAT', course: 'PGP Management (MBA)', category: 'General', quota: 'All India', openingRank: 9960, closingRank: 10000 }, // 99.6%

  // MDI Gurgaon CAT Cutoffs
  { collegeId: 'mdi-gurgaon', exam: 'CAT', course: 'PGDM Management (MBA)', category: 'General', quota: 'All India', openingRank: 9700, closingRank: 10000 } // 97.0%
];

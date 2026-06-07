import React from 'react';
import { type College } from '../../types';
import { BookOpen } from 'lucide-react';

interface TabCoursesProps {
  college: College;
}

export const TabCourses: React.FC<TabCoursesProps> = ({ college }) => {
  
  const formatFees = (val: number) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakhs/Yr`;
    }
    return `₹${val.toLocaleString()}/Yr`;
  };

  return (
    <div className="courses-tab-container animate-fade-in">
      <div className="courses-card glass-panel">
        <div className="courses-header">
          <BookOpen className="courses-header-icon" />
          <h3>Offered Courses, Fees & Seats</h3>
        </div>
        
        <div className="table-responsive">
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Annual Fees</th>
                <th>Seat Intake</th>
              </tr>
            </thead>
            <tbody>
              {college.topCourses.map((course, idx) => (
                <tr key={idx}>
                  <td className="course-name-cell">{course.name}</td>
                  <td>{course.duration}</td>
                  <td className="course-fee-cell">{formatFees(course.fees)}</td>
                  <td className="course-intake-cell">{course.intake} seats</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .courses-tab-container {
          width: 100%;
        }
        .courses-card {
          padding: 1.75rem;
          border-radius: var(--radius-md);
        }
        .courses-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .courses-header-icon {
          color: var(--color-primary);
        }
        .courses-card h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }
        .courses-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
        }
        .courses-table th {
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 2px solid var(--border-light);
          padding: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .courses-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-light);
          color: var(--text-secondary);
        }
        .courses-table tbody tr:hover {
          background: rgba(255, 255, 255, 0.01);
        }
        .course-name-cell {
          font-weight: 600;
          color: var(--text-primary);
        }
        .course-fee-cell {
          font-weight: 700;
          color: #a5b4fc;
        }
        .course-intake-cell {
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

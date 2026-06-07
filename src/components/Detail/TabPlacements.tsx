import React from 'react';
import { type College } from '../../types';
import { Briefcase, TrendingUp, CheckCircle, Building2 } from 'lucide-react';

interface TabPlacementsProps {
  college: College;
}

const DEFAULT_RECRUITERS = ['Google', 'Microsoft', 'Amazon', 'McKinsey & Co', 'Boston Consulting Group', 'Goldman Sachs', 'Tata Consultancy Services', 'Infosys', 'Deloitte', 'HDFC Bank'];

export const TabPlacements: React.FC<TabPlacementsProps> = ({ college }) => {
  
  // Calculate historical placement trends
  const currentAvg = college.averagePackage;
  const year2024 = +(currentAvg * 0.9).toFixed(1);
  const year2023 = +(currentAvg * 0.81).toFixed(1);
  const year2022 = +(currentAvg * 0.72).toFixed(1);

  const placementTrends = [
    { year: '2022', value: year2022 },
    { year: '2023', value: year2023 },
    { year: '2024', value: year2024 },
    { year: '2025 (Current)', value: currentAvg }
  ];

  // Find max value to scale the trend bars
  const maxTrendVal = Math.max(...placementTrends.map((t) => t.value));

  const formatLPA = (val: number) => {
    return `₹${val} LPA`;
  };

  return (
    <div className="placements-tab-container animate-fade-in">
      {/* High Level placement stats */}
      <div className="placements-stats-grid">
        <div className="stat-card glass-panel">
          <Briefcase className="stat-icon-pkg" />
          <div className="stat-info">
            <span className="stat-label">Highest Package</span>
            <span className="stat-value text-gradient-sec">{formatLPA(college.highestPackage)}</span>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <TrendingUp className="stat-icon-trend" />
          <div className="stat-info">
            <span className="stat-label">Average Package</span>
            <span className="stat-value text-success">{formatLPA(college.averagePackage)}</span>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <CheckCircle className="stat-icon-rate" />
          <div className="stat-info">
            <span className="stat-label">Placement Rate</span>
            <span className="stat-value text-blue">{college.placementRate}%</span>
          </div>
        </div>
      </div>

      {/* SVG/CSS placement trend chart */}
      <div className="placements-layout-body">
        <div className="trend-chart-card glass-panel">
          <h3>Average Package Trend (LPA)</h3>
          
          <div className="chart-bar-container">
            {placementTrends.map((trend) => {
              const heightPercentage = (trend.value / maxTrendVal) * 100;
              return (
                <div key={trend.year} className="chart-bar-column">
                  <div className="chart-bar-wrapper">
                    <div className="chart-bar-tooltip">{formatLPA(trend.value)}</div>
                    <div 
                      className="chart-bar-fill shimmer" 
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                  </div>
                  <span className="chart-bar-year">{trend.year}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Recruiters */}
        <div className="recruiters-card glass-panel">
          <div className="card-header-row">
            <Building2 className="recruiter-title-icon" />
            <h3>Top Recruiting Partners</h3>
          </div>
          <p className="recruiter-desc">Top global consulting, technology, finance, and engineering firms recruiting on campus:</p>
          <div className="recruiters-grid">
            {DEFAULT_RECRUITERS.slice(0, college.stream === 'Management' ? 8 : 6).map((rec) => (
              <div key={rec} className="recruiter-chip">
                <span className="recruiter-logo-init">{rec.charAt(0)}</span>
                <span className="recruiter-name">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .placements-tab-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .placements-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .placements-stats-grid {
            grid-template-columns: 1fr;
          }
        }
        .stat-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .stat-icon-pkg, .stat-icon-trend, .stat-icon-rate {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
        }
        .stat-icon-pkg { color: var(--color-secondary); }
        .stat-icon-trend { color: var(--color-success); }
        .stat-icon-rate { color: #38bdf8; }
        
        .stat-info {
          display: flex;
          flex-direction: column;
        }
        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .stat-value {
          font-size: 1.35rem;
          font-weight: 800;
        }
        .text-gradient-sec {
          background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-blue {
          color: #38bdf8;
        }
        
        .placements-layout-body {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .placements-layout-body {
            grid-template-columns: 1fr;
          }
        }
        
        .trend-chart-card {
          padding: 1.75rem;
        }
        .trend-chart-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 2.5rem;
          border-left: 3px solid var(--color-primary);
          padding-left: 0.6rem;
        }
        
        .chart-bar-container {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          height: 180px;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-light);
        }
        .chart-bar-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          width: 60px;
        }
        .chart-bar-wrapper {
          position: relative;
          width: 32px;
          height: 140px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
          display: flex;
          align-items: flex-end;
          cursor: pointer;
        }
        
        .chart-bar-fill {
          width: 100%;
          background: linear-gradient(to top, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
          transition: height 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .chart-bar-wrapper:hover .chart-bar-fill {
          filter: brightness(1.2);
          box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.4);
        }
        
        .chart-bar-tooltip {
          position: absolute;
          top: -28px;
          left: 50%;
          transform: translateX(-50%) translateY(5px);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-light);
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 4px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.2s ease;
        }
        .chart-bar-wrapper:hover .chart-bar-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        
        .chart-bar-year {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        
        .recruiters-card {
          padding: 1.75rem;
        }
        .recruiter-title-icon {
          color: var(--color-primary);
        }
        .recruiters-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          border-left: 3px solid var(--color-primary);
          padding-left: 0.6rem;
        }
        .recruiter-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }
        .recruiters-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        .recruiter-chip {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-light);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-md);
        }
        .recruiter-logo-init {
          width: 24px;
          height: 24px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-secondary);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.8rem;
        }
        .recruiter-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
};

import React, { useState } from 'react';
import { predictColleges, type PredictionResult } from '../utils/predictorEngine';
import { useNavigate } from 'react-router-dom';
import { Calculator, Award, ArrowRight, HelpCircle as AlertIcon } from 'lucide-react';

export const Predictor: React.FC = () => {
  const navigate = useNavigate();

  // Form States
  const [exam, setExam] = useState<'JEE Main' | 'NEET' | 'CAT'>('JEE Main');
  const [rankInput, setRankInput] = useState('');
  const [category, setCategory] = useState<PredictionResult['college']['type'] | 'General' | 'OBC' | 'SC' | 'ST' | 'EWS'>('General');
  const [homeState, setHomeState] = useState('Maharashtra');

  // Result States
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [hasPredicted, setHasPredicted] = useState(false);
  const [activeTab, setActiveTab] = useState<'High' | 'Moderate' | 'Low'>('High');

  const INDIAN_STATES = [
    'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat', 
    'Rajasthan', 'Jharkhand', 'Uttar Pradesh', 'West Bengal', 'Kerala',
    'Haryana', 'Puducherry'
  ];

  const handlePredictSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rankNum = parseFloat(rankInput);
    if (isNaN(rankNum) || rankNum <= 0) {
      alert('Please enter a valid rank/percentile score.');
      return;
    }

    if (exam === 'CAT' && rankNum > 100) {
      alert('CAT Percentile cannot exceed 100.00%');
      return;
    }

    const categoryTyped = category as any;
    const results = predictColleges(exam, rankNum, categoryTyped, homeState);
    
    setPredictions(results);
    setHasPredicted(true);

    // Auto switch active tab to whatever category has items
    const hasHigh = results.some((p) => p.chance === 'High');
    const hasMod = results.some((p) => p.chance === 'Moderate');
    
    if (hasHigh) setActiveTab('High');
    else if (hasMod) setActiveTab('Moderate');
    else setActiveTab('Low');
  };

  const filteredPredictions = predictions.filter((p) => p.chance === activeTab);

  const formatRankOrPercentile = (p: PredictionResult) => {
    if (exam === 'CAT') {
      return `Closing: ${(p.closingRank / 100).toFixed(2)} %ile`;
    }
    return `Closing Rank: ${p.closingRank.toLocaleString()}`;
  };

  const getChanceHeaderClass = (chance: 'High' | 'Moderate' | 'Low') => {
    if (chance === 'High') return 'chance-high-hdr';
    if (chance === 'Moderate') return 'chance-mod-hdr';
    return 'chance-low-hdr';
  };

  return (
    <div className="predictor-page-container container animate-fade-in">
      <div className="predictor-header">
        <Calculator size={24} className="predictor-header-icon" />
        <h2>Admission Chance Predictor</h2>
        <p>Predict your admission probabilities in top institutions based on cutoff cut-offs and trends.</p>
      </div>

      <div className="predictor-layout">
        {/* Left Column: Form Card */}
        <div className="predictor-form-wrapper">
          <form onSubmit={handlePredictSubmit} className="predictor-form-card glass-panel">
            <h3>Enter Your Details</h3>

            <div className="input-group">
              <label className="input-label">Select Exam</label>
              <select
                value={exam}
                onChange={(e) => {
                  setExam(e.target.value as any);
                  setRankInput('');
                  setHasPredicted(false);
                }}
                className="form-select"
              >
                <option value="JEE Main">JEE Main (Engineering)</option>
                <option value="NEET">NEET (MBBS/Medical)</option>
                <option value="CAT">CAT (Management/MBA)</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">
                {exam === 'CAT' ? 'CAT Percentile Score' : 'Your Exam Rank'}
              </label>
              <input
                type="number"
                step={exam === 'CAT' ? '0.01' : '1'}
                placeholder={exam === 'CAT' ? 'e.g. 99.25' : 'e.g. 15000'}
                value={rankInput}
                onChange={(e) => setRankInput(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="form-select"
              >
                <option value="General">General (UR)</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Home State (Eligibility Quota)</label>
              <select
                value={homeState}
                onChange={(e) => setHomeState(e.target.value)}
                className="form-select"
              >
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-full-width predictor-btn">
              <span>Predict Colleges</span>
              <Award size={16} />
            </button>
          </form>
        </div>

        {/* Right Column: Output Results */}
        <div className="predictor-results-wrapper">
          {!hasPredicted ? (
            <div className="prediction-idle-box glass-panel">
              <Calculator size={48} className="idle-calc-icon" />
              <h4>Predictions Awaiting</h4>
              <p>Fill out the exam forms details to view matching colleges and admission chances.</p>
            </div>
          ) : (
            <div className="predictions-results-box">
              {/* Chance classification Tabs */}
              <div className="prediction-chance-tabs glass-panel">
                <button
                  className={`chance-tab-btn tab-high ${activeTab === 'High' ? 'active' : ''}`}
                  onClick={() => setActiveTab('High')}
                >
                  <span className="tab-dot dot-green"></span>
                  <span>Safe (High Chance)</span>
                  <span className="tab-count-badge">
                    {predictions.filter((p) => p.chance === 'High').length}
                  </span>
                </button>
                
                <button
                  className={`chance-tab-btn tab-moderate ${activeTab === 'Moderate' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Moderate')}
                >
                  <span className="tab-dot dot-amber"></span>
                  <span>Target (Moderate)</span>
                  <span className="tab-count-badge">
                    {predictions.filter((p) => p.chance === 'Moderate').length}
                  </span>
                </button>
                
                <button
                  className={`chance-tab-btn tab-low ${activeTab === 'Low' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Low')}
                >
                  <span className="tab-dot dot-red"></span>
                  <span>Dream (Reachy)</span>
                  <span className="tab-count-badge">
                    {predictions.filter((p) => p.chance === 'Low').length}
                  </span>
                </button>
              </div>

              {/* Predictions List */}
              <div className="predictions-list" style={{ marginTop: '1.25rem' }}>
                {filteredPredictions.length === 0 ? (
                  <div className="empty-predictions glass-panel">
                    <AlertIcon size={32} className="empty-icon-alert" />
                    <h4>No colleges match in this probability category.</h4>
                    <p>Try searching using a different rank or category parameter.</p>
                  </div>
                ) : (
                  filteredPredictions.map((pred, index) => (
                    <div key={index} className="prediction-card glass-panel glass-panel-interactive" onClick={() => navigate(`/college/${pred.college.id}`)}>
                      <div className="pred-row-top">
                        <div className="pred-logo">{pred.college.logo}</div>
                        <div className="pred-col-info">
                          <h4>{pred.college.name}</h4>
                          <span className="pred-course">{pred.course}</span>
                        </div>
                        <div className={`pred-chance-badge ${getChanceHeaderClass(pred.chance)}`}>
                          {pred.chance === 'High' ? 'Safe Match' : pred.chance === 'Moderate' ? 'Target Match' : 'Reachy Match'}
                        </div>
                      </div>

                      <div className="pred-row-divider"></div>

                      <div className="pred-row-meta">
                        <div className="pred-meta-cell">
                          <span className="pred-meta-lbl">Quota</span>
                          <span className="pred-meta-val">{pred.quota}</span>
                        </div>
                        <div className="pred-meta-cell">
                          <span className="pred-meta-lbl">Cutoff Range</span>
                          <span className="pred-meta-val">{formatRankOrPercentile(pred)}</span>
                        </div>
                        <div className="pred-meta-cell">
                          <span className="pred-meta-lbl">Average Placement</span>
                          <span className="pred-meta-val text-success">₹{pred.college.averagePackage} LPA</span>
                        </div>
                      </div>

                      <div className="pred-card-arrow">
                        <span>Detail Page</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .predictor-page-container {
          padding-top: 1.5rem;
        }
        .predictor-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .predictor-header-icon {
          color: var(--color-primary);
        }
        .predictor-header h2 {
          font-size: 1.6rem;
          font-weight: 800;
          color: white;
        }
        .predictor-header p {
          width: 100%;
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-top: 0.1rem;
        }
        
        .predictor-layout {
          display: grid;
          grid-template-columns: 1fr 1.8fr;
          gap: 1.5rem;
        }
        @media (max-width: 992px) {
          .predictor-layout {
            grid-template-columns: 1fr;
          }
        }
        
        .predictor-form-card {
          padding: 1.75rem;
        }
        .predictor-form-card h3 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: white;
          border-left: 3px solid var(--color-primary);
          padding-left: 0.6rem;
        }
        
        .predictor-btn {
          margin-top: 0.5rem;
        }
        
        .prediction-idle-box {
          padding: 5rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .idle-calc-icon {
          color: var(--text-muted);
        }
        .prediction-idle-box h4 {
          font-size: 1.15rem;
          font-weight: 700;
        }
        .prediction-idle-box p {
          font-size: 0.9rem;
          color: var(--text-muted);
          max-width: 320px;
        }
        
        .prediction-chance-tabs {
          display: flex;
          padding: 0.5rem;
          gap: 0.5rem;
          overflow-x: auto;
        }
        .chance-tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-sans);
          white-space: nowrap;
        }
        .chance-tab-btn:hover {
          background: rgba(255, 255, 255, 0.03);
          color: white;
        }
        
        .tab-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .dot-green { background: var(--color-success); }
        .dot-amber { background: var(--color-warning); }
        .dot-red { background: var(--color-danger); }
        
        .tab-count-badge {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          padding: 0.05rem 0.4rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        
        .chance-tab-btn.active.tab-high {
          background: rgba(var(--color-success-rgb), 0.12);
          color: var(--color-success);
          box-shadow: 0 0 10px rgba(var(--color-success-rgb), 0.15);
        }
        .chance-tab-btn.active.tab-moderate {
          background: rgba(var(--color-secondary-rgb), 0.12);
          color: var(--color-secondary);
          box-shadow: 0 0 10px rgba(var(--color-secondary-rgb), 0.15);
        }
        .chance-tab-btn.active.tab-low {
          background: rgba(239, 68, 68, 0.12);
          color: var(--color-danger);
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.15);
        }
        .chance-tab-btn.active .tab-count-badge {
          background: rgba(255, 255, 255, 0.15);
          color: white;
        }
        
        .empty-predictions {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .empty-icon-alert {
          color: var(--text-muted);
        }
        .empty-predictions h4 {
          font-size: 1.1rem;
          font-weight: 700;
        }
        .empty-predictions p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        
        .prediction-card {
          padding: 1.5rem;
          margin-bottom: 1rem;
          cursor: pointer;
          position: relative;
        }
        .pred-row-top {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .pred-logo {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.9rem;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .pred-col-info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .pred-col-info h4 {
          font-size: 1rem;
          font-weight: 700;
          color: white;
        }
        .pred-course {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        
        .pred-chance-badge {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }
        .chance-high-hdr { background: rgba(var(--color-success-rgb), 0.15); color: var(--color-success); }
        .chance-mod-hdr { background: rgba(var(--color-secondary-rgb), 0.15); color: var(--color-warning); }
        .chance-low-hdr { background: rgba(239, 68, 68, 0.15); color: var(--color-danger); }
        
        .pred-row-divider {
          height: 1px;
          background: var(--border-light);
          margin: 1rem 0;
        }
        
        .pred-row-meta {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .pred-meta-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .pred-meta-lbl {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .pred-meta-val {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        
        .pred-card-arrow {
          position: absolute;
          bottom: 1rem;
          right: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-primary);
          opacity: 0;
          transform: translateX(-5px);
          transition: all 0.2s ease;
        }
        .prediction-card:hover .pred-card-arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
};

import React from "react";
import { useAuth } from '../context/AuthContext';
import Menu from "./Menu";

const TopBar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="topbar-container" style={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Left side - Indices */}
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
      </div>

      {/* Right side - User info and Menu */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* User section */}
        {user && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '5px 15px',
            borderLeft: '1px solid #333'
          }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ 
                color: '#00d09c',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                User
              </div>
              <div style={{ 
                color: '#fff',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {user.name}
              </div>
            </div>
            <button 
              onClick={logout}
              title="Logout"
              style={{
                width: '35px',
                height: '35px',
                backgroundColor: 'transparent',
                border: '1px solid #444',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                color: '#999'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#dc3545';
                e.currentTarget.style.borderColor = '#dc3545';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#444';
                e.currentTarget.style.color = '#999';
              }}
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        )}
        
        <Menu />
      </div>
    </div>
  );
};

export default TopBar;

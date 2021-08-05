import React from 'react';
import Logout from '../logout/logout.component';

import './topBar.styles.css';

function TopBar() {
  return (
    <div className="top-bar">
      <Logout />
    </div>
  );
}

export default TopBar;
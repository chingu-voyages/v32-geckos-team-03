import React from 'react';

import './logout.styles.css';

function Logout() {
  return ( 
    <div className="logout">
      <a href="/logout" className="logout-btn">Logout</a>
    </div>
   );
}
 
export default Logout;
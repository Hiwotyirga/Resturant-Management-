import React from 'react';
import { Link } from 'react-router-dom';
import { BellOutlined } from '@ant-design/icons';

const NotificationBell = ({ count, onClick }) => {
  
  return (
    <div style={{ position: 'relative' }} onClick={onClick}>
      
      <Link to="/staffList"><BellOutlined/></Link>
      {count > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-10px',
            background: 'red',
            borderRadius: '50%',
            padding: '4px',
            color: 'white',
            fontSize: '12px',
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;

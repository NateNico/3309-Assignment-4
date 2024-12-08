import React, { useState } from 'react'; 
import { UserAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = UserAuth();
  const [showEmail, setShowEmail] = useState(false);

  const handleIconClick = () => {
    setShowEmail((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white-100">
      {/* Both the title and the account icon have been removed */}
    </div>
  );
};

export default Header;




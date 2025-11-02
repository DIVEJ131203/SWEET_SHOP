import React from 'react';
import { LogOut, User, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onAddSweet }) => {
  const { user, logout } = useAuth();

  return (
    
      
        
          
            
              🍬
            
            
              
                Sweet Bliss
              
              Your Premium Candy Store
            
          
          
          
            {user?.role === 'admin' && (
              
                
                Add Sweet
              
            )}
            
              
              
                {user?.name} ({user?.role})
              
            
            
              
            
          
        
      
    
  );
};

export default Header;
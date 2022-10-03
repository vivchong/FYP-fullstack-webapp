import { createContext, useState } from 'react';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [state, setState] = useState({
    refreshUpdates: false,
    refreshPosts: false,
    refreshComments: false,
    refreshSIGData: false,
    current_user_id: '',
    current_user_display_name: '',
      current_user_pic: '',
    current_user_email:'',
  });
  return (
    <StoreContext.Provider value={[state, setState]}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

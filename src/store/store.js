import { createContext, useState } from 'react';

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  // const [state, setState] = useState({
  //   isLoggedIn: false,
  //   current_user_id: 0,
  //   current_user_display_name: '',
  //   current_user_pic: '',
  //   current_user_email: '',
  //   refreshNotifications: false,
  //   refreshUpdates: false,
  //   refreshPosts: false,
  //   refreshComments: false,
  //   refreshSIGData: false,
  //   refreshSIGRecruitmentPage: false,

  // });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [current_user_id, setCurrent_user_id] = useState(0);
  const [current_user_display_name, setCurrent_user_display_name] = useState('');
  const [current_user_pic, setCurrent_user_pic] = useState('');
  const [current_user_email, setCurrent_user_email] = useState('');

  const [refreshNotifications, setRefreshNotifications] = useState(false);
  const [refreshUpdates, setRefreshUpdates] = useState(false);
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [refreshComments, setRefreshComments] = useState(false);
  const [refreshSIGData, setRefreshSIGData] = useState(false);
  const [refreshSIGRecruitmentPage, setRefreshSIGRecruitmentPage] =
    useState(false);

  return (
    // <StoreContext.Provider value={[state, setState]}>
    //   {children}
    // </StoreContext.Provider>

    <StoreContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        current_user_id,
        setCurrent_user_id,
        current_user_display_name,
        setCurrent_user_display_name,
        current_user_pic,
        setCurrent_user_pic,
        current_user_email,
        setCurrent_user_email,
        refreshNotifications,
        setRefreshNotifications,
        refreshUpdates,
        setRefreshUpdates,
        refreshPosts,
        setRefreshPosts,
        refreshComments,
        setRefreshComments,
        refreshSIGData,
        setRefreshSIGData,
        refreshSIGRecruitmentPage,
        setRefreshSIGRecruitmentPage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

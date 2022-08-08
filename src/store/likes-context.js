// NOT SURE IF USING THIS

// NEED TO CHANGE!!! HAVE NOT CHANGED ANYTHING.
// useBoolean

const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (favoriteMeetup) => { }, // empty functions that just get correct parameters, so it's easier for IDE to autofill
    removeFavorite: (meetupId) => { },
    itemIsFavorite: (meetupId) => {}

}); // it's a react component

export function FavoritesContextProvider(props) {
  // component function. will provide context to all component interested in listening to context. also responsible for updating context values
  const [userFavorites, setUserFavorites] = useState([]); 

  function addFavoriteHandler(favoriteMeetup) {
    setUserFavorites(prevUserFavorites => {
      return prevUserFavorites.concat(favoriteMeetup);
    }); //state updating functon when u depend on the last snapshot of that state
  }

  function removeFavoriteHandler(meetupId) {
    setUserFavorites(prevUserFavorites => {
      return prevUserFavorites.filter(meetup => meetup.id !== meetupId);
    });
  }

  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some(meetup => meetup.id === meetupId); // returns true or false if some meetup matches the ID
  } //help us determine if an item is a Favorite item or not

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler, // this is a pointer to the function above. this exposes the function to all components across the app who may need it
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
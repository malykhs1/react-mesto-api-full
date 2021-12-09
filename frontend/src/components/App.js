import { useEffect, useState } from "react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from "../utils/api";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoTooltip";
import * as mestoAuth from "../utils/mestoAuth";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Switch, useHistory } from "react-router-dom";

import CurrentUserContext from "../context/CurrentUserContext";

const App =() => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = useState(false);
  const [isSuccseed, setSuccseed] = useState(true);

  const history = useHistory();

  useEffect(() => {
    checkToken();
    Promise.all([api.getUserInfo(), api.getServerCards()])
      .then(([user, initialCards]) => {
        setCurrentUser(user)
        setCards(initialCards)
      })
    }, []);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      mestoAuth
        .getContent(token)
        .then((data) => {
          if (data) {
            //получаю объект с данными о пользователе, но без токена
            setCurrentUser(data)
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const onRegister = ({ email, password }) => {
    return mestoAuth
      .register(email, password)
      .then(() => {
        setSuccseed(true);
      })
      .catch(() => {
        setSuccseed(false);
      })
      .finally(setIsInfoToolTipOpened(true));
  };

 
  const onLogin = ({ email, password }) => {
    return mestoAuth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        checkToken();
        onReload();
      })
      .catch(() => {
        setSuccseed(false);
        setIsInfoToolTipOpened(true);
        setLoggedIn(false);
      });
  };

  const onSignOut = () => {
    localStorage.clear();
    setCurrentUser({
      name: '',
      about: '',
      email: '',
      _id: '',
    });
    setLoggedIn(false);
    history.push("/sign-in");
  }

  const onReload = () => {
    window.location.reload();
  }

  //изменение стейта при открытии попапап
  const onEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  };
  const onEditAvatar = () => {
    setEditAvatarPopupOpen(true);
  };
  const onAddPlace = () => {
    setIsAddPlacePopupOpen(true);
  };
  const onCardClick = (card) => setSelectedCard(card);

  const [currentUser, setCurrentUser] = useState({});

  const handleUpdateUser = ({ name, about }) => {
    api
      .setUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .setAvatar(avatar)
      .then((avatarData) => {
        setCurrentUser(avatarData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddCard = ({ name, link }) => {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

 const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  const handleCardDelete = (card) => {
    api
      .deleteCardRequest(card._id)
      .then((data) => {
        setCards((state) => 
        state.filter((j) => j._id !== card._id && data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipOpened(false);
    setSelectedCard(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header email={currentUser.email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            cards={cards}
            userInfo={currentUser}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            onCardClick={onCardClick}
            handleEditAvatarClick={onEditAvatar}
            handleEditProfileClick={onEditProfile}
            handleAddPlaceClick={onAddPlace}
            component={Main}
          ></ProtectedRoute>

          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>
        </Switch>

        <Footer />

        <InfoToolTip
          id="reg-pic"
          isOpened={isInfoToolTipOpened}
          onClose={closeAllPopups}
          isSuccseed={isSuccseed}
        />

        <ImagePopup id={"image"} card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
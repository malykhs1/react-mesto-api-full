import React from "react";
import * as mestoAuth from "../utils/mestoAuth";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { ImagePopup } from "./ImagePopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { api } from "../utils/api";
import { Login } from "./Login";
import { Register } from "./Register";
import { InfoToolTip } from "./InfoTooltip";
import { ProtectedRoute } from "./ProtectedRoute";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";

export const App =() => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null)

  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = useState(false);
  const [isSuccseed, setSuccseed] = useState(true);

  const history = useHistory();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        Promise.all([api.getUserInfo(token), api.getServerCards(token)])
        .then(([user, initialCards]) => {
          setCurrentUser(user)
          setCards(initialCards)
        })
          .catch(err => console.log(err))
      }
    }, [loggedIn])


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mestoAuth.checkToken(token).then((res) => {
        if (res) {
          setUserEmail(res.email);
          setLoggedIn(true);
          history.push('/');
        } else {
          localStorage.removeItem('token');
        }
      })
        .catch(err => console.log(err));
    }
  }, [history]);

  const onRegister = ({ email, password }) => {
    return mestoAuth.register(email, password)
      .then((res) => {
        if(res) {
          setSuccseed(true);
          history.push('/')
        } else {
          setSuccseed(false)
        }
      })
      .catch(err => console.log(err))
      .finally(setIsInfoToolTipOpened(true));
  };

 
  const onLogin = ({ email, password }) => {
    return mestoAuth
      .login(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setUserEmail(email)
        setLoggedIn(true)
        history.push('/')
      })
      .catch(() => {
        setLoggedIn(false);
        setSuccseed(false);
        setIsInfoToolTipOpened(true)
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
    const token = localStorage.getItem('token');
    api
      .setUserInfo(name, about, token)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    const token = localStorage.getItem('token');
    api
      .setAvatar(avatar, token)
      .then((avatarData) => {
        setCurrentUser(avatarData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddCard = ({ name, link }) => {
    const token = localStorage.getItem('token');
    api
      .addNewCard(name, link, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [cards, setCards] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const token = localStorage.getItem('token');
    api
      .toggleLikeCard(card._id, isLiked, token)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    const token = localStorage.getItem('token');
    api
      .deleteCardRequest(card._id, token)
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
        <Header email={userEmail} onSignOut={onSignOut} />
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
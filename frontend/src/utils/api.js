//блок catch должен быть не в апи, а в индексе при вызове метода. 
class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    // загружаем карточки с сервера
    getServerCards(token) {
        return fetch(`${this._url}/cards`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                  }, 
            })
            .then(this._checkResponse);
    }

    //подгружаем данные пользователя с сервера
    getUserInfo(token) {
        return fetch(`${this._url}/users/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                  }, 
            })
            .then(this._checkResponse);
    }

   
    //добавляем новую карточку
    addNewCard(name, link, token) { 
        return fetch(`${this._url}/cards`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                  }, 
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(this._checkResponse);
    }

     //обновляем данные пользователя на серваке
     setUserInfo(name, job, token) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                  }, 
                body: JSON.stringify({
                    name: name,
                    about: job
                })
            })
            .then(this._checkResponse);
    }


 //обновляем аватар пользователя
    setAvatar(avatar, token) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                  }, 
                body: JSON.stringify({
                    avatar: avatar
                })
            })
            .then(this._checkResponse);
    }

    //лайкаем карточку
    toggleLikeCard(cardId, isLiked, token) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: isLiked ? "DELETE" : "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                  }, 
            })
            .then(this._checkResponse);
    }

    //удаляем карточку
    deleteCardRequest(cardId, token) {
        return fetch(`${this._url}/cards/${cardId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                  }, 
            })
            .then(this._checkResponse);
    }
}


//создаем экземпляр класса

export const api = new Api({
	// url: "https://api.malykhs.nomoredomains.rocks",
    url: 'http://localhost:3000',
});


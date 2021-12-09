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
    getServerCards() {
        return fetch(`${this._url}/cards`, {
                method: "GET",
                headers: this._headers,
            })
            .then(this._checkResponse);
    }

    //подгружаем данные пользователя с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
                method: 'GET',
                headers: this._headers,
            })
            .then(this._checkResponse);
    }

   
    //добавляем новую карточку
    addNewCard(name, link) { 
        return fetch(`${this._url}/cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(this._checkResponse);
    }

     //обновляем данные пользователя на серваке
     setUserInfo(name, job) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: job
                })
            })
            .then(this._checkResponse);
    }


 //обновляем аватар пользователя
    setAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: avatar
                })
            })
            .then(this._checkResponse);
    }

    //лайкаем карточку
    likeCard(cardId, isLiked) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: isLiked ? "DELETE" : "PUT",
                headers: this._headers,
            })
            .then(this._checkResponse);
    }

    //удаляем карточку
    deleteCardRequest(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
                method: "DELETE",
                headers: this._headers,
            })
            .then(this._checkResponse);
    }
}


//создаем экземпляр класса

const api = new Api({
	url: "http://api.malykhs.nomoredomains.rocks",
	headers: {
		"content-type": "application/json",
		authorization: `Bearer ${localStorage.getItem('token')}`,
	},
});

export default api;

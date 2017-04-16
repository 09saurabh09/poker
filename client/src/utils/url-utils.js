class UrlUtils { 

	getUserServerBaseUrl() {
		return `/api`;
	}

	getGameServerBaseUrl() {
		if(process.env.NODE_ENV == 'development') {
			return `http://${window.location.hostname}:3100`;
		} else {
			return 'https://poker-game-app.herokuapp.com';
		}
	}

	getAuthorizedSocketNameSpaceUrl(token) {
		return `${this.getGameServerBaseUrl()}/poker-game-authorized?token=${token}`;
	}

	getUnauthorizedSocketNameSpaceUrl() {
		return `${this.getGameServerBaseUrl()}/poker-game-unauthorized`;	
	}

	getPublicUrl() {
		return `${this.getUserServerBaseUrl()}/public`;
	}

	getPublicGameUrl() {
		return `${this.getPublicUrl()}/game`;
	}

	getPublicUserUrl() {
		return `${this.getPublicUrl()}/user`;
	}

	getGameUrl() {
		return `${this.getUserServerBaseUrl()}/game`;
	}

	getUserUrl() {
		return `${this.getUserServerBaseUrl()}/user`;
	}

	getAuthenticateUserUrl() {
		return `${this.getPublicUserUrl()}/authenticate`;
	}

	getPublicGameTableUrl() {
		return `${this.getPublicGameUrl()}/tables`;
	}

	getGameTableUrl() {
		return `${this.getGameUrl()}/tables`;
	}

	getTableDetailsUrl(tableId) {
		return `${this.getPublicGameUrl()}/table/${tableId}`;
	}

	getUserInfoUrl(responseGroup) {
		return `${this.getUserUrl()}?responseGroup=${responseGroup}`;
	}

	getListMyTablesUrl() {
		return `${this.getGameUrl()}/list-my-tables`;
	}

	getGameHistoryUrl(tableId) {
		let url = `${this.getUserUrl()}/session/game-history`
		if(tableId) {
			return `${url}?tableId=${tableId}`;
		}
		return url;
	}

	constructor() {
		
	}

}
export default UrlUtils;
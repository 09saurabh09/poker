class UrlUtils { 

	getUserServerBaseUrl() {
		return `http://${window.location.hostname}:7100/api`;
	}

	getGameServerBaseUrl() {
		return `http://${window.location.hostname}:3100`;
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

	constructor() {

	}

}
export default UrlUtils;
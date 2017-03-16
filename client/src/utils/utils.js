import UrlUtils from './url-utils';
class Utils extends UrlUtils{
	constructor() {
		super();
	}

	openModal(modalId) {
		var modal = document.getElementById(modalId);
    	modal.style.display = 'block';
	}

	closeModal(modalId) {
		var modal = document.getElementById(modalId);
    	modal.style.display = 'none';	
	}
}

const utils = new Utils();
export default utils;

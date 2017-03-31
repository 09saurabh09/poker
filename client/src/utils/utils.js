import UrlUtils from './url-utils';
class Utils extends UrlUtils{
	constructor() {
		super();
	}

	openModal(modalId) {
		var modal = document.getElementById(modalId);
    	modal ? modal.style.display = 'block' : null;
	}

	closeModal(modalId) {
		var modal = document.getElementById(modalId);
    	modal ? modal.style.display = 'none' : null;
	}

}

const utils = new Utils();
export default utils;

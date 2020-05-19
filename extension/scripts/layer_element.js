'use strict';

/**
 * Create a new layer element and add it to the top of the list.
 * @param {HTMLUListElement} layerList - The list to add the layer element to
 * @param {String} [name] - The name to give the layer
 */
function LayerElement(layerList, name) {
	/** @private {HTMLElement} The container element for the layer's element */
	this._element = document.createElement('li');
	this._element.innerHTML = this.HTML;
	this._element.className = 'layer-button';
	
	this._name = this._element.querySelector('.layer-name');
	if (name) {
		this.name = name;
	}
	
	this.visibilityToggle = this._element.querySelector('.layer-visibility-toggle');
	this.renameButton = this._element.querySelector('.layer-rename-button');
	this.deleteButton = this._element.querySelector('.layer-delete-button');
	
	layerList.insertAdjacentElement('afterbegin', this._element);
}

LayerElement.prototype.delete = function () {
	this._element.remove();
};

/** @const {String} The visibility toggle tooltip when the layer is hidden */
LayerElement.prototype.HIDDEN_TOOLTIP = 'Layer is hidden';
/** @const {String} The visibility toggle tooltip when the layer is visible */
LayerElement.prototype.VISIBLE_TOOLTIP = 'Layer is visible';


Object.defineProperties(LayerElement.prototype, {
	name: {
		get: function () {
			return this._name.textContent;
		},
		set: function (value) {
			this._name.textContent = value;
		}
	},
	visible: {
		get: function () {
			return this.visibilityToggle.getAttribute('aria-checked') === 'true';
		},
		set: function (value) {
			this.visibilityToggle.setAttribute('aria-checked', '' + value);
			this.visibilityToggle.title = value ? this.VISIBLE_TOOLTIP : this.HIDDEN_TOOLTIP;
		}
	}
});


LayerElement.prototype.DELETE_SVG = '<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>';
LayerElement.prototype.RENAME_SVG = '<path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />';
LayerElement.prototype.VISIBILITY_OFF_SVG = '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>';
LayerElement.prototype.VISIBILITY_ON_SVG = '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';

/** @const {String} The inner HTML for a layer element */
LayerElement.prototype.HTML =
//'<li>' +
	'<label>' +
		'<button class="layer-visibility-toggle" aria-role="checkbox" aria-checked="true" title="Layer is visible">' +
			'<svg role="img" class="layer-visibility-off-icon">' +
				LayerElement.prototype.VISIBILITY_OFF_SVG +
				//'<use xlink:href="' + chrome.runtime.getURL('images/icons/visibility_off.svg#icon') + '" href="' + chrome.runtime.getURL('images/icons/visibility_off.svg#icon') + '"></use>' +
			'</svg>' +
			'<svg role="img" class="layer-visibility-on-icon">' +
				LayerElement.prototype.VISIBILITY_ON_SVG +
				//'<use xlink:href="' + chrome.runtime.getURL('images/icons/visibility_on.svg#icon') + '" href="' + chrome.runtime.getURL('images/icons/visibility_on.svg#icon') + '"></use>' +
			'</svg>' +
		'</button>' +
	'</label>' +
	
	'<span class="layer-name" role="button"></span>' +
	
	'<label>' +
		'<button class="layer-rename-button" title="Rename layer">' +
			'<svg role="img">' +
				LayerElement.prototype.RENAME_SVG +
				//'<use xlink:href="' + chrome.runtime.getURL('images/icons/rename.svg#icon') + '" href="' + chrome.runtime.getURL('images/icons/rename.svg#icon') + '"></use>' +
			'</svg>' +
		'</button>' +
	'</label>' +
	'<label>' +
		'<button class="layer-delete-button" title="Delete layer">' +
			'<svg role="img">' +
				LayerElement.prototype.DELETE_SVG +
				//'<use xlink:href="' + chrome.runtime.getURL('images/icons/delete.svg#icon') + '" href="' + chrome.runtime.getURL('images/icons/delete.svg#icon') + '"></use>' +
			'</svg>' +
		'</button>' +
	'</label>';
//'</li>';


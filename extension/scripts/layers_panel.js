'use strict';

/**
 * Create a new LayersPanel instance and add it to the DOM.
 */
function LayersPanel() {
	/** @private {HTMLElement} The container element for the entire layers panel */
	this._element = document.createElement('div');
	this._element.innerHTML = this.HTML;
	this._element.className = 'card dialog z2 open';
	this._element.id = 'layers-panel';
	
	/** @private {HTMLUListElement} The list containing the layer buttons */
	this._layersList = this._element.querySelector('#layers-list');
	
	/** @private {HTMLButtonElement} The button to add a new layer */
	this.addLayerButton = this._element.querySelector('#add-layer-button');
	
	document.body.appendChild(this._element);
}

LayersPanel.prototype.addLayer = function (name) {
	var newLayer = new LayerElement(this._layersList, name);
	return newLayer;
}

LayersPanel.prototype.LAYER_ADD_SVG = '<path d="M17,14H19V17H22V19H19V22H17V19H14V17H17V14M11,16L2,9L11,2L20,9L11,16M11,18.54L12,17.75V18C12,18.71 12.12,19.39 12.35,20L11,21.07L2,14.07L3.62,12.81L11,18.54Z" />';

/** @const {String} The inner HTML for the layers panel */
LayersPanel.prototype.HTML =
//<div class="card dialog z2 open" id="layers-panel">
	'<h1 role="toolbar" class="dialog-header">' +
		'<button id="add-layer-button" title="New layer">' +
			'<svg role="img">' +
				//'<use xlink:href="' + chrome.runtime.getURL('images/icons/layer_add.svg#icon') + '" href="' + chrome.runtime.getURL('images/icons/layer_add.svg#icon') + '"></use>' +
				LayersPanel.prototype.LAYER_ADD_SVG +
			'</svg>' +
		'</button>' +
		'Layers' +
	'</h1>' +
	'<ul id="layers-list">' +
	'</ul>'
//</div>`;

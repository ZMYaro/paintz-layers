'use strict';

/**
 * Initialize a new LayerManager instance.
 */
function LayerManager() {
	/** @private {Array<Object>} The list of layers, from bottom to top */
	this._layers = [];
	/** @private {LayersPanel} The layers panel */
	this._ui = new LayersPanel();
	
	this._ui.addLayerButton.addEventListener('click', this.addLayer.bind(this));
	
	this.addLayer();
}

/** @constant {Number} The maximum number of layers allowed */
LayerManager.prototype.MAX_LAYERS = 65535; // FFFF

/**
 * Create a new layer.
 */
LayerManager.prototype.addLayer = function () {
	if (this._layers.length >= this.MAX_LAYERS) {
		alert('You are already at the maximum number of layers.');
		return;
	}
	
	var newLayer = {};
	newLayer.name = this._getNextLayerName();
	newLayer.visible = true;
	// TODO: Create layer canvas.
	newLayer.button = this._ui.addLayer(newLayer.name);
	
	newLayer.button.renameButton.addEventListener('click', () => this.renameLayer(newLayer));
	newLayer.button.deleteButton.addEventListener('click', () => this.deleteLayer(newLayer));
	
	this._layers.push(newLayer);
	return newLayer;
};

/**
 * Delete a layer entirely after user confirmation.
 * @param {Object} layer - The layer to delete
 */
LayerManager.prototype.deleteLayer = function (layer) {
	if (!confirm('Are you sure you want to delete layer \u201c' + layer.name + '\u201d?')) {
		return;
	}
	// TODO: Remove layer canvas.
	layer.button.delete();
	this._layers.splice(this._layers.indexOf(layer), 1);
};

/**
 * Prompt the user for a new name for a layer and rename the layer.
 * @param {Object} layer - The layer to rename
 */
LayerManager.prototype.renameLayer = function (layer) {
	var newName = prompt('What do you want to rename layer \u201c' + layer.name + '\u201d to?', layer.name);
	
	// Abort if cancelled or no name was entered.
	if (!newName) {
		return;
	}
	
	// Remove leading/trailing spaces and prevent naming a layer entirely spaces.
	newName = newName.trim();
	if (!newName) {
		return;
	}
	
	layer.name = newName;
	layer.button.name = newName;
}

/**
 * Get the next numbered layer name that is not already being used.
 */
LayerManager.prototype._getNextLayerName = function () {
	var DEFAULT_NAME_REGEX = /Layer ([0-9]+)/,
		lowestUnusedNum = 1,
		usedLayerNums = this._layers.map((layer) => {
			var match = layer.name.match(DEFAULT_NAME_REGEX);
			if (!match) { return 0; }
			return parseInt(match[1]);
		});
	
	// Find the lowest number that has is not already being used.
	while (usedLayerNums.indexOf(lowestUnusedNum) !== -1) {
		lowestUnusedNum++;
	}
	
	return 'Layer ' + lowestUnusedNum;
};

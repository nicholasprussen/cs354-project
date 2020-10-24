

_showDialogButton = document.getElementById('show-dialog');
_statusDialog = document.getElementById('dialog-status');
var dialog;
function showDialog() {
	_statusDialog.textContent = 'Dialog showed...';
	_showDialogButton.disabled = true;
	if (!dialog) {
		var id = 'dialog';
		// Instanciate the Dialog Box
		dialog = new DialogBox(id, callbackDialog);
	}
	// Show Dialog Box
	dialog.showDialog();

	// Receive result from Dialog Box
	function callbackDialog(btnName) {
		_showDialogButton.disabled = false;
		_showDialogButton.focus();
		if (btnName == 'close')
			_statusDialog.textContent = 'Dialog hidden...';
		else
			_statusDialog.textContent = btnName + ' button clicked...';
	}
}

_showButtonsButton = document.getElementById('show-buttons');
_statusButtons = document.getElementById('buttons-status');
var buttonsBox;
function showButtons() {
	_statusButtons.textContent = 'Buttons showed...';
	_showButtonsButton.disabled = true;
	if (!buttonsBox) {
		var id = 'buttonsBox';
		// Instanciate the Dialog Box
		buttonsBox = new DialogBox(id, callbackButtons);
	}
	// Show DialogBox
	buttonsBox.showDialog();

	// Receive result from DialogBox
	function callbackButtons(btnName) {
		_showButtonsButton.disabled = false;
		_showButtonsButton.focus();
		if (btnName == 'close')
			_statusButtons.textContent = 'Buttons hidden...';
		else
			_statusButtons.textContent = btnName + ' button clicked...';
	}
}

var infoBox;
function showInfo() {
	if (!infoBox) infoBox = new DialogBox("infoBox");
	infoBox.showDialog();
}

document.getElementById("show-dialog").addEventListener("click", this.showDialog());
document.getElementById("show-buttons").addEventListener("click", this.showButtons());
document.getElementById("show-info").addEventListener("click", this.showInfo());
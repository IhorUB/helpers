//author  https://medium.com/devschacht/https-medium-com-kasimoka-joseph-zimmerman-drag-drop-file-uploader-vanilla-js-de850d74aa2f

let dropArea = document.getElementById('drop-area');

//progress
let filesDone = 0;
let filesToDo = 0;
let progressBar = document.getElementById('progress-bar');

function initializeProgress(numfiles) {
	progressBar.value = 0;
	filesDone = 0;
	filesToDo = numfiles;
}

function progressDone() {
	filesDone++
	progressBar.value = filesDone / filesToDo * 100;
}

// reset default actions
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
	dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults (e) {
	e.preventDefault();
	e.stopPropagation();
}

//highlight element 
['dragenter', 'dragover'].forEach(eventName => {
	dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
	dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
	dropArea.classList.add('highlight');
}
function unhighlight(e) {
	dropArea.classList.remove('highlight');
}

//files dropped
dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
	let dt = e.dataTransfer
	let files = dt.files
	handleFiles(files)
}

// transfrom into array
function handleFiles(files) {
	files = [...files];
	initializeProgress(files.length);
	files.forEach(uploadFile);
	files.forEach(previewFile);
}

//upload
function uploadFile(file) {
	let url = '';
	let formData = new FormData()
	formData.append('file', file)
	fetch(url, {
		method: 'POST',
		body: formData
	})
	.then(progressDone)
	.catch(() => { console.log('error')})
}

function previewFile(file) {
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = function() {
		let img = document.createElement('img')
		img.src = reader.result
		document.getElementById('gallery').appendChild(img);
	}
}

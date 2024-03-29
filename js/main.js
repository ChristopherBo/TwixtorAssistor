//nice shortcut functions
function $(id) {
    return document.getElementById(id);
}

function $$(name, number) {
    return document.getElementsByTagName(name)[number];
}

var interface = new CSInterface();
var flowframesPath = "";
(function () {
	var path, slash;
	path = location.href;
	if(getOS() == "MAC") {
		slash = "/";
		path = path.substring(0, path.length - 11);
	}
	if(getOS() == "WIN") {
		slash = "/";
		path = path.substring(8, path.length - 11);
	}

	//block ae from using ALL keys while this window is active
	keyRegisterOverride();

	// alert(path.slice(60, path.length));

	//can run a given function in aftereffects.jsx
	// interface.evalScript('testFunction()', function(res) {
	// 	//anon function to do whatever you want with the result from the test function
	// 	alert("anon func");
	// });

	//wait 2000 ms THEN run the stuff inside
	// setTimeout(function() {
	// 	//the stuff inside
	// }, 2000);

}());

//if checkbox not checked gray out/disable keybinds
var nodes;
function toggleBinds(e) {
	if(!$('custombinds-checkbox').checked) {
		// alert("unchecked");
		$('binds').style.color = 'grey';
		nodes = document.querySelectorAll("input[type=text]");
		for (var i=0; i<nodes.length; i++) {
			nodes[i].style.color = 'grey';
			nodes[i].setAttribute("readonly", "true");
		}
	} else {
		// alert("checked");
		$('binds').style.color = 'white';
		nodes = document.querySelectorAll("input[type=text]");
		for (var i=0; i<nodes.length; i++) {
			nodes[i].style.color = 'white';
			nodes[i].removeAttribute("readonly");
		}
	}
}

//event listeners
//listen for add/back/keyframe binds if custombinds checkbox enabled
var previousBinds = ["PageDown", "PageUp", "/", "*"];
window.addEventListener("keydown", function(event) {
	if($('custombinds-checkbox').checked) {
		//this.alert(event.key);
		//make sure the user wasnt just typing in a text box
		if($('forward-bind').value != previousBinds[0]) {
			previousBinds[0] = $('forward-bind').value;
		} else if($('back-bind').value != previousBinds[1]) {
			previousBinds[1] = $('back-bind').value;
		} else if($('keyframe-bind').value != previousBinds[2]) {
			previousBinds[2] = $('keyframe-bind').value;
		} else if($('next-bind').value != previousBinds[3]) {
			previousBinds[3] = $('next-bind').value;
		} else { //definitely a normal bind press
			var key = "";
			//this.alert("key: " + event.key + "\ncode: " + event.keyCode);
			//check if numpad number
			if(event.keyCode <= 105 && event.keyCode > 96) {
				key = "numpad " + (event.keyCode-96).toString();
			} else if(event.keyCode == 96) {
				key = "numpad 0";
			} else if(event.keyCode == 106) {
				key = "numpad *";
			} else if(event.keyCode == 107) {
				key = "numpad +";
			} else if(event.keyCode == 109) {
				key = "numpad -";
			} else if(event.keyCode == 110) {
				key = "numpad .";
			} else if(event.keyCode == 111) {
				key = "numpad /";
			} else {
				key = event.key.toString().toLowerCase();
			}
			//this.alert("key after: " + key);
			if (key == $('back-bind').value.toLowerCase()) {
				backClick();
			} else if(key == $('forward-bind').value.toLowerCase()) {
				forwardClick();
			} else if(key == $('keyframe-bind').value.toLowerCase()) {
				keyframeClick();
			} else if(key == $('next-bind').value.toLowerCase()) {
				nextClick();
			}
		}
	}
});

//listen for color theme changing
function changeTheme(e) {
	//alert(e.target.value);
	//change color of bgnd text boxes
	nodes = document.querySelectorAll("input[type=text]");
	for (var i=0; i<nodes.length; i++) {
		nodes[i].style.backgroundColor = e.target.value;
	}
	nodes = document.querySelectorAll("button");
	for (var i=0; i<nodes.length; i++) {
		nodes[i].style.backgroundColor = e.target.value;
	}

	nodes = document.getElementsByClassName('container');
	for (var i=0; i<nodes.length; i++) {
		//document.getElementsByClassName('container')[i].childNodes[3].style.backgroundColor = e.target.value;
		if(!document.getElementsByClassName('container')[i].childNodes[1].checked) {
			document.getElementsByClassName('container')[i].childNodes[3].style.backgroundColor = e.target.value;
		} else {
			document.getElementsByClassName('container')[i].childNodes[3].style.backgroundColor = "#D7D7D7";
		}
	}

	$('color-picker').style.backgroundColor = e.target.value;
}

//check if checkbox checked or unchecked to make sure its being the right color
function toggleCheckbox(e) {
	//alert(e.currentTarget.id + " " + e.currentTarget.checked);
	if(!e.currentTarget.checked) {
		e.currentTarget.parentNode.childNodes[3].style.backgroundColor = $('color-picker').value;
	} else {
		e.currentTarget.parentNode.childNodes[3].style.backgroundColor = "#D7D7D7";
	}
}


function setupClick() {
	//alert("setting up...");
	interface.evalScript('setupEnv()', function(res) {
		//alert("res: " + res);
		$('status').innerText = res;
	});
}

function nextClick() {
	interface.evalScript('nextButton(' + $('renderqueue-checkbox').checked + ', ' + $('custombinds-checkbox').checked + ')', function(res) {
		//alert("res: " + res);
		$('status').innerText = res;
	});
}

function backClick() {
	interface.evalScript('backButton()', function(res) {
		//alert("res: " + res);
		$('status').innerText = res;
	});
}

function forwardClick() {
	interface.evalScript('forwardButton()', function(res) {
		//alert("res: " + res);
		$('status').innerText = res;
	});
}

function keyframeClick() {
	interface.evalScript('keyframeButton()', function(res) {
		//alert("res: " + res);
		$('status').innerText = res;
	});
}

function flowframeClick() {
	//find flowframes - check desktop, then onedrive desktop, then program files
	const fs = require("fs");
	const homeDir = require('os').homedir(); // See: https://www.npmjs.com/package/os
	var flowframesPath = `${homeDir}\\Desktop\\Flowframes.lnk`;
	if (!fs.existsSync(flowframesPath)) {
		flowframesPath = `${homeDir}\\OneDrive\\Desktop\\Flowframes.lnk`;
		if(!fs.existsSync(flowframesPath)) {
			flowframesPath = `C:/Program Files/Flowframes/Flowframes.exe`;
			if(!fs.existsSync(flowframesPath)) {
				flowframesPath = `G:/Program Files/Flowframes/Flowframes.exe`;
				if(!fs.existsSync(flowframesPath)) {
					//TODO: if in neither directory, make a popup that lets the user put in their path
					alert("flowframes wasn't found in program files or desktop!") //placeholder
					$('status').innerText = "ERROR: No Flowframes.exe!";
				}
			}
		}
	}

	//if we're dealing with a shortcut, find the shortcut destination
	if(flowframesPath.includes('.lnk')) {
		var ws = require('windows-shortcuts');
		ws.query(flowframesPath, function(err, options) {
			if(err) {
				alert(err);
			} else {
				flowframesPath = options.target;
				flowframeClickContinued(options.target);
			}
		});
	} else {
		flowframeClickContinued(flowframesPath);
	}
}

function flowframeClickContinued(flowframesPath) {
	//Check if clips are rendered,
	interface.evalScript('flowframeButton()', function(res) {
		if(res == "Did not render precomps" || res == "No twixtor precomps rendered!") {
			$('status').innerText = res;
			return;
		}
		var filepaths = res.split(",");
		var processedFiles = 0;
		var exec = require('child_process').exec;
		//exec flowframes on each clip
		for(var i=0; i < filepaths.length; i++) {
			// alert("\"" + flowframesPath + '\" \"' + filepaths[i] + '\" -start -factor=8 -quit-when-done -output-mode=3')
			exec("\"" + flowframesPath + '\" \"' + filepaths[i] + '\" -start -factor=8 -quit-when-done -output-mode=3',
				function (error, stdout, stderr) {
					// alert("Error: " + error + "\nstdout: " + stdout + "\nstderr: " + stderr);
					processedFiles++;
					importFlowframedClips(processedFiles, filepaths.length);
			});
		}
	});
}

//called in the exec async to prevent being run early
//only runs when conditions are met
function importFlowframedClips(processedFiles, filepaths) {
	if(processedFiles == filepaths) {
		//when done go back to es
		interface.evalScript('importFlowframedClips()', function(res) {
			$('status').innerText = res;
		});
	}
}

function replaceClick() {
	interface.evalScript('replaceButton()', function(res) {
		//alert("res: " + res);
		$('status').innerText = res;
	});
}

// function goIntoJSX() {
	
// 	}

function getOS() {
	var userAgent = window.navigator.userAgent,
	platform = window.navigator.platform,
	macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
	windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
	os = null;

	if(macosPlatforms.indexOf(platform) != -1) {
		os = "MAC";
	} else if(windowsPlatforms.indexOf(platform) != -1) {
		os = "WIN";
	}
	return os;
}

//disables ae keybinds while extension is active
//from https://justintaylor.tv/hotkeys-in-cep/
// to target specific keys get the key codes from
//https://css-tricks.com/snippets/javascript/javascript-keycodes/
function keyRegisterOverride() {
	const platform = navigator.platform.substring(0, 3);
	let maxKey;
	if (platform === 'Mac')
		maxKey = 126; // Mac Max Key Code
	else if (platform === 'Win')
		maxKey = 222; // HTML Max Key Code
	let allKeys = [];
	for (let k = 0; k <= maxKey; k++) {
		for (let j = 0; j <= 15; j++) {
			const guide = (j >>> 0).toString(2).padStart(4, '0');
			allKeys.push({
				keyCode: k,
				ctrlKey: guide[0] == 1,
				altKey: guide[1] == 1,
				shiftKey: guide[2] == 1,
				metaKey: guide[3] == 1
			});
		}
	}
	const keyRes = interface.registerKeyEventsInterest(JSON.stringify(allKeys));
	console.log('Key Events Registered Completed: ' + keyRes);
};
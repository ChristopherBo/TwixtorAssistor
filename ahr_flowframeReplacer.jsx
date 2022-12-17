//ahr_flowframeReplacer.jsx Version 1.0
// Copyright (c) 2022 AHRevolvers. All rights reserved.
//
// This is a bonus addon script to my Twixtor Assistor extension.
// Given a folder of flowframes clips it places all of them in the
// precomps they were twixtored in and formats their respective precomps
// to the length and FPS of the flowframed clips.
//
// Prereq: The precomps you originally twixtored in must be in a folder
//         named Twixtor Precomps. If you used my Twixtor Assistor
//         extension, it should already exist with the precomps in it.
// Usage: Select the flowframe clips and run it.

(function ahr_flowframeReplacer(thisObj) {
    var ahr_flowframeReplacer = new Object();	// Store globals in an object
	ahr_flowframeReplacer.scriptName = "ahr_flowframeReplacer";
	ahr_flowframeReplacer.scriptTitle = ahr_flowframeReplacer.scriptName + "v1.0";
    
        //base checks before starting
        // Check that a project exists
        if (app.project === null) {
            alert("Project does not exist!");
            return false;
        }

        // Check that an active comp exists
        if (app.project.activeItem === null) {
            alert("There is no active comp!");
            return false;
        }

        // Check that there's a selected property
        if (app.project.activeItem.selectedLayers.length == 0) {
            alert("There is no selected layers to replace with!");
            return false;
        }

        //Check that the setup was run via checking for twix folder
        var twixFolder = null;
        for(var i=1; i < app.project.items.length+1; i++) {
            if(app.project.items[i] instanceof FolderItem && app.project.items[i].name == "Twixtor Precomps") {
                twixFolder = app.project.items[i];
            }
        }
        if(twixFolder == null) { //it doesnt exist
            alert("Twixtor Precomps folder with original twixtor precomps does not exist!");
            return false;
        }

        //Check that precomps exist in the twix folder
        if(twixFolder.items.length < 1) {
            alert("There are no precomps in the Twixtor Precomps folder!");
            false
        }

})(this);
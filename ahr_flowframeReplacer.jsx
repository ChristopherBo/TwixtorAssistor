//ahr_flowframeReplacer.jsx Version 1.0
// Copyright (c) 2022 AHRevolvers. All rights reserved.
//
// This is a bonus addon script to my Twixtor Assistor extension.
// Given a folder of flowframes clips it places all of them in the
// precomps they were twixtored in and formats their respective precomps
// to the length and FPS of the flowframed clips.
// Find more of these scripts on my channel https://www.youtube.com/c/AHRevolvers
//
// Prereq: The precomps you originally twixtored in must be in a folder
//         named Twixtor Precomps. If you used my Twixtor Assistor
//         extension, it should already exist with the precomps in it.
// Usage: Select the flowframe clips and run it.
//
//Legal stuff:
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// This script is provided "as is," without warranty of any kind, expressed
// or implied. In no event shall the author be held liable for any damages
// arising in any way from the use of this script.
//

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

    // Check that there's at least 1 selected item
    if (app.project.selection.length < 1) {
        alert("There is no selected layers to replace with!");
        return false;
    } 

    //Make sure all selected items are videos or img seqs
    for(var i=0; i < app.project.selection.length; i++) {
        if(!(app.project.selection[i] instanceof FootageItem)) {
            alert("Item " + app.project.selection[i].name + " is not a video file/img sequence!");
            return false;
        }
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
    if(twixFolder.numItems < 1) {
        alert("There are no precomps in the Twixtor Precomps folder!");
        false
    }

    app.beginUndoGroup('Flowframes Replacer');
    var TwixPreset = File.openDialog("Select Twixtor Preset to apply to clips... (Cancel to use default Twixtor)");

    //drop all the selected items in an array
    var layers = app.project.selection;
    for(var i=0; i < layers.length; i++) {
        //check to see if the comp's name matches any of the layer names
        for(var j=1; j <= twixFolder.numItems; j++) {
            if(new RegExp(twixFolder.item(j).name).test(layers[i].name)) {
                processComp(twixFolder.item(j), layers[i]);
            }
        }
    }

    app.endUndoGroup();

    //Given a comp and a layer, places the layer
    //in the comp and fits the comp to the layer's
    //framerate and length.
    //Also moves layer to top of comp.
    function processComp(comp, layer) {
        comp.layers.add(layer);
        var compLayer = comp.layer(layer.name);
        //make sure its the top layer in the comp
        if(compLayer != comp.layers[1]) {
            compLayer.moveBefore(comp.layers[1]);
        }
        //fit comp to layer specs
        comp.frameRate = compLayer.source.frameRate;
        comp.duration = compLayer.source.duration;
        //make sure layer is full length- sometimes last frame gets cut off
        compLayer.outPoint = compLayer.source.duration;

        //apply preset; if no preset apply default twixtor
        try{
            compLayer.applyPreset(File(TwixPreset));
        } catch(error) {}
        if(compLayer.Effects("Twixtor Pro") == null) {
            compLayer("Effects").addProperty("Twixtor Pro");
        }

        //make sure to set twix's color source to the current layer
        try {
            compLayer.Effects("Twixtor Pro")("Color Source").setValue(1);
        } catch(error) {}

        //misc setting needs to be off
        try {
            compLayer.Effects("Twixtor Pro")("In FPS is Out FPS").setValue(0);
        } catch (error) {}

        //set the input framerate to clip framerate
        try {
            compLayer.Effects("Twixtor Pro")("Input: Frame Rate").setValue(compLayer.source.frameRate);
        } catch(error) {}
    }

})(this);
//todo:
//mass import/replace original clip with flowframed clips

"object" != typeof JSON && (JSON = {}), function () { "use strict"; var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta, rep; function f(t) { return t < 10 ? "0" + t : t } function this_value() { return this.valueOf() } function quote(t) { return rx_escapable.lastIndex = 0, rx_escapable.test(t) ? '"' + t.replace(rx_escapable, function (t) { var e = meta[t]; return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + t + '"' } function str(t, e) { var r, n, o, u, f, a = gap, i = e[t]; switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(t)), "function" == typeof rep && (i = rep.call(e, t, i)), typeof i) { case "string": return quote(i); case "number": return isFinite(i) ? String(i) : "null"; case "boolean": case "null": return String(i); case "object": if (!i) return "null"; if (gap += indent, f = [], "[object Array]" === Object.prototype.toString.apply(i)) { for (u = i.length, r = 0; r < u; r += 1)f[r] = str(r, i) || "null"; return o = 0 === f.length ? "[]" : gap ? "[\n" + gap + f.join(",\n" + gap) + "\n" + a + "]" : "[" + f.join(",") + "]", gap = a, o } if (rep && "object" == typeof rep) for (u = rep.length, r = 0; r < u; r += 1)"string" == typeof rep[r] && (o = str(n = rep[r], i)) && f.push(quote(n) + (gap ? ": " : ":") + o); else for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (o = str(n, i)) && f.push(quote(n) + (gap ? ": " : ":") + o); return o = 0 === f.length ? "{}" : gap ? "{\n" + gap + f.join(",\n" + gap) + "\n" + a + "}" : "{" + f.join(",") + "}", gap = a, o } } "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value), "function" != typeof JSON.stringify && (meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, JSON.stringify = function (t, e, r) { var n; if (indent = gap = "", "number" == typeof r) for (n = 0; n < r; n += 1)indent += " "; else "string" == typeof r && (indent = r); if ((rep = e) && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify"); return str("", { "": t }) }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) { var j; function walk(t, e) { var r, n, o = t[e]; if (o && "object" == typeof o) for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (void 0 !== (n = walk(o, r)) ? o[r] = n : delete o[r]); return reviver.call(t, e, o) } if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (t) { return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({ "": j }, "") : j; throw new SyntaxError("JSON.parse") }) }();
var twixFolder = null;
var twixtored = [];

function getLayerNames(arg) {
    var layerNames = [];
    var comp = app.project.activeItem;
    for (var i = 1; i <= comp.numLayers; i++) {
        layerNames.push(comp.layer(i).name);
    }

    return JSON.stringify(layerNames);
}

function osCheck() {
    var os = $.os;
    var match = os.indexOf("Windows");
    if (match != (-1)) {
        var userOS = "PC";
    } else {
        var userOS = "MAC";
    }
    return userOS;
}

function setupEnv() {
    //alert("in jsx");

    //base checks before starting
    // if(debug.value) { writeToDebugFile("Making sure there's an active project...\n"); }
    // Check that a project exists
    if (app.project === null) {
        alert("Project does not exist!");
        return "Project does not exist!";
    }

    // if(debug.value) { writeToDebugFile("Making sure there's an active comp...\n"); }
    // Check that an active comp exists
    if (app.project.activeItem === null) {
        alert("There is no active comp!");
        return "There is no active comp!";
    }

    // if(debug.value) { writeToDebugFile("Making sure Twixtor's installed...\n"); }
    // Check if twixtor's installed
    if(checkForTwixtor() == false) {
        alert("Twixtor is not installed!");
        return "Twixtor is not installed!";
    }

    // if(debug.value) { writeToDebugFile("Starting...\n"); }

    app.beginUndoGroup("Twixtor Assistor Setup");

    //grab each layer
    var layers = app.project.activeItem.selectedLayers;
    var comp = app.project.activeItem;
    twixtored = []; //reset counter

    //alert("time to precomp");
    //find twix precomps folder, if dne make it
    for(var i=1; i < app.project.items.length+1; i++) {
        if(app.project.items[i] instanceof FolderItem && app.project.items[i].name == "Twixtor Precomps") {
            twixFolder = app.project.items[i];
        }
    }
    if(twixFolder == null) {
        twixFolder = app.project.items.addFolder("Twixtor Precomps");
    }
    
    //precomp range of layers
    for(var i=0; i < layers.length; i++) {
        // if(debug.value) { writeToDebugFile("Setting up " + layers[i].name + "\n"); }
        var layerIndex = layers[i].index;
        //if time stretch enabled destroy it
        if(layers[i].stretch != 100) {
            layers[i].stretch == 100; //default it
        }
        //kill any time remap keyframes and enable time remap
        layers[i].timeRemapEnabled == false;
        layers[i].timeRemapEnabled == true;

        var precomp = comp.layers.precompose([layers[i].index], "twix_"+ layers[i].name, false);
        var precompLayer = comp.layers[layerIndex];

        //precomp fits the same area and same duration as original
        // precomp.displayStartTime = precompLayer.inPoint - precompLayer.startTime;
        //the next 5 lines are mythical and are not to be changed under any circumstances
        precomp.duration = precompLayer.outPoint - precompLayer.startTime;
        precomp.layers[1].outPoint = precompLayer.outPoint - precompLayer.startTime;
        precomp.layers[1].inPoint = precompLayer.inPoint - precompLayer.startTime;
        precomp.layers[1].startTime = -precompLayer.inPoint + precompLayer.startTime;
        precomp.duration = precompLayer.outPoint - precompLayer.inPoint;
        precomp.parentFolder = twixFolder;

        //enable time remapping on each clip & precomp
        precompLayer.timeRemapEnabled = true;
        precomp.layers[1].timeRemapEnabled = true;

        //add points to in and out
        //setValueAtTime(old time, new time);
        precompLayer.timeRemap.setValueAtTime(precompLayer.inPoint, 0);
        precompLayer.timeRemap.setValueAtTime(precompLayer.outPoint, precomp.duration); //(precompLayer.outPoint - precompLayer.inPoint) - (1/comp.frameRate)

        var index = 1;
        while(precompLayer.timeRemap.numKeys > 2 && index < precompLayer.timeRemap.numKeys) {
            if(precompLayer.timeRemap.keyValue(index) != precompLayer.inPoint && precompLayer.timeRemap.keyValue(index) != precompLayer.outPoint) {
                precompLayer.timeRemap.removeKey(index);
                index = 0;
            }
            index++;
        }

        // if(debug.value) { writeToDebugFile("Finished setting up " + layers[i].name + "\n"); }
    }
    
    //open a comp & its time remap. set playhead to beginning of comp
    twixFolder.item(1).openInViewer();
    var precompedLayer = app.project.activeItem.layers[1];
    precompedLayer.timeRemapEnabled = false;
    precompedLayer.timeRemapEnabled = true;
    comp.time = 0;

    //add a time remap keyframe at first frame
    keyframeButton();
    //make time remap selected
    precompedLayer.timeRemap.selected = true;

    app.endUndoGroup();

    return "Setup Complete!";
}

function nextButton(renderQueue, twixtor) {
    //parse renderQueue & twixtor, which are strings
    // alert("renderqueue: " + typeof(renderQueue) + " " + renderQueue);
    // renderQueue = renderQueue === 'true';
    // alert("twix: " + typeof(twixtor) + " " + twixtor);
    // twixtor = twixtor === 'true';
    //alert("thank u, next");
    //base checks before starting
    // if(debug.value) { writeToDebugFile("Making sure there's an active project...\n"); }
    // Check that a project exists
    if (app.project === null) {
        alert("Project does not exist!");
        return "Project does not exist!";
    }

    // if(debug.value) { writeToDebugFile("Making sure there's an active comp...\n"); }
    // Check that an active comp exists
    if (app.project.activeItem === null) {
        alert("There is no active comp!");
        return "There is no active comp!";
    }

    //alert("collapsing keyframes...");
    //finish old comp
    //collapse all keyframes within the work area
    selectKeysInWorkArea();
    collapseKeyframes();

    app.beginUndoGroup('Twixtor Assistor Next Button');
    //mark it as finished by adding it to the twixtored list & add to render queue
    twixtored.push(app.project.activeItem);
    //alert("renderqueue: " + typeof(renderQueue) + " " + renderQueue);
    if(renderQueue == true) {
        alert("rendering queue");
        app.executeCommand(app.findMenuCommandId("Add to Render Queue"));
        alert("done");
    }
    //alert("twix: " + typeof(twixtor) + " " + twixtor);
    if(twixtor == true) {
        //alert("twixtoring...");
        app.project.activeItem.layers[1]("Effects").addProperty("Twixtor Pro");
        try {
            app.project.activeItem.layers[1].Effects("Twixtor Pro")("In FPS is Out FPS").setValue(0);
        } catch (e) {}
        try {
            app.project.activeItem.layers[1].Effects("Twixtor Pro")("Output Control")("Time Remap Mode").setValue("1");
        } catch (e) {}
        app.project.activeItem.layers[1].Effects("Twixtor Pro")("Input: Frame Rate").setValue(23.976);
        //alert("done");
    }

    //alert("finding next comp...");
    //find next comp

    //relocate twixFolder if necessary
    var comp = app.project.activeItem;
    if(twixFolder == null) {
        for(var i=1; i < app.project.items.length+1; i++) {
            if(app.project.items[i] instanceof FolderItem && app.project.items[i].name == "Twixtor Precomps") {
                twixFolder = app.project.items[i];
            }
        }
    }
    //alert("twixFolder: " + twixFolder.name);
    if(twixFolder == null) { //it doesnt exist
        return "Did not run setup!";
    }

    if(twixFolder.numItems == twixtored.length) {
        return "Twixtoring already completed!";
    }

    var found;
    var possible;
    for(var i=1; i <= twixFolder.numItems; i++) {
        possible = twixFolder.item(i);
        found = false;
        for(var j=0; j < twixtored.length; j++) {
            if(possible == twixtored[j]) {
                found = true;
            }
        }
        if(found == false) {
            break;
        }
    }
    //alert("found next comp " + possible.name);
    //setup new comp
    possible.openInViewer();
    app.project.activeItem.layers[1].timeRemapEnabled = false;
    app.project.activeItem.layers[1].timeRemapEnabled = true;
    comp.time = 0;

    //add a time remap keyframe at first frame
    keyframeButton();
    //make time remap selected
    app.project.activeItem.layers[1].timeRemap.selected = true;
    app.endUndoGroup();
    
    return "Next comp";
}

function backButton() {
    var comp = app.project.activeItem;
    if(comp.time > 0) {
        comp.time -= comp.frameDuration;
    }
    return "Back 1 frame";
}

function forwardButton() {
    var comp = app.project.activeItem;
    if(comp.time < comp.duration + comp.displayStartTime) {
        comp.time += comp.frameDuration;
    }
    return "Forward 1 frame";
}

function keyframeButton() {
    var layers = app.project.activeItem.selectedLayers;
    var comp = app.project.activeItem;
    var kfExists = false;
    // alert("comp.name: " + comp.name);
    // alert("layers.length: " + layers.length);
    // alert("comp layers: " + comp.layers.length);
    if(layers.length == 1) {
        if(layers[0].timeRemapEnabled == false) {
            layers[0].timeRemapEnabled == true;
        }

        //if there's already a kf at the current frame remove it
        for(var i=1; i < layers[0].timeRemap.numKeys+1; i++) {
            if(layers[0].timeRemap.keyTime(i) == comp.time) {
                kfExists = true;
                layers[0].timeRemap.removeKey(i);
            }
        }
        // alert("comp.time: " + comp.time);
        // alert("time remap val at comp.time: " + layers[0].timeRemap.valueAtTime(comp.time));
        if(!kfExists) {
            layers[0].timeRemap.setValueAtTime(comp.time, layers[0].timeRemap.valueAtTime(comp.time, true));
        }
    } else if(comp.layers.length == 1) {
        if(comp.layer(1).timeRemapEnabled == false) {
            comp.layer(1).timeRemapEnabled = true;
        }
        //if there's already a kf at the current frame remove it
        for(var i=1; i < comp.layer(1).timeRemap.numKeys+1; i++) {
            if(comp.layer(1).timeRemap.keyTime(i) == comp.time) {
                kfExists = true;
                comp.layer(1).timeRemap.removeKey(i);
            }
        }

        // alert("comp.time: " + comp.time);
        // alert("time remap val at comp.time: " + comp.layer(1).timeRemap.valueAtTime(comp.time, true));
        if(!kfExists) {
            comp.layer(1).timeRemap.setValueAtTime(comp.time, comp.layer(1).timeRemap.valueAtTime(comp.time, true));
        }
    } else {
        return "Too many layers!";
    }
    return "Keyframed!";
}

//checks if Twixtor is installed
function checkForTwixtor(){
    var effects = app.effects;
    for (var i = 0; i < effects.length; i++){
        if (effects[i].displayName == "Twixtor Pro") {
            return true;
        }
    }
    return false;
}

function collapseKeyframes() {
    //alert("collapsekfs.");
    //initalize important variables
    var properties = [app.project.activeItem.layer(1).timeRemap]; //selected properties
    var comp = app.project.activeItem;
    var compfps = comp.frameRate;
    var activeKeys = 0;
    var prop;
    var keys;

    //we can't just read then modify per property because it deselects the selected keys
    //we need to read and save all the selected keys then go modify them
    
    //read time
    //would've used lists here but they dont always mantain order so dicts it is
    var selectedKeys = {};
    var selectedProps = {};
    for(var i=0; i < properties.length; i++) {
        //get the current prop and respective keys
        prop = properties[i];
        //do a deep copy of the keys so it doesn't get modified when keys get added/removed
        keys = [];
        for(var j=0; j < prop.selectedKeys.length; j++) {
            keys[j] = prop.selectedKeys[j];
        }
        //add to respective dicts
        selectedProps[i] = prop;
        selectedKeys[i] = keys;
    }

    //alert("keys: " + properties[0].selectedKeys.length);
    activeKeys = properties[0].selectedKeys.length;

    //write/mod time
    //for each property if there are multiple rows of keyframes selected
    for(var i=0; i < properties.length; i++) {
        prop = selectedProps[i];
        keys = selectedKeys[i];
        if(keys[1] == undefined) {
            //there's 0 or 1 keys selected for this property, so do nothing
        } else if(keys[1] == null) {
            var keyAttributes = getKeyAttributes(prop, 1);
            prop.removeKey(1);
            makeKeyWithAttributes(prop, keyAttributes, 0);
        } else {
            var frameCounter = 1;
            //loop through all the keys in the specific property
            for(var j=keys[1]; j <= keys[keys.length-1]; j++) {
                //alert("keyVal: " + prop.keyValue(j) + "\nkeyTime: " + prop.keyTime(j) + "\nnew keyTime: " + ((frameCounter)/compfps));
                //you can't "move" a key, you can only make a new one and delete the old ones
                //get key time before moving it
                var keyAttributes = getKeyAttributes(prop, j);
                //delete original keyframe
                prop.removeKey(j);
                //makeKeyAtTime(prop, keyAttributes, firstKeyframeTime+((frameCounter)/compfps));
                makeKeyWithAttributes(prop, keyAttributes, ((frameCounter)/compfps));
                frameCounter++;
            }
        }
    }

    if(activeKeys > 0) {
        comp.duration = (activeKeys)/comp.frameRate;
    }

    app.endUndoGroup();
    //alert("leaving collapse kfs");
}

/**
 * Selects all keyframes in the work area
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.2.2
 */
//modified by me, ahrevolvers
function selectKeysInWorkArea() {
    var addToSelection = false;
  
    var comp = app.project.activeItem;
  
    if (!(comp && comp instanceof CompItem)) {
      alert('Please select a composition!');
      return;
    }
  
    var targetProps = [];
  
    var timeRange = {
      start: comp.workAreaStart,
      end: comp.workAreaStart + comp.workAreaDuration,
    };
  
    forAllLayersOfComp(comp, function (layer) {
      targetProps = targetProps.concat(getKeyedProp(layer));
    });
  
    //app.beginUndoGroup('Select Keys In Work Area');
  
    forAllItemsInArray(targetProps, function (prop) {
      if (prop.isSeparationLeader && prop.dimensionsSeparated) {
        return;
      }
  
      if (!prop.canSetExpression) {
        return;
      }
  
      if (!addToSelection) {
        deselectKeys(prop);
      }
  
      var keyIndexStart = prop.nearestKeyIndex(timeRange.start);
      if (prop.keyTime(keyIndexStart) < timeRange.start) {
        keyIndexStart++;
      }
  
      var keyIndexEnd = prop.nearestKeyIndex(timeRange.end);
      if (prop.keyTime(keyIndexEnd) > timeRange.end) {
        keyIndexEnd--;
      }
  
      for (var ii = keyIndexStart; ii <= keyIndexEnd; ii++) {
        prop.setSelectedAtKey(ii, true);
      }
    });
}

function getKeyedProp(sourcePropGroup) {
    var arr = [];

    forAllPropsInGroup(sourcePropGroup, function (prop) {
        if (isPropGroup(prop)) {
            arr = arr.concat(getKeyedProp(prop));
        } else if (isKeyed(prop)) {
            arr.push(prop);
        }
    });

    return arr;
}

/**
 * Checks whether a property is a prop group
 *
 * @param {PropertyGroup | Property} prop Property to check
 * @returns {boolean}                     Whether prop is a group
 */
function isPropGroup(prop) {
    return (
        prop.propertyType === PropertyType.INDEXED_GROUP ||
        prop.propertyType === PropertyType.NAMED_GROUP
    );
}

/**
 * Checks whether a property has keys
 *
 * @param {Property} prop Property to check
 * @returns {boolean}     Whether property has keys
 */
function isKeyed(prop) {
    return (
        prop.propertyType === PropertyType.PROPERTY &&
        prop.isTimeVarying &&
        prop.numKeys > 0
    );
}

/**
 * Deselects keys on a property
 *
 * @param {Property} prop Property to check
 */
function deselectKeys(prop) {
    for (var ii = 1, il = prop.numKeys; ii <= il; ii++) {
        prop.setSelectedAtKey(ii, false);
    }
}

/**
 * Runs a function on all properties in a group
 *
 * @param {PropertyGroup} propGroup Property group to run callback on
 * @param {function} callback       Callback function
 */
function forAllPropsInGroup(propGroup, callback) {
    for (var ii = 1, il = propGroup.numProperties; ii <= il; ii++) {
        var thisProp = propGroup.property(ii);
        callback(thisProp);
    }
}
/**
 * Runs a function on all items in an array
 *
 * @param {any[]} array       Array to run callback on
 * @param {function} callback Callback function
 */
function forAllItemsInArray(array, callback) {
    for (var ii = 0, il = array.length; ii < il; ii++) {
        var thisItem = array[ii];
        callback(thisItem);
    }
}

/**
 * Runs a function on all layers in an comp
 *
 * @param {CompItem} comp     Comp to run callback on
 * @param {function} callback Callback function
 */
function forAllLayersOfComp(comp, callback) {
    for (var ii = 1, il = comp.layers.length; ii <= il; ii++) {
        var thisLayer = comp.layers[ii];
        callback(thisLayer);
    }
}

//next functions are written by stibinator
//source: https://github.com/stibinator/AEScripts/blob/master/Stibs%20AEScripts/(lib)/copyproperties-makekey.jsx
//protected under gpl license
function getKeyAttributes(theProperty, keyIndex) {
    //in lieu of a proper keyframe object this returns all the details of a keyframe, given a property and key index.
    var theAttributes = {};
    theAttributes.keyTime = theProperty.keyTime(keyIndex);
    theAttributes.keyVal = theProperty.keyValue(keyIndex);
    theAttributes.canInterp =
        theProperty.isInterpolationTypeValid(
            KeyframeInterpolationType.BEZIER
        ) ||
        theProperty.isInterpolationTypeValid(KeyframeInterpolationType.HOLD) ||
        theProperty.isInterpolationTypeValid(KeyframeInterpolationType.LINEAR);
    if (theAttributes.canInterp) {
        theAttributes.keyInInterpolationType =
            theProperty.keyInInterpolationType(keyIndex);
        theAttributes.keyOutInterpolationType =
            theProperty.keyOutInterpolationType(keyIndex);
        if (theAttributes.keyInInterpolationType) {
            theAttributes.keyInTemporalEase =
                theProperty.keyInTemporalEase(keyIndex);
            theAttributes.keyOutTemporalEase =
                theProperty.keyOutTemporalEase(keyIndex);
        }
    }

    if (theAttributes.isSpatial) {
        theAttributes.keyInSpatialTangent =
            theProperty.keyInSpatialTangent(keyIndex);
        theAttributes.keyOutSpatialTangent =
            theProperty.keyOutSpatialTangent(keyIndex);
    }
    return theAttributes;
}
    
function makeKeyWithAttributes(theProperty, keyAttributes, keyTime) {
    //turns theAttributes from getKeyAttributes into a new keyframe
    if (theProperty.canVaryOverTime) {
        try {
            theProperty.setValueAtTime(keyTime, keyAttributes.keyVal);
            var newKeyIndex = theProperty.nearestKeyIndex(keyTime); //I wish Adobe would just make a keyframe class

            if (keyAttributes.canInterp) {
                theProperty.setTemporalEaseAtKey(
                    newKeyIndex,
                    keyAttributes.keyInTemporalEase,
                    keyAttributes.keyOutTemporalEase
                );
                //important to do this after setting the temporal ease, or it turns all keyframes into bezier interpolation
                theProperty.setInterpolationTypeAtKey(
                    newKeyIndex,
                    keyAttributes.keyInInterpolationType,
                    keyAttributes.keyOutInterpolationType
                );
            }

            //theProperty.setInterpolationTypeAtKey(theAttributes.keyInInterpolationType-6412, theAttributes.keyOutInterpolationType-6412); //WTF Javascript?
            if (keyAttributes.isSpatial) {
                theProperty.setSpatialTangentsAtKey(
                    newKeyIndex,
                    keyAttributes.keyInSpatialTangent,
                    keyAttributes.keyOutSpatialTangent
                );
            }
            return newKeyIndex;
        } catch (e) {
            return false;
        }
    } else {
        return false;
    }
}
"object" != typeof JSON && (JSON = {}), function () { "use strict"; var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta, rep; function f(t) { return t < 10 ? "0" + t : t } function this_value() { return this.valueOf() } function quote(t) { return rx_escapable.lastIndex = 0, rx_escapable.test(t) ? '"' + t.replace(rx_escapable, function (t) { var e = meta[t]; return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + t + '"' } function str(t, e) { var r, n, o, u, f, a = gap, i = e[t]; switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(t)), "function" == typeof rep && (i = rep.call(e, t, i)), typeof i) { case "string": return quote(i); case "number": return isFinite(i) ? String(i) : "null"; case "boolean": case "null": return String(i); case "object": if (!i) return "null"; if (gap += indent, f = [], "[object Array]" === Object.prototype.toString.apply(i)) { for (u = i.length, r = 0; r < u; r += 1)f[r] = str(r, i) || "null"; return o = 0 === f.length ? "[]" : gap ? "[\n" + gap + f.join(",\n" + gap) + "\n" + a + "]" : "[" + f.join(",") + "]", gap = a, o } if (rep && "object" == typeof rep) for (u = rep.length, r = 0; r < u; r += 1)"string" == typeof rep[r] && (o = str(n = rep[r], i)) && f.push(quote(n) + (gap ? ": " : ":") + o); else for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (o = str(n, i)) && f.push(quote(n) + (gap ? ": " : ":") + o); return o = 0 === f.length ? "{}" : gap ? "{\n" + gap + f.join(",\n" + gap) + "\n" + a + "}" : "{" + f.join(",") + "}", gap = a, o } } "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value), "function" != typeof JSON.stringify && (meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, JSON.stringify = function (t, e, r) { var n; if (indent = gap = "", "number" == typeof r) for (n = 0; n < r; n += 1)indent += " "; else "string" == typeof r && (indent = r); if ((rep = e) && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify"); return str("", { "": t }) }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) { var j; function walk(t, e) { var r, n, o = t[e]; if (o && "object" == typeof o) for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (void 0 !== (n = walk(o, r)) ? o[r] = n : delete o[r]); return reviver.call(t, e, o) } if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (t) { return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({ "": j }, "") : j; throw new SyntaxError("JSON.parse") }) }();
var twixFolder;

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
    for(var i=0; i > app.project.items.length; i++) {
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
    precompedLayer.timeRemap.setValueAtTime(comp.time, precompedLayer.timeRemap.valueAtTime(comp.time));

    app.endUndoGroup();

    return "Setup Complete!";
}

function nextButton() {
    alert("thank u, next");
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
    // alert("comp.name: " + comp.name);
    // alert("layers.length: " + layers.length);
    // alert("comp layers: " + comp.layers.length);
    if(layers.length == 1) {
        if(layers[0].timeRemapEnabled == false) {
            layers[0].timeRemapEnabled == true;
        }
        // alert("comp.time: " + comp.time);
        // alert("time remap val at comp.time: " + layers[0].timeRemap.valueAtTime(comp.time));
        layers[0].timeRemap.setValueAtTime(comp.time, layers[0].timeRemap.valueAtTime(comp.time));
    } else if(comp.layers.length == 1) {
        if(comp.layer(1).timeRemapEnabled == false) {
            comp.layer(1).timeRemapEnabled = true;
        }
        // alert("comp.time: " + comp.time);
        // alert("time remap val at comp.time: " + comp.layer(1).timeRemap.valueAtTime(comp.time, true));
        comp.layer(1).timeRemap.setValueAtTime(comp.time, comp.layer(1).timeRemap.valueAtTime(comp.time, true));
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
Video editors who slow down animated clips tend to use a combination of Twixtor and Flowframes in order to generate the missing frames. However, because animation usually happens every second or third frame, they tend to collapse the animated frames before interpolation for a smoother continuous motion. This tool assists users in speeding up this process.

# TwixtorAssistor
Assists users with frame interpolation within After Effects, specifically catered to those who use the plugin Twixtor and/or the standalone software Flowframes with it. 

![AfterFX_2022-12-19_15-42-56](https://user-images.githubusercontent.com/70022209/208525146-91c6e79c-4313-4432-8839-31f7c46a00af.png)

## Prerequisites
A copy of Adobe After Effects, preferably from 2018 or older.

## Installation Method
Download the repo and drop the Twixtor Assistor folder in `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\TwixtorAssistor`
Open After Effects and load the extension via Window > Extensions > Twixtor Assistor in the top left.

## Usage
Select the extension to use the keybinds. You can also change the keybinds when they are enabled.
To see a list of all the available keybinds, click "Enable custom binds?". You can press the back button to go back to the main script.

![2022-12-19_16-18-44](https://user-images.githubusercontent.com/70022209/208525949-414b399a-258c-4bf5-83e6-dd917fbc4062.gif)

## Flowframes Replacer
This extension is accompanied by a script that you can find in the base directory named ahr_flowframesReplacer. This script is meant to be used in tandem with Twixtor Assistor. After using the extension, processing all of the Twixtor precomps, and sending all of the precomps to render queue, users may choose to use Flowframes on these clips to enhance clip fps. When importing, you may use this script to mass replace the original keyframed layers with the Flowframed ones and apply Twixtor to them.

#### Installation
Place in your Scripts folder (`C:\Program Files\Adobe\Adobe After Effects 2021\Support Files\Scripts`).

#### Usage
Open After Effects, import the Flowframed clips in the project with the Twixtor precomps, and run the script via File > Scripts in the top left.

#### Disclaimer
Flowframes Replacer works by identifying filenames and matching them to the Twixtor precomp names. Because of this, the names of the rendered files and Flowframed files must stay the same in order for this to work properly. Twixtor Assistor additionally assists in this by ensuring all precomp names are unique.

## Further Reading
Lolligerjoj's Twixtor Guide: https://lolligerjoj.wordpress.com/2016/10/22/twixtor-on-anime-footage-and-ae-workflow-using-twixtor/

Example of a workflow using Twixtor and Flowframes: https://www.youtube.com/watch?v=8ULELcH6RI4&

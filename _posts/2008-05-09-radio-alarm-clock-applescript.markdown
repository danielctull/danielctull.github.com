---
layout: post
title: Radio Alarm Clock Applescript
---

Getting back to uni a couple of weeks ago, my radio alarm clock died. I'm not sure what is wrong with it, but for a week I was being woken by the sound of my mobile phone alarm. I found myself missing the sound of [Chris Moyles](http://www.bbc.co.uk/radio1/chrismoyles/) in the morning, so what does any self respecting geek do? I write a script to turn my laptop into a radio alarm clock, with the help of [EyeTV](http://www.elgato.com).

    set volume 2.5

    set today to date string of (current date)

    set title_to_play to "Chris Moyles"

    tell application "EyeTV

        activate

        volume_change level 1

        set no_recordings to number of items in recordings

        set i to 0

        repeat until i is equal to no_recordings

            set i to i + 1

            set recording_item to item i of recordings

            set recording_time to start time of recording_item

            if date string of (recording_time) is equal to today then

                if title of recording_item contains title_to_play then

                    play recording_item

                end if

            end if

        end repeat

    end tell

Firstly, it sets the volume, so I can have my Mac muted through the night and when the script is activated, the volume will be turned up. It then sets the date to a string and we give a name which needs to be in the title of recordings we wish to play. The script then loops through all the recordings to find any made today. When it finds one, which also contains "Chris Moyles" in the title, we tell EyeTV to play it.

You could look for any string or take out the check completely to play all of today's recordings.

You also need to set up a schedule in EyeTV to record the shows you want to play back, making sure that they start recording before you want to be woken up. In the event that EyeTV didn't record (through error or Moyles not actually being on) I have extended the script by adding the following if no recordings were found.

    tell application "iTunes"

        activate

        play playlist "Party Shuffle"

    end tell

This will play my party shuffle playlist in iTunes so I'll always have something to wake up to.

At the moment, I'm triggering this script using an event in iCal, using the "Run Script" option in the alarms section. I'm trying to find a better solution to this, so if anyone has any suggestions, please post them.

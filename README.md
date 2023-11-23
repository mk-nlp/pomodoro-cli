# pomodoro-cli
A simple CLI Pomodoro Technique timer that also plays music from Youtube Music - built with Node.js 

## Features
- Simple CLI interface
- Stores time spent on each project
- Plays alarm sound when timer is up
- Plays music from YouTube Music
- Supports albums and songs
- Supports multiple projects
- Prompts user to take a break after each timer
- Programmed by a noob (me) - so it's probably not the best code
- Free and open source
- Cross platform
- No ads
- No tracking
- No data collection
- No user accounts
- No sign up
- No email
- No passwords
- You get the idea
- It's just a simple CLI Pomodoro Technique timer that also plays music from Youtube Music
- That's it
- Nothing more
- Nothing less
- But also lots of love and care

## Installation
```bash
npm install -g pomodoro-cli
```

## Usage
```bash
pomodoro-cli [options]
```

## Options
```
      --help         Show help                                         [boolean]
      --version      Show version number                               [boolean]
  -n, --name         project name                                       [string]
  -t, --timer        Timer (minutes)                                    [number]
  -l, --list         List projects                                     [boolean]
  -c, --clear        Clear projects                                    [boolean]
  -y, --youtube      Youtube                                            [string]
  -a, --album        Album                                              [string]
      --ab, --about  About                                             [boolean]

```

## Examples
```bash
pomodoro-cli -n "My Project" -t 25

pomodoro-cli -n "My Project" -t 25 -y "doja cat - say so"

pomodoro-cli -n "My Project" -t 25 -a "doja cat - hot pink"

```



## About
This is a simle CLI pomodoro timer built with Node.js. It uses yargs to parse command line arguments. It also uses boxen and chalk to style the output. The music options use puppeteer to open YouTube Music in a headless browser and play the specified song or album. The puppeteer is a bit slow to load, so it's not ideal for short timers. The pupeeteer also has an adblocker extension installed, so it will not play ads. Initially, I had planned to use the Spotify API, but decided against it because it would require the user to have a Spotify account (premium) and I wanted to keep this as simple as possible. The YouTube Music API is not public, so I had to use puppeteer to automate the browser. This program also stores the amount of time spent on each project in a JSON file. The JSON file is stored in the path which the pomodoro-cli command was used.

## Limitations
Since music is played in a headless browser, the songs might not match with user input. For example, if the user inputs "doja cat - say so", the song that plays might not be the official music video. This is because the YouTube Music search results are not always consistent. I tried to mitigate this by using the first result, but it's not perfect. However, I think it's good enough for now, and providing more context to the search query (e.g. "doja cat - say so official music video") will help to get the desired result. Also, any changes to the YouTube Music website will break the music player functionality of the program. I will try to keep this program up to date, but I can't guarantee that it will work in the future. If you notice the music player is not working, please open an issue and I will try to fix it as soon as possible. Theroetically, this program should work on all major platforms, but I have only tested it on Linux and MacOS. If you have any issues running this program on Windows, please open an issue and I will try to fix it as soon as possible.

## External Dependencies
The following external dependencies are required to run this program:
- cvlc (VLC media player)
This application uses the cvlc command to play the alarm sound. If VLC media player is not installed, the alarm will not play. The reason I chose VLC media player is because it's free and open source. It's also available on all major platforms, and also because there was no native option to play audio files from the command line in Linux. I am aware of the possiblities of using the native command line audio player in MacOS and Windows, but I wanted to keep this program as platform agnostic as possible, so I chose VLC media player. If need be, I can add support for other audio players in the future.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Roadmap
- Add support for other audio players
- Add support for other music streaming services
- Add support for other languages
- Add support for other time formats (e.g. seconds, hours)

## Acknowledgements
- [yargs](https://www.npmjs.com/package/yargs)
- [boxen](https://www.npmjs.com/package/boxen)
- [chalk](https://www.npmjs.com/package/chalk)
- [puppeteer](https://www.npmjs.com/package/puppeteer)
- [cvlc](https://www.videolan.org/vlc/index.html)
- [play-sound](https://www.npmjs.com/package/play-sound)
- [puppeteer-extra](https://www.npmjs.com/package/puppeteer-extra)
- [puppeteer-extra-plugin-adblocker](https://www.npmjs.com/package/puppeteer-extra-plugin-adblocker)
- [puppeteer-extra-plugin-stealth](https://www.npmjs.com/package/puppeteer-extra-plugin-stealth)

## Shoutouts
- [The Odin Project](https://www.theodinproject.com/)

## Note
This is my first Node.js project, so I'm sure there are better ways to do things. If you have any suggestions, please let me know. I'm open to any feedback.

## Author
- mk-nlp (Mert Kısacık)

## License
[MIT](https://choosealicense.com/licenses/mit/)




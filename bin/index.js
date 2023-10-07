#!/usr/bin/env node
const chalk = require('chalk');
const boxen = require('boxen');
const yargs = require('yargs');
const fs = require('fs');
const { exit } = require('process');
const puppeteer = require('puppeteer-extra');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');




const options = yargs
    .usage("Usage: -n <name>")
    .usage("Usage: -t <timer>")
    .usage("Usage: -li <list>")
    .usage("To start timer: -n <name> -t <timer>")
    .usage("To start timer with youtube music: -n <name> -t <timer> -y \"song name - artist\"")
    .option("n", { alias: "name", describe: "project name", type: "string", demandOption: false })
    .option("t", { alias: "timer", describe: "Timer (minutes)", type: "number", demandOption: false })
    .option("l", { alias: "list", describe: "List projects", type: "boolean", demandOption: false })
    .option("c", { alias: "clear", describe: "Clear projects", type: "boolean", demandOption: false })
    .option("y", { alias: "youtube", describe: "Youtube", type: "string", demandOption: false })
    .option("a", { alias: "album", describe: "Album", type: "string", demandOption: false })
    .argv;



const greetingSection = () => {
    const greeting = "Hello, Welcome to pomodoro-cli";
    const greetingBox = boxen(greeting, boxenOptions);
    console.log(greetingBox);

    if (options.name) {
        console.log(chalk.white.bold('Hello, ') + chalk.yellow.bold(options.name));
    }

    if (options.timer) {
        console.log(chalk.white.bold('Timer: ') + chalk.yellow.bold(options.timer));
    }

    if (options.name && options.timer) {
        console.log(chalk.white.bold('Hello, ') + chalk.yellow.bold(options.name) + chalk.white.bold(' Timer: ') + chalk.yellow.bold(options.timer));
    }

    if (!options.name && !options.timer) {
        console.log(chalk.white.bold('Hello, ') + chalk.yellow.bold(' Timer: ') + chalk.yellow.bold(options.timer));
    }

    askQuestion();

}

const askQuestion = () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readline.question(`What project are you working on?: `, name => {
        console.log(`Starting work on ${name}!`)
        readline.question(`What's your timer?: `, time => {
            console.log(`Setting pomodoro for  ${time} minutes!`)
            options.timer = time;
            options.name = name;
            timer(options);
        })
    })
}





const greeting = chalk.white.bold('Hello, ') + chalk.yellow.bold(options.name);

const boxenOptions = {
    padding: 5,
    margin: 1,
    borderStyle: "double",
    borderColor: "green",
    backgroundColor: "#ed4747",
    width: 150,
    align: "center",
    dimBorder: true,
    float: "center"

};

const timer = (options) => {
    let seconds = options.timer * 60;
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })
    saveTimeToJson();
    function updateBoxen() {
        const updatedContent = chalk.white.bold('Timer: ') + chalk.green.bold(seconds) + " " + '\uD83C\uDF45';
        console.clear();
        console.log(boxen(updatedContent, boxenOptions));
        if (options.youtube) {
        console.log(boxen('Playing ' + options.youtube + ' on Youtube Music...', { padding: 1, borderColor: 'green', borderStyle: 'bold', align: 'center', dimBorder: true, float: 'center', backgroundColor: '#097969', color: 'white' }));
        }
        if (options.album) {
            console.log(boxen('Playing ' + options.album + ' album on Youtube Music...', { padding: 1, borderColor: 'green', borderStyle: 'bold', align: 'center', dimBorder: true, float: 'center', backgroundColor: '#097969', color: 'white' }));
            }

    }
    let interval = setInterval(() => {
        seconds--;
        updateBoxen();
        if (seconds === 0) {
            clearInterval(interval);
            playSound();
            console.log('Time is up!');
            readline.question(`Want a break? (y/n) `, answer => {
                if (answer === 'y') {
                    console.log('Okay taking a five minute break!');
                    let breakTime = 5 * 60;
                    setInterval(() => {
                        breakTime--;
                        const updatedContent = chalk.white.bold('Break: ') + chalk.green.bold(breakTime) + " " + '\uD83C\uDF45';
                        console.clear(); 
                        console.log(boxen(updatedContent, boxenOptions));
                        if (breakTime === 0) {
                            clearInterval(interval);
                            playSound();
                            console.log('Start a new session when you feel like working more.');
                            exit();
                            
                        }
                    }
                        , 1000);
                    readline.close()
                } else {
                    console.log('Start a new session when you feel like working more.');
                    readline.close()
                    exit();
                }
            })
        }
    }, 1000);
}

const playSound = () => {
    const bellSound = require('play-sound')(opts = {})
    bellSound.play('./bin/bell.mp3', function (err) {
        if (err) throw err
    })
    

}




const saveTimeToJson = () => {
    let json = {};

    if (fs.existsSync('test.json')) {
        // console.log(boxen(chalk.white.bold('Projects present in your filesystem:'), boxenOptions));
        const data = fs.readFileSync('test.json');
        json = JSON.parse(data);
    }

    const doesProjectExist = json.projects?.some(project => project.name === options.name);

    if (doesProjectExist) {
        json.projects.forEach(project => {
            if (project.name === options.name) {
                project.time = Number(project.time) + Number(options.timer);
            }
        });
    } else {
        const newProject = {
            id: (json.projects?.length || 0) + 1,
            name: options.name,
            time: Number(options.timer)
        };

        if (!json.projects) {
            json.projects = [];
        }

        json.projects.push(newProject);
    }

    fs.writeFileSync('test.json', JSON.stringify(json));
    const projectInfo = json.projects.map(project => `${project.name} - ${project.time} minutes`);

const boxedOutput = boxen(projectInfo.join('\n'), { padding: 1, borderColor: 'green', borderStyle: 'bold', align: 'center', dimBorder: true, float: 'center', backgroundColor: '#097969', color: 'white' });

// console.log(boxedOutput);
}


const listProjects = () => {
    const doesFileExist = fs.existsSync('test.json');
    if (!doesFileExist) {
        console.log(boxen(chalk.white.bold('No projects present in your filesystem'), boxenOptions));
        return;
    }
    const data = fs.readFileSync('test.json');
    const json = JSON.parse(data);
    const projectInfo = json.projects.map(project => `${project.name} - ${project.time} minutes`);

    const boxedOutput = boxen(projectInfo.join('\n'), { padding: 1, borderColor: 'green', borderStyle: 'bold', align: 'center', dimBorder: true, float: 'center', backgroundColor: '#097969', color: 'white' });
    if (projectInfo.length === 0) {
        console.log(boxen(chalk.white.bold('No projects present in your filesystem'), boxenOptions));
    }
    else {
        console.log(boxedOutput);
    }
}

if (options.list) {
    listProjects();
}

if (options.name && options.timer && !options.youtube) {
    timer(options);
}

if (!options.name && !options.timer && !options.list && !options.clear) {
    console.log("Please supply a command, try using --help for more information")
}



if (!options.name && options.timer) {
    console.log("Supply a project name or try using --help for more information")
}

if (options.name && !options.timer) {
    console.log("Supply a timer or try using --help for more information")
}

if (options.clear) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })
    readline.question(`Are you sure you want to clear all projects? (y/n) `, answer => {
        if (answer === 'y') {
            fs.unlinkSync('test.json');
            console.log('Projects cleared');
            exit();
        } else {
            console.log('Aborted!');
            exit();
        }
    })
    
}



const puppetYoutube = async (options) => {
    puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
    puppeteer.use(stealthPlugin());
    const browser = await puppeteer.launch({
        headless: 'new', 
        ignoreDefaultArgs: ['--mute-audio'],
        args: ['--autoplay-policy=no-user-gesture-required']
      })
    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 720,
    });
    console.log('Navigating to Youtube Music...');
    await page.goto('https://music.youtube.com', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#input.style-scope.ytmusic-search-box');
    // await page.click('input#input.style-scope.ytmusic-search-box');
    await page.evaluate(() => document.querySelector('#input.style-scope.ytmusic-search-box').click());
    await page.focus('input#input.style-scope.ytmusic-search-box');
    await page.type('input#input.style-scope.ytmusic-search-box', options.youtube);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    // await page.click('#play-button > div > yt-icon');
    await page.evaluate(() => document.querySelector("#chips > ytmusic-chip-cloud-chip-renderer:nth-child(1) > div > a > yt-formatted-string").click());
    await page.evaluate(() => document.querySelector("#contents > ytmusic-responsive-list-item-renderer:nth-child(1) > div.flex-columns.style-scope.ytmusic-responsive-list-item-renderer > div.title-column.style-scope.ytmusic-responsive-list-item-renderer > yt-formatted-string > a").click());
    // console.log('Playing ' + options.youtube + ' on Youtube Music...');
    await page.waitForTimeout(99999999)
    await browser.close();

}


if (options.youtube && options.name && options.timer) {
    puppetYoutube(options);
    timer(options);
}



const puppetAlbum = async (options) => {
    puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
    puppeteer.use(stealthPlugin());
    const browser = await puppeteer.launch({
        headless: 'new', 
        ignoreDefaultArgs: ['--mute-audio'],
        args: ['--autoplay-policy=no-user-gesture-required']
      })
    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 720,
    });
    console.log('Navigating to Youtube Music...');
    await page.goto('https://music.youtube.com', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#input.style-scope.ytmusic-search-box');
    // await page.click('input#input.style-scope.ytmusic-search-box');
    await page.evaluate(() => document.querySelector('#input.style-scope.ytmusic-search-box').click());
    await page.focus('input#input.style-scope.ytmusic-search-box');
    await page.type('input#input.style-scope.ytmusic-search-box', options.album);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    // await page.click('#play-button > div > yt-icon');
    await page.evaluate(() => document.querySelector("#contents > ytmusic-card-shelf-renderer > div > div.card-content-container.style-scope.ytmusic-card-shelf-renderer > div.main-card-container.style-scope.ytmusic-card-shelf-renderer > div > div.details-container.style-scope.ytmusic-card-shelf-renderer > div.metadata-container.style-scope.ytmusic-card-shelf-renderer > yt-formatted-string > a").click());
    await page.waitForTimeout(4000);
    await page.evaluate(() => document.querySelector("#top-level-buttons > yt-button-renderer > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill").click());
    // console.log('Playing ' + options.youtube + ' on Youtube Music...');
    await page.waitForTimeout(99999999)
    await browser.close();
}

if (options.album && options.name && options.timer) {
    puppetAlbum(options);
    timer(options);
}


// document.querySelector("#contents > ytmusic-responsive-list-item-renderer:nth-child(1) > div.flex-columns.style-scope.ytmusic-responsive-list-item-renderer > div.title-column.style-scope.ytmusic-responsive-list-item-renderer")
#!/usr/bin/env node

import inquirer from 'inquirer';


console.log(`Welcome to Huncwot CLI Tool v.${process.env.npm_package_version}`);

interface UserResponses {
    howdy?: string;
    action?: string;
    imageActions?: string[];
}

const USER_RESPONSES: UserResponses = {};

const howdyPrompt = {
    name: 'howdy',
    message: 'Howdy!!!',
    default: 'Howdy y\'all!'
};

const proceedPrompt = {
    name: 'proceed',
    type: 'confirm',
    message: 'Anything else I can help you with?',
}

const ACTIONS = [
    'Tell me what date it is.',
    'Process images for me.',
    'Quit program'
]

const actionPrompt = {
    name: 'action',
    type: 'list',
    message: 'What can I do for you?',
    choices: ACTIONS
};

const IMAGEACTIONS = [
    'Resize',
    'Compress',
    'Show information',
    'Exit to Main Menu'
]

const imageActionsPrompt = {
    name: 'imageActions',
    type: 'checkbox',
    message: 'What would you like to do with the images?',
    choices: IMAGEACTIONS
}


async function runImages() {
    const imageActionsResponse = await inquirer.prompt(imageActionsPrompt);
    USER_RESPONSES.imageActions = imageActionsResponse.imageActions;
    console.log(USER_RESPONSES.imageActions);


    if (USER_RESPONSES.imageActions.includes(IMAGEACTIONS[0])) {
        console.log('leeet\'s reeesize!');
    }

    if (USER_RESPONSES.imageActions.includes(IMAGEACTIONS[1])) {
        console.log('leeet\'s compress');
    }

    if (USER_RESPONSES.imageActions.includes(IMAGEACTIONS[2])) {
        console.log('show info.');
    }

    if (USER_RESPONSES.imageActions.includes(IMAGEACTIONS[3])) {
        console.log('Goodbye images!');
    }

}

async function run(initial: boolean = false): Promise<void> {

    const howdyReponse = initial ? await inquirer.prompt(howdyPrompt) : 'xd';
    const actionResponse = await inquirer.prompt(actionPrompt);
    USER_RESPONSES.howdy = howdyReponse.howdy;
    USER_RESPONSES.action = actionResponse.action;



    switch (USER_RESPONSES.action) {
        case ACTIONS[0]:
            const currentDate = new Date().toLocaleDateString('pl-PL');
            console.info("The date today is: ", currentDate);
            break;

        case ACTIONS[1]:
            console.info('images');
            await runImages();
            break;

        case ACTIONS[2]:
            console.info('So long, my friend!');
            process.exit(0);
            break;

        default:
            process.exit(0);
            break;
    }


    (async function shouldProceed() {
        const proceedResponse = await inquirer.prompt(proceedPrompt);
        if (proceedResponse.proceed) {
            run();
        } else {
            console.info('So long, my friend!');
        }
    })()
};

run(true);

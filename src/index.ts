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

const actionPrompt = {
    name: 'action',
    type: 'list',
    message: 'What can I do for you?',
    choices: [
        'Tell me what date it is.',
        'Process images for me.',
        'Quit program'
    ]
};

const imageActionsPrompt = {
    name: 'imageActions',
    type: 'checkbox',
    message: 'What would you like to do with the images?',
    choices: [
        'Compress',
        'Resize',
        'Show information',
        'Exit to Main Menu'
    ]
}

async function runImages() {
    const imageActionsResponse = await inquirer.prompt(imageActionsPrompt);
    USER_RESPONSES.imageActions = imageActionsResponse.imageActions;
    console.log(USER_RESPONSES.imageActions);


    if (USER_RESPONSES.imageActions.includes('Resize')) {
        console.log('leeet\'s reeesize!');
    }

    if (USER_RESPONSES.imageActions.includes('Compress')) {
        console.log('leeet\'s compress');
    }

    if (USER_RESPONSES.imageActions.includes('Show information')) {
        console.log('show info.');
    }

}

async function run(initial: boolean = false): Promise<void> {

    const howdyReponse = initial ? await inquirer.prompt(howdyPrompt) : 'xd';
    const actionResponse = await inquirer.prompt(actionPrompt);
    USER_RESPONSES.howdy = howdyReponse.howdy;
    USER_RESPONSES.action = actionResponse.action;



    switch (USER_RESPONSES.action) {
        case 'Tell me what date it is.':
            const currentDate = new Date().toLocaleDateString('pl-PL');
            console.info("The date today is: ", currentDate);
            break;

        case 'Process images for me.':
            console.info('images');
            await runImages();
            break;

        case 'We\'re done here, let me go':
            console.info('So long, my friend!');
            process.exit(0);
            break;

        default:
            process.exit(0);
            break;
    }

    run();
};

run(true);

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from 'inquirer';
console.log(`Welcome to Huncwot CLI Tool v.${process.env.npm_package_version}`);
const USER_RESPONSES = {};
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
};
function runImages() {
    return __awaiter(this, void 0, void 0, function* () {
        const imageActionsResponse = yield inquirer.prompt(imageActionsPrompt);
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
    });
}
function run(initial = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const howdyReponse = initial ? yield inquirer.prompt(howdyPrompt) : 'xd';
        const actionResponse = yield inquirer.prompt(actionPrompt);
        USER_RESPONSES.howdy = howdyReponse.howdy;
        USER_RESPONSES.action = actionResponse.action;
        switch (USER_RESPONSES.action) {
            case 'Tell me what date it is.':
                const currentDate = new Date().toLocaleDateString('pl-PL');
                console.info("The date today is: ", currentDate);
                break;
            case 'Process images for me.':
                console.info('images');
                yield runImages();
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
    });
}
;
run(true);
//# sourceMappingURL=index.js.map
#!/usr/bin/env node
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
const proceedPrompt = {
    name: 'proceed',
    type: 'confirm',
    message: 'Anything else I can help you with?',
};
const ACTIONS = [
    'Tell me what date it is.',
    'Process images for me.',
    'Quit program'
];
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
];
const imageActionsPrompt = {
    name: 'imageActions',
    type: 'checkbox',
    message: 'What would you like to do with the images?',
    choices: IMAGEACTIONS
};
function runImages() {
    return __awaiter(this, void 0, void 0, function* () {
        const imageActionsResponse = yield inquirer.prompt(imageActionsPrompt);
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
    });
}
function run(initial = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const howdyReponse = initial ? yield inquirer.prompt(howdyPrompt) : 'xd';
        const actionResponse = yield inquirer.prompt(actionPrompt);
        USER_RESPONSES.howdy = howdyReponse.howdy;
        USER_RESPONSES.action = actionResponse.action;
        switch (USER_RESPONSES.action) {
            case ACTIONS[0]:
                const currentDate = new Date().toLocaleDateString('pl-PL');
                console.info("The date today is: ", currentDate);
                break;
            case ACTIONS[1]:
                console.info('images');
                yield runImages();
                break;
            case ACTIONS[2]:
                console.info('So long, my friend!');
                process.exit(0);
                break;
            default:
                process.exit(0);
                break;
        }
        (function shouldProceed() {
            return __awaiter(this, void 0, void 0, function* () {
                const proceedResponse = yield inquirer.prompt(proceedPrompt);
                if (proceedResponse.proceed) {
                    run();
                }
                else {
                    console.info('So long, my friend!');
                }
            });
        })();
    });
}
;
run(true);
//# sourceMappingURL=index.js.map
const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
    {
        type: "input",
        name: "title",
        message: "Title of your project",
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log("Please enter your project title!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "description",
        message: "Project description",
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log("Please enter a description of your project!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "install",
        message: "Installation instructions",
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log("Please enter the installation instructions for your project!");
                return false;
            }
        }

    },
    {
        type: "input",
        name: "usage",
        message: "Usage instructions",
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log("Please enter the useage instructions for your project!");
                return false;
            }
        }
    },
    {
        type: "checkbox",
        name: "license",
        message: "Project license (Choose one)",
        choices: ["Apache License 2.0", "GNU General Public Lincese v3.0", "MIT License", "BSD 2-Clause 'Simplififed' License", "BSD 3-Clause 'New' or 'Revised' License", "Boost Software License 1.0", "Creative Commons Zero v1.0 Universal", "Eclipse Public License 2.0", "GNU Affero General Public License v3.0", "GNU General Public License v.2.0", "GNU Lesser General Public License v2.1", "Mozilla Public License 2.0", "The Unlicense"],
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log("Please choose a license for your program!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "contribution",
        message: "Names of contributors, separated by commas",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter your name!");
                return false;
            }
        }
    },
    {// not really sure what to put here yet
        type: "input",
        name: "tests",
        message: "Project tests",
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log("Please enter your project tests!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "questions",
        message: "Contact information",
        validate: questionsInput => {
            if (questionsInput) {
                return true;
            } else {
                console.log("Please enter your name!");
                return false;
            }
        }
    },
];

// TODO: Create a function to write README file
function writeToFile(data) {
    const { title, description, ...tableOfCont } = data;
    return `
# ${title}
## Description
${description}
## Table of Contents
- [Installation](##-Installation)
- [Usage](##-Usage)
- [License](##-License)
- [Contributing](##-Contributing)
- [Tests](##-Tests)
- [Questions](##-Questions)
## Installation
${tableOfCont.install}
## Usage
${tableOfCont.usage}
## License
${tableOfCont.license}
## Contributing
${tableOfCont.contributions}
## Tests
${tableOfCont.tests}
## Questions
${tableOfCont.questions}
`
}

// TODO: Create a function to initialize app
function init() {
    return inquirer
        .prompt(questions);
}

// Function call to initialize app
init()
    .then( userInput => {
        return writeToFile(userInput);
    })
    .then( writtenFile => {
        return new Promise((resolve, reject) => {
            fs.writeFile("./dist/README.md", writtenFile, err => {
                if (err) {
                    reject(err);
                    return;
                } else {
                    console.log("README created!");
                }
            });
        });
    });
    

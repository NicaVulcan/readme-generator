const inquirer = require("inquirer");
const fs = require("fs");

// questions + validations
const questions = [
    {
        type: "input",
        name: "title",
        message: "Title of your project:",
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
        message: "Describe your project:",
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
        message: "Installation instructions:",
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
        message: "Application instructions:",
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
        message: "Choose one license for your project",
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
        name: "contributing",
        message: "How do you wish to handle contributions to your project?",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter contribution instructions");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "tests",
        message: "Testing instructions:",
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
        message: "Email address:",
        validate: questionsInput => {
            if (questionsInput) {
                return true;
            } else {
                console.log("Please add instructions for testing!");
                return false;
            }
        }
    },
];

// create license badge
function licBadge(license) {
    let chosenLic = license[0];
    let badgeName;
    switch (chosenLic) {
        case "Apache License 2.0":
            badgeName = "Apache--2.0";
            break;
        case "GNU General Public Lincese v3.0":
            badgeName = "GPL--3.0";
            break;
        case "MIT License":
            badgeName = "MIT";
            break;
        case "BSD 2-Clause 'Simplififed' License":
            badgeName = "BSD--2--Clause";
            break;
        case "BSD 3-Clause 'New' or 'Revised' License":
            badgeName = "BSD--3--Clause";
            break;
        case "Boost Software License 1.0":
            badgeName = "BSL--1.0";
            break;
        case "Creative Commons Zero v1.0 Universal":
            badgeName = "CC0--1.0";
            break;
        case "Eclipse Public License 2.0":
            badgeName = "EPL--2.0";
            break;
        case "GNU Affero General Public License v3.0":
            badgeName = "AGPL--3.0";
            break;
        case "GNU General Public License v.2.0":
            badgeName = "GPL--2.0";
            break;
        case "GNU Lesser General Public License v2.1":
            badgeName = "LGPL--2.1";
            break;
        case "Mozilla Public License 2.0":
            badgeName = "MPL--2.0";
            break;
        case "The Unlicense":
            badgeName = "Unlicense";
            break;
    }
    return badgeName;
};

// README template
function writeToFile(data) {
    const { title, description, install, usage, license, contributing, tests, questions } = data;
    return `
# ${title}
![License](https://img.shields.io/badge/License-${licBadge(license)}-green.svg)
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
${install}
## Usage
${usage}
## License
${license}
## Contributing
${contributing}
## Tests
${tests}
## Questions
Please reach me at ${questions} for any questions!
`
};

// Initialize app
function init() {
    return inquirer
        .prompt(questions);
};

// Call function to initialize app, use input to fill template, create README file
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
    

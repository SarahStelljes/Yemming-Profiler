const inquirer = require('inquirer');
const process = require('node:process')

const promptTeamManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Please enter the team manager's name.",
            validate: teamManagerNameInp => {
                if(teamManagerNameInp){
                    return true;
                } else {
                    console.log("Please enter the team manager's name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeeID',
            message: "Please enter the team manager's employee ID",
            validate: teamManagerID => {
                if(teamManagerID){
                    return true;
                } else {
                    console.log("You must enter the team manager's ID!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "Please enter the team manager's email address.",
            validate: managersEmail => {
                if(managersEmail){
                    return true;
                } else {
                    console.log("You must enter the team manager's email!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Enter the team manager's office number.",
            validate: officeNum => {
                if(officeNum){
                    return true;
                } else {
                    console.log("You must enter the team manager's office number!");
                    return false;
                }
            }
        }
    ]);
};

const promptMenu = teamData => {
    console.log(`
    ===================
            Menu
    ===================
    `);

    return inquirer.prompt([
        {
            type: 'list',
            name: 'menuOptions',
            message: 'Choose what type of team member you will be inputing.',
            choices: ['Engineer', 'Intern', 'Finish Building Your Team']
        }
    ])
    .then(menu => {
        if(menu.menuOptions === 'Engineer'){
            makeEngineer(teamData);
        } else if(menu.menuOptions === 'Intern'){
            makeIntern(teamData);
        } else if(menu.menuOptions === 'Finish Building Your Team'){
            exitCode(teamData);
        }
    });
}

const makeEngineer = teamData => {
    if(!teamData.engineers){
        teamData.engineers = [];
    }
    console.log(`
    ===============
    Add an Engineer
    ===============
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: "What is the name of the engineer?",
            validate: engName => {
                if(engName){
                    return true;
                } else {
                    console.log('You need to enter a name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'engineerID',
            message: "What is the Engineer's ID?",
            validate: engID => {
                if(engID){
                    return true;
                } else {
                    console.log("You must input the engineer's ID!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: "What is the Engineer's email?",
            validate: engEmail => {
                if(engEmail){
                    return true;
                } else {
                    console.log("You must input the engineer's email!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'engineerGitHub',
            message: "Enter the Engineer's GitHub username.",
            validate: engGitHub => {
                if(engGitHub){
                    return true;
                } else {
                    console.log("You must input the engineer's GitHub username!");
                    return false;
                }
            }
        }
    ])
    .then(engineerData => {
        teamData.engineers.push(engineerData);
        promptMenu(teamData);
    })
}

const makeIntern = teamData => {
    if(!teamData.interns){
        teamData.interns = [];
    }
    console.log(`
    =============
    Add an Intern
    =============
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'internName',
            message: "Please enter the intern's name.",
            validate: nameOfIntern => {
                if(nameOfIntern){
                    return true;
                } else {
                    console.log("You must give the intern a name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'internID',
            message: "Please enter the intern's ID.",
            validate: internID => {
                if(internID){
                    return true;
                } else {
                    console.log("You must enter the intern's ID!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'internEmail',
            message: "Please enter the intern's email.",
            validate: internEmail => {
                if(internEmail){
                    return true;
                } else {
                    console.log("You must enter the intern's email!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'schoolName',
            message: "Please enter the intern's school's name.",
            validate: internsSchool => {
                if(internsSchool){
                    return true;
                } else {
                    console.log("You must enter the intern's school's name!");
                    return false;
                }
            }
        }
    ])
    .then(internData => {
        teamData.interns.push(internData);
        promptMenu(teamData);
    })
}

const exitCode = teamData => {
    console.log(teamData);
    process.exit();
}

promptTeamManager().then(promptMenu);
const inquirer = require('inquirer');
const process = require('node:process');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generatePage = require('./src/page-template');
const { writeFile, copyFile } = require('./utils/generate-site');

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

const promptMenu = data => {
    if(!data.employee){
        data.employee = {};
        console.log(`Before Manager:
        ${data}
        `);
        if(!data.employee.manager){
            const manager = new Manager(data.name, data.managerEmail, data.employeeID, data.officeNumber);
            data = {};
            data.employee = {};
            data.employee.manager = {
                role: manager.getRole(),
                name: manager.getName(),
                email: manager.getEmail(),
                id: manager.getId(),
                roleSpecific: manager.officeNumber
            };
            
            console.log(`After Manager:
            ${data}
            `);
        }
    }
    console.log(`
    ===================
            Menu
    ===================
    `);

    return inquirer.prompt([
        {
            type: 'list',
            name: 'menuOptions',
            message: 'Choose to create an Engineer, Intern, or to finsih building your team.',
            choices: ['Engineer', 'Intern', 'Finish Building Your Team']
        }
    ])
    .then(menu => {
        if(menu.menuOptions === 'Engineer'){
            if(!data.option){
                data.option = 'Engineer';
            } else {
                data.option = 'Engineer';
            }
            return data;
        } else if(menu.menuOptions === 'Intern'){
            if(!data.option){
                data.option = 'Intern';
            } else {
                data.option = 'Intern';
            }
            return data;
        } else if(menu.menuOptions === 'Finish Building Your Team'){
            if(!data.option){
                data.option = 'finish build';
            } else {
                data.option = 'finish build';
            }
            return data;
        }
    });
}

const makeEngineer = data => {
    if(!data.employee.engineers){
        data.employee.engineers = [];
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
        const engineer = new Engineer(engineerData.engineerName, engineerData.engineerEmail, engineerData.engineerID, engineerData.engineerGitHub);

        data.employee.engineers.push({
            role: engineer.getRole(),
            name: engineer.getName(),
            email: engineer.getEmail(),
            id: engineer.getId(),
            roleSpecific: engineer.getGithub()
        });
        return data;
    })
}

const makeIntern = data => {
    if(!data.employee.interns){
        data.employee.interns = [];
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
        const intern = new Intern(internData.internName, internData.internEmail, internData.internID, internData.schoolName);
        
        data.employee.interns.push({
            role: intern.getRole(),
            name: intern.getName(),
            email: intern.getEmail(),
            id: intern.getId(),
            roleSpecific: intern.getSchool()
        });
        return data;
    })
}
const finsihBuild = employee => {
    var employees = [];
    employees.push(employee.manager);

    if(employee.engineers){
        for(var i = 0; i < employee.engineers.length; i++){
            employees.push(employee.engineers[i]);
        };
    }
    if(employee.interns){
        for(var i = 0; i < employee.interns.length; i++){
            employees.push(employee.interns[i]);
        };
    }
    console.log(employees);
    // return employees;
}

promptTeamManager()
    .then(promptMenu)
    .then(function(data){
        if(data.option === 'Engineer'){
            makeEngineer(data);
        } else if(data.option === 'Intern'){
            makeIntern(data);
        } else {
            finsihBuild(data.employee)
                .then(employeeDataArr => {
                    return generatePage(employeeDataArr);
                })
                .then(pageHTML => {
                    return writeFile(pageHTML);
                })
                .then(writeFileResponse => {
                    console.log(writeFileResponse);
                })
                .then(copyFileResponse => {
                    console.log(copyFileResponse);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });
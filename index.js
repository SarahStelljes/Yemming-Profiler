const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generatePage = require('./src/page-template');
const { writeFile, copyFile } = require('./utils/generate-site');

// the first function to run when app starts. It creates the manager questions.
const questions = () => {
    // returns the answers to each question.
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

// is the menu for either creating a new Engineer profile, Intern profile, and for finishing the team's profiles (meaning creates the html and copy css).
const promptMenu = data => {
    // if data employee doesn't exist
    if(!data.employee){
        // create new manager by transfering answers from the data passed through
        const manager = new Manager(data.name, data.managerEmail, data.employeeID, data.officeNumber);
        // resets the data object
        data = { };
        // creates a new object named manager within a new object named employee within the data object.
        data.employee = {
            manager:{
                role: manager.getRole(),
                name: manager.getName(),
                email: manager.getEmail(),
                id: manager.getId(),
                roleSpecific: manager.officeNumber
            }
        }
    } else {
        data.option = '';
    }
    console.log(`
    ===================
            Menu
    ===================
    `);

    // returns the chosen option
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menuOptions',
            message: 'Choose to create an Engineer, Intern, or to finsih building your team.',
            choices: ['Engineer', 'Intern', 'Finish Building Your Team']
        }
    ])
    // passes through the chosen option
    .then(menu => {
        // if the chosen option is a certain word/phrase, then...
        // if there is no data.option yet, then create one and name it to the chosen option's word/phrase
        // or if there is a data.option, then change it to the chosen option's word/phrase
        if(menu.menuOptions === 'Engineer'){
            if(!data.option){
                data.option = 'Engineer';
            } else {
                data.option = 'Engineer';
            }
        } else if(menu.menuOptions === 'Intern'){
            if(!data.option){
                data.option = 'Intern';
            } else {
                data.option = 'Intern';
            }
        } else if(menu.menuOptions === 'Finish Building Your Team'){
            if(!data.option){
                data.option = 'finish build';
            } else {
                data.option = 'finish build';
            }
        }
        // returns all the data, new and old
        return data;
    });
};


// function to make an Engineer's profile
const makeEngineer = data => {
    // if engineers does not not exist in data.employee yet, then make it so.
    if(!data.employee.engineers){
        data.employee.engineers = [];
    }
    console.log(`
    ===============
    Add an Engineer
    ===============
    `);
    // returns all the inputed answers from the questions
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
        // creates new Engineer class by using the passed through data about the engineer
        const engineer = new Engineer(engineerData.engineerName, engineerData.engineerEmail, engineerData.engineerID, engineerData.engineerGitHub);

        // pushes the data from the newly formed Engineer class into the engineers array
        data.employee.engineers.push({
            role: engineer.getRole(),
            name: engineer.getName(),
            email: engineer.getEmail(),
            id: engineer.getId(),
            roleSpecific: engineer.getGithub()
        });
        // returns all the data, new and old.
        return data;
    })
};

// all is the same as makeEngineer function
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
};

// finish making the html by using the data passed through
const finsihBuild = data => {
    const employee = data.employee;
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
    // creates a new promise for the employees array and returns it.
    return Promise.resolve(employees);
};

// a function to be called over and over again until the user chooses the option "Finish building the team"
const dataOptions = data => {
    // calls the menu and passes the data through
    promptMenu(data)
    .then(data => {
        // if the chosen option was Engineer, then call the makeEngineer function and pass the data through.
        // once the newly formed data is added, then it takes you back to the menu.
        if(data.option === 'Engineer'){
            makeEngineer(data).then(data => {dataOptions(data)});
        } else if(data.option === 'Intern'){
            // same as above, just for intern
            makeIntern(data).then(data => {dataOptions(data)});
        } else {
            // if finish build was chosen, then...
            finsihBuild(data)
                .then(employeeDataArr => {
                    // passes the data through a module which returns the data as a string
                    const dataArr = generatePage(employeeDataArr);
                    return dataArr;
                })
                .then(pageHTML => {
                    // creates index.html using the passed through data string and returns a response from the module
                    return writeFile(pageHTML);
                })
                .then(writeFileResponse => {
                    // tells you the response from the first module
                    console.log(writeFileResponse.message);
                    // copies the css file in src folder and puts the copied version into dist folder, then returns a message
                    return copyFile();
                })
                .then(copyFileResponse => {
                    // tells you the message from the module's copyFile function.
                    console.log(copyFileResponse.message);
                })
                .catch(err => {
                    // tells you any errors that occurs.
                    console.log(err);
                });
        }
    });
};

questions()
    .then(dataOptions);
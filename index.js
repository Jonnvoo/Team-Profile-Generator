// These are the packages we have installed
const inquirer = require("inquirer");
const fs = require("fs");
// These are the functions were are pulling from our test
const Intern = require("./lib/Intern")
const Engineer = require("./lib/Engineer")
const Manager = require("./lib/Manager");
// This is grabbing the document frame to create our html file.
const generateHtml = require("./util/generateHtml");
// This is an empty array used to store our Employee's data.
const employeesArr = [];

// This function asked the user to add an employee or quit and create the staff.
const ask = async () => {
    await inquirer.prompt([
        {
            type: "list",
            message: "who do you want to add a Employee?",
            choices: ["add person", "quit"],
            name: "choice",
        }
        // This switch statment either directs the user to the prompts or quits and creates the html file
    ]).then(answers => {
        switch (answers.choice) {
            case "add person":
                addPerson()
                break;
            case "quit":
                genStaff()
                break;
            default:
                console.log("Creating staff")
                break;

        }
    })
};
// This calls the ask function to run the prompts above 
ask();


// This function gets information about the staff memebers
const addPerson = async () => {
    const ans = await inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the Employee's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the Employee's ID number?",
            },
            {
                type: "input",
                name: "email",
                message: "What is the Employee's email?",
            },
            {
                type: "list",
                name: "role",
                message: "What is the Employee's role at the comapany?",
                choices: ["Manager", "Engineer", "Intern"],
            },


        ])
    // This section depends on which role the user chooses. Each chose as their own set of questions for that role.
    if (ans.role === "Manager") {
        const managerQ =
            await inquirer.prompt([
                {
                    type: "input",
                    name: "officeNumber",
                    message: "What is your office number?",
                },
            ])

        const addManager = new Manager(
            ans.name,
            ans.id,
            ans.email,
            managerQ.officeNumber,

        );

        employeesArr.push(addManager)

    } else if (ans.role === "Engineer") {
        const engineerQ =
            await inquirer.prompt([
                {
                    type: "input",
                    name: "gitHub",
                    message: "What is your github name?",
                },
            ])

        const addEngineer = new Engineer(
            ans.name,
            ans.id,
            ans.email,
            engineerQ.gitHub,

        );
        employeesArr.push(addEngineer)

    } else if (ans.role === "Intern") {
        const internQ =
            await inquirer.prompt([
                {
                    type: "input",
                    name: "school",
                    message: "What school do you atttend?",
                },

            ])

        const addIntern = new Intern(
            ans.name,
            ans.id,
            ans.email,
            internQ.school,

        );

        employeesArr.push(addIntern)
        // This ask function calls the function to repeat if they choose to add another person.
    } ask();
};


// This function takes the information in the array and creates the Html file.
function genStaff() {
    console.log("Creating team memebers!", employeesArr)
    fs.writeFileSync(
        "index.html",
        generateHtml(employeesArr),

    );
}


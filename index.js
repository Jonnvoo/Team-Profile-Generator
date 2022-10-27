const inquirer = require("inquirer");
const fs = require("fs");
const Intern = require("./Develop/lib/Intern")
const Engineer = require("./Develop/lib/Engineer")
const Manager = require("./Develop/lib/Manager");
const generateHtml = require("./Develop/util/generateHtml");
const employeesArr = [];


const ask = async () => {
    await inquirer.prompt([
        {
            type: "list",
            message: "who do you want to add a Employee?",
            choices: ["add person", "quit"],
            name: "choice",
        }
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

ask();



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

    }ask();
};



  function genStaff () {
    console.log("new guy", employeesArr)
    fs.writeFileSync(
      "index.html",
      generateHtml(employeesArr),
      
    );
  }


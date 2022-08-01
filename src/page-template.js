let roleSpecificInfo = (role, roleSpecific) => {
    if(role === "Manager"){
        return `Office Number: ${roleSpecific}`;
    } else if (role === "Engineer") {
        return `GitHub: <a href="https://github/${roleSpecific}">${roleSpecific}</a>`;
    } else if (role === "Intern") {
        return `School: ${roleSpecific}`;
    }
}

module.exports = templateData => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Yemming Profiles</title>
        <link rel='stylesheet' href="./style.css">
    </head>
    <body>
        <header>
            <h1 class="page-title">Yemming Profiles</h1>
        </header>
        <main>
            ${templateData
                .map(({ name, role, id, email, roleSpecific }) => {
                    return `<section class="employee-card">
                        <div class="name-and-role">
                            <h2 class="name">${name}</h2>
                            <h3 class="role">${role}</h3>
                        </div>
                        <div class="employee-info">
                            <section class="info-container">
                                <h4 class="info">
                                    ID: ${id}
                                </h4>
                            </section>
                            <section class="info-container">
                                <h4 class="info">
                                    Email: <a href="mailto:${email}">${email}</a>
                                </h4>
                            </section>
                            <section class="info-container">
                                <h4 class="info">
                                    ${roleSpecificInfo(role, roleSpecific)}
                                </h4>
                            </section>
                        </div>
                    </section>`
                })
            .join('')}
        </main>
    </body>
</html>
    `
}
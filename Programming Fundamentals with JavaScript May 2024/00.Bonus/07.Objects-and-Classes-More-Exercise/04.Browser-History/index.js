function browserHistory(browserLog, commands) {
    for (const command of commands) {
        const tokens = command.split(" ");
        const type = tokens.shift();
        const website = tokens.join(" ");

        if (type === "Open") {
            browserLog['Open Tabs'].push(website);
            browserLog["Browser Logs"].push(command);
        }
        else if (type === "Close") {
            const index = browserLog['Open Tabs'].indexOf(website);

            if (index !== -1) {
                browserLog['Open Tabs'].splice(index, 1);
                browserLog['Recently Closed'].push(website);
                browserLog["Browser Logs"].push(command);
            }
        }
        else if (command === "Clear History and Cache") {
            browserLog["Open Tabs"].splice(0);
            browserLog["Recently Closed"].splice(0);
            browserLog['Browser Logs'].splice(0);
        }
    }

    console.log(browserLog["Browser Name"]);
    console.log(`Open Tabs: ${browserLog["Open Tabs"].join(", ")}`);
    console.log(`Recently Closed: ${browserLog["Recently Closed"].join(", ")}`);
    console.log(`Browser Logs: ${browserLog["Browser Logs"].join(", ")}`);
}

browserHistory({"Browser Name":"Google Chrome","Open Tabs":["Facebook","YouTube","Google Translate"], "Recently Closed":["Yahoo","Gmail"], "Browser Logs":["Open YouTube","Open Yahoo","Open Google Translate","Close Yahoo","Open Gmail","Close Gmail","Open Facebook"]}, ["Close Facebook", "Open StackOverFlow", "Open Google"]);
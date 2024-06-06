function loadingBar(percents) {
    let percentNeeded = "";
    let percentCount = 0;
    for (let i = 1; i <= percents / 10; i++) {
        percentNeeded += "%";
        percentCount++;
    }

    let dotNeeded = "";
    for (let i = 1; i <= 10 - percentCount; i++) {
        dotNeeded += ".";
    }

    if (percents !== 100) {
        console.log(`${percents}% [${percentNeeded}${dotNeeded}]`);
        console.log(`Still loading...`)
    }
    else {
        console.log(`100% Complete!`);
        console.log(`${percentNeeded}`)
    }


}

loadingBar(30);
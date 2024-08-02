function santaSecretHelper(arr) {
    const key = Number(arr.shift());

    const regex = /@(?<name>[A-Za-z]+)[^@\-!:>]*!(?<behaviour>[N|G])!/;

    while (arr[0] !== "end") {
        const decryptedMsg = arr.shift();
        let resolvedMsg = "";

        for (const decryptedMsgElement of decryptedMsg) {
            const newCode = decryptedMsgElement.charCodeAt(0) - key;
            const resolved = String.fromCharCode(newCode);

            resolvedMsg += resolved;
        }

        if (!(regex.test(resolvedMsg))) {
            continue;
        }

        let match = regex.exec(resolvedMsg);
        const {name, behaviour} = match.groups;

        if (behaviour === "G") {
            console.log(name);
        }
    }
}

santaSecretHelper(['3', 'CNdwhamigyenumje$J$', 'CEreelh-nmguuejnW$J$', 'CVwdq&gnmjkvng$Q$', 'end']);
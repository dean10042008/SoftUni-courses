function tseamAccount(arr) {
    let account = arr.shift().split(" ");

    while (arr[0] !== "Play!") {
        const command = arr.shift();
        const tokens = command.split(" ");
        const type = tokens.shift();

        if (type === "Install") {
            const game = tokens.shift();

            if (!(account.includes(game))) {
                account.push(game);
            }
        }
        else if (type === "Uninstall") {
            const game = tokens.shift();
            const index = account.indexOf(game);

            if (index !== -1) {
                account.splice(index, 1);
            }
        }
        else if (type === "Update") {
            const game = tokens.shift();
            const index = account.indexOf(game);

            if (index !== -1) {
                account.splice(index, 1);
                account.push(game);
            }
        }
        else {
            const [game, expansion] = tokens.shift().split("-");
            const index = account.indexOf(game);

            if (index !== -1) {
                account.splice(index + 1, 0, `${game}:${expansion}`);
            }
        }
    }

    console.log(account.join(" "));
}

tseamAccount(['CS WoW Diablo', 'Install LoL', 'Uninstall WoW', 'Update Diablo', 'Expansion CS-Go', 'Play!']);
function lockedProfile() {
    const buttons = document.querySelectorAll('.profile button');

    for (const buttonEl of buttons) {
        let moreTextEl = buttonEl.parentNode.querySelector('div');
        const unlockEl = buttonEl.parentNode.querySelector('input[value=unlock]');

        buttonEl.addEventListener('click', () => {
            if (unlockEl.checked) {
                moreTextEl.style.display = 'block';
                buttonEl.textContent = 'Hide it';

                buttonEl.addEventListener("click", () => {
                    if (unlockEl.checked) {
                        moreTextEl.style.display = 'none';
                        buttonEl.textContent = 'Show more';
                    }
                });
            }
        });
    }
}
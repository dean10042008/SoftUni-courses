function validate() {
    const emailInput = document.querySelector('#email');
    const emailPattern = /([a-z]+)@([a-z]+).([a-z]+)/;
    
    emailInput.addEventListener('change', () => {
        const value = emailInput.value;

        if (emailPattern.test(value)) {
            emailInput.classList.remove('error');
        }
        else {
            emailInput.classList.add('error');
        }
    });
}
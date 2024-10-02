function validate() {
    const submitBtn = document.querySelector('#submit');
    const isCompanyEl = document.querySelector('#company');

    const namePattern = /^[a-zA-Z0-9]{3,20}$/;
    const emailPattern = /[@]{1}\w*[\.]{1,}/;
    const passwordPattern = /^\w{5,15}$/;

    isCompanyEl.addEventListener("change", () => {
        let isChecked = isCompanyEl.checked;
        const companyInfoEl = document.querySelector('#companyInfo');

        if (isChecked) {
            companyInfoEl.style.display = "block";
        }
        else {
            companyInfoEl.style.display = "none";
        }
    });

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const nameEl = document.querySelector('#username');
        const emailEl = document.querySelector('#email');
        const passwordEl = document.querySelector('#password');
        const confirmPasswordEl = document.querySelector('#confirm-password');
        const companyNumberEl = document.querySelector('#companyNumber');

        let isValid = true;

        if (namePattern.test(nameEl.value)) {
            nameEl.style.border = "none";
        }
        else {
            nameEl.style.borderColor = 'red';
            isValid = false;
        }

        if (emailPattern.test(emailEl.value)) {
            emailEl.style.border = "none";
        }
        else {
            emailEl.style.borderColor = 'red';
            isValid = false;
        }

        if (passwordEl.value !== confirmPasswordEl.value || !passwordPattern.test(passwordEl.value)) {
            passwordEl.style.borderColor = 'red';
            confirmPasswordEl.style.borderColor = 'red';
            isValid = false;
        }
        else {
            passwordEl.style.border = 'none';
            confirmPasswordEl.style.border = 'none';
        }

        if (isCompanyEl.checked) {
            if (Number(companyNumberEl.value) >= 1000 && Number(companyNumberEl.value <= 9999)) {
                companyNumberEl.style.border = 'none';
            }
            else if (Number(companyNumberEl.value) < 1000 || Number(companyNumberEl.value) > 9999) {
                companyNumberEl.style.borderColor = 'red';
                isValid = false;
            }
        }

        if (isValid) {
            document.getElementById("valid").style.display = "block";
        }
        else {
            document.getElementById("valid").style.display = "none";
        }
    });
}
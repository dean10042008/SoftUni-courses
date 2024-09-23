function solve() {
    const addButtons = document.querySelectorAll('.add-product');
    const checkoutButton = document.querySelector('.checkout');
    let textarea = document.querySelector("textarea");
    let sum = 0;
    let products = new Set();

    for (const buttonEl of addButtons) {
        buttonEl.addEventListener('click', () => {
            const name = buttonEl.parentNode.parentNode.querySelector('.product-details .product-title').textContent;
            const price = Number(buttonEl.parentNode.parentNode.querySelector('.product-line-price').textContent);

            sum += price;
            products.add(name);

            textarea.textContent += `Added ${name} for ${price.toFixed(2)} to the cart.\n`;
        });
    }

    checkoutButton.addEventListener('click', () => {
        textarea.textContent += `You bought ${Array.from(products).join(", ")} for ${sum.toFixed(2)}.`;

        checkoutButton.disabled = true;

        for (const buttonEl of addButtons) {
            buttonEl.disabled = true;
        }
    });
}
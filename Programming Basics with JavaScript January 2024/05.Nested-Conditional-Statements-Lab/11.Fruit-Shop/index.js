function shop(input) {
    let product = input[0];
    let day = input[1];
    let amount = input[2];

    let price = 0;

    if (day === 'Monday' || day === 'Tuesday' || day === 'Wednesday' || day === 'Thursday' || day === 'Friday') {
        switch (product) {
            case 'banana':
                console.log((amount * 2.50).toFixed(2));
                break;
            case 'apple':
                console.log((amount * 1.20).toFixed(2));
                break;
            case 'orange':
                console.log((amount * 0.85).toFixed(2));;
                break;
            case 'grapefruit': 
                console.log((amount * 1.45).toFixed(2));
                break;
            case 'kiwi':
                console.log((amount * 2.70).toFixed(2));
                break;
            case 'pineapple':
                console.log((amount * 5.5).toFixed(2));
                break;
            case 'grapes':
                console.log((amount * 3.85).toFixed(2));
                break;
            default:
                console.log('error');
                break;
        }
    }
    else if (day === 'Saturday' || day === 'Sunday') {
        switch (product) {
            case 'banana':
                console.log((amount * 2.70).toFixed(2));
                break;
            case 'apple':
                console.log((amount * 1.25).toFixed(2));
                break;
            case 'orange':
                console.log((amount * 0.90).toFixed(2));
                break;
            case 'grapefruit': 
                console.log((amount * 1.60).toFixed(2));
                break;
            case 'kiwi':
                console.log((amount * 3.00).toFixed(2));
                break;
            case 'pineapple':
                console.log((amount * 5.60).toFixed(2));
                break;
            case 'grapes':
                console.log((amount * 4.20).toFixed(2));
                break;
            default:
                console.log('error');
                break;
        }
    }
    else {
        console.log('error');
    }
}

shop(['tomato', 'Monday', '0.5'])
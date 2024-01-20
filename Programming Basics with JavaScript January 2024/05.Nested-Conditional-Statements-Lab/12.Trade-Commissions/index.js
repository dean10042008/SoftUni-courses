function comission(input) {
    let city = input[0];
    let s = Number(input[1]);

    if (s >= 0 && s <= 500) {
        switch (city) {
            case 'Sofia':
                console.log((s * 0.050).toFixed(2));
                break;
            case 'Varna':
                console.log((s * 0.045).toFixed(2));
                break;
            case 'Plovdiv':
                console.log((s * 0.055).toFixed(2));
                break;
            default:
                console.log('error');
                break;
        }
    }
    else if (s > 500 && s <= 1000) {
        switch (city) {
            case 'Sofia':
                console.log((s * 0.070).toFixed(2));
                break;
            case 'Varna':
                console.log((s * 0.075).toFixed(2));
                break;
            case 'Plovdiv':
                console.log((s * 0.080).toFixed(2));
                break;
            default:
                console.log('error');
                break;
        }
    }
    else if (s > 1000 && s <= 10000) {
        switch (city) {
            case 'Sofia':
                console.log((s * 0.080).toFixed(2));
                break;
            case 'Varna':
                console.log((s * 0.100).toFixed(2));
                break;
            case 'Plovdiv':
                console.log((s * 0.120).toFixed(2));
                break;
            default:
                console.log('error');
                break;
        }
    }
    else if (s > 10000) {
        switch (city) {
            case 'Sofia':
                console.log((s * 0.120).toFixed(2));
                break;
            case 'Varna':
                console.log((s * 0.130).toFixed(2));
                break;
            case 'Plovdiv':
                console.log((s * 0.145).toFixed(2));
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

comission(['Plovdiv', '499.99'])
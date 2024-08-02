function cone(radius, height) {
    const volume = ((Math.PI * Math.pow(radius, 2) * height) / 3).toFixed(4);
    const area = ((Math.PI * Math.pow(radius, 2)) + ((Math.PI * radius) * Math.sqrt(Math.pow(radius, 2) + Math.pow(height, 2)))).toFixed(4);
    console.log(`volume = ${volume}`);
    console.log(`area = ${area}`);
}

cone(3, 5);
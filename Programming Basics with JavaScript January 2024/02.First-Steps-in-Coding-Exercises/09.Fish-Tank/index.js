function Aquarium(arr) {
    let lengthInCM = Number(arr[0]);
    let widthInCM = Number(arr[1]);
    let heigthInCM = Number(arr[2]);
    let percentsTaken = Number(arr[3]);

    let capacityInCM = lengthInCM * widthInCM * heigthInCM;
    let capacityInLeters = capacityInCM / 1000;

    let actualPercents = percentsTaken / 100

    let actualCapacity = capacityInLeters * (1 - actualPercents);

    console.log(actualCapacity);
}

Aquarium(["85", "75", "47", "17"]);
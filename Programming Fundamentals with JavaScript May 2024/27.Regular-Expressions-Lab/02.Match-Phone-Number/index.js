function matchPhoneNumber(nums) {
    const pattern = /[+]359([ -])2\1(\d{3})\1(\d{4})\b/gm;
    const result = nums[0].match(pattern);

    console.log(result.join(", "));
}

matchPhoneNumber(['+359 2 222 2222,359-2-222-2222, +359/2/222/2222, +359-2 222 2222 +359 2-222-2222, +359-2-222-222, +359-2-222-22222 +359-2-222-2222']);
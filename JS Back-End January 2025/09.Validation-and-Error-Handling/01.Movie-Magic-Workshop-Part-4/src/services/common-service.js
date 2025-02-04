export function validator(value) {
    return /^(https?:\/\/)(\S+)$/.test(value);
};
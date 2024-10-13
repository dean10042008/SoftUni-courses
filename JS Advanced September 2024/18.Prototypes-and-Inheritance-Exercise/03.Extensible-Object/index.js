function extensibleObject() {
    const object = {
        extend: function (targetObject) {
            for (const key in targetObject) {
                if (typeof targetObject[key] === "function") {
                    Object.getPrototypeOf(object)[key] = targetObject[key];
                }
                else {
                    object[key] = targetObject[key];
                }
            }
        }
    }

    return object;
}

const myObj = extensibleObject();
const template = {
    extensionMethod: function () { },
    extensionProperty: 'someString'
}
myObj.extend(template);
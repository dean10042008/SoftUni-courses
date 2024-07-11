function extractFile(path) {
    const file = path.split('\\').pop();

    const fileArr = file.split(".");
    const fileExtension = fileArr.pop();
    const fileName = fileArr.join(".");

    console.log(`File name: ${fileName}`);
    console.log(`File extension: ${fileExtension}`);
}

extractFile('C:\\Internal\\training-internal\\Template.pptx');
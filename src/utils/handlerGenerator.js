const debug = require('debug')(`${process.env.APPNAME}:handlerGenerator`);
const path = require('path');
const fs = require('fs');

function handlerGenerator(apiPath) {
    const handlers = {};

    const handlerCreator = (directory) => {
        const directoryPath = path.join(__dirname, `../${apiPath}/handlers/${directory}`);
        fs.readdirSync(directoryPath)
            .filter((file) => file !== '.DS_Store')
            .forEach((file) => {
                debug(`Requiring ${file} as a handler`);
                handlers[file.replace('.js', '')] = require(`../${apiPath}/handlers/${directory}/${file}`);
            });
    };

    fs.readdirSync(path.join(__dirname, `../${apiPath}/handlers`))
        .filter((folder) => fs.lstatSync(path.join(__dirname, `../${apiPath}/handlers/${folder}`)).isDirectory())
        .forEach((folder) => {
            if (folder.indexOf('.js') < 0) handlerCreator(folder);
        });
    return handlers;
}

module.exports = handlerGenerator;

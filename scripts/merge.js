const args = process.argv[2]

const fs = require('fs');
const path = require('path')


const FOLDER = path.join(__dirname, `../parts/${args}`);
let finalContent = '';
const finalPath = `snippets/${args}.json`;

if (!args) {
    return console.warn('No arguments provided')
}
try {
    fs.readdirSync(FOLDER).forEach(file => {
        if (file.startsWith('_') && file.endsWith('.json')) {
            const content = fs.readFileSync(path.join(FOLDER, file), "utf8")

            if (!validateJSON(content)) {
                return console.warn(`JSON is not valid for file: ${file}`);
            }

            finalContent = finalContent + content.substr(1).slice(0, -1) + ','
        }
    })
} catch (e) {
    return console.log(e)
}

const result = '{' + finalContent.slice(0, -1) + '}'

if (validateJSON(result)) {
    try {
        const content = result.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, ' ')
        try {

            fs.writeFileSync(finalPath, content, 'utf8');
        } catch (e) {
            return e
        }
    } catch (e) {
        return e
    }

    return console.log(`${finalPath} was created`);

}

function validateJSON(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false
    }
}

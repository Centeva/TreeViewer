import * as fs from 'fs';
import * as express from 'express';
import * as uuidGen from 'uuid/v4';
const app = express();

let id: number;
let userObj: {};

fs.stat('./.id', (err, stat) => {
    const id = fs.readFileSync('./.id', 'utf8');
    if (err == null) {
        console.log(id);
        const index = JSON.parse(fs.readFileSync('../src/assets/index.json', 'utf8'));
        let userObj = index[id];
        if (userObj) {
            this.userObj = userObj;
            this.id = id;
        }
        // Exist
    } else if (err.code === 'ENOENT') {
        const file = fs.createWriteStream('.id');
        const uuid = uuidGen();
        file.write(uuid);
        file.close();
    }
});

app.get('/getIndex', (req: express.Request, res: express.Response) => {
    const index = JSON.parse(fs.readFileSync('../src/assets/index.json', 'utf8'));
    res.send(index);
});

app.listen(4200);

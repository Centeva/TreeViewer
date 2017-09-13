import * as fs from 'fs';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as uuid from 'Uuid/v4';

const app = express();

app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.get('/api/getDefinitions', (req: express.Request, res: express.Response) => {
    let index = [];
    if (fs.existsSync('./index.json')) {
        index = JSON.parse(fs.readFileSync('./index.json', 'utf8'));
    }
    res.send(index);
});

app.post('/api/createDefinition', (req: express.Request, res: express.Response) => {
    let index = [];
    if (fs.existsSync('./index.json')) {
        index = JSON.parse(fs.readFileSync('./index.json', 'utf8'));
    }
    req.body.id = uuid();
    index.push(req.body);
    fs.writeFileSync('./index.json', JSON.stringify(index));
    res.send(index);
});

app.get('/api/getFile/:path', (req: express.Request, res: express.Response) => {
    let file = [];
    if (fs.existsSync(req.params.path)) {
        file = JSON.parse(fs.readFileSync(req.params.path as string, 'utf8'));
    }
    res.send(file);
});

app.post('/api/setFile/:path', (req: express.Request, res: express.Response) => {
    fs.writeFileSync(req.params.path as string, JSON.stringify(req.body));
    res.send(true);
});

app.listen(3000);

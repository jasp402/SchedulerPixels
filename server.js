const path                              = require('path');
const express                           = require('express');
// const webSocket                         = require('socket.io');
const dotenv                            = require('dotenv');
const https                             = require('https');
const zlib                              = require("zlib");

dotenv.config();
const app = express();
const port = process.env.PORT || 8621;
app.set('port', port);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//ToDo: Esto va en utils
async function request(method, url, options = {}, data = null) {

    const getSettings    = (url, method, options) => {
        const parsedUrl = new URL(url);
        return {
            hostname: parsedUrl.hostname,
            port    : 443,
            path    : `${parsedUrl.pathname}${parsedUrl.search}`,
            method  : method.toUpperCase(),
            ...options,
        };
    }
    const formatResponse = (res, chunks) => {
        const body = Buffer.concat(chunks).toString();
        return {statusCode: res.statusCode, headers: res.headers, body};
    }
    const handleResponse = (res, resolve, reject) => {
        const encoding = res.headers['content-encoding'];
        let stream     = res;
        if (encoding === 'gzip') stream = res.pipe(zlib.createGunzip());
        else if (encoding === 'deflate') stream = res.pipe(zlib.createInflate());
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(formatResponse(res, chunks)));
        stream.on('error', (error) => reject(error));
    }

    const settings       = getSettings(url, method, options);
    const performRequest = (settings, data) => {
        return new Promise((resolve, reject) => {
            const req = https.request(settings, (res) => {
                handleResponse(res, resolve, reject);
            });
            req.on('error', (e) => reject(e));
            if (settings.body) req.write(settings.body);
            if (settings.method === 'POST' && data) req.write(data);
            req.end();
        });
    }

    return await performRequest(settings, data);

}

//ToDo: Esto va en API
app.post('/exploreLands', async (req, res) => {
    console.log(req.body);
    const landNumber = req.body.landNumber;
    console.log(landNumber);
    let result = null;
    if (landNumber && landNumber >= 1 && landNumber <= 5000) {
        const url = `https://pixels-tools-back.onrender.com/lands/${landNumber}`;
        result = await request('GET', url);
        if(result){
            console.log(result)
            res.json({ message: result.body });
        }else{
            res.json({ message: `Fallo la búsqueda en pixelTools: ${landNumber}` });
        }
    } else {
        res.status(400).json({ error: 'Número de terreno inválido' });
    }
});


app.listen(port, function () {
    console.log(`RUNNING ON ${port}. http://localhost:${port}/`);
});
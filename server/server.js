import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import App from '../src/containers/App';

const PORT  = 8080;
const app = express();

app.get('/*' , (req , res)=>{
    const context = {};
    const app = ReactDomServer.renderToString(<App />);

    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile , 'utf8' , (err , data)=>
    {
        if(err)
        {
            console.error('Something went wrong : ' , err);
            return res.status(500).send('OOps , next time!');
        }

        data = data.replace('<div id="root"></div>' , 
             `<div id="root">${app} </div`);

             return res.send(data);
    });
});

app.listen(PORT, ()=>
{
    console.log(`Server-Side Rendered application running on port 
    ${PORT}`);
});
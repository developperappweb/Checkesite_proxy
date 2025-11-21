import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
    const url = req.query.url;
    if(!url) return res.status(400).json({error:"URL manquante"});
    try{
        const response = await fetch(url);
        const text = await response.text();
        res.status(response.status).send(text);
    }catch(err){
        res.status(500).json({error:"Impossible d'accéder au site"});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Proxy server running on port ${PORT}`));
const Joi = require('joi');
const express = require('express');
const app = express();

require("dotenv").config();

app.use(express.json());

const playerList = [];

const port = process.env.PORT || PORT;
app.listen(port, ()=>
{
    console.log(`Server is listening on port ${port}`);
});

app.get('/', (req,res) =>
    {
        res.send("WELCOME!");
    }
);

app.get('/all', (req,res) =>
    {
        res.send(playerList);
    }
);

app.get('/:id', (req,res) =>
    {
        const index = req.params.id;
        const dbPlayer = playerList.find(p => p.id === parseInt(index));
        if (!dbPlayer)
        {
            console.log(`GET invalid, Player with given ID ${index} not found`);
            res.status(404).send(`Player with given ID ${index} not found`);
        }
        res.send(dbPlayer);
    }
);

app.post('/', (req, res) =>
    {
        const schema = Joi.object({id: Joi.number().integer().min(1).required(),
            name: Joi.string().min(1).required(),
            company: Joi.string().min(1).required(),
            country: Joi.string().min(1).required(),
            score: Joi.number().min(0).required()
        });

        const validateRes = schema.validate(req.body);
        if(!validateRes.error)
        {
            const index = req.params.id;
            const dbPlayer = playerList.find(p => p.id === parseInt(index));
            if (dbPlayer)
            {
                const player = {
                    id: playerList.length + 1,
                    name: req.body.name,
                    company: req.body.company,
                    country: req.body.country,
                    score: req.body.score
                };
                    
                playerList.push(player);
                res.send(player);
            } else
            {    
                const player = {
                    id: req.body.id,
                    name: req.body.name,
                    company: req.body.company,
                    country: req.body.country,
                    score: req.body.score
                };
                    
                playerList.push(player);
                res.send(player);
            }
        } else
        {
            console.log(`POST invalid, ${validateRes.error}, body: ${req.body}`);
            res.status(400).send(`Invalid request data, ${validateRes.error}`);
        }
    }
);

app.put('/', (req, res) =>
    {
        const schema = Joi.object({id: Joi.number().integer().min(1).required(),
            name: Joi.string().min(1).required(),
            company: Joi.string().min(1).required(),
            country: Joi.string().min(1).required(),
            score: Joi.number().min(0).required()
        });

        const validateRes = schema.validate(req.body);
        if(!validateRes.error)
        {
            const index = req.params.id;
            const dbPlayer = playerList.find(p => p.id === parseInt(index));
            if (!dbPlayer)
            {
                console.log(`PUT invalid, Player with given ID ${index} not found`);
                res.status(404).send(`Player with given ID ${index} not found`);
            } else
            {    
                dbPlayer.score = req.body.score;   
                res.send(dbPlayer);
            }
        } else
        {
            console.log(`POST invalid, ${validateRes.error}, body: ${req.body}`);
            res.status(400).send(`Invalid request data, ${validateRes.error}`);
        }
    }
);
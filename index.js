const {
    connection,
    Restaurant,
    Menu,
    MenuItem,
} = require("./sequelize-connect");
const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

app.post('/api/restaurants', async (req,res) => {
        try {
        const restaurant = await Restaurant.create(req.body);

        res.status(201).send(restaurant);
        }catch (e) {
        res.status(400).send(e.message);
        }
    })

    .get("/api/restaurants", async (req,res) => {
        try {
            const restaurant = await Restaurant.findAll({});

            res.status(200).send(restaurants);
        }catch (e) {
            res.status(400).send(e.message);
        };
    });
//


async function start() {
    await connection.sync({
        logging: false,
    });
};

start().then(() => console.log("sequelize connected")).catch((e) => console.log(`Caught error: ${e}`));

app.listen(port, () => console.log(`Express server runnning on port ${port}`));
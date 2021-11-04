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
        await Restaurant.create(req.body);
        res.status(201).send();
        }catch (e) {
        res.status(400).send(e.message);
        }
    })

    .get("/api/restaurants", async (req,res) => {
        try {
            const restaurants = await Restaurant.findAll({});

            res.status(200).send(restaurants);
        }catch (e) {
            res.status(400).send(e.message);
        };
    })

    .get("/api/restaurants/:id", async (req, res) => {
        try {
            const restaurant = await Restaurant.findOne({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).send(restaurant);
        }catch(e) {
            res.status(400).send(e.message);
        };
    })

    .delete("/api/restaurants/:id", async (req,res) => {
        try {
            await Restaurant.destroy({
                where: {
                    id: req.params.id
                }
            });
            const restaurants = await Restaurant.findAll({});

            res.status(200).send("Restaurant successfully deleted.");
        }catch(e) {
            res.status(400).send(e.message);
        };
    })

    .put("/api/restaurants/:id", async (req,res) => {
        try {
            await Restaurant.update(req.body,{
                where: {
                    id: req.params.id
                }
            });
            const restaurant = await Restaurant.findOne({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).send(restaurant);
        }catch(e) {
            res.status(400).send(e.message);
        };
    });
//

app
    .post('/api/restaurants/:id/menus', async (req,res) => {
        try {
            const restaurant = await Restaurant.findOne({where: {id: req.params.id}});
            const menu = await Menu.create(req.body);

            await restaurant.addMenu(menu);
            await menu.reload()

            res.status(201).send(menu);
        }catch (e) {
            res.status(400).send(e.message);
        }
    })

    .get("/api/menus", async (req,res) => {
        try {
            const menus = await Menu.findAll({});

            res.status(200).send(menus);
        }catch (e) {
            res.status(400).send(e.message);
        };
    })

    .get("/api/menus/:id", async (req, res) => {
        try {
            const menu = await Menu.findOne({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).send(menu);
        }catch(e) {
            res.status(400).send(e.message);
        };
    })

    .delete("/api/menus/:id", async (req,res) => {
        try {
            await Menu.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).send("Menu successfully deleted.");
        }catch(e) {
            res.status(400).send(e.message);
        };
    })

    .put("/api/menus/:id", async (req,res) => {
        try {
            await Menu.update(req.body,{
                where: {
                    id: req.params.id
                }
            });
            const menu = await Menu.findOne({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).send(menu);
        }catch(e) {
            res.status(400).send(e.message);
        };
});

app
    .post('/api/menus/:id/menuitems', async (req,res) => {
        try {
            const menu = await Menu.findOne({where:{id: req.params.id}});
            const menuItem = await MenuItem.create(req.body);

            await menu.addMenuItem(menuItem);
            await menuItem.reload();

            res.status(201).send(menuItem);
        }catch (e) {
            res.status(400).send(e.message);
        }
    })

    .get("/api/menuitems", async (req,res) => {
        try {
            const menuItems = await MenuItem.findAll({});

            res.status(200).send(menuItems);
        }catch (e) {
            res.status(400).send(e.message);
        };
    })

    .get("/api/menuitems/:id", async (req, res) => {
        try {
            const menuItem = await MenuItem.findOne({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).send(menuItem);
        }catch(e) {
            res.status(400).send(e.message);
        };
    })

    .delete("/api/menuitems/:id", async (req,res) => {
        try {
            await MenuItem.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).send("Menu item successfully deleted.");
        }catch(e) {
            res.status(400).send(e.message);
        };
    })

    .put("/api/menuitems/:id", async (req,res) => {
        try {
            await MenuItem.update(req.body,{
                where: {
                    id: req.params.id
                }
            });
            const menuItem = await MenuItem.findOne({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).send(menuItem);
        }catch(e) {
            res.status(400).send(e.message);
        };
});



async function start() {
    await connection.sync({
        logging: false,
    });
};

start().then(() => console.log("sequelize connected")).catch((e) => console.log(`Caught error: ${e}`));

app.listen(port, () => console.log(`Express server runnning on port ${port}`));
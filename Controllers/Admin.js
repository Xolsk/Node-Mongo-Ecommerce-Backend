const admin = require("../Models/Admin.js")


class AdminController {

    async checkStock(req, res) {
        let products = req.body.products;
        try {
            let ids = [];
            req.body.products.forEach(element => ids.push(element.id));
            let inStock = await admin.find({ id: { $in: ids } })
            inStock.forEach(element => {
                let index = products.findIndex(ele => ele.id === element.id)
                products[index].stock = element.stock
            })
            res.send( products)
        }
        catch (e) {
            res.send({ e })
        }
    }

    async findAmount(req, res) {
        let origArray = req.body.cart
        try {
            let ids = [];
            req.body.cart.forEach(element => ids.push(element.id));
            let cart = await admin.find({ id: { $in: ids } })
            cart.forEach(element => {
                let index = origArray.findIndex(ele => ele.id === element.id)
                origArray[index].price = element.price
            })
            res.send({ origArray })
        }
        catch (e) {
            res.send({ e })
        }
    }

    async findAll(req, res) {
        try {
            const productList = await admin.find({});
            res.send(productList)
        }
        catch (e) {
            res.send({ e })
        }
    }

    async findUser(req, res) {
        try {
            let item = req.params
            const user = await users.find(item);
            res.send(user)
        }
        catch (e) {
            res.send({ e })
        }
    }

    async listUsers(req, res) {
        try {

            const userList = await users.find({});
            res.send(userList)
        }
        catch (e) {
            res.send({ e })
        }
    }


    async add(req, res) {
        let { id, product, title, price, number, format, published, editorial, writer, drawer, pages,
            description, cover, distributor, stock, sale, salePrice, hidden }
            = req.body;
        try {
            const usercheck = await admin.findOne({ id })
            if (usercheck) return res.send({ message: "Product ID already in use." })
            const added = await admin.create({
                id,
                product,
                title,
                price,
                number,
                published,
                editorial,
                format,
                distributor,
                format,
                writer,
                drawer,
                pages,
                description,
                cover,
                stock,
                hidden,
                sale,
                salePrice,
            });
            res.send({ added, message: "Product added correctly." })
        }
        catch (e) {
            res.send({ message: "Ooops" })
        }
    }
    async remove(req, res) {
        let { _id } = req.body;
        try {
            let removed = await admin.remove({ _id });
            res.send({ removed, message: "Item deleted successfully." })
        }
        catch (e) {
            res.send({ e })
        }
    }

    async update(req, res) {

        let { _id, id, product, title, published, editorial, writer, drawer,
            pages, format, number, distributor, stock, description, cover } = req.body;

        try {
            const updated = await admin.update({ _id }, {
                $set: {
                    id: id, product: product, title: title, published: published, editorial: editorial,
                    writer: writer, drawer: drawer,
                    pages: pages, format: format, number: number, distributor: distributor,
                    stock: stock, description: description, cover: cover
                }
            }
            );
            res.send(updated);
        }
        catch (e) {
            res.send({ e })
        }
    }

    async addStock(req, res) {
        let { stockRequest } = req.params;
        try {
            const stockMatch = await admin.update({ id: stockRequest });
            res.send(stockMatch);
        }
        catch (e) {
            res.send({ e })
        } S
    }

    async listByStock(req, res) {
        let { stockRequest } = req.params;
        try {
            const stockMatch = await admin.find({ id: stockRequest });
            res.send(stockMatch);
        }
        catch (e) {
            res.send({ e })
        } S
    }

    async findByMatch(req, res) {
        let { searchInput } = req.params;
        searchInput = searchInput.toLowerCase();
        try {
            let foundItems = await admin.find({ $text: { $search: `${searchInput}.*/` } },
                { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });
            res.send(foundItems);
        }
        catch (e) {
            res.send({ e })
        }
    }
}
module.exports = new AdminController;
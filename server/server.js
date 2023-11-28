import "dotenv/config";
import server from "./src/app.js";
const {PORT} = process.env;
import sequelize from "./src/DB_connection.js";

sequelize.sync({force: true})
.then(() => {
    server.listen(PORT, () => {
        console.log(`Servidor funcionando en puerto: ${PORT}`);
    });
});


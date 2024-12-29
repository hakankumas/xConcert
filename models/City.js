const connection = require("../database/db");

module.exports = class City {
    // Şehir Listesi
    static getall() {
        return connection.execute(`
            SELECT 
                city.id as city_id,
                city.name as city_name
            FROM city
        `);
    }
};

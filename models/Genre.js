const connection = require("../database/db");

module.exports = class Genre {
    // Şarkı Türleri
    static genres() {
        return connection.execute(`
            SELECT 
                genre.id as genre_id,
                genre.name as genre_name
            FROM genre
        `);
    }
};

const connection = require("../database/db");

module.exports = class Singer {
    // Şarkıcılar
    static singers() {
        return connection.execute(`
            SELECT 
                singer.id as singer_id,
                singer.nickname as singer_nickname,
                gender.id as gender_id,
                gender.name as gender_name,
                genre.id as genre_id,
                genre.name as genre_name
            FROM singer
            LEFT JOIN gender ON singer.gender_id = gender.id
            LEFT JOIN genre ON singer.genre_id = genre.id
        `);
    }
};

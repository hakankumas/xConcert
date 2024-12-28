const connection = require("../database/db");

module.exports = class Concert {
    // Konser İlanları
    static notices() {
        return connection.execute(`
            SELECT 
                concert.id as concert_id,
                singer.id as singer_id,
                singer.nickname as singer_nickname,
                gender.id as gender_id,
                gender.name as gender_name,
                genre.id as genre_id,
                genre.name as genre_name,

                city.id as city_id,
                city.name as city_name,
                concert.location as concert_location,
                concert.date as concert_date,
                concert.price as concert_price,
                concert.capacity as concert_capacity
            FROM concert
            LEFT JOIN singer ON concert.singer_id = singer.id 
            LEFT JOIN gender ON singer.gender_id = gender.id
            LEFT JOIN genre ON singer.genre_id = genre.id
			LEFT JOIN city ON concert.city_id = city.id
        `);
    }

    // Konser Hasılatları
    static revenues() {
        return connection.execute(`
            SELECT 
                concert.id as concert_id,
                singer.id as singer_id,
                singer.nickname as singer_nickname,
                gender.id as gender_id,
                gender.name as gender_name,
                genre.id as genre_id,
                genre.name as genre_name,

                city.id as city_id,
                city.name as city_name,
                concert.location as concert_location,
                concert.date as concert_date,
                concert.price as concert_price,
                concert.capacity as concert_capacity,
                concert.sold_ticket as concert_sold_ticket,
                ROUND(concert.price * concert.capacity,2) as target_revenue,
                ROUND(concert.price * concert.sold_ticket,2) as total_revenue, 
                ROUND((concert.capacity-concert.sold_ticket)* concert.price,2) as cost_revenue
            FROM concert
            LEFT JOIN singer ON concert.singer_id = singer.id 
            LEFT JOIN gender ON singer.gender_id = gender.id
            LEFT JOIN genre ON singer.genre_id = genre.id
			LEFT JOIN city ON concert.city_id = city.id;
        `);
    }
};

const connection = require("../database/db");

module.exports = class Count {
    // Toplam Hasılat
    static revenue() {
        return connection.execute(`
            SELECT
                SUM(concert.price * concert.sold_ticket) as total_revenue
            FROM concert
        `);
    }

    // Toplam Satılan Bilet Sayısı
    static tickets() {
        return connection.execute(`
            SELECT
            	SUM(concert.sold_ticket) as total_sold_ticket
            FROM concert
        `);
    }

    // Toplam Sanatçı Sayısı
    static singers() {
        return connection.execute(`
            SELECT
            	COUNT(singer.id) as total_singer
            FROM singer    
        `);
    }

    // Toplam Konser Sayısı
    static concerts() {
        return connection.execute(`
            SELECT
            	COUNT(concert.id) as total_concert
            FROM concert 
        `);
    }
};

const { getDBConnection } = require('../config/db');

const getStats = async (req, res) => {
    const userId = req.user.id;

    try {
        console.log("Fetching stats for user ID:", userId);

        // Get a database connection
        const connection = await getDBConnection();

        // Execute queries for counts in parallel
        const [
            [totalResult],
            [watchingResult],
            [watchedResult],
            [favoritesResult]
        ] = await Promise.all([
            connection.execute('SELECT GetUserAnimeListCountFn(?) AS total_anime_count', [userId]),
            connection.execute('SELECT GetUserWatchingCount(?) AS watching_count', [userId]),
            connection.execute('SELECT GetUserWatchedCount(?) AS watched_anime_count', [userId]),
            connection.execute('SELECT GetUserFavoritesCount(?) AS fav_count', [userId])
        ]);

        // Parse count results
        const total = totalResult[0]?.total_anime_count || 0;
        const watching = watchingResult[0]?.watching_count || 0;
        const watched = watchedResult[0]?.watched_anime_count || 0;
        const favoritesCount = favoritesResult[0]?.fav_count || 0;
        const planToWatch = total - watching - watched;

        // Now fetch the full anime data for favorites and currently watching
        // Similar to how ListController.js handles it
        const [currentlyWatchingAnime] = await connection.query(
            `SELECT ad.* FROM anime_details ad
             WHERE ad.user_id = ? AND ad.status = 'watching'
             LIMIT 10`,
            [userId]
        );

        const [favoriteAnime] = await connection.query(
            `SELECT ad.* FROM anime_details ad
             WHERE ad.user_id = ? AND ad.is_favorite = 1
             LIMIT 10`,
            [userId]
        );

        // Handle distribution calculation to avoid NaN
        const distribution = total > 0
            ? {
                watching: ((watching / total) * 100).toFixed(1),
                watched: ((watched / total) * 100).toFixed(1),
                plan_to_watch: ((planToWatch / total) * 100).toFixed(1)
            }
            : {
                watching: "0",
                watched: "0",
                plan_to_watch: "0"
            };

        // Send the response
        res.json({
            totalAnime: total,
            watching: watching,
            watched: watched,
            favoritesCount: favoritesCount,
            currentlyWatching: currentlyWatchingAnime || [],
            favoriteAnime: favoriteAnime || [],
            distribution: distribution
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Failed to load statistics' });
    }
};

module.exports = { getStats };
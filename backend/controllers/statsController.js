const { getDBConnection } = require('../config/db'); // Import getDBConnection

const getStats = async (req, res) => {
    const userId = req.user.id;

    try {
        console.log("Fetching stats for user ID:", userId); // Log the user ID

        // Get a database connection
        const connection = await getDBConnection();

        // Execute all queries in parallel
        const [
            [totalResult],
            [watchingResult],
            [watchedResult],
            [favoritesResult],
            [favoriteAnimesResult],
            [currentlyWatchingResult]
        ] = await Promise.all([
            connection.execute('SELECT GetUserAnimeListCountFn(?) AS total_anime_count', [userId]),
            connection.execute('SELECT GetUserWatchingCount(?) AS watching_count', [userId]),
            connection.execute('SELECT GetUserWatchedCount(?) AS watched_anime_count', [userId]),
            connection.execute('SELECT GetUserFavoritesCount(?) AS fav_count', [userId]),
            connection.execute('CALL GetFavoriteAnimes(?)', [userId]),
            connection.execute('CALL GetCurrentlyWatching(?)', [userId])
        ]);

        // Parse results
        const total = totalResult[0]?.total_anime_count || 0;
        const watching = watchingResult[0]?.watching_count || 0;
        const watched = watchedResult[0]?.watched_anime_count || 0;
        const planToWatch = total - watching - watched;

        // Extract anime IDs from stored procedure results
        const favoriteAnimeIds = favoriteAnimesResult.map(a => a.id);
        const currentlyWatchingIds = currentlyWatchingResult.map(a => a.id);

        // Fetch anime details for those IDs (if any)
        let favoriteAnimeDetails = [];
        let currentlyWatchingDetails = [];

        if (favoriteAnimeIds.length > 0) {
            const [favAnimes] = await connection.query(
                `SELECT * FROM anime
                WHERE id IN (?)`, [favoriteAnimeIds]);
            favoriteAnimeDetails = favAnimes;
        }

        if (currentlyWatchingIds.length > 0) {
            const [watchingAnimes] = await connection.query(
                `SELECT * FROM anime
                WHERE id IN (?)`, [currentlyWatchingIds]);
            currentlyWatchingDetails = watchingAnimes;
        }

        // Handle distribution calculation to avoid NaN
        const distribution = total > 0
            ? {
                watching: ((watching / total) * 100).toFixed(1),
                watched: ((watched / total) * 100).toFixed(1),
                plan_to_watch: ((planToWatch / total) * 100).toFixed(1)
            }
            : {
                watching: 0,
                watched: 0,
                plan_to_watch: 0
            };

        // Send the response
        res.json({
            totalAnime: total,
            watching: watching,
            watched: watched,
            favoritesCount: favoritesResult[0]?.fav_count || 0,
            currentlyWatching: currentlyWatchingDetails,
            favoriteAnime: favoriteAnimeDetails,
            distribution: distribution
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Failed to load statistics' });
    }
};

module.exports = { getStats };

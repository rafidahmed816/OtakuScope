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

        // Release the connection back to the pool
        //connection.release();
        
        console.log("Total Result:", totalResult);
       /* console.log("Watching Result:", watchingResult);
        console.log("Watched Result:", watchedResult);
        console.log("Favorites Result:", favoritesResult);
        */

        // Calculate statistics
        const total = totalResult[0]?.total_anime_count || 0;
        const watching = watchingResult[0]?.watching_count || 0;
        const watched = watchedResult[0]?.watched_anime_count || 0;
        const planToWatch = total - watching - watched;

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
            currentlyWatching: currentlyWatchingResult.map(item => ({
                id: item.id,
                title: item.title_romaji,
                image: item.cover_image
            })),
            favoriteAnime: favoriteAnimesResult.map(item => ({
                id: item.id,
                title: item.title_romaji,
                image: item.cover_image,
                score: item.score
            })),
            distribution: distribution
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Failed to load statistics' });
    }
};

module.exports = { getStats };
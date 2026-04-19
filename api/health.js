module.exports = (req, res) => {
    res.json({
        status: 'OK',
        message: 'API is working',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
};

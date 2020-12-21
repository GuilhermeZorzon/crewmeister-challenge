module.exports = {

    getHealth: async (req, res, next) => {
        res.json({
            'status': 'health check ok'
        })
    }
}
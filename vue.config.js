module.exports = {
    productionSourceMap: false,
    pages: {
        index: {
            entry: 'src/main.ts',
            title: `Terraria Tile Tool`,
        },
    },
    publicPath: process.env.VUE_APP_BASE !== undefined ? process.env.VUE_APP_BASE : '/',
};
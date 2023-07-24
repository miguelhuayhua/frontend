module.exports = {
    // ...
    cookies: {
        secure: process.env.NODE_ENV === 'production', // Configura 'secure' en true en producción
    },
    // ...
};

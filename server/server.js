/**
 * Third-party node modules
 */
const path = require('path');
const express = require('express');

/**
 * Constants and other constant variables defined in scope.
 */
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

let app = express();

app.use(express.static(publicPath));

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})


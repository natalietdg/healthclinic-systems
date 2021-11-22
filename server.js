const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');

app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.js'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
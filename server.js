const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');

app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
console.log('process.env', process.env);
console.log('process.env.PUBLIC_PATH', process.env.PUBLIC_PATH);
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
const express = require('express');

const PORT = process.env.PORT || 1000;

const app = express();








app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})
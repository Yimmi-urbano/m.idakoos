const path = require('path');

require('dotenv').config();


function renderPage(page) {
    return (req, res) => {
        res.render(page);
    };
}


module.exports = {
    renderPage
};

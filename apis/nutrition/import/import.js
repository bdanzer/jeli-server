const parse5 = require('parse5');
const axios = require('axios');
const { Router } = require('express');
const uuidv4 = require('uuid').v4;
const moment = require('moment');
const cheerio = require('cheerio');

const router = Router();

router.route('/').get(async (req, res, next) => {
    try {
        const HTML = await axios
            .get('https://www.cookingclassy.com/shrimp-scampi/')
            .then((res) => res.data);

        const $ = cheerio.load(HTML);
        const stringJSON = $('script[type="application/ld+json"]').html();
        const recipeInfo = JSON.parse(stringJSON);
        console.log($.html(), recipeInfo);

        res.send({
            success: true,
            data: recipeInfo['@graph'].find(
                (item) => item['@type'] === 'Recipe'
            ),
        });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

module.exports = router;

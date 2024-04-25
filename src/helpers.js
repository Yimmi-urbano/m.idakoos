const path = require('path');
const { fetchPages } = require('./api');
const AWS = require('aws-sdk');
require('dotenv').config();


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});


function renderPage(page) {
    return (req, res) => {
        res.render(page);
    };
}

function renderPageWithTitle(title) {
    return async (req, res) => {

        const slug = req.params.page
        const pages = await fetchPages(slug);

        res.render('page', { title: pages.name, content: pages.body });
    };
}

function renderPageFromParam() {
    return (req, res) => {
        const page_slug = req.params.page || '';
        res.render('page', { title: page_slug });
    };
}

function renderCategory(category) {
    return (req, res) => {
        res.render('categories', { title: category });
    };
}

function renderCategoryFromParam() {
    return (req, res) => {
        const title = req.params.category || '';
        res.render('categories', { title });
    };
}

function renderProductDetail() {
    return (req, res) => {
        const title = req.params.product || '';
        const id = req.params.id || '';
        res.render('product-detail', { title, id });
    };
}


async function fetchHtmlFromS3(page) {
    const params = {
        Bucket: "idakoos",
        Key: page
    };

    try {
        const data = await s3.getObject(params).promise();
        return data.Body.toString('utf-8');
    } catch (error) {
        console.error('Error fetching HTML from S3:', error);
        return null;
    }
}

function renderPageFromS3() {
    return async (req, res) => {
        try {
            const page_slug = req.params.page || '';

            const page = page_slug + '.html';
            const htmlContent = await fetchHtmlFromS3(page);
            const pages = await fetchPages(page_slug);
            const meta_seo = pages.seo_content[0]
            const title = pages.title;

            if (htmlContent) {
                res.render('page', { title: title, content: htmlContent, meta_seo: meta_seo });
            } else {
                res.status(404).send('Page not found');
            }
        } catch (error) {
            console.error('Error rendering page:', error);
            res.status(500).send('Internal Server Error');
        }
    };
}



module.exports = {
    renderPage,
    renderPageWithTitle,
    renderPageFromParam,
    renderCategory,
    renderCategoryFromParam,
    renderProductDetail,
    renderPageFromS3
};

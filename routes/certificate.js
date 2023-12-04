const ejs = require('ejs');
const fs = require('fs');
const excelSchema = require('../models/excelSchema');

const certificate = async (req, res) => {
    try {
        const renderdata = await excelSchema.find();
        const template = fs.readFileSync('views/certificate.ejs', 'utf-8');
        let data = renderdata[0]
        // Render the template with the data
        // const renderedCertificate = ejs.render(template, { data });
        // Save or send the rendered certificate as needed
        // fs.writeFileSync('../cert.html', renderedCertificate);
        res.render('certificate', { data });

    }
    catch (error) {
        console.log(error)
    }
}


module.exports = { certificate }
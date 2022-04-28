function motortemplates(app) {
    // Importar Handlebars
    const handlebars = require('express-handlebars')

    // Configuracion Motor de Plantilla
    app.engine('hbs', handlebars.engine(
        {
            extname: 'hbs',
            defaultLayout: 'mainLayout.hbs',
            layoutsDir: __dirname + '/views/layouts',
            partialsDir: __dirname + '/views/partials'
        }
    ))
    // Entorno de Motor de Plantilla
    app.set('view engine', 'hbs')
    app.set('views', __dirname + '/views/pages')

}

module.exports = motortemplates
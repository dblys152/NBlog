const swaggerUi = require('swagger-ui-express'); 
const swaggereJsdoc = require('swagger-jsdoc'); 
const options = { 
    swaggerDefinition: { 
        info: { 
            title: 'NBlog API'
          , version: '1.0.0'
          , description: 'NBlog ApI'
          , 
        }
      , host: 'localhost:3000'
      , basePath: '/' 

    }
  , apis: ['./swagger/*'] 
}; 

const specs = swaggereJsdoc(options); 

module.exports = { swaggerUi, specs };


import express from 'express';
import methodOverride from "method-override";
import handlebars from 'express-handlebars';
import mongoose from "mongoose";

//Importar archivo utils que me soluciona la creación del path
import __dirname from './utils.js';

//Importar dotenv para utilizar las varliables de entorno
import dotenv from "dotenv";

//Importar los routers
import productRouter from './routes/product.router.js';

//Inicializo la constante app para utilizar express
const app = express();

//configurar para trabajar con json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config(); //nos permitia poder trabjar con las variables de entorno

//Leer y almacenar variables de entorno
const URIConexion = process.env.URIMONGO;

//Conexión a la base de datos
mongoose.connect(URIConexion)
    .then( () => console.log(''))
    .catch((error) => console.error('Error en conexion:', error))
;

//Para poder reescribir e interpretar el valor del campo _method de un formulario
app.use(methodOverride('_method'));

//Inicializar el motor indicando app.engine
app.engine('handlebars', handlebars.engine());

/**
 * con app.set('views',ruta) Indicamos en qué parte dle proyecto van a estar las vistas
 * Recuerda utilizar rutas absolutas para indicar y evitar asuntos de ruteo relativo
 */
app.set('views', __dirname + '/views');

app.set('view engine', 'handlebars');

//Seteo de manera estática la carpeta public
app.use(express.static(__dirname+'/public'));

app.use('/product', productRouter);

app.get('/newProduct', (req, res) =>{
    res.render('newProduct');
})

const server = app.listen(8080, ()=> {
    console.log("Listening on PORT 8080")
});

router.post('/register', passport.authenticate('register',{failureRedirect:'/failregister'}), async (req,res) => {
    res.send({status:"success", message: "User registered"})
})

router.get('/failregister', async (req,res) => {
    console.log("Failed Strategy")
    res.send({error: "Failed"})
})

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.desserializeUser( async(id, done) => {
    let user = await userService.findById(id);
    done(null, user.id);
})
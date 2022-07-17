// import db from "../config/db.js";
import { Viaje } from "../database/models/Viaje.js";
import { Testimonial } from "../database/models/Testimonial.js";

const indexController = {
    async inicio(req, res){

        try {

            const promiseDB = [];

            promiseDB.push( Viaje.findAll({ limit: 3 }) );
            promiseDB.push( Testimonial.findAll({ limit: 3 }) );

            const resultadoDB = await Promise.all( promiseDB );

            const [ viajes, testimoniales ] = resultadoDB;
    
            res.render("inicio", {
                pagina: "Inicio",
                clase: "home",
                viajes,
                testimoniales
            })            
        } catch (error) {
            console.log(error);
        }
    },

    nosotros(req, res){
        res.render("nosotros",  {
            pagina: "Nosotros"
        })
    },

    async viajes(req, res){
        const viajes = await Viaje.findAll();

        console.log(viajes);

        res.render("viajes", {
            pagina: "Próximos Viajes",
            viajes
        })
    },

    async detalleViaje(req, res){

        const { slug } = req.params

        try {
            const viaje = await Viaje.findOne(
                {
                    where: {
                        slug
                    }
                }
            );

            res.render("viaje", {
                pagina: viaje.titulo,
                viaje
            }) 
        } catch (error) {
            console.log(error);
        }
    },

    async testimoniales(req, res){

        try {
            const testimoniales = await Testimonial.findAll();

            res.render("testimoniales", {
                pagina: "Testimoniales",
                testimoniales
            })
        } catch (error) {
            console.log(error);
        }


    },

    async guardartestimonial(req, res){

        const { nombre, correo, mensaje } = req.body;
        
        const errores = [];

        if(nombre.trim() === ""){
            errores.push({mensaje: "El nombre no puede estar vacío"});
        }
        if(correo.trim() === ""){
            errores.push({mensaje: "El correo no puede estar vacío"});
        }
        if(mensaje.trim() === ""){
            errores.push({mensaje: "El mensaje no puede estar vacío"});
        }

        if(errores.length > 0 ){

            const testimoniales = await Testimonial.findAll();

            res.render("testimoniales", {
                pagina: "Testimoniales",
                errores,
                nombre,
                correo,
                mensaje,
                testimoniales
            });
        } else {
            // Almacenar testimonial
            try {
                await Testimonial.create({
                    nombre,
                    correo,
                    mensaje
                })
                res.redirect("/testimoniales");
            } catch (error) {
                console.log(error);
            }

        }
    }
};

export default indexController;
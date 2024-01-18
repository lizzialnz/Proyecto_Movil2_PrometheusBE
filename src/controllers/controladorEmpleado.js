const Empleado = require('../models/modeloEmpleado');

exports.listarEmpleados = async (req, res) => {
    const { nombre_usuario } =  req.query;
    if(!nombre_usuario)
    {
        res.send("Debe enviar el nombre de usuario ")
    }else{
    const buscarEmpleado = await Empleado.findOne({
        where: {
            nombre_usuario: nombre_usuario
        }
    });
    
    if (!buscarEmpleado){
        res.send("El usuario no existe");
    }else{
        console.log(buscarEmpleado);
        res.json(buscarEmpleado);
    }
    }
};

exports.Guardar = async(req, res) => {
    const { nombre_completo, nombre_usuario, correo, telefono, contrasena_encriptada, direccion_usuario} = req.body;
    if (!nombre_completo || !nombre_usuario || !correo || !telefono || !contrasena_encriptada || !direccion_usuario)
    {
        res.send("Debe enviar los datos completos");
    }
    else{
        const nuevoEmpleado = await Empleado.create({
            nombre_completo: nombre_completo,
            nombre_usuario: nombre_usuario,
            correo: correo,
            telefono: telefono,
            contrasena_encriptada: contrasena_encriptada,
            direccion_usuario: direccion_usuario
        }).then((data) => {
            console.log(data);
            res.send("Registro almacenado correctamente");
        }).catch((error)=>{
            console.log(error);
            res.send(error);
            res.send("Error al guardar los datos");
        });
    }
};

exports.EliminarParamsEmpleado = async (req, res) => {
    const { idempleado } =  req.params;
    if(!idempleado)
    {
        res.send("Debe enviar el id del empleado ")
    }
    else{
         const buscarEmpleado = await Empleado.findOne({
            where:{
                idempleado: idempleado,
            } 
         });
         if(!buscarEmpleado){
             res.send("El empleado no existe");
         }
         else{
             await Empleado.destroy({
                where:{
                    idempleado:idempleado,
                }
             }).then((data) => {
                 console.log(data);
                 res.send("El registro ha sido eliminado");
             }).catch((error)=>{
                 console.log(error);
                 res.send("El registro no fue eleminado, porque hay un error en el servidor")
             });
         }
    }
};

exports.ActualizarQuery = async (req, res) => {
    const { idempleado } = req.query;
    const { nombre_completo, nombre_usuario, correo, telefono, contrasena_encriptada, direccion_usuario }=req.body;

    if (!idempleado)
    {
        res.send("Debe enviar el id del empleado");
    }
    else{
        var buscarEmpleado = await Empleado.findOne({
            where: {
                idempleado: idempleado,
            }
        });
        if (!buscarEmpleado){
            res.send("El empleado no existe");
        }
        else{

            if (!nombre_completo || !nombre_usuario || !correo || !telefono || !contrasena_encriptada || !direccion_usuario)
            {
                res.send("Debe enviar los datos completos");
            }
            else{
                buscarEmpleado.nombre_completo=nombre_completo;
                buscarEmpleado.nombre_usuario=nombre_usuario;
                buscarEmpleado.correo=correo;
                buscarEmpleado.telefono=telefono;
                buscarEmpleado.contrasena_encriptada=contrasena_encriptada;
                buscarEmpleado.direccion_usuario=direccion_usuario;
                await buscarEmpleado.save();
                console.log(buscarEmpleado);
                res.send("Registro actualizado");
            }
        }
    }
};

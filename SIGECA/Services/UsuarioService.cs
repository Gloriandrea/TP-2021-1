using MongoDB.Bson;
using MongoDB.Driver;
using SIGECA.DTOs;
using SIGECA.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Services
{
    public class UsuarioService
    {
        private readonly IMongoCollection<Usuario> _usuarios;
        private readonly IMongoCollection<Roles> _rol;

        public UsuarioService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _usuarios = database.GetCollection<Usuario>("Usuarios");
            _rol = database.GetCollection<Roles>("roles");
        }

        public async Task<List<Usuario>> GetAll()
        {
            return _usuarios.Find(x => true).ToList();
        }

        public async Task<Usuario> GetById(string usuarioID)
        {
            return _usuarios.Find(x => x.id == usuarioID).FirstOrDefault();
        }

        public async Task<Trabajador> CreateUsuarioTrabajar(Trabajador usuario)
        {
            _usuarios.InsertOne(usuario);
            return usuario;
        }
        public async Task<Cliente> CreateUsuarioCliente(Cliente usuario)
        {
            _usuarios.InsertOne(usuario);
            return usuario;
        }
        public async Task<Usuario> UpdateUsuario(Usuario usuario)
        {
            var update = Builders<Usuario>.Update.Set("datos", usuario.datos)
                                            .Set("tipoUsuario", usuario.tipoUsuario)
                                            .Set("rol",usuario.rol);
            var filters = Builders<Usuario>.Filter.Eq("id", usuario.id);
            _usuarios.UpdateOne(filters, update);
            return usuario;
        }
        public async Task UpdateEstadoUsuario(string usuarioid, string estado)
        {
            var update = Builders<Usuario>.Update.Set("estado", estado == "activo" ? "inactivo" : "activo");
            var filters = Builders<Usuario>.Filter.Eq("id", usuarioid);
            _usuarios.UpdateOne(filters, update);
        }

        public async Task UpdateContraseñaUsuario(string usuarioid, string contraseña)
        {
            var update = Builders<Usuario>.Update.Set("contraseña", contraseña);
            var filters = Builders<Usuario>.Filter.Eq("id", usuarioid);
            _usuarios.UpdateOne(filters, update);
        }

        public async Task<UsuarioDTO> getUsuariosRolPermiso(string usuarioid) {

            UsuarioDTO listUsuarioDTO = new UsuarioDTO();

            var match = new BsonDocument("$match",
                                new BsonDocument("_id",
                                new ObjectId(usuarioid)));

            var lookup1 = new BsonDocument("$lookup",
                            new BsonDocument
                                {
                                    { "from", "roles" },
                                    { "let",
                            new BsonDocument("idrol", "$rol") },
                                    { "pipeline",
                            new BsonArray
                                    {
                                        new BsonDocument("$match",
                                        new BsonDocument("$expr",
                                        new BsonDocument("$eq",
                                        new BsonArray
                                                    {
                                                        "$_id",
                                                        new BsonDocument("$toObjectId", "$$idrol")
                                                    })))
                                    } },
                                    { "as", "rolObj" }
                                });

            var unwind1 = new BsonDocument("$unwind",
                            new BsonDocument("path", "$rolObj"));

            var unwind2 = new BsonDocument("$unwind",
                            new BsonDocument("path", "$rolObj.permisos"));

            var lookup2 = new BsonDocument("$lookup",
                                new BsonDocument
                                    {
                                        { "from", "permisos" },
                                        { "let",
                                new BsonDocument("idper", "$rolObj.permisos") },
                                        { "pipeline",
                                new BsonArray
                                        {
                                            new BsonDocument("$match",
                                            new BsonDocument("$expr",
                                            new BsonDocument("$eq",
                                            new BsonArray
                                                        {
                                                            "$_id",
                                                            new BsonDocument("$toObjectId", "$$idper")
                                                        })))
                                        } },
                                        { "as", "permisosObj" }
                                });

            var unwind3 = new BsonDocument("$unwind",
                                new BsonDocument("path", "$permisosObj"));

            var group = new BsonDocument("$group",
                                new BsonDocument
                                    {
                                        { "_id", "$_id" },
                                        { "_t",
                                new BsonDocument("$first", "$_t") },
                                        { "tipoUsuario",
                                new BsonDocument("$first", "$tipoUsuario") },
                                        { "nombreUsuario",
                                new BsonDocument("$first", "$nombreUsuario") },
                                        { "contrasena",
                                new BsonDocument("$first", "$contraseña") },
                                        { "estado",
                                new BsonDocument("$first", "$estado") },
                                        { "datos",
                                new BsonDocument("$first", "$datos") },
                                        { "rol",
                                new BsonDocument("$first", "$rolObj") },
                                        { "permisos",
                                new BsonDocument("$push", "$permisosObj") }
                                });

            var project = new BsonDocument("$project",
                                new BsonDocument
                                    {
                                        { "_id", "$_id" },
                                        { "_t", "$_t" },
                                        { "tipoUsuario", "$tipoUsuario" },
                                        { "nombreUsuario", "$nombreUsuario" },
                                        { "contrasena", "$contrasena" },
                                        { "estado", "$estado" },
                                        { "datos", "$datos" },
                                        { "rol",
                                new BsonDocument
                                        {
                                            { "_id", "$rol._id" },
                                            { "nombre", "$rol.nombre" },
                                            { "descripcion", "$rol.descripcion" },
                                            { "label", "$rol.label" },
                                            { "permisos", "$permisos" }
                                        } }
                                    });

            listUsuarioDTO = await _usuarios.Aggregate()
                                .AppendStage<dynamic>(match)
                                .AppendStage<dynamic>(lookup1)
                                .AppendStage<dynamic>(unwind1)
                                .AppendStage<dynamic>(unwind2)
                                .AppendStage<dynamic>(lookup2)
                                .AppendStage<dynamic>(unwind3)
                                .AppendStage<dynamic>(group)
                                .AppendStage<UsuarioDTO>(project)
                                .SingleOrDefaultAsync();
            return listUsuarioDTO;
        }

        public async Task<List<RolDTO>> GetListRolDTO()
        {
            var unwind = new BsonDocument("$unwind",
                    new BsonDocument("path", "$permisos"));

            var lookup = new BsonDocument("$lookup",
                    new BsonDocument
                        {
                            { "from", "permisos" },
                            { "let",
                    new BsonDocument("idpermisos", "$permisos") },
                            { "pipeline",
                    new BsonArray
                            {
                                new BsonDocument("$match",
                                new BsonDocument("$expr",
                                new BsonDocument("$eq",
                                new BsonArray
                                            {
                                                "$_id",
                                                new BsonDocument("$toObjectId", "$$idpermisos")
                                            })))
                            } },
                            { "as", "permiso" }
                        });

            var unwind2 = new BsonDocument("$unwind",
                        new BsonDocument("path", "$permiso"));
            var group = new BsonDocument("$group",
                            new BsonDocument
                                {
                                    { "_id", "$_id" },
                                    { "nombre",
                            new BsonDocument("$first", "$nombre") },
                                    { "label",
                            new BsonDocument("$first", "$label") },
                                    { "descripcion",
                            new BsonDocument("$first", "$descripcion") },
                                    { "permisos",
                            new BsonDocument("$push", "$permiso") }
                                });

            List<RolDTO> listaRolesPermisos = await _rol.Aggregate()
                .AppendStage<dynamic>(unwind)
                .AppendStage<dynamic>(lookup)
                .AppendStage<dynamic>(unwind2)
                .AppendStage<RolDTO>(group)
                .ToListAsync();
            return listaRolesPermisos;

        }

        public async Task<string> Login(string nombre , string clave)
        {
            Usuario usuario = await _usuarios.Find(x => x.nombreUsuario == nombre && x.contraseña == clave).FirstOrDefaultAsync();
            return usuario == null ? "" : usuario.id;
        }

    }
}

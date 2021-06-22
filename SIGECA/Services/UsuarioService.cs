using MongoDB.Driver;
using SIGECA.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Services
{
    public class UsuarioService
    {
        private readonly IMongoCollection<Usuario> _usuarios;

        public UsuarioService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _usuarios = database.GetCollection<Usuario>("Usuarios");
        }

        public async Task<List<Usuario>> GetAll()
        {
            return _usuarios.Find(x => true).ToList();
        }

        /* public async Task<List<Trabajador>> GetAllTrabajador()
         {
             return _usuarios.Find(x => x.tipoUsuario != "Cliente").ToList();
         }*/

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
                                            .Set("tipoUsuario", usuario.tipoUsuario);
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

    }
}

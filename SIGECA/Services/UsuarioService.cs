using MongoDB.Driver;
using SIGECA.Entities;
using System;
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

        public async Task<Usuario> GetById(string usuarioID)
        {
            return _usuarios.Find(x => x.id == usuarioID).FirstOrDefault();
        }
    }
}

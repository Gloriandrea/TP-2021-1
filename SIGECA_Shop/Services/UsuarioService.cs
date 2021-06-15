using MongoDB.Driver;
using SIGECA_Shop.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using SIGECA_Shop.Models;

namespace SIGECA_Shop.Services
{
    public class UsuarioService
    {
        private readonly IMongoCollection<Usuario> _clienteCollection;

        public UsuarioService(ISigecaDataBaseSettings settings)
        {
            var Cliente = new MongoClient(settings.ConnectionString);
            var database = Cliente.GetDatabase(settings.DatabaseName);

            _clienteCollection = database.GetCollection<Usuario>("Usuarios");
        }

        public async Task<List<Usuario>> Get()
        {
            return await _clienteCollection.FindAsync(x => true).Result.ToListAsync();
        }

        public async Task<List<Usuario>> GetAll()
        {
            return await _clienteCollection.FindAsync(x => true).Result.ToListAsync();
        }

        public async Task<Usuario> GetById(string clienteID)
        {
            return await _clienteCollection.FindAsync(x => x.id == clienteID).Result.FirstOrDefaultAsync();
        }

        public async Task Create(Usuario cliente)
        {
            await _clienteCollection.InsertOneAsync(cliente);
        }

        public async Task Update(Usuario cliente)
        {
            var old = Builders<Usuario>.Filter.Eq(s => s.id, cliente.id);
            await _clienteCollection.ReplaceOneAsync(old, cliente);
        }

        public async Task UpdateById(string _id, Usuario cliente)
        {
            await _clienteCollection.ReplaceOneAsync(old => old.id == _id, cliente);
        }

        public async Task Delete(Usuario cliente)
        {
            await _clienteCollection.DeleteOneAsync(old => old.id == cliente.id);
        }

        public async Task DeleteById(string _id)
        {
            await _clienteCollection.DeleteOneAsync(old => old.id == _id);
        }

        public async Task<Usuario> Login(Usuario clientIn)
        {
            var client = await _clienteCollection.FindAsync(user => user.nombreUsuario == clientIn.nombreUsuario && user.contraseña == clientIn.contraseña).Result.FirstOrDefaultAsync();
            if (client != null) return client;
            else return null;
        }
    }
}

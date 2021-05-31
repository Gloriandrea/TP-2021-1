using MongoDB.Driver;
using SIGECA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Services
{
    public class ProductoService
    {
        private readonly IMongoCollection<Producto> _productoCollection;

        public ProductoService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _productoCollection = database.GetCollection<Producto>("Producto");
        }

        public async Task<List<Producto>> Get()
        {
            return await _productoCollection.FindAsync(x => true).Result.ToListAsync();
        }

        public async Task<List<Producto>> GetAll()
        {
            return await _productoCollection.FindAsync(x => true).Result.ToListAsync();
        }

        public async Task<Producto> GetById(string productoID)
        {
            return await _productoCollection.FindAsync(x => x.id == productoID).Result.FirstOrDefaultAsync();
        }

        public async Task Create(Producto producto)
        {
            await _productoCollection.InsertOneAsync(producto);
        }

        public async Task Update(Producto producto)
        {
            var old = Builders<Producto>.Filter.Eq(s => s.id, producto.id);
            await _productoCollection.ReplaceOneAsync(old, producto);
        }

        public async Task UpdateById(string _id, Producto producto)
        {
            await _productoCollection.ReplaceOneAsync(old => old.id == _id, producto);
        }

        public async Task Delete(Producto producto)
        {
            await _productoCollection.DeleteOneAsync(old => old.id == producto.id);
        }

        public async Task DeleteById(string _id)
        {
            await _productoCollection.DeleteOneAsync(old => old.id == _id);
        }
    }
}

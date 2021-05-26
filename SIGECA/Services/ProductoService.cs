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
        private readonly IMongoCollection<Producto> _producto;

        public ProductoService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _producto = database.GetCollection<Producto>("Producto");
        }

        public async Task<List<Producto>> GetAll()
        {

            return _producto.Find(x => true).ToList();
        }

        public async Task<Producto> GetById(string productoID)
        {

            return _producto.Find(x => x.id == productoID).FirstOrDefault();
        }
    }
}

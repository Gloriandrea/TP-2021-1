using MongoDB.Driver;
using SIGECA_Shop.Data;
using SIGECA_Shop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA_Shop.Services
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
        public async Task<Producto> GetById(string productoID)
        {
            return await _producto.Find(x => x.id == productoID).FirstOrDefaultAsync();
        }
    }
}

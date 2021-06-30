using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SIGECA_Shop.Models;
using SIGECA_Shop.Data;

namespace SIGECA_Shop.Services
{
    public class CarritoService
    {
        private readonly IMongoCollection<Carrito> _carritoCollection;
        public CarritoService(ISigecaDataBaseSettings settings)
        {
            var Cliente = new MongoClient(settings.ConnectionString);
            var database = Cliente.GetDatabase(settings.DatabaseName);

            _carritoCollection = database.GetCollection<Carrito>("Carrito");
        }

        public async Task<List<Carrito>> GetAllById(string usuarioID)
        {
            return await _carritoCollection.FindAsync(x => x.id == usuarioID).Result.ToListAsync();
        }
    }
}

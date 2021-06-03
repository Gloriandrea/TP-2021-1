using MongoDB.Driver;
using SIGECA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Services
{
    public class ProveedorService
    {
        private readonly IMongoCollection<Proveedor> _proveedor;
        public ProveedorService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _proveedor = database.GetCollection<Proveedor>("Proveedor");
        }
        public async Task<List<Proveedor>> GetAll()
        {
            return await _proveedor.FindAsync(x => true).Result.ToListAsync();
        }
    }
}

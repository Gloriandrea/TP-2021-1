using MongoDB.Driver;
using SIGECA.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SIGECA.Services
{
    public class VentaService
    {
        private readonly IMongoCollection<Venta> _venta;
        public VentaService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _venta = database.GetCollection<Venta>("Venta");
        }

        public async Task<List<Venta>> GetAll()
        {
            return _venta.Find(x => true).ToList();
        }
    }
}

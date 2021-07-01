using MongoDB.Driver;
using SIGECA_Shop.Data;
using SIGECA_Shop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA_Shop.Services
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
        public async Task<Venta> CreateVenta(Venta venta)
        {
            _venta.InsertOne(venta);
            return venta;
        }
    }
}

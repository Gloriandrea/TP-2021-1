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

        public async Task<Venta> CreateVenta(Venta venta)
        {
            _venta.InsertOne(venta);
            return venta;
        }

        public async Task<Venta> GetById(string ventaID)
        {
            return await _venta.FindAsync(x => x.id == ventaID).Result.FirstOrDefaultAsync();
        }

        public async Task<Venta> UpdateVenta(Venta venta)
        {
            var update = Builders<Venta>.Update.Set("tipo", venta.tipo)
                                            .Set("total",venta.total)
                                            .Set("items", venta.items);
            var filters = Builders<Venta>.Filter.Eq("id", venta.id);
            _venta.UpdateOne(filters, update);
            return venta;
        }
        public async Task UpdateEstadoVenta(string ventaid, string estado)
        {
            switch (estado)
            {
                case "pendiente":
                    estado = "anulada";
                    break;
                case "anulada":
                    estado = "pendiente";
                    break;
                case "cobrado":
                    estado = "entregado";
                    break;
            };
            var update = Builders<Venta>.Update.Set("estado", estado);
            var filters = Builders<Venta>.Filter.Eq("id", ventaid);
            _venta.UpdateOne(filters, update);
        }
    }
}

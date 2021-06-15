using MongoDB.Driver;
using SIGECA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Services
{
    public class CompraService
    {
        private readonly IMongoCollection<Compra> _compra;
        public CompraService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _compra = database.GetCollection<Compra>("Compra");
        }

        public async Task<List<Compra>> GetAll()
        {
            return await _compra.FindAsync(x => true).Result.ToListAsync();
        }

        public async Task<Compra> GetById(string compraID)
        {
            return await _compra.FindAsync(x => x.id == compraID).Result.FirstOrDefaultAsync();
        }
        public async Task<Compra> CreateCompra(Compra compra)
        {
            _compra.InsertOne(compra);
            return compra;
        }
        public async Task<Compra> UpdateCompra(Compra compra)
        {
            var update = Builders<Compra>.Update.Set("proveedorID", compra.proveedorID)
                                            .Set("costoTotal", compra.costoTotal)
                                            .Set("items",compra.items);
            var filters = Builders<Compra>.Filter.Eq("id", compra.id);
            _compra.UpdateOne(filters, update);
            return compra;
        }
        public async Task UpdateEstadoCompra(string compraid, string estado)
        {
            var update = Builders<Compra>.Update.Set("estado", estado == "activo" ? "inactivo" : "activo");
            var filters = Builders<Compra>.Filter.Eq("id", compraid);
            _compra.UpdateOne(filters, update);
        }
    }
}

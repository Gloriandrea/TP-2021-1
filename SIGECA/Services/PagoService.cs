using MongoDB.Bson;
using MongoDB.Driver;
using SIGECA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace SIGECA.Services
{
    public class PagoService
    {
        private readonly IMongoCollection<Venta> _ventas;

        public PagoService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _ventas = database.GetCollection<Venta>("Venta");
        }



        public async Task<Venta> GetByCodigoVenta(string codigoVenta)
        {

            return await _ventas.Find(x => x.codigoVenta == codigoVenta).FirstAsync();    
        }

        public async Task<List<Venta>> GetAll()
        {
            return await _ventas.Find(x => true).ToListAsync();
        }
    }
}

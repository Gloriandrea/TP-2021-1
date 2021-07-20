using MongoDB.Driver;
using SIGECA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Services
{
    public class InventarioService
    {
        private readonly IMongoCollection<Producto> _producto;
        private readonly IMongoCollection<Inventario> _inventario;



        public InventarioService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _producto = database.GetCollection<Producto>("Producto");
            _inventario = database.GetCollection<Inventario>("Inventario");

        }


        public async Task<List<Inventario>> GetAllInventario()
        {
            return await _inventario.FindAsync(x => true).Result.ToListAsync();
        }



        public async Task<Inventario> CreateInventario(Inventario inventario)
        {
            _inventario.InsertOne(inventario);
            return inventario;
        }
        public async Task<Inventario> UpdateProductoInventario(Inventario inventario)
        {
            var update = Builders<Inventario>.Update.Set("productoID", inventario.productoID)
                                           .Set("stockInicial", inventario.stockInicial)
                                           .Set("stockFinal", inventario.stockFinal)
                                           .Set("fechaInicial", inventario.fechaInicial)
                                           .Set("fechaFinal", inventario.fechaFinal)
                                           .Set("usuarioID", inventario.usuarioId)
                                           .Set("tiendaID", inventario.tiendaID);
            var filters = Builders<Inventario>.Filter.Eq("id", inventario.id);
            _inventario.UpdateOne(filters, update);
            return inventario;
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using SIGECA.DTOs;
using SIGECA.Entities;

namespace SIGECA.Services
{
    public class CatalogoService
    {
        private readonly IMongoCollection<Oferta> _oferta;
        private readonly IMongoCollection<Producto> _producto;
        private readonly IMongoCollection<Tienda> _tienda;
        public CatalogoService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _producto = database.GetCollection<Producto>("Producto");
            _oferta = database.GetCollection<Oferta>("Oferta");
            _tienda = database.GetCollection<Tienda>("Tienda");
        }
        public async Task<List<Producto>> GetAll()
        {
            return await _producto.FindAsync(x => true).Result.ToListAsync();
        }
        public async Task<Oferta> GetById(string productoID)
        {
            return await _oferta.Find(x => x.id == productoID).FirstOrDefaultAsync();
        }
        public async Task<List<Producto>> TraerListaProducto()
        {
            return await _producto.FindAsync(x => true).Result.ToListAsync();
        }
        public async Task<List<Oferta>> AllOferta()
        {
            return await _oferta.FindAsync(x => true).Result.ToListAsync();
        }
        public async Task<List<Tienda>> AllTienda()
        {
            return await _tienda.FindAsync(x => true).Result.ToListAsync();
        }
        public async Task<Tienda> GetTiendaById(string productoID)
        {
            return await _tienda.Find(x => x.id == productoID).FirstOrDefaultAsync();
        }
        public async Task<Oferta> CreateOferta(Oferta oferta)
        {
            _oferta.InsertOne(oferta);
            return oferta;
        }
        public async Task<Oferta> UpdateOfertaPorcentaje(Oferta oferta)
        {
            var update = Builders<Oferta>.Update
                                            .Set("fechaInicio", oferta.fechaInicio)
                                            .Set("fechaVencimiento", oferta.fechaVencimiento)
                                            .Set("stockOferta", oferta.stockOferta)
                                            .Set("porcentajeDescuento", oferta.porcentajeDescuento);
            var filters = Builders<Oferta>.Filter.Eq("id", oferta.id);
            _oferta.UpdateOne(filters, update);
            return oferta;
        }
        public async Task<Oferta> UpdateOfertaMulti(Oferta oferta)
        {
            var update = Builders<Oferta>.Update
                                            .Set("fechaInicio", oferta.fechaInicio)
                                            .Set("fechaVencimiento", oferta.fechaVencimiento)
                                            .Set("stockOferta", oferta.stockOferta)
                                            .Set("cantidadOfrecida", oferta.cantidadOfrecida)
                                            .Set("cantidadPagada", oferta.cantidadPagada);
            var filters = Builders<Oferta>.Filter.Eq("id", oferta.id);
            _oferta.UpdateOne(filters, update);
            return oferta;
        }
    }
}

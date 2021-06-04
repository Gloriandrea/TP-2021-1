using MongoDB.Bson;
using MongoDB.Driver;
using SIGECA.DTOs;
using SIGECA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Services
{
    public class ProductoService
    {
        private readonly IMongoCollection<Producto> _productoCollection;
        private readonly IMongoCollection<TipoProducto> _tipoProducto;
        /*private readonly IMongoCollection<Producto> _productoCollection;*/

        public ProductoService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _productoCollection = database.GetCollection<Producto>("Producto");
            _tipoProducto = database.GetCollection<TipoProducto>("TipoProducto");
        }

        public async Task<List<Producto>> Get()
        {
            return await _productoCollection.Find(x => true).ToListAsync();
        }

        public async Task<List<Producto>> GetAll()
        {
            return await _productoCollection.FindAsync(x => true).Result.ToListAsync();
        }

        public async Task<Producto> GetById(string productoID)
        {
            return await _productoCollection.Find(x => x.id == productoID).FirstOrDefaultAsync();
        }

        public async Task Create(Producto producto)
        {
            await _productoCollection.InsertOneAsync(producto);
        }

        public async Task Update(Producto producto)
        {
            var old = Builders<Producto>.Filter.Eq(s => s.id, producto.id);
            await _productoCollection.ReplaceOneAsync(old, producto);
        }

        public async Task UpdateById(string _id, Producto producto)
        {
            await _productoCollection.ReplaceOneAsync(old => old.id == _id, producto);
        }

        public async Task Delete(Producto producto)
        {
            await _productoCollection.DeleteOneAsync(old => old.id == producto.id);
        }

        public async Task DeleteById(string _id)
        {
            await _productoCollection.DeleteOneAsync(old => old.id == _id);
        }

        public async Task<List<TipoProducto>> GetAllTipoProducto() {
            return await _tipoProducto.Find(x => true).ToListAsync();
        }

        public async Task<List<ProductoDTO>> GetAllProductoDTO()
        {
            List<ProductoDTO> productos = new List<ProductoDTO>();
            var lookup = new BsonDocument("$lookup",
                              new BsonDocument
                                  {
                                    { "from", "TipoProducto" },
                                    { "let",
                            new BsonDocument("tipProdID", "$tipoProductoID") },
                                    { "pipeline",
                            new BsonArray
                                    {
                                        new BsonDocument("$match",
                                        new BsonDocument("$expr",
                                        new BsonDocument("$eq",
                                        new BsonArray
                                                    {
                                                        new BsonDocument("$toObjectId", "$$tipProdID"),
                                                        "$_id"
                                                    })))
                                    } },
                                    { "as", "TipoProducto" }
                                  });
           var project =  new BsonDocument("$project",
            new BsonDocument
                {
                            { "_id", "$_id" },
                            { "nombre", "$nombre" },
                            { "descripcion", "$descripcion" },
                            { "tipoVenta", "$tipoVenta" },
                            { "precio", "$precio" },
                            { "stockAdquirido", "$stockAdquirido" },
                            { "stockDisponible", "$stockDisponible" },
                            { "urlImagen", "$urlImagen" },
                            { "tipoProducto",
                    new BsonDocument("$arrayElemAt",
                    new BsonArray
                                {
                                    "$TipoProducto",
                                    0
                                }) }
                });

            productos = await _productoCollection.Aggregate()
                .AppendStage<dynamic>(lookup)
                .AppendStage<ProductoDTO>(project)
                .ToListAsync();

            return productos;
        }

        public async Task<Producto> CreateProducto(Producto producto)
        {
            _productoCollection.InsertOne(producto);
            return producto;
        }

        public async Task<Producto> UpdateProducto(Producto producto)
        {

            var update = Builders<Producto>.Update.Set("nombre", producto.nombre)
                                           .Set("descripcion", producto.descripcion)
                                           .Set("tipoVenta", producto.tipoVenta)
                                           .Set("tipoProducto", producto.tipoProductoID)
                                           .Set("precio", producto.precio);
            var filters = Builders<Producto>.Filter.Eq("id", producto.id);
            _productoCollection.UpdateOne(filters, update);
            return producto;
        }
    }
}

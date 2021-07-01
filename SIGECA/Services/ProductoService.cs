using MongoDB.Bson;
using MongoDB.Driver;
using SIGECA.DTOs;
using SIGECA.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Services
{
    public class ProductoService
    {
        private readonly IMongoCollection<Producto> _producto;
        private readonly IMongoCollection<Categoria> _categoria;

        public ProductoService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _producto = database.GetCollection<Producto>("Producto");
            _categoria = database.GetCollection<Categoria>("Categoria");
        }

        public async Task<List<Producto>> Get()
        {
            return await _producto.Find(x => true).ToListAsync();
        }

        public async Task<List<Producto>> GetAll()
        {
            return await _producto.FindAsync(x => true).Result.ToListAsync();
        }

        public async Task<Producto> GetById(string productoID)
        {
            return await _producto.Find(x => x.id == productoID).FirstOrDefaultAsync();
        }

        public async Task Create(Producto producto)
        {
            await _producto.InsertOneAsync(producto);
        }

        public async Task Update(Producto producto)
        {
            var old = Builders<Producto>.Filter.Eq(s => s.id, producto.id);
            await _producto.ReplaceOneAsync(old, producto);
        }

        public async Task UpdateById(string _id, Producto producto)
        {
            await _producto.ReplaceOneAsync(old => old.id == _id, producto);
        }

        public async Task Delete(Producto producto)
        {
            await _producto.DeleteOneAsync(old => old.id == producto.id);
        }

        public async Task DeleteById(string _id)
        {
            await _producto.DeleteOneAsync(old => old.id == _id);
        }

        public async Task<List<Categoria>> GetAllCategoriaProducto()
        {
            return await _categoria.Find(x => true).ToListAsync();
        }

        public async Task<Categoria> GetCategoryNameByID(string CategodyId)
        {
            return await _categoria.FindAsync(x => x.id == CategodyId).Result.FirstOrDefaultAsync();
        }

        public async Task<List<ProductoDTO>> GetAllProductoDTO()
        {
            List<ProductoDTO> productos = new List<ProductoDTO>();
            var lookup = new BsonDocument("$lookup",
                                            new BsonDocument
                                                {
                                                    { "from", "Categoria" },
                                                    { "let",
                                            new BsonDocument("catProdID", "$categoriaID") },
                                                    { "pipeline",
                                            new BsonArray
                                                    {
                                                        new BsonDocument("$match",
                                                        new BsonDocument("$expr",
                                                        new BsonDocument("$eq",
                                                        new BsonArray
                                                                    {
                                                                        new BsonDocument("$toObjectId", "$$catProdID"),
                                                                        "$_id"
                                                                    })))
                                                    } },
                                                    { "as", "CategoriaProducto" }
                                                });
            var project = new BsonDocument("$project",
                                 new BsonDocument
                                     {
                                        { "_id", "$_id" },
                                        { "categoria",
                                new BsonDocument("$arrayElemAt",
                                new BsonArray
                                            {
                                                "$CategoriaProducto",
                                                0
                                            }) },
                                        { "nombre", "$nombre" },
                                        { "descripcion", "$descripcion" },
                                        { "tipoVenta", "$tipoVenta" },
                                        { "unidadMedida", "$unidadMedida" },
                                        { "precio", "$precio" },
                                        { "stock", "$stock" },
                                        { "urlImagen", "$urlImagen" },
                                        { "codigoQR", "$codigoQR" }
                                     });

            productos = await _producto.Aggregate()
                .AppendStage<dynamic>(lookup)
                .AppendStage<ProductoDTO>(project)
                .ToListAsync();

            return productos;
        }

        public async Task<Producto> CreateProducto(Producto producto)
        {
            _producto.InsertOne(producto);
            return producto;
        }

        public async Task<Producto> UpdateProducto(Producto producto)
        {

            var update = Builders<Producto>.Update.Set("nombre", producto.nombre)
                                           .Set("categoriaID", producto.categoriaID)
                                           .Set("descripcion", producto.descripcion)
                                           .Set("tipoVenta", producto.tipoVenta)
                                           .Set("precio", producto.precio)
                                           .Set("unidadMedida", producto.unidadMedida)
                                           .Set("stock", producto.stock);
            var filters = Builders<Producto>.Filter.Eq("id", producto.id);
            _producto.UpdateOne(filters, update);
            return producto;
        }
        public async Task<string> UpdateProductoImagen(string imagenProducto, string productoID)
        {

            var update = Builders<Producto>.Update.Set("urlImagen", imagenProducto);
            var filters = Builders<Producto>.Filter.Eq("id", productoID);
            _producto.UpdateOne(filters, update);
            return imagenProducto;
        }

        public async Task<string> UpdateProductoImagenYQRCodigo(string productoID, string urlImagen, string codigoQR)
        {

            var update = Builders<Producto>.Update.Set("urlImagen", urlImagen)
                                                  .Set("codigoQR", codigoQR);
            var filters = Builders<Producto>.Filter.Eq("id", productoID);
            _producto.UpdateOne(filters, update);
            return productoID;
        }

   
    }
}

using MongoDB.Bson;
using MongoDB.Driver;
using SIGECA_Shop.Data;
using SIGECA_Shop.MTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA_Shop.Services
{
    public class CatalogoService
    {
        private readonly IMongoCollection<CatalogoDTO> _clienteCollection;

        public CatalogoService(ISigecaDataBaseSettings settings)
        {
            var Cliente = new MongoClient(settings.ConnectionString);
            var database = Cliente.GetDatabase(settings.DatabaseName);

            _clienteCollection = database.GetCollection<CatalogoDTO>("Producto");
        }

        public async Task<List<CatalogoDTO>> Get()
        {
            //var lookup = new BsonDocument("$lookup",
            //                        new BsonDocument
            //                            {
            //                                { "from", "Oferta" },
            //                                { "let",
            //                        new BsonDocument("prodID", "$_id") },
            //                                { "pipeline",
            //                        new BsonArray
            //                                {
            //                                    new BsonDocument("$match",
            //                                    new BsonDocument("$expr",
            //                                    new BsonDocument("$eq",
            //                                    new BsonArray
            //                                                {
            //                                                    "$productoID",
            //                                                    new BsonDocument("$toString", "$$prodID")
            //                                                }))),
            //                                    new BsonDocument("$lookup",
            //                                    new BsonDocument
            //                                        {
            //                                            { "from", "Tienda" },
            //                                            { "let",
            //                                    new BsonDocument("tienID", "$tiendaID") },
            //                                            { "pipeline",
            //                                    new BsonArray
            //                                            {
            //                                                new BsonDocument("$match",
            //                                                new BsonDocument("$expr",
            //                                                new BsonDocument("$eq",
            //                                                new BsonArray
            //                                                            {
            //                                                                new BsonDocument("$toObjectId", "$$tienID"),
            //                                                                "$_id"
            //                                                            })))
            //                                            } },
            //                                            { "as", "tienda" }
            //                                        }),
            //                                    new BsonDocument("$unwind",
            //                                    new BsonDocument("path", "$tienda"))
            //                                } },
            //                                { "as", "ofertas" }
            //                            });

            //var catalogo = await _clienteCollection.Aggregate().AppendStage<CatalogoDTO>(lookup).ToListAsync();

            return await _clienteCollection.FindAsync(x => true).Result.ToListAsync();
        }
    }
}

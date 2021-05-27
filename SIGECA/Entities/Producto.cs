using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization.Attributes;

namespace SIGECA.Entities
{
    [BsonDiscriminator(RootClass = true)]
    public class Producto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        [BsonElement("tipoProductoID")]
        public string tipoProductoID { get; set; }

        [BsonElement("nombre")]
        public string nombre { get; set; }

        [BsonElement("descripcion")]
        public string descripcion { get; set; }

        [BsonElement("tipoVenta")]
        public string tipoVenta { get; set; }

        [BsonElement("precio")]
        public int precio { get; set; }

        [BsonElement("stockAdquirido")]
        public int stockAdquirido { get; set; }

        [BsonElement("stockDisponible")]
        public int stockDisponible { get; set; }

    }
}

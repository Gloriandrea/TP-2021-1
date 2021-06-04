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
    public class TipoProducto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        [BsonElement("categoriaID")]
        public string categoriaID { get; set; }

        [BsonElement("nombreTipo")]
        public string nombreTipo { get; set; }

        [BsonElement("precioNormal")]
        public int precioNormal { get; set; }

        [BsonElement("tipoVenta")]
        public string tipoVenta { get; set; }

        [BsonElement("precioOferta")]
        public int precioOferta { get; set; }
    }
}

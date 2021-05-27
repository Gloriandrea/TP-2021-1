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
    public class Oferta
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        [BsonElement("fechaInicio")]
        public DateTime fechaInicio { get; set; }

        [BsonElement("fechaVencimiento")]
        public DateTime fechaVencimiento { get; set; }

        [BsonElement("descuento")]
        public int descuento { get; set; }

        [BsonElement("stock")]
        public int stock { get; set; }

        [BsonElement("productoID")]
        public string productoID { get; set; }
    }
}

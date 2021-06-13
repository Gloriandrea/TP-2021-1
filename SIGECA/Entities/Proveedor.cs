using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Entities
{
    [BsonDiscriminator(RootClass = true)]
    public class Proveedor
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        [BsonElement("nombreEmpresa")]
        public string nombreEmpresa { get; set; }
        [BsonElement("ruc")]
        public string ruc { get; set; }
        [BsonElement("correoEmpresa")]
        public string correoEmpresa { get; set; }
        [BsonElement("nombreContacto")]
        public string nombreContacto { get; set; }
        [BsonElement("apellidoContacto")]
        public string apellidoContacto { get; set; }
        [BsonElement("celularContacto")]
        public string celularContacto { get; set; }
        [BsonElement("direccionEmpresa")]
        public string direccionEmpresa { get; set; }
        [BsonElement("estado")]
        public string estado { get; set; }
    }
}

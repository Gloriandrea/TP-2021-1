using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Entities
{
    public class Roles
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        [BsonElement("nombre")]
        public string nombre { get; set; }

        [BsonElement("label")]
        public string label { get; set; }

        [BsonElement("descripcion")]
        public string descripcion { get; set; }

        [BsonElement("permisos")]
        public List<String> permisos { get; set; } = new List<String>();
    }
}

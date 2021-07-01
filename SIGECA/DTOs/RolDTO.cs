using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SIGECA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.DTOs
{
    public class RolDTO
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
        public List<Permisos> permisos { get; set; } = new List<Permisos>();
    }
}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Entities
{
    public class Permisos
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        [BsonElement("nombre")]
        public string nombre { get; set; }

        [BsonElement("label")]
        public string label { get; set; }

        [BsonElement("icon")]
        public string icon { get; set; }

        [BsonElement("url")]
        public string url { get; set; }
    }
}

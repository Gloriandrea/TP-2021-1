using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA_Shop.Models
{
    public class Carrito
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        [BsonElement("usuarioID")]
        public string usuarioID { get; set; }
        [BsonElement("estado")]
        public string estado { get; set; }
        [BsonElement("precioTotal")]
        public double precioTotal { get; set; }
        [BsonElement("items")]
        public List<Items> items { get; set; }
    }

    public class Items
    {
        public string productoID { get; set; }
        public int cantidad { get; set; }
    }
}

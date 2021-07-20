using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SIGECA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.DTOs
{
    public class TiendaDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        public string nombre { get; set; }
        public string ubicacion { get; set; }
        public List<StockProducto> stock { get; set; } = new List<StockProducto>();
        public string horarioApertura { get; set; }
        public string horarioCierre { get; set; }
        public List<string> trabajadores { get; set; } = new List<string>();
        public List<Oferta> ofertas { get; set; } = new List<Oferta>();
    }
}

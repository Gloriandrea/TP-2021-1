using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Entities
{
    public class Inventario
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        [BsonElement("productoID")]
        public string productoID { get; set; }

        [BsonElement("stockInicial")]
        public int stockInicial { get; set; }

        [BsonElement("fechaInicial")]
        public DateTime? fechaInicial { get; set; }

        [BsonElement("stockFinal")]
        public int stockFinal { get; set; }

        [BsonElement("fechaFinal")]
        public DateTime? fechaFinal { get; set; }

        [BsonElement("tiendaID")]
        public string tiendaID { get; set; }

        [BsonElement("usuarioId")]
        public string usuarioId { get; set; }



        //public int nuevoStock { get; set; }
    }
}

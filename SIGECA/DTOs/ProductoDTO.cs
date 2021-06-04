using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SIGECA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.DTOs
{
    public class ProductoDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        //public string tipoProductoID { get; set; }
        public string nombre { get; set; }

        public string descripcion { get; set; }

        public string tipoVenta { get; set; }

        public int precio { get; set; }

        public int stockAdquirido { get; set; }

        public int stockDisponible { get; set; }

        public string urlImagen { get; set; }
        public TipoProducto tipoProducto { get; set; }

    }
}

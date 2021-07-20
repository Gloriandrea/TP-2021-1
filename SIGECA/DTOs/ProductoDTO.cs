using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SIGECA.Entities;
using System.Collections.Generic;

namespace SIGECA.DTOs
{
    public class ProductoDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        public Categoria categoria { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public string tipoVenta { get; set; }
        public string unidadMedida { get; set; }
        public double precio { get; set; }
        public int stock { get; set; }
        public string urlImagen { get; set; }
        public string codigoQR { get; set; }

    }

    public class ProductoOfertaDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        public Categoria categoria { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public string tipoVenta { get; set; }
        public string unidadMedida { get; set; }
        public double precio { get; set; }
        public int stock { get; set; }
        public string urlImagen { get; set; }
        public string codigoQR { get; set; }
        public List<TiendaDTO> tiendas { get; set; } = new List<TiendaDTO>();

    }

}

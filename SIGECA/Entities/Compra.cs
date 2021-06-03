using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace SIGECA.Entities
{
    [BsonDiscriminator(RootClass = true)]
    public class Compra
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        [BsonElement("proveedorID")]
        public string proveedorID { get; set; }
        [BsonElement("costoTotal")]
        public double costoTotal { get; set; }
        [BsonElement("fecha")]
        public DateTime fecha { get; set; }
        [BsonElement("items")]
        public List<itemProducto> items { get; set; }
    }

    public class itemProducto
    {
        public string productoID { get; set; }
        public string nombre { get; set; }
        public int cantidad { get; set; }
        public string unidadMedida { get; set; }
        public double costo { get; set; }
    }
}

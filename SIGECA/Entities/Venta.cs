using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Entities
{
    [BsonDiscriminator(RootClass = true)]
    [BsonKnownTypes(
       typeof(VantaPresencial),
       typeof(VentaOnline))]
    public class Venta
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        [BsonElement("codigoVenta")]
        public string codigoVenta { get; set; }

        [BsonElement("tipo")]
        public string tipo { get; set; }

        [BsonElement("estado")]
        public string estado { get; set; }

        [BsonElement("items")]
        public List<Items> items { get; set; } = new List<Items>();

        [BsonElement("total")]
        public double total { get; set; }

        [BsonElement("fechaVenta")]
        public DateTime? fechaVenta { get; set; }
    }

    public class Items { 
        public string productoID { get; set; }
        public int cantidad { get; set; }
        public double subtotal { get; set; }
    }

    public class VantaPresencial : Venta { 
        public string usuarioID { get; set; }
    }

    public class VentaOnline : Venta
    {
        public string clienteID { get; set; }
    }
}

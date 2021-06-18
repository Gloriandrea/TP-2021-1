using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace SIGECA.Entities
{
    [BsonDiscriminator(RootClass = true)]
    [BsonKnownTypes(
       typeof(VentaPresencial),
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

        [BsonElement("dniCliente")]
        public string dniCliente { get; set; }

        [BsonElement("tipoCliente")]
        public string tipoCliente { get; set; }
    }

    public class Items
    {

        public string productoID { get; set; }
        [BsonElement("cantidad")]
        public int cantidad { get; set; }
        public double subTotal { get; set; }
    }

    public class VentaPresencial : Venta
    {
        public string usuarioID { get; set; }
        public string dniCliente { get; set; }
    }

    public class VentaOnline : Venta
    {
        public string clienteID { get; set; }
    }
}

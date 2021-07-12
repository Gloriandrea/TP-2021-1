using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace SIGECA.Entities
{
    [BsonDiscriminator(RootClass = true)]

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
        [BsonIgnoreIfNull]
        public string nombreCliente { get; set; }

        [BsonElement("tipoCliente")]
        public string tipoCliente { get; set; }
        [BsonIgnoreIfNull]
        public string usuarioID { get; set; }
        [BsonIgnoreIfNull]
        public DatosCliente datos { get; set; }
    }

    public class Items
    {

        public string productoID { get; set; }
        [BsonIgnore]
        public string nombre { get; set; }
        [BsonElement("cantidad")]
        public int cantidad { get; set; }
        public double subTotal { get; set; }
    }

    public class DatosCliente
    {
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public string correo { get; set; }
        public string telefono { get; set; }
        public string direccion { get; set; }
    }
}

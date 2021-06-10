using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization.Attributes;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Entities
{
    public class Venta
    {
        [BsonDiscriminator(RootClass = true)]
        public class Usuario
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string id { get; set; }

            [BsonElement("tipo")]
            public string tipoUsuario { get; set; }

            [BsonElement("usuarioID")]
            public string contraseña { get; set; }

            [BsonElement("estado")]
            public string estado { get; set; }

            [BsonElement("items")]
            public List<itemProducto> items { get; set; }

            [BsonElement("total")]
            public double total { get; set; }

            [BsonElement("fechaVenta")]
            public DateTime fechaVenta { get; set; }
        }

        public class itemProducto
        {
            public string productoID { get; set; }
            public int cantidad { get; set; }
            public double subTotal { get; set; }
        }
    }
}

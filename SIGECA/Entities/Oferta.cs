using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization.Attributes;


namespace SIGECA.Entities
{
    [BsonDiscriminator(RootClass = true)]
    [BsonKnownTypes(
       typeof(OfertaPorcentaje),
       typeof(OfertaMultiplicidad))]
    public class Oferta
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        [BsonElement("tipoDescuento")]
        public string tipoDescuento { get; set; }

        [BsonElement("fechaInicio")]
        public DateTime fechaInicio { get; set; }

        [BsonElement("fechaVencimiento")]
        public DateTime fechaVencimiento { get; set; }

        [BsonElement("estado")]
        public string estado { get; set; }

        [BsonElement("stockOferta")]
        public int stockOferta { get; set; }

        [BsonElement("tiendaID")]
        public string tiendaID { get; set; }

        [BsonElement("productoID")]
        public string productoID { get; set; }
    }

    public class OfertaPorcentaje : Oferta
    {
        public int porcentajeDescuento { get; set; }
    }

    public class OfertaMultiplicidad : Oferta
    {
        public int cantidadOfrecida { get; set; }
        public int cantidadPagada { get; set; }
    }

}

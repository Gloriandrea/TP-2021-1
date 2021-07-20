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

        [Display(Name = "ID del producto", ShortName = "prodID", Description = "ID del del Producto existente en la tabla productos")]
        [BsonElement("productoID")]
        public string productoID { get; set; }

        [Display(Name = "Stock inicial", ShortName = "stockInic", Description = "Stock inicial del Producto")]
        [BsonElement("stockInicial")]
        public int stockInicial { get; set; }

        [Display(Name = "Stock final", ShortName = "stockFin", Description = "Stock final del Producto")]
        [BsonElement("stockFinal")]
        public int stockFinal { get; set; }

        [Display(Name = "Stock en Venta", ShortName = "nuevStock", Description = "Nuevo stock adquirido")]
        [BsonElement("nuevoStock")]
        public int nuevoStock { get; set; }

        [Display(Name = "Fecha y hora inicial", ShortName = "fechHorInic", Description = "Fecha y hora de registro del stock inicial")]
        [BsonElement("fechaInicial")]
        public DateTime? fechaInicial { get; set; }

        [Display(Name = "Fecha y hora final", ShortName = "fechHorFin", Description = "Fecha y hora de registro del stock al finalizar el día")]
        [BsonElement("fechaFinal")]
        public DateTime? fechaFinal { get; set; }
    }
}

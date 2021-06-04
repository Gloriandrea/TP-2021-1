using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization.Attributes;

namespace SIGECA.Entities
{
    [BsonDiscriminator(RootClass = true)]
    public class Producto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        //[Required]
        //[MaxLength(50, ErrorMessage = "tamaño maximo 50 caracteres")]
        //[MinLength(1, ErrorMessage = "Minimo 1 Caracteres")]
        [Display(Name = "Tipo de Producto", ShortName = "Tipo", Description = "Tipo de Producto")]
        [BsonElement("tipoProductoID")]
        public string tipoProductoID { get; set; }

        [Display(Name = "Nombre del Producto", ShortName = "Nombre", Description = "Nombre del Producto")]
        [BsonElement("nombre")]
        public string nombre { get; set; }

        [Display(Name = "Descripción", ShortName = "Descrip.", Description = "Descripción del producto.")]
        [BsonElement("descripcion")]
        public string descripcion { get; set; }

        [Display(Name = "Tipo de Venta", ShortName = "TipoV", Description = "Tipo de Venta")]
        [BsonElement("tipoVenta")]
        public string tipoVenta { get; set; }

        [Display(Name = "Precio", ShortName = "Precio", Description = "Precio del Producto")]
        [BsonElement("precio")]
        public int precio { get; set; }

        [Display(Name = "Stock Adquirido", ShortName = "StockA", Description = "Stock Adquirido del Producto")]
        [BsonElement("stockAdquirido")]
        public int stockAdquirido { get; set; }

        [Display(Name = "Stock Disponible", ShortName = "StockD", Description = "Stock Disponible del Producto")]
        [BsonElement("stockDisponible")]
        public int stockDisponible { get; set; }

        [Display(Name = "Imagen", ShortName = "Img", Description = "Imagen del Producto")]
        [BsonElement("urlImagen")]
        public string urlImagen { get; set; }

        [BsonElement("ofertaID")]
        public string ofertaID { get; set; }

    }
}

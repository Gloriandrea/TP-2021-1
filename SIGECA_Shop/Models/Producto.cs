using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA_Shop.Models
{
    public class Producto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        [Display(Name = "Categoria de Producto", ShortName = "Categoria", Description = "Categoria a la que pertenece el producto")]
        [BsonElement("categoriaID")]
        public string categoriaID { get; set; }

        [Display(Name = "Nombre del Producto", ShortName = "Nombre", Description = "Nombre del Producto")]
        [BsonElement("nombre")]
        public string nombre { get; set; }

        [Display(Name = "Descripción", ShortName = "Descrip.", Description = "Descripción del producto.")]
        [BsonElement("descripcion")]
        public string descripcion { get; set; }

        [Display(Name = "Tipo de Venta", ShortName = "TipoV", Description = "Tipo de Venta")]
        [BsonElement("tipoVenta")]
        public string tipoVenta { get; set; }

        [Display(Name = "Unidad de Medida", ShortName = "Unidad Medida", Description = "Unidad de Medida del producto")]
        [BsonElement("unidadMedida")]
        public string unidadMedida { get; set; }

        [Display(Name = "Precio", ShortName = "Precio", Description = "Precio del Producto")]
        [BsonElement("precio")]
        public double precio { get; set; }

        [Display(Name = "Stock en Venta", ShortName = "Stock", Description = "Stock en venta del Producto")]
        [BsonElement("stock")]
        public int stock { get; set; }

        [Display(Name = "Imagen", ShortName = "Img", Description = "Imagen del Producto")]
        [BsonElement("urlImagen")]
        public string urlImagen { get; set; }

        [Display(Name = "Codigo QR", ShortName = "QRCode", Description = "CodigoQR del Producto")]
        [BsonElement("codigoQR")]
        public string codigoQR { get; set; }


    }
}

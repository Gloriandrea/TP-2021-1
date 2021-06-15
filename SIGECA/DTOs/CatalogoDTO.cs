using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace SIGECA.DTOs
{
    public class CatalogoDTO
    {
        //PRODUCTO
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        [Display(Name = "Nombre del Producto", ShortName = "Nombre", Description = "Nombre del Producto")]
        [BsonElement("nombre")]
        public string nombre { get; set; }
        [Display(Name = "Tipo de Producto", ShortName = "Tipo", Description = "Tipo de Producto")]
        [BsonElement("tipoProducto")]
        public string tipoProducto { get; set; }
        [Display(Name = "Descripción", ShortName = "Descrip.", Description = "Descripción del producto.")]
        [BsonElement("descripcion")]
        public string descripcion { get; set; }
        [Display(Name = "Tipo de Venta", ShortName = "TipoV", Description = "Tipo de Venta")]
        [BsonElement("tipoVenta")]
        public string tipoVenta { get; set; }
        [Display(Name = "Precio", ShortName = "Precio", Description = "Precio del Producto")]
        [BsonElement("precio")]
        public int precio { get; set; }
        [Display(Name = "Stock Disponible", ShortName = "StockD", Description = "Stock Disponible del Producto")]
        [BsonElement("stockDisponible")]
        public int stockDisponible { get; set; }
        [Display(Name = "Imagen", ShortName = "Img", Description = "Imagen del Producto")]
        [BsonElement("urlImagen")]
        public string urlImagen { get; set; }

        //ENLACE
        [Display(Name = "Stock sin Oferta", ShortName = "StockS", Description = "Stock sin Oferta del Producto")]
        [BsonElement("stockSinOferta")]
        public int stockSinOferta { get; set; }

        //OFERTA
        [Display(Name = "Estado", ShortName = "Estado", Description = "Estado de la Oferta")]
        [BsonElement("estado")]
        public string estado { get; set; }
        [Display(Name = "Descuento", ShortName = "Desc.", Description = "Descuento de la Oferta")]
        [BsonElement("descuento")]
        public int descuento { get; set; }
        [Display(Name = "Fecha de Inicio", ShortName = "FechaI", Description = "Fecha de Inicio de la Oferta")]
        [BsonElement("fechaInicio")]
        public DateTime fechaInicio { get; set; }
        [Display(Name = "Fecha de Vencimiento", ShortName = "FechaV", Description = "Fecha de Vencimiento de la Oferta")]
        [BsonElement("fechaVencimiento")]
        public DateTime fechaVencimiento { get; set; }
        [Display(Name = "Stock Oferta", ShortName = "StockO", Description = "Stock Oferta del Producto")]
        [BsonElement("stockOferta")]
        public int stockOferta { get; set; }
    }
}

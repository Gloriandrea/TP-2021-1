using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Helpers
{
    public class UrlAPI
    {
        public UrlAPI(string RootPath = "https://localhost:44311/"){
            this.Urapp = RootPath;
            this.Producto = this.Urapp + "/api/Producto";
            this.Oferta = this.Urapp + "/api/Oferta";
            this.Catalogo = this.Urapp + "/api/Catalogo";
            this.Usuario = this.Urapp + "/api/Usuario";
            this.Compra = this.Urapp + "/api/Compra";
            this.Proveedor = this.Urapp + "/api/Proveedor";
        }

        public string Urapp { get; }
        public string Producto { get; }
        public string Oferta { get; }
        public string Catalogo { get; }
        public string Usuario { get; }
        public string Compra { get; }
        public string Proveedor { get; }
    }
}

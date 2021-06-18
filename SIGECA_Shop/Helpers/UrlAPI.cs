using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA_Shop.Helpers
{
    public record UrlAPI
    {
        public UrlAPI(string RootPath = "https://localhost:44311/")
        {
            this.Urapp = RootPath;
            this.Producto = this.Urapp + "/api/Producto";
            this.Oferta = this.Urapp + "/api/Oferta";
            this.Catalogo = this.Urapp + "/api/Catalogo";
            this.Usuario = this.Urapp + "/api/Usuario";
            this.Cliente = this.Urapp + "/api/Cliente";
            this.Compra = this.Urapp + "/api/Compra";
           
        }

        public string Urapp { get; }
        public string Producto { get; }
        public string Oferta { get; }
        public string Catalogo { get; }
        public string Usuario { get; }
        public string Cliente { get; }
        public string Compra { get; }
        


        public string Login() { return Cliente + "/Login"; }
    }
}

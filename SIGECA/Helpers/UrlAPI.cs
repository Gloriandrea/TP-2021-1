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
            this.Catalogo = this.Urapp + "/api/Catalogo";
        }

        public string Urapp { get; }
        public string Producto { get; }
        public string Catalogo { get; }
    }
}

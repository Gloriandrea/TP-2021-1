namespace SIGECA.Helpers
{
    public class UrlAPI
    {
        public UrlAPI(string RootPath = "https://localhost:44311/")
        {
            this.Urapp = RootPath;
            this.Producto = this.Urapp + "/api/Producto";
            this.Oferta = this.Urapp + "/api/Oferta";
            this.Catalogo = this.Urapp + "/api/Catalogo";
            this.Usuario = this.Urapp + "/api/Usuario";
            this.Compra = this.Urapp + "/api/Compra";
            this.Venta = this.Urapp + "/api/Venta";
            this.Pago = this.Urapp + "/api/Pago";
        }

        public string Urapp { get; }
        public string Producto { get; }
        public string Oferta { get; }
        public string Catalogo { get; }
        public string Usuario { get; }
        public string Compra { get; }
        public string Venta { get; }
        public string Pago { get; }
    }
}

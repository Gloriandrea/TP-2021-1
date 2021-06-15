using MongoDB.Driver;
using SIGECA.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Services
{
    public class ProveedorService
    {
        private readonly IMongoCollection<Proveedor> _proveedor;
        public ProveedorService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _proveedor = database.GetCollection<Proveedor>("Proveedor");
        }
        public async Task<List<Proveedor>> GetAll()
        {
            return _proveedor.Find(x => true).ToList();
        }
        public async Task<Proveedor> GetById(string proveedorID)
        {
            return await _proveedor.FindAsync(x => x.id == proveedorID).Result.FirstOrDefaultAsync();
        }
        public async Task<Proveedor> CreateProveedor(Proveedor proveedor)
        {
            _proveedor.InsertOne(proveedor);
            return proveedor;
        }
        public async Task<Proveedor> UpdateProveedor(Proveedor proveedor)
        {
            var update = Builders<Proveedor>.Update.Set("nombreEmpresa", proveedor.nombreEmpresa)
                                            .Set("ruc", proveedor.ruc)
                                            .Set("correoEmpresa", proveedor.correoEmpresa)
                                            .Set("nombreContacto", proveedor.nombreContacto)
                                            .Set("apellidoContacto", proveedor.apellidoContacto)
                                            .Set("celularContacto", proveedor.celularContacto)
                                            .Set("direccionEmpresa", proveedor.direccionEmpresa);
            var filters = Builders<Proveedor>.Filter.Eq("id", proveedor.id);
            _proveedor.UpdateOne(filters, update);
            return proveedor;
        }
        public async Task UpdateEstadoProveedor(string proveedorid, string estado)
        {
            var update = Builders<Proveedor>.Update.Set("estado", estado == "activo" ? "inactivo" : "activo");
            var filters = Builders<Proveedor>.Filter.Eq("id", proveedorid);
            _proveedor.UpdateOne(filters, update);
        }
    }
}

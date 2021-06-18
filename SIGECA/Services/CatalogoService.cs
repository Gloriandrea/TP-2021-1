using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using SIGECA.DTOs;
using SIGECA.Entities;

namespace SIGECA.Services
{
    public class CatalogoService
    {
        private readonly IMongoCollection<Oferta> _oferta;
        public CatalogoService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _oferta = database.GetCollection<Oferta>("Oferta");
        }
      
        public async Task<List<Oferta>> GetAll()
        {
            return await _oferta.FindAsync(x => true).Result.ToListAsync();
        }
        public async Task<Oferta> GetById(string productoID)
        {
            return await _oferta.Find(x => x.id == productoID).FirstOrDefaultAsync();
        }
    }
}

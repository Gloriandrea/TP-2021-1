using MongoDB.Driver;
using SIGECA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Services
{
    public class OfertaService
    {
        private readonly IMongoCollection<Oferta> _oferta;

        public OfertaService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _oferta = database.GetCollection<Oferta>("Oferta");
        }

        public List<Oferta> GetAll()
        {
            return _oferta.Find(x => true).ToList();
        }

        public Oferta GetById(string ofertaID)
        {
            return _oferta.Find(x => x.id == ofertaID).FirstOrDefault();
        }
    }
}

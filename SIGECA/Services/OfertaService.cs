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
        private readonly IMongoCollection<Oferta> _ofertaCollection;

        public OfertaService(ISigecaDataBaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _ofertaCollection = database.GetCollection<Oferta>("Oferta");
        }

        public async Task<List<Oferta>> Get()
        {
            return await _ofertaCollection.FindAsync(x => true).Result.ToListAsync();
        }

        public async Task<List<Oferta>> GetAll()
        {
            return await _ofertaCollection.FindAsync(x => true).Result.ToListAsync();
        }

        public async Task<Oferta> GetById(string ofertaID)
        {
            return await _ofertaCollection.FindAsync(x => x.productoID == ofertaID).Result.FirstOrDefaultAsync();
        }

        public async Task Create(Oferta oferta)
        {
            await _ofertaCollection.InsertOneAsync(oferta);
        }

        public async Task Update(Oferta oferta)
        {
            var old = Builders<Oferta>.Filter.Eq(s => s.id, oferta.id);
            await _ofertaCollection.ReplaceOneAsync(old, oferta);
        }

        public async Task UpdateById(string _id, Oferta oferta)
        {
            await _ofertaCollection.ReplaceOneAsync(old => old.id == _id, oferta);
        }

        public async Task Delete(Oferta oferta)
        {
            await _ofertaCollection.DeleteOneAsync(old => old.id == oferta.id);
        }

        public async Task DeleteById(string _id)
        {
            await _ofertaCollection.DeleteOneAsync(old => old.id == _id);
        }
    }
}

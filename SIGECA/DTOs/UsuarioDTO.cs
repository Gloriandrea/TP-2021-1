using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SIGECA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.DTOs
{
    public class UsuarioDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        public string tipoUsuario { get; set; }
        public string nombreUsuario { get; set; }
        [BsonElement("contrasena")]
        public string contraseña { get; set; }
        public string estado { get; set; }
        public DatosUsuario datos { get; set; }
        public RolDTO rol { get; set; }
    }
}

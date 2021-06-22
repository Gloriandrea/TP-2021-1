using Microsoft.AspNetCore.Http;
using SIGECA.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Services
{
    public class MediaService
    {
        private readonly IFileStorage fileStorage;

        public MediaService(IFileStorage fileStorage)
        {
            this.fileStorage = fileStorage;
        }

        public async Task<String> RegistrarImagenProducto(IFormFile mediaInfo,string contenedor)
        {
            String urlImage = "";

            using (var stream = new MemoryStream())
            {
                await mediaInfo.CopyToAsync(stream);

                urlImage = await fileStorage.SaveFile(stream.ToArray(), "jpg", contenedor);

            }
            return urlImage;
        }
    }
}

using Microsoft.AspNetCore.Http;
using QRCoder;
using SIGECA.Helpers;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
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
        public async Task<String> ActualizarImagenProducto(IFormFile mediaInfo, string contenedor, string rutaAntigua)
        {
            String urlImage = "";

            using (var stream = new MemoryStream())
            {
                await mediaInfo.CopyToAsync(stream);
                urlImage = await fileStorage.EditFile(stream.ToArray(), "jpg", contenedor, rutaAntigua);
            }
            return urlImage;
        }

        public async Task<IFormFile> generateQRCodeFromID(string productoID) 
        {
            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(productoID, QRCodeGenerator.ECCLevel.Q);
            QRCode qrCode = new QRCode(qrCodeData);
            Bitmap qrCodeImage = qrCode.GetGraphic(20);

            ImageCodecInfo jpgEncoder = ImageCodecInfo.GetImageEncoders().Single(x => x.FormatDescription == "JPEG");
            Stream stream = new MemoryStream();
            Encoder encoder2 = System.Drawing.Imaging.Encoder.Quality;
            EncoderParameters parameters = new System.Drawing.Imaging.EncoderParameters(1);
            EncoderParameter parameter = new EncoderParameter(encoder2, 50L);
            parameters.Param[0] = parameter;
            qrCodeImage.Save(stream, jpgEncoder, parameters);
            return new FormFile(stream, 0, stream.Length, $"@qr-{productoID}", $"@qr-{productoID}.jpeg");
        }

        public byte[] ReadFully(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }
    }
}

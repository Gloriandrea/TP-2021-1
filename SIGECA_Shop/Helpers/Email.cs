using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using SIGECA_Shop.Data;
using SIGECA_Shop.Models;

namespace SIGECA_Shop.Helpers
{
    public class Email
    {
        public static async Task SendMail_Gmail(string mailTo, string asunto, string body)
        {
            try
            {
                var client = new SendGridClient("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");
                var from = new EmailAddress("gustavo.troncos@urp.edu.pe", "Avicola Nancy");
                var to = new EmailAddress(mailTo);
                var msg = MailHelper.CreateSingleEmail(from, to, asunto, string.Empty, body);
                var response = await client.SendEmailAsync(msg);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public static void EnviarPedido(Venta venta,List<Producto> productos)
        //{
        //    try
        //    {
        //        string Htmlbody = Resource.HtmlEnvioCorreo;
        //        Htmlbody = Htmlbody.Replace("#NOMBRE#", venta.datos.nombres);
        //        Htmlbody = Htmlbody.Replace("#APELLIDO#", venta.datos.apellidos);
        //        Htmlbody = Htmlbody.Replace("#CODVENTA#", venta.codigoVenta);
        //        Htmlbody = Htmlbody.Replace("#TOTAL#", venta.total.ToString());
        //        string productosHTML = string.Empty;
        //        foreach (ItemsVenta prod in venta.items)
        //        {
        //            productosHTML += "<tr>";
        //            productosHTML += "<td width='75%' align='left' style='font - family: Open Sans, Helvetica, Arial, sans-serif; font - size: 16px; font - weight: 400; line - height: 24px; padding: 15px 10px 5px 10px;'>" + productos.Find(x => x.id == prod.productoID).nombre + " ( " + prod.cantidad + " ) " + "</td>";
        //            productosHTML += "<td width='25 %' align='left' style='font - family: Open Sans, Helvetica, Arial, sans-serif; font - size: 16px; font - weight: 400; line - height: 24px; padding: 15px 10px 5px 10px;'>" + prod.subTotal + "</td>";
        //            productosHTML += "</tr>";
        //        }
        //        Htmlbody = Htmlbody.Replace("#PRODUCTOS#", productosHTML);
        //        SendMail_Gmail(venta.datos.correo, "Su venta con el codigo " + venta.codigoVenta + " en Avicola Nancy, ha sido satisfactoria", Htmlbody);
        //    }
        //    catch(Exception ex)
        //    {
        //        throw ex;
        //    }
            
        //}
    }
}

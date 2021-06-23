using SIGECA_Shop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA_Shop.MTOs
{
    public class OfertaDTO : Oferta
    {
        public Tienda tienda { get; set; }
    }
}

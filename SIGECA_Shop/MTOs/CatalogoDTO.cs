using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using SIGECA_Shop.Models;

namespace SIGECA_Shop.MTOs
{
    public class CatalogoDTO : Producto
    {
        public List<OfertaDTO> ofertas { get; set; }
    }
}

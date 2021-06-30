using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SIGECA_Shop.Data;
using SIGECA_Shop.Helpers;
using SIGECA_Shop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIGECA_Shop
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            //Configurando dependencia de Clase conector con MongoDB
            services.Configure<SigecaDataBaseSettings>(
                Configuration.GetSection(nameof(SigecaDataBaseSettings)));
            services.AddSingleton<ISigecaDataBaseSettings>(sp =>
              sp.GetRequiredService<IOptions<SigecaDataBaseSettings>>().Value);

            services.AddScoped<UsuarioService>();
            services.AddScoped<CatalogoService>();
            services.AddScoped<ProductoService>();
            //services.AddScoped<ProveedorService>();
            //services.AddScoped<CompraService>();
            //services.AddScoped<PagoService>();

            //Inyectando dependencia de Clase Conectora en la Interfaz padre
            services.AddSingleton<SigecaDataBaseSettings>(sp =>
               sp.GetRequiredService<IOptions<SigecaDataBaseSettings>>().Value);

            //Injectando dependecia de Azure FileStorage
            services.AddScoped<IFileStorage, AzureFileStorage>();

            //need default token provider
            services.AddAuthentication(JwtBearerDefaults
             .AuthenticationScheme)
                 .AddJwtBearer(options =>
              options.TokenValidationParameters =
              new TokenValidationParameters
              {
                  ValidateIssuer = false,
                  ValidateAudience = false,
                  ValidateLifetime = true,
                  ValidateIssuerSigningKey = true,
                  IssuerSigningKey = new SymmetricSecurityKey(
                 //llave secreta que dice si el token es valido
                 Encoding.UTF8.GetBytes(Configuration["jwt:key"])),
                  ClockSkew = TimeSpan.Zero
              });


            services.AddControllersWithViews().AddRazorRuntimeCompilation();
            services.AddRazorPages();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}

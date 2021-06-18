using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SIGECA.Helpers;
using SIGECA.Services;
using System;
using System.Text;

namespace SIGECA
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
            services.AddScoped<ProductoService>();
            services.AddScoped<ProveedorService>();
            services.AddScoped<CompraService>();
            services.AddScoped<CatalogoService>();
            services.AddScoped<PagoService>();
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

            #region Colecciones APIS
            services.AddSingleton<ProductoService>();
            services.AddSingleton<OfertaService>();
            #endregion

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
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            //Autorizacion y auntenticacion mediante tokens JWT
            app.UseAuthentication();
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

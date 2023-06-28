using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using NLog.Extensions.Logging;
using Ocelot.DependencyInjection;
using Ocelot.Cache.CacheManager;
using Ocelot.Values;
using Serilog;
using System.Text;
using Ocelot.Middleware;

namespace WebShopAPI.Gateway
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            var secret = "Thisismytestprivatekey";
            var key = Encoding.ASCII.GetBytes(secret);

            Log.Logger = new LoggerConfiguration().WriteTo.File("logs/app.log", rollingInterval: RollingInterval.Day, outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}")
               .CreateLogger();

            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.ClearProviders();
                loggingBuilder.AddSerilog();
                loggingBuilder.AddNLog();
            });

            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddCors(options =>
            {
                var frontendUrl = "http://localhost:3000/";
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(frontendUrl)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed((host) => true)
                    .AllowCredentials();
                });
            });

            services.AddOcelot().AddCacheManager(settings => settings.WithDictionaryHandle());
        }

        public void ConfigureLogging(ILoggingBuilder loggingBuilder)
        {
            loggingBuilder.ClearProviders();
            loggingBuilder.AddSerilog();
            loggingBuilder.AddNLog();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseAuthorization();
            app.UseCors();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Hi there");
                });
            });

            loggerFactory.AddSerilog();
            loggerFactory.AddNLog();

            app.UseOcelot().Wait();
        }
    }
}

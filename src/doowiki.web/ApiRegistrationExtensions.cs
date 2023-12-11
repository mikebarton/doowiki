using doowiki.api.Infrastructure;
using doowiki.api.Services;
using doowiki.application.Common.Interfaces;
using doowiki.infrastructure.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using ZymLabs.NSwag.FluentValidation;

namespace doowiki.api
{
    public static class ApiRegistrationExtensions
    {

        public static IServiceCollection AddWebServices(this IServiceCollection services)
        {
            services.AddDatabaseDeveloperPageExceptionFilter();
            services.AddScoped<IUser, CurrentUser>();
            services.AddHttpContextAccessor();
            services.AddExceptionHandler<CustomExceptionHandler>();

            services.AddScoped(provider =>
            {
                var validationRules = provider.GetService<IEnumerable<FluentValidationRule>>();
                var loggerFactory = provider.GetService<ILoggerFactory>();

                return new FluentValidationSchemaProcessor(provider, validationRules, loggerFactory);
            });

            // Customise default API behaviour
            services.Configure<ApiBehaviorOptions>(options =>
                options.SuppressModelStateInvalidFilter = true);

            services.AddEndpointsApiExplorer();
            //services.AddSwaggerGen();

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

            services.AddSpaStaticFiles(configuration =>
            {                
                configuration.RootPath = "ClientApp/build";

            });


            //services.AddAuthorization(options =>
            //{
            //    options.FallbackPolicy = new AuthorizationPolicyBuilder()
            //        //.RequireAuthenticatedUser()
            //        .Build();
            //});
            services.AddOpenApiDocument((configure, sp) =>
            {
                configure.Title = "DooWiki API";

                // Add the fluent validations schema processor
                var fluentValidationSchemaProcessor =
                    sp.CreateScope().ServiceProvider.GetRequiredService<FluentValidationSchemaProcessor>();

                // BUG: SchemaProcessors is missing in NSwag 14 (https://github.com/RicoSuter/NSwag/issues/4524#issuecomment-1811897079)
                // configure.SchemaProcessors.Add(fluentValidationSchemaProcessor);

            });

            return services;
        }
    }
}

using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopAPI.Models;

namespace WebShopAPI.DataLayer.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.OrderId); // Primary key of table
            builder.Property(x => x.OrderId).ValueGeneratedOnAdd();

            builder.Property(x => x.Comment).HasMaxLength(100);
            builder.Property(x => x.Address).HasMaxLength(50);


            builder.HasMany(x => x.OrderProducts)
                .WithOne(x => x.Order);

        }
    }
}

﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using doowiki.infrastructure.Data;

#nullable disable

namespace doowiki.infrastructure.Migrations.App
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("doowiki.domain.Wiki.DocumentContent", b =>
                {
                    b.Property<Guid>("DocumentId")
                        .HasColumnType("char(36)");

                    b.Property<string>("DocumentMarkup")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("DocumentId");

                    b.ToTable("DocumentContent");
                });

            modelBuilder.Entity("doowiki.domain.Wiki.DocumentMetaData", b =>
                {
                    b.Property<Guid>("DocumentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("AuthorId")
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid?>("ParentDocumentId")
                        .HasColumnType("char(36)");

                    b.Property<string>("Slug")
                        .HasColumnType("longtext");

                    b.Property<Guid>("SpaceId")
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("DocumentId");

                    b.HasIndex("AuthorId");

                    b.HasIndex("ParentDocumentId");

                    b.HasIndex("SpaceId");

                    b.ToTable("Documents");
                });

            modelBuilder.Entity("doowiki.domain.Wiki.Space", b =>
                {
                    b.Property<Guid>("SpaceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("SpaceId");

                    b.ToTable("Spaces");
                });

            modelBuilder.Entity("doowiki.domain.Wiki.WikiUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("IdentityUserId")
                        .HasColumnType("char(36)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("doowiki.domain.Wiki.DocumentContent", b =>
                {
                    b.HasOne("doowiki.domain.Wiki.DocumentMetaData", null)
                        .WithOne("Content")
                        .HasForeignKey("doowiki.domain.Wiki.DocumentContent", "DocumentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("doowiki.domain.Wiki.DocumentMetaData", b =>
                {
                    b.HasOne("doowiki.domain.Wiki.WikiUser", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("doowiki.domain.Wiki.DocumentMetaData", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentDocumentId");

                    b.HasOne("doowiki.domain.Wiki.Space", null)
                        .WithMany("Documents")
                        .HasForeignKey("SpaceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("doowiki.domain.Wiki.DocumentMetaData", b =>
                {
                    b.Navigation("Children");

                    b.Navigation("Content")
                        .IsRequired();
                });

            modelBuilder.Entity("doowiki.domain.Wiki.Space", b =>
                {
                    b.Navigation("Documents");
                });
#pragma warning restore 612, 618
        }
    }
}

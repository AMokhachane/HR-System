﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Data;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(ApplicationDBContext))]
    [Migration("20240911090652_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("api.Models.BankingDetail", b =>
                {
                    b.Property<int>("BankingDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BankingDetailId"));

                    b.Property<int>("AccountNumber")
                        .HasColumnType("int");

                    b.Property<string>("AccountType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BankName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("BranchCode")
                        .HasColumnType("int");

                    b.Property<int?>("EmployeeId")
                        .HasColumnType("int");

                    b.HasKey("BankingDetailId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("BankingDetails");
                });

            modelBuilder.Entity("api.Models.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EmployeeId"));

                    b.Property<string>("ContractType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DateOfBirth")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdentityNumber")
                        .HasColumnType("int");

                    b.Property<int>("ImageId")
                        .HasColumnType("int");

                    b.Property<string>("MaritalStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhysicalAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostalAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Salary")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("TaxNumber")
                        .HasColumnType("int");

                    b.HasKey("EmployeeId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("api.Models.JobGrade", b =>
                {
                    b.Property<int>("JobGradeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("JobGradeId"));

                    b.Property<string>("Grade")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("JobTitleId")
                        .HasColumnType("int");

                    b.HasKey("JobGradeId");

                    b.HasIndex("JobTitleId");

                    b.ToTable("JobGrades");
                });

            modelBuilder.Entity("api.Models.JobTitle", b =>
                {
                    b.Property<int>("JobTitleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("JobTitleId"));

                    b.Property<int?>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("JobTitleId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("JobTitles");
                });

            modelBuilder.Entity("api.Models.LeavePolicy", b =>
                {
                    b.Property<int>("LeavePolicyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LeavePolicyId"));

                    b.Property<int?>("JobGradeId")
                        .HasColumnType("int");

                    b.Property<int>("LeaveDays")
                        .HasColumnType("int");

                    b.HasKey("LeavePolicyId");

                    b.HasIndex("JobGradeId");

                    b.ToTable("LeavePolicies");
                });

            modelBuilder.Entity("api.Models.Qualification", b =>
                {
                    b.Property<int>("QualificationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("QualificationId"));

                    b.Property<int?>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("Institution")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("QualificationType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("YearCompleted")
                        .HasColumnType("date");

                    b.HasKey("QualificationId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Qualifications");
                });

            modelBuilder.Entity("api.Models.BankingDetail", b =>
                {
                    b.HasOne("api.Models.Employee", "Employee")
                        .WithMany("BankingDetails")
                        .HasForeignKey("EmployeeId");

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("api.Models.JobGrade", b =>
                {
                    b.HasOne("api.Models.JobTitle", "JobTitle")
                        .WithMany("JobGrades")
                        .HasForeignKey("JobTitleId");

                    b.Navigation("JobTitle");
                });

            modelBuilder.Entity("api.Models.JobTitle", b =>
                {
                    b.HasOne("api.Models.Employee", "Employee")
                        .WithMany("jobTitles")
                        .HasForeignKey("EmployeeId");

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("api.Models.LeavePolicy", b =>
                {
                    b.HasOne("api.Models.JobGrade", "JobGrade")
                        .WithMany("leavePolicies")
                        .HasForeignKey("JobGradeId");

                    b.Navigation("JobGrade");
                });

            modelBuilder.Entity("api.Models.Qualification", b =>
                {
                    b.HasOne("api.Models.Employee", "Employee")
                        .WithMany("Qualifications")
                        .HasForeignKey("EmployeeId");

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("api.Models.Employee", b =>
                {
                    b.Navigation("BankingDetails");

                    b.Navigation("Qualifications");

                    b.Navigation("jobTitles");
                });

            modelBuilder.Entity("api.Models.JobGrade", b =>
                {
                    b.Navigation("leavePolicies");
                });

            modelBuilder.Entity("api.Models.JobTitle", b =>
                {
                    b.Navigation("JobGrades");
                });
#pragma warning restore 612, 618
        }
    }
}

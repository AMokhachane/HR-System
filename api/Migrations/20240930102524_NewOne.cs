using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class NewOne : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BankingDetails_Employees_EmployeeId",
                table: "BankingDetails");

            migrationBuilder.DropIndex(
                name: "IX_BankingDetails_EmployeeId",
                table: "BankingDetails");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5839274b-7be0-475a-b8a5-808608004d95");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5bd9c6ea-fb59-4681-a9df-865bb0fb233a");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "BankingDetails");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "BankingDetails",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1f2eef88-b232-448c-ad24-3721fe15a0a3", null, "Admin", "ADMIN" },
                    { "bdee55e4-2a02-4091-a944-d7ddf47daff3", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BankingDetails_AppUserId",
                table: "BankingDetails",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_BankingDetails_AspNetUsers_AppUserId",
                table: "BankingDetails",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "AppUserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BankingDetails_AspNetUsers_AppUserId",
                table: "BankingDetails");

            migrationBuilder.DropIndex(
                name: "IX_BankingDetails_AppUserId",
                table: "BankingDetails");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1f2eef88-b232-448c-ad24-3721fe15a0a3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bdee55e4-2a02-4091-a944-d7ddf47daff3");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "BankingDetails");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "BankingDetails",
                type: "int",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5839274b-7be0-475a-b8a5-808608004d95", null, "User", "USER" },
                    { "5bd9c6ea-fb59-4681-a9df-865bb0fb233a", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BankingDetails_EmployeeId",
                table: "BankingDetails",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_BankingDetails_Employees_EmployeeId",
                table: "BankingDetails",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId");
        }
    }
}

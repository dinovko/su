using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebServer.Migrations
{
    /// <inheritdoc />
    public partial class Init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ref_Role_Access",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<int>(type: "integer", nullable: false, comment: "Айди roles"),
                    AccessId = table.Column<int>(type: "integer", nullable: false),
                    NameRu = table.Column<string>(type: "text", nullable: false),
                    NameKk = table.Column<string>(type: "text", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ref_Role_Access", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ref_Role_Access_Ref_Access_AccessId",
                        column: x => x.AccessId,
                        principalTable: "Ref_Access",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ref_Role_Access_Ref_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Ref_Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ref_Role_Access_AccessId",
                table: "Ref_Role_Access",
                column: "AccessId");

            migrationBuilder.CreateIndex(
                name: "IX_Ref_Role_Access_RoleId",
                table: "Ref_Role_Access",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ref_Role_Access");
        }
    }
}

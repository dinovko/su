using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebServer.Migrations
{
    /// <inheritdoc />
    public partial class initCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Login = table.Column<string>(type: "text", nullable: false),
                    Bin = table.Column<string>(type: "text", nullable: true),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    FullNameRu = table.Column<string>(type: "text", nullable: true),
                    FullNameKk = table.Column<string>(type: "text", nullable: true),
                    StreetName = table.Column<string>(type: "text", nullable: true),
                    BuildingNumber = table.Column<string>(type: "text", nullable: true),
                    KatoCode = table.Column<long>(type: "bigint", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Desctiption = table.Column<string>(type: "text", nullable: false, comment: "Примечания")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ref_Katos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ParentId = table.Column<int>(type: "integer", nullable: false),
                    Code = table.Column<long>(type: "bigint", nullable: false),
                    Latitude = table.Column<decimal>(type: "numeric", nullable: true),
                    Longitude = table.Column<decimal>(type: "numeric", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: true),
                    IsReportable = table.Column<bool>(type: "boolean", nullable: false),
                    NameRu = table.Column<string>(type: "text", nullable: false),
                    NameKk = table.Column<string>(type: "text", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ref_Katos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ref_Statuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NameRu = table.Column<string>(type: "text", nullable: false),
                    NameKk = table.Column<string>(type: "text", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ref_Statuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SettingsValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Key = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SettingsValues", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Suppliers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Bin = table.Column<string>(type: "text", nullable: false),
                    FullName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suppliers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ActionLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AccountId = table.Column<Guid>(type: "uuid", nullable: false),
                    FormId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Error = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActionLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActionLogs_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ref_Streets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RefKatoId = table.Column<int>(type: "integer", nullable: false),
                    NameRu = table.Column<string>(type: "text", nullable: false),
                    NameKk = table.Column<string>(type: "text", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ref_Streets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ref_Streets_Ref_Katos_RefKatoId",
                        column: x => x.RefKatoId,
                        principalTable: "Ref_Katos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Consumers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SupplierId = table.Column<Guid>(type: "uuid", nullable: false),
                    Ref_KatoId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consumers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Consumers_Ref_Katos_Ref_KatoId",
                        column: x => x.Ref_KatoId,
                        principalTable: "Ref_Katos",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Consumers_Suppliers_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Report_Forms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RefKatoId = table.Column<int>(type: "integer", nullable: false),
                    SupplierId = table.Column<int>(type: "integer", nullable: true),
                    SupplierId1 = table.Column<Guid>(type: "uuid", nullable: true),
                    ReportYearId = table.Column<int>(type: "integer", nullable: false),
                    ReportMonthId = table.Column<int>(type: "integer", nullable: false),
                    RefStatusId = table.Column<int>(type: "integer", nullable: false),
                    HasStreets = table.Column<bool>(type: "boolean", nullable: false, comment: "Наличие улиц в селе"),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Desctiption = table.Column<string>(type: "text", nullable: false, comment: "Примечания")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Report_Forms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Report_Forms_Ref_Katos_RefKatoId",
                        column: x => x.RefKatoId,
                        principalTable: "Ref_Katos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Report_Forms_Ref_Statuses_RefStatusId",
                        column: x => x.RefStatusId,
                        principalTable: "Ref_Statuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Report_Forms_Suppliers_SupplierId1",
                        column: x => x.SupplierId1,
                        principalTable: "Suppliers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Ref_Buildings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RefStreetId = table.Column<int>(type: "integer", nullable: false),
                    Building = table.Column<string>(type: "text", nullable: false),
                    NameRu = table.Column<string>(type: "text", nullable: false),
                    NameKk = table.Column<string>(type: "text", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ref_Buildings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ref_Buildings_Ref_Streets_RefStreetId",
                        column: x => x.RefStreetId,
                        principalTable: "Ref_Streets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pipelines",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FormId = table.Column<Guid>(type: "uuid", nullable: false),
                    TotalPipelineLength = table.Column<decimal>(type: "numeric", nullable: false, comment: "Протяженность водопроводных сетей, км (по состоянию на конец отчетного года),общая, км"),
                    WornPipelineLength = table.Column<decimal>(type: "numeric", nullable: false, comment: "в том числе изношенных, км"),
                    TotalSewerNetworkLength = table.Column<decimal>(type: "numeric", nullable: false, comment: "Протяженность канализационных сетей, км (по состоянию на конец отчетного года),общая, км"),
                    WornSewerNetworkLength = table.Column<decimal>(type: "numeric", nullable: false, comment: "в том числе изношенных, км"),
                    NewWaterSupplyNetworkLength = table.Column<decimal>(type: "numeric", nullable: false, comment: "Общая протяженность построенных (новых) сетей в отчетном году, км, водоснабжения, км"),
                    NewWastewaterNetworkLength = table.Column<decimal>(type: "numeric", nullable: false, comment: "водоотведения, км"),
                    ReconstructedNetworkLength = table.Column<decimal>(type: "numeric", nullable: false, comment: "Общая протяженность реконструированных (замененных) сетей в отчетном году, км, водоснабжения, км"),
                    ReconstructedWastewaterNetworkLength = table.Column<decimal>(type: "numeric", nullable: false, comment: "водоотведения, км"),
                    RepairedWaterSupplyNetworkLength = table.Column<decimal>(type: "numeric", nullable: false, comment: "Общая протяженность отремонтированных (текущий/капитальный ремонт) сетей в отчетном году, км, водоснабжения, км"),
                    RepairedWastewaterNetworkLength = table.Column<decimal>(type: "numeric", nullable: false, comment: "водоотведения, км"),
                    TotalPopulation = table.Column<decimal>(type: "numeric", nullable: false, comment: "численность населения (вся)"),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Desctiption = table.Column<string>(type: "text", nullable: false, comment: "Примечания")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pipelines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pipelines_Report_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Report_Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tariff_Level",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FormId = table.Column<Guid>(type: "uuid", nullable: false),
                    TariffAverage = table.Column<decimal>(type: "numeric", nullable: false, comment: "усредненный, тенге/м3"),
                    TariffIndividual = table.Column<decimal>(type: "numeric", nullable: false, comment: "физическим лицам/населению, тенге/м3"),
                    TariffLegal = table.Column<decimal>(type: "numeric", nullable: false, comment: "юридическим лицам, тенге/м3"),
                    TariffBudget = table.Column<decimal>(type: "numeric", nullable: false, comment: "бюджетным организациям, тенге/м3"),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Desctiption = table.Column<string>(type: "text", nullable: false, comment: "Примечания")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tariff_Level", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tariff_Level_Report_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Report_Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Waste_City_Form3",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FormId = table.Column<Guid>(type: "uuid", nullable: false),
                    RefStreetId = table.Column<int>(type: "integer", nullable: false),
                    HasSewerNetworks = table.Column<bool>(type: "boolean", nullable: false, comment: "Сети канализации (0 или 1)"),
                    HasSewagePumpingStations = table.Column<bool>(type: "boolean", nullable: false, comment: "Канализационные насосные станции (0 или 1)"),
                    HasSewageTreatmentPlants = table.Column<bool>(type: "boolean", nullable: false, comment: "Канализационно-очистные сооружения (0 или 1)"),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Desctiption = table.Column<string>(type: "text", nullable: false, comment: "Примечания")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Waste_City_Form3", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Waste_City_Form3_Ref_Streets_RefStreetId",
                        column: x => x.RefStreetId,
                        principalTable: "Ref_Streets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Waste_City_Form3_Report_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Report_Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Supply_City_Form1",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FormId = table.Column<Guid>(type: "uuid", nullable: false),
                    RefStreetId = table.Column<int>(type: "integer", nullable: true),
                    RefBuildingId = table.Column<int>(type: "integer", nullable: true),
                    Volume = table.Column<decimal>(type: "numeric", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Desctiption = table.Column<string>(type: "text", nullable: false, comment: "Примечания")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supply_City_Form1", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Supply_City_Form1_Ref_Buildings_RefBuildingId",
                        column: x => x.RefBuildingId,
                        principalTable: "Ref_Buildings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Supply_City_Form1_Ref_Streets_RefStreetId",
                        column: x => x.RefStreetId,
                        principalTable: "Ref_Streets",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Supply_City_Form1_Report_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Report_Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Supply_City_Form2",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FormId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsVillage = table.Column<bool>(type: "boolean", nullable: false, comment: "Признак если True-Село, Flase-Город"),
                    RefStreetId = table.Column<int>(type: "integer", nullable: true),
                    RefBuildingId = table.Column<int>(type: "integer", nullable: true),
                    CoverageWater = table.Column<bool>(type: "boolean", nullable: true, comment: "Охваченные централизованным водоснабжением (0-1)"),
                    CentralizedWaterNumber = table.Column<int>(type: "integer", nullable: true, comment: "Количество населения имеющих доступ к централизованному водоснабжению (человек)"),
                    RuralPopulation = table.Column<int>(type: "integer", nullable: true),
                    CentralWaterSupplySubscribers = table.Column<int>(type: "integer", nullable: true, comment: "Кол-во абонентов, охваченных централизованным водоснабжением (единиц)"),
                    IndividualWaterMetersInstalled = table.Column<int>(type: "integer", nullable: true, comment: "Всего установлено индивидуальных приборов учета воды по состоянию на конец отчетного года (единиц)"),
                    RemoteDataTransmissionMeters = table.Column<int>(type: "integer", nullable: true, comment: "в том числе с дистанционной передачей данных в АСУЭ обслуживающего предприятия (единиц)"),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Desctiption = table.Column<string>(type: "text", nullable: false, comment: "Примечания")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supply_City_Form2", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Supply_City_Form2_Ref_Buildings_RefBuildingId",
                        column: x => x.RefBuildingId,
                        principalTable: "Ref_Buildings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Supply_City_Form2_Ref_Streets_RefStreetId",
                        column: x => x.RefStreetId,
                        principalTable: "Ref_Streets",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Supply_City_Form2_Report_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Report_Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Supply_City_Form3",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FormId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsVillage = table.Column<bool>(type: "boolean", nullable: false, comment: "Признак если True-Село, Flase-Город"),
                    RefStreetId = table.Column<int>(type: "integer", nullable: true),
                    RefBuildingId = table.Column<int>(type: "integer", nullable: true),
                    CoverageMetersTotalCumulative = table.Column<int>(type: "integer", nullable: true, comment: "всего с нарастающим (единиц)"),
                    CoverageMetersRemoteData = table.Column<int>(type: "integer", nullable: true, comment: "в том числе с дистанционной передачей данных в АСУЭ обслуживающего предприятия (единиц)"),
                    RuralPopulation = table.Column<int>(type: "integer", nullable: true),
                    RuralSettlementsCount = table.Column<int>(type: "integer", nullable: true, comment: "Количество сельских населенных пунктов (единиц)"),
                    PopulationWithKBM = table.Column<int>(type: "integer", nullable: true, comment: "Численность населения, проживающего в сельских населенных пунктах, где установлены КБМ (человек)"),
                    PopulationWithPRV = table.Column<int>(type: "integer", nullable: true, comment: "Численность населения, проживающего в сельских населенных пунктах, где установлены ПРВ (человек)"),
                    PopulationUsingDeliveredWater = table.Column<int>(type: "integer", nullable: true, comment: "Численность населения, проживающего в сельских населенных пунктах, где используют привозную воду"),
                    PopulationUsingWellsAndBoreholes = table.Column<int>(type: "integer", nullable: true, comment: "Численность населения, проживающего в сельских населенных пунктах, где используют воду из скважин и колодцев"),
                    RuralSettlementsWithConstructionRefusalProtocols = table.Column<int>(type: "integer", nullable: true, comment: "Количество сельских населенных пунктов, жители которых отказались от строительства ЦВ, установки КБМ и ПРВ (наличие протоколов отказа)"),
                    PopulationWithConstructionRefusalProtocols = table.Column<int>(type: "integer", nullable: true, comment: "Численность населения, жители которых отказались от строительства ЦВ, установки КБМ и ПРВ (наличие протоколов отказа)"),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Desctiption = table.Column<string>(type: "text", nullable: false, comment: "Примечания")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supply_City_Form3", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Supply_City_Form3_Ref_Buildings_RefBuildingId",
                        column: x => x.RefBuildingId,
                        principalTable: "Ref_Buildings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Supply_City_Form3_Ref_Streets_RefStreetId",
                        column: x => x.RefStreetId,
                        principalTable: "Ref_Streets",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Supply_City_Form3_Report_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Report_Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Supply_City_Form4",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FormId = table.Column<Guid>(type: "uuid", nullable: false),
                    RefStreetId = table.Column<int>(type: "integer", nullable: false),
                    RefBuildingId = table.Column<int>(type: "integer", nullable: false),
                    CoverageHouseholdNeedNumberBuildings = table.Column<int>(type: "integer", nullable: false, comment: "Количество зданий и сооружений, подлежащих к установке общедомовых приборов учета (единиц)"),
                    CoverageHouseholdInstalledBuildings = table.Column<int>(type: "integer", nullable: false, comment: "Количество зданий и сооружений с установленными общедомовыми приборами учета (единиц)"),
                    CoverageHouseholdInstalledCount = table.Column<int>(type: "integer", nullable: false, comment: "Количество установленных общедомовых приборов учета (единиц)"),
                    CoverageHouseholdRemoteData = table.Column<int>(type: "integer", nullable: false, comment: "в том числе с дистанционной передачей данных в АСУЭ обслуживающего предприятия (единиц)"),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Desctiption = table.Column<string>(type: "text", nullable: false, comment: "Примечания")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supply_City_Form4", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Supply_City_Form4_Ref_Buildings_RefBuildingId",
                        column: x => x.RefBuildingId,
                        principalTable: "Ref_Buildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Supply_City_Form4_Ref_Streets_RefStreetId",
                        column: x => x.RefStreetId,
                        principalTable: "Ref_Streets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Supply_City_Form4_Report_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Report_Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Supply_City_Form5",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FormId = table.Column<Guid>(type: "uuid", nullable: false),
                    RefStreetId = table.Column<int>(type: "integer", nullable: false),
                    RefBuildingId = table.Column<int>(type: "integer", nullable: false),
                    ScadaWaterIntake = table.Column<bool>(type: "boolean", nullable: false, comment: "Водозабор"),
                    ScadaWaterTreatment = table.Column<bool>(type: "boolean", nullable: false, comment: "Водоподготовка (0 или 1)"),
                    ScadaStations = table.Column<bool>(type: "boolean", nullable: false, comment: "Насосные станции (0 или 1)"),
                    ScadaSupplyNetworks = table.Column<bool>(type: "boolean", nullable: false, comment: "Сети водоснабжения (0 или 1)"),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Desctiption = table.Column<string>(type: "text", nullable: false, comment: "Примечания")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supply_City_Form5", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Supply_City_Form5_Ref_Buildings_RefBuildingId",
                        column: x => x.RefBuildingId,
                        principalTable: "Ref_Buildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Supply_City_Form5_Ref_Streets_RefStreetId",
                        column: x => x.RefStreetId,
                        principalTable: "Ref_Streets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Supply_City_Form5_Report_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Report_Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Waste_City_Form1",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FormId = table.Column<Guid>(type: "uuid", nullable: false),
                    RefStreetId = table.Column<int>(type: "integer", nullable: false),
                    RefBuildingId = table.Column<int>(type: "integer", nullable: false),
                    WaterVolume = table.Column<double>(type: "double precision", nullable: false, comment: "Объем воды в тысячах кубических метров."),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Desctiption = table.Column<string>(type: "text", nullable: false, comment: "Примечания")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Waste_City_Form1", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Waste_City_Form1_Ref_Buildings_RefBuildingId",
                        column: x => x.RefBuildingId,
                        principalTable: "Ref_Buildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Waste_City_Form1_Ref_Streets_RefStreetId",
                        column: x => x.RefStreetId,
                        principalTable: "Ref_Streets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Waste_City_Form1_Report_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Report_Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Waste_City_Form2",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FormId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsVillage = table.Column<bool>(type: "boolean", nullable: false, comment: "Признак если True-Село, Flase-Город"),
                    RefStreetId = table.Column<int>(type: "integer", nullable: true),
                    RefBuildingId = table.Column<int>(type: "integer", nullable: true),
                    IsConnectedToCentralizedWastewaterSystem = table.Column<bool>(type: "boolean", nullable: true, comment: "Охваченные централизованным водоотведением (0-1)"),
                    HasSewageTreatmentFacilities = table.Column<bool>(type: "boolean", nullable: true, comment: "Наличие канализационно-очистных сооружений, (1-0)"),
                    HasMechanicalTreatment = table.Column<bool>(type: "boolean", nullable: true, comment: "С механичес-кой очисткой (1-0)"),
                    HasMechanicalAndBiologicalTreatment = table.Column<bool>(type: "boolean", nullable: true, comment: "С механической и биологической очист-кой (1-0)"),
                    PopulationCoveredByCentralizedWastewater = table.Column<int>(type: "integer", nullable: true, comment: "Численность населения, охваченного централизованным водоотведением, (человек)"),
                    RuralSettlementsWithCentralizedWastewater = table.Column<int>(type: "integer", nullable: true, comment: "Кол-во сельских населенных пунктов (единиц)"),
                    PopulationInRuralSettlements = table.Column<int>(type: "integer", nullable: true, comment: "Численность населения, проживающего в данных сельских населенных пунктах (человек)"),
                    SubscribersInRuralSettlements = table.Column<int>(type: "integer", nullable: true, comment: "Кол-во абонентов, проживающих в данных сельских населенных пунктах (единиц)"),
                    IndividualSubscribers = table.Column<int>(type: "integer", nullable: true, comment: "в том числе физических лиц/население (единиц)"),
                    CorporateSubscribers = table.Column<int>(type: "integer", nullable: true, comment: "в том числе юридических лиц (единиц)"),
                    GovernmentOrganizations = table.Column<int>(type: "integer", nullable: true, comment: "в том числе GovernmentOrganizations"),
                    SewageTreatmentFacilitiesCount = table.Column<int>(type: "integer", nullable: true, comment: "Наличие канализационно- очистных сооружений (единиц)"),
                    MechanicalTreatmentFacilitiesCount = table.Column<int>(type: "integer", nullable: true, comment: "в том числе только с механичес-кой очисткой (еди-ниц)"),
                    MechanicalAndBiologicalTreatmentFacilitiesCount = table.Column<int>(type: "integer", nullable: true, comment: "в том числе с механической и биологической очист-кой (еди-ниц)"),
                    SewageTreatmentCapacity = table.Column<decimal>(type: "numeric", nullable: true, comment: "Производительность канализационно-очистных сооружений (проектная)"),
                    SewageTreatmentFacilitiesWearPercentage = table.Column<decimal>(type: "numeric", nullable: true, comment: "Износ канализационно- очистных сооружений, в %"),
                    PopulationServedBySewageTreatmentFacilities = table.Column<int>(type: "integer", nullable: true, comment: "Числен-ность населе-ния, охваченного действующими канализационно- очистными сооружениями (человек)"),
                    ActualWastewaterInflux = table.Column<decimal>(type: "numeric", nullable: true, comment: "Фактически поступило сточных вод в канализационно-очистные сооружения (тыс.м3)"),
                    NormativelyTreatedWastewaterVolume = table.Column<decimal>(type: "numeric", nullable: true, comment: "Объем сточных вод, соответствующей нормативной очистке по собственному лабораторному мониторингу за отчетный период (тыс.м3)"),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDel = table.Column<bool>(type: "boolean", nullable: false),
                    Desctiption = table.Column<string>(type: "text", nullable: false, comment: "Примечания")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Waste_City_Form2", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Waste_City_Form2_Ref_Buildings_RefBuildingId",
                        column: x => x.RefBuildingId,
                        principalTable: "Ref_Buildings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Waste_City_Form2_Ref_Streets_RefStreetId",
                        column: x => x.RefStreetId,
                        principalTable: "Ref_Streets",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Waste_City_Form2_Report_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Report_Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActionLogs_AccountId",
                table: "ActionLogs",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Consumers_Ref_KatoId",
                table: "Consumers",
                column: "Ref_KatoId");

            migrationBuilder.CreateIndex(
                name: "IX_Consumers_SupplierId",
                table: "Consumers",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_Pipelines_FormId",
                table: "Pipelines",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_Ref_Buildings_RefStreetId",
                table: "Ref_Buildings",
                column: "RefStreetId");

            migrationBuilder.CreateIndex(
                name: "IX_Ref_Streets_RefKatoId",
                table: "Ref_Streets",
                column: "RefKatoId");

            migrationBuilder.CreateIndex(
                name: "IX_Report_Forms_RefKatoId",
                table: "Report_Forms",
                column: "RefKatoId");

            migrationBuilder.CreateIndex(
                name: "IX_Report_Forms_RefStatusId",
                table: "Report_Forms",
                column: "RefStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Report_Forms_SupplierId1",
                table: "Report_Forms",
                column: "SupplierId1");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form1_FormId",
                table: "Supply_City_Form1",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form1_RefBuildingId",
                table: "Supply_City_Form1",
                column: "RefBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form1_RefStreetId",
                table: "Supply_City_Form1",
                column: "RefStreetId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form2_FormId",
                table: "Supply_City_Form2",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form2_RefBuildingId",
                table: "Supply_City_Form2",
                column: "RefBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form2_RefStreetId",
                table: "Supply_City_Form2",
                column: "RefStreetId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form3_FormId",
                table: "Supply_City_Form3",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form3_RefBuildingId",
                table: "Supply_City_Form3",
                column: "RefBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form3_RefStreetId",
                table: "Supply_City_Form3",
                column: "RefStreetId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form4_FormId",
                table: "Supply_City_Form4",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form4_RefBuildingId",
                table: "Supply_City_Form4",
                column: "RefBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form4_RefStreetId",
                table: "Supply_City_Form4",
                column: "RefStreetId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form5_FormId",
                table: "Supply_City_Form5",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form5_RefBuildingId",
                table: "Supply_City_Form5",
                column: "RefBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_Supply_City_Form5_RefStreetId",
                table: "Supply_City_Form5",
                column: "RefStreetId");

            migrationBuilder.CreateIndex(
                name: "IX_Tariff_Level_FormId",
                table: "Tariff_Level",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_Waste_City_Form1_FormId",
                table: "Waste_City_Form1",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_Waste_City_Form1_RefBuildingId",
                table: "Waste_City_Form1",
                column: "RefBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_Waste_City_Form1_RefStreetId",
                table: "Waste_City_Form1",
                column: "RefStreetId");

            migrationBuilder.CreateIndex(
                name: "IX_Waste_City_Form2_FormId",
                table: "Waste_City_Form2",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_Waste_City_Form2_RefBuildingId",
                table: "Waste_City_Form2",
                column: "RefBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_Waste_City_Form2_RefStreetId",
                table: "Waste_City_Form2",
                column: "RefStreetId");

            migrationBuilder.CreateIndex(
                name: "IX_Waste_City_Form3_FormId",
                table: "Waste_City_Form3",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_Waste_City_Form3_RefStreetId",
                table: "Waste_City_Form3",
                column: "RefStreetId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActionLogs");

            migrationBuilder.DropTable(
                name: "Consumers");

            migrationBuilder.DropTable(
                name: "Pipelines");

            migrationBuilder.DropTable(
                name: "SettingsValues");

            migrationBuilder.DropTable(
                name: "Supply_City_Form1");

            migrationBuilder.DropTable(
                name: "Supply_City_Form2");

            migrationBuilder.DropTable(
                name: "Supply_City_Form3");

            migrationBuilder.DropTable(
                name: "Supply_City_Form4");

            migrationBuilder.DropTable(
                name: "Supply_City_Form5");

            migrationBuilder.DropTable(
                name: "Tariff_Level");

            migrationBuilder.DropTable(
                name: "Waste_City_Form1");

            migrationBuilder.DropTable(
                name: "Waste_City_Form2");

            migrationBuilder.DropTable(
                name: "Waste_City_Form3");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Ref_Buildings");

            migrationBuilder.DropTable(
                name: "Report_Forms");

            migrationBuilder.DropTable(
                name: "Ref_Streets");

            migrationBuilder.DropTable(
                name: "Ref_Statuses");

            migrationBuilder.DropTable(
                name: "Suppliers");

            migrationBuilder.DropTable(
                name: "Ref_Katos");
        }
    }
}

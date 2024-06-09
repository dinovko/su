using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebServer.Controllers;
using WebServer.Dtos;
using WebServer.Interfaces;

namespace WebServerTests.Controllers
{
    public class FormControllerTest
    {
        private readonly IForms _repository;
        
        public FormControllerTest()
        {
            _repository = A.Fake<IForms>();
        }

        [Fact]
        public async Task GetFormsReturnsOk()
        {
            var katoid = 14876;
            var forms = new List<FormDto>();
            A.CallTo(() => _repository.GetFormsByKatoId(katoid)).Returns(forms);

            // Act
            var controller = new FormController(_repository);
            var result = await controller.GetForms(katoid);

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.Equal(forms, okResult.Value);
        }

        [Fact]
        public async Task UpdateForm3ById_ShouldReturnOk_WhenSuccessful()
        {
            // Arrange
            var list = new List<SupplyCityForm3TableDto>() { new SupplyCityForm3TableDto() { 
                FormId = Guid.Parse("4622a45a-6d14-4757-b013-b0fe5253109f"),
                Id = Guid.Parse("5e4bb93f-ef77-4b8b-ae9a-f376c014d278"), 
                KatoId = 14876,
                CoverageMetersTotalCumulative = 33,
                CoverageMetersRemoteData = 3
                } };
            var id = Guid.NewGuid();
            var expectedResult = new List<SupplyCityForm3TableDto>();
            A.CallTo(() => _repository.SupplyCityUpdateForm3(list, id)).Returns(expectedResult);

            // Act
            var controller = new FormController(_repository);
            var result = await controller.UpdateForm3ById(list, id);

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.Equal(expectedResult, okResult.Value);
        }
    }
}

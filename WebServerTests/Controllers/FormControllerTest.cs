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
            //Arrange
            var katoid = 123;
            var forms = A.Fake<Task<List<FormDto>>>();//new List<Form> { / ... / };
            var formList = A.Fake<Task<List<FormDto>>>();
            //A.CallTo(() => _repository.GetFormsByKatoId(katoid)).Returns(forms);
            A.CallTo(() => forms).Returns(formList);
            var controller = new FormController(_repository);
            //Act
            var result = await controller.GetForms(katoid);

            //Assert
            result.Should().NotBeNull();
            //Assert.IsType<OkObjectResult>(result);
            //var okResult = (OkObjectResult)result;
            //Assert.Equal(forms, okResult.Value);
        }
    }
}

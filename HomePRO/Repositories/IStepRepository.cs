using HomePRO.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace HomePRO.Repositories
{
    public interface IStepRepository
    {
        public Step GetStepById(int id);
        public List<Step> StepsByProjectId(int id);

        public void EditStep(Step step);

        public void DeleteStepByStepId(int id);

        public void DeleteStepsByProjectId(int id);

        public void AddStep(Step step);
    }
}
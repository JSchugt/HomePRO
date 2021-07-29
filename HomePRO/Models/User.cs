using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HomePRO.Models
{
    public class User
    {

        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        //[Required]
        //[MaxLength(50)]
        //public string LastName { get; set; }

        //[Required]
        //[MaxLength(50)]
        //public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        //public DateTime CreateDateTime { get; set; }

        //public string Name
        //{
        //    get
        //    {
        //        return $"{FirstName} {LastName}";
        //    }
        //}
    }
}

